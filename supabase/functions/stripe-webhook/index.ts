// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import Stripe from "npm:stripe@^11.18.0";
import { Resend } from "npm:resend@4.0.0";
import { renderAsync } from "npm:@react-email/components@0.0.22";
import React from "npm:react@18.3.1";
import { TSS_Data } from "./types.ts";
import { PaymentSuccessfulEmail } from "./_templates/payment-success.tsx";
import { RefundEmail } from "./_templates/refund.tsx";

const stripe = new Stripe(Deno.env.get("STRIPE_API_KEY")!, {
	apiVersion: "2022-11-15",
});
const resend = new Resend(Deno.env.get("RESEND_API_KEY") as string);
const supabase = createClient(
	Deno.env.get("SUPABASE_URL")!,
	Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

console.log("Hello from stripe webhook");
Deno.serve(async (req) => {
	const signature = req.headers.get("Stripe-Signature");
	const body = await req.text();

	if (!signature) {
		return new Response("Missing Stripe-Signature header", { status: 400 });
	}

	let event;
	try {
		event = await stripe.webhooks.constructEventAsync(
			body,
			signature,
			Deno.env.get("STRIPE_WEBHOOK_SECRET")!,
			undefined,
		);
		console.log("✅ Success:", event.type);

		const { student_session_id } = (
			event.data.object as {
				metadata: { student_session_id: string };
				[key: string]: any;
			}
		).metadata;
		const payment_intent_id = (event.data.object as { payment_intent: string })
			.payment_intent;

		const { error, data: raw } = await supabase
			.from("student_session")
			.select(
				`id,
					session_id,
					student_id,
					amount_from_student,
					amount_to_tutor,
					ss_status: status,
					sessions (
						id,
						session_name,
						image,
						max_students,
						start_time,
						status,
						tutor:user (
							id,
							email
						)
					),
					student:user (
						id,
						email
					)
					`,
			)
			.eq("id", student_session_id)
			.single();

		const ss_data = raw as TSS_Data;
		if (error || !ss_data) {
			if (error) throw error;
		}
		if (!ss_data) {
			throw Error("no student session data");
		}

		if (
			event.type === "charge.expired" ||
			event.type === "payment_intent.payment_failed"
		) {
			const { error } = await supabase
				.from("student_session")
				.update({
					status: "failed_payment",
					stripe_payment_intent_id: payment_intent_id,
				})
				.eq("id", student_session_id);
			if (error) {
				throw error;
			}
			// send payment fail notification;
			const { error: insert_noti_error } = await supabase
				.from("notification")
				.insert({
					title: "Payment Failed",
					body: `payment process could not be completed for enrolling ${ss_data.sessions?.session_name}❗`,
					status: "new",
					user_id: ss_data.student_id,
					type: "student",
				});

			if (insert_noti_error) {
				throw insert_noti_error;
			}

			return new Response(
				JSON.stringify({
					message: "Payment was failed or expired",
				}),
				{ headers: { "Content-Type": "application/json" } },
			);
		} else if (event.type === "payment_intent.succeeded") {
			const { count, error: count_error } = await supabase
				.from("student_session")
				.select("", { count: "exact", head: true })
				.in("status", ["completed", "enrolled", "paid", "pending_refund"])
				.eq("id", student_session_id);

			if (count_error) {
				if (count_error) throw count_error;
				throw Error("count is null");
			}
			const purchaseDate_timestamp = (event.data.object as { created: number })
				.created;
			const purchaseDate_date = new Date(purchaseDate_timestamp * 1000); // Convert to milliseconds

			const purchaseDate = `${purchaseDate_date.getDate()} ${purchaseDate_date.toLocaleString(
				"default",
				{
					month: "short",
				},
			)} ${purchaseDate_date.getFullYear()}`;
			if ((count ?? 0) >= ss_data.sessions?.max_students) {
				const { error: update_error } = await supabase
					.from("student_session")
					.update({
						status: "pending_refund",
						stripe_payment_intent_id: payment_intent_id,
					})
					.eq("id", student_session_id);
				if (update_error) {
					throw update_error;
				}
				// send email to student to refund

				const html = await renderAsync(
					React.createElement(RefundEmail, {
						sessionImage: ss_data.sessions.image,
						sessionName: ss_data.sessions.session_name,
						price: ss_data.amount_from_student,
						purchaseDate,
					}),
				);
				const { error } = await resend.emails.send({
					from: "welcome <onboarding@resend.dev>",
					to: ["williamkhant4@gmail.com"],
					subject: "Session Enrollment Failed!",
					html,
				});
				if (error) {
					throw error;
				}
				return new Response(
					JSON.stringify({
						message: "Sry, no avalible seats left for this session!",
					}),
					{ headers: { "Content-Type": "application/json" }, status: 200 },
				);
			}

			if ((count ?? 0) + 1 === ss_data.sessions?.max_students) {
				const { error: update_error } = await supabase
					.from("sessions")
					.update({ status: "closed" })
					.eq("id", ss_data.sessions?.id);
				if (update_error) {
					throw update_error;
				}
			}

			const { error: update_error } = await supabase
				.from("student_session")
				.update({
					status: "enrolled",
					stripe_payment_intent_id: payment_intent_id,
				})
				.eq("id", student_session_id);

			if (update_error) {
				throw update_error;
			}

			// send session closed notification
			if ((count ?? 0) + 1 === ss_data.sessions?.max_students) {
				const { error: insert_noti_error } = await supabase
					.from("notification")
					.insert({
						title: "Session closed",
						body: `Hi, your session ${ss_data.sessions?.session_name} is full now. So the session has been closed🥳`,
						status: "new",
						user_id: ss_data.sessions?.tutor?.id,
						type: "tutor",
					});

				if (insert_noti_error) {
					throw insert_noti_error;
				}
			}

			// insert notifcation to send tutor to notify enrollment

			const { error: insert_noti_error } = await supabase
				.from("notification")
				.insert({
					title: "New student enrolled",
					body: `Congrats, a new student has enrolled for ${ss_data.sessions?.session_name}🥳`,
					status: "new",
					user_id: ss_data.sessions?.tutor?.id,
					type: "tutor",
				});

			if (insert_noti_error) {
				throw insert_noti_error;
			}

			// add job queue to insert reminder notification and send reminder email

			const targetTime = new Date(
				new Date(ss_data.sessions?.start_time).getTime() - 24 * 60 * 60 * 1000,
			);
			const delaySeconds = Math.max(
				0,
				Math.floor((targetTime.getTime() - Date.now()) / 1000),
			);

			await supabase.rpc("pgmq_enqueue", {
				queue_name: "session_reminder_jobs",
				message: {
					topic: "send reminders",
					ss_id: ss_data.id,
					session_start: ss_data.sessions.start_time,
					session_id: ss_data.sessions.id,
					session_name: ss_data.sessions.session_name,
					student_email: ss_data.student.email,
					student_id: ss_data.student.id,
					tutor_email: ss_data.sessions.tutor.email,
					tutor_id: ss_data.sessions.tutor.id,
				},
				delay_seconds: delaySeconds,
			});

			// send successful email to student

			const sessionStartTime_date = new Date(ss_data.sessions.start_time);

			const sessionStartTime = `${sessionStartTime_date.getDate()} ${sessionStartTime_date.toLocaleString(
				"default",
				{ month: "short" },
			)} ${sessionStartTime_date.getFullYear()}`;

			const html = await renderAsync(
				React.createElement(PaymentSuccessfulEmail, {
					sessionImage: ss_data.sessions.image,
					sessionName: ss_data.sessions.session_name,
					price: ss_data.amount_from_student,
					purchaseDate,
					sessionStartTime,
				}),
			);

			const { error } = await resend.emails.send({
				from: "welcome <onboarding@resend.dev>",
				to: ["williamkhant4@gmail.com"],
				subject: "Session Enrollment Successful!",
				html,
			});
			if (error) {
				throw error;
			}

			return new Response(JSON.stringify({ ok: true }), {
				headers: { "Content-Type": "application/json" },
			});
		} else if (event.type === "charge.updated") {
			const { net } = await stripe.balanceTransactions.retrieve(
				(event.data.object as { balance_transaction: string })
					.balance_transaction,
			);

			if (net) {
				const { error: update_error } = await supabase
					.from("student_session")
					.update({
						amount_from_stripe: net / 100,
					})
					.eq("id", student_session_id);
				if (update_error) {
					throw update_error;
				}
			}
			return new Response(JSON.stringify({ ok: true }), {
				headers: { "Content-Type": "application/json" },
				status: 200,
			});
		}
	} catch (err: any) {
		const message = err instanceof Error ? err.message : String(err);
		console.log(`❌ Error message: ${err.message}`);
		return new Response(err.message, { status: 400 });
	}

	return new Response(JSON.stringify({ ok: true }), {
		headers: { "Content-Type": "application/json" },
		status: 200,
	});
});
