// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import { Resend } from "npm:resend@4.0.0";
import { renderAsync } from "npm:@react-email/components@0.0.22";
import React from "npm:react@18.3.1";
import { ReminderEmail } from "./_templates/reminder.tsx";

const supabase = createClient(
	Deno.env.get("SUPABASE_URL")!,
	Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const resend = new Resend(Deno.env.get("RESEND_API_KEY") as string);

console.log("Hello from reminder notifications and emails sender function!");

Deno.serve(async (req) => {
	while (true) {
		const { data, error } = await supabase.rpc("pgmq_dequeue", {
			queue_name: "session_reminder_jobs",
		});
		if (error) {
			console.error("Error dequeuing:", error);
			break;
		}
		if (!data || data.length === 0) break;

		const [job] = data;
		const {
			topic,
			ss_id,
			session_start,
			session_id,
			session_name,
			student_id,
			student_email,
			tutor_id,
			tutor_email,
		} = job.message;
		const { error: select_ss_error, data: ss_data } = await supabase
			.from("student_session")
			.select("status")
			.eq("id", ss_id)
			.single();

		if (select_ss_error || !ss_data) {
			throw select_ss_error;
		}

		if (ss_data.status !== "pending_refund" && ss_data.status !== "enrolled")
			break;

		if (topic === "send reminders") {
			const { error: insert_noti_error } = await supabase
				.from("notification")
				.insert({
					title: "Reminder noti",
					body: `Be prepared. ${session_name} session is starting tomorrow⌛`,
					status: "new",
					user_id: student_id,
					type: "student",
				});

			if (insert_noti_error) {
				throw insert_noti_error;
			}

			const { error: select_noti_error, data: noti_data } = await supabase
				.from("notification")
				.select("*")
				.eq("session_id", session_id)
				.eq("type", "tutor_reminder");
			if (select_noti_error) {
				throw insert_noti_error;
			}
			const sessionStartTime_date = new Date(session_start);

			const sessionStartTime = `${sessionStartTime_date.getDate()} ${sessionStartTime_date.toLocaleString(
				"default",
				{ month: "short" },
			)} ${sessionStartTime_date.getFullYear()}`;

			if (noti_data.length === 0) {
				const { error: insert_noti_error } = await supabase
					.from("notification")
					.insert({
						title: "Reminder noti",
						body: `Prepare for tomorrow ${session_name} session.`,
						status: "new",
						user_id: tutor_id,
						session_id,
						type: "tutor_reminder",
					});

				if (insert_noti_error) {
					throw insert_noti_error;
				}

				const html = await renderAsync(
					React.createElement(ReminderEmail, {
						sessionName: session_name,
						sessionStartTime: sessionStartTime,
						receipent: "tutor",
					}),
				);
				const { error } = await resend.emails.send({
					from: "welcome <onboarding@resend.dev>",
					to: ["williamkhant4@gmail.com"],
					subject: "Reminder for upcoming session!",
					html,
				});
				if (error) {
					throw error;
				}
			}

			// send reminder emails to students
			const html = await renderAsync(
				React.createElement(ReminderEmail, {
					sessionName: session_name,
					sessionStartTime: sessionStartTime,
					receipent: "student",
				}),
			);
			const { error } = await resend.emails.send({
				from: "welcome <onboarding@resend.dev>",
				to: ["williamkhant4@gmail.com"],
				subject: "Reminder for upcoming session!",
				html,
			});
			if (error) {
				throw error;
			}
		}
	}

	return new Response(JSON.stringify({ ok: true }), {
		headers: { "Content-Type": "application/json" },
	});
});
