"use server";

import { insertStudentSession } from "@/data/mutations/student-session/insert-student-session";
import { getEnrollmentCount } from "@/data/queries/student-session/get-enrollment-count";
import { getSessionsbyId } from "@/data/queries/sessions/get-sessions-by-Id";
import { getUserSession } from "@/utils/get-user-session";
import { createClient } from "@/utils/supabase/server";
import { stripe } from "@/utils/stripe/stripe";
import { redirect } from "next/navigation";
import { updateStripeClientSecrete } from "@/data/mutations/student-session/update-stripe-client-secrete";
import { deleteStudentSession } from "@/data/mutations/student-session/delete-student-session";

export async function checkoutEnrollment(
	_: ActionResponseType<string>,
	formData: FormData,
): Promise<ActionResponseType<string>> {
	let student_session_id: number;
	try {
		const user = await getUserSession();
		if (!user) {
			return {
				success: false,
				error: { message: "Please login to enroll!" },
			};
		}

		const session_id = Number(formData.get("session_id"));
		const supabase = await createClient();

		const session_data = await getSessionsbyId(supabase, { session_id });
		if (!session_data || session_data.length < 1) {
			return {
				success: false,
				error: { message: "Something went wrong. Please try again!" },
			};
		}

		const session = session_data[0];
		if (session.status !== "open") {
			return {
				success: false,
				error: { message: "Sry, session is already closed!" },
			};
		}

		const enrollment_count = await getEnrollmentCount(supabase, {
			session_id,
			ss_status: [
				"pending_enroll",
				"pending_payment",
				"enrolled",
				"completed",
				"paid",
			],
		});

		if (!enrollment_count && enrollment_count !== 0) {
			return {
				success: false,
				error: { message: "Something went wrong. Please try again!" },
			};
		}
		if (enrollment_count >= session.max_students!) {
			return {
				success: false,
				error: { message: "Sry, no avalible seats left for this session!" },
			};
		}

		if (!session.price || Number(session.price) === 0) {
			const has_enrolled_before = await getEnrollmentCount(supabase, {
				session_id,
				student_id: user.user_id,
				ss_status: ["enrolled"],
			});

			if (!has_enrolled_before && has_enrolled_before !== 0) {
				return {
					success: false,
					error: { message: "Something went wrong. Please try again!" },
				};
			}

			if (has_enrolled_before > 0) {
				return {
					success: false,
					error: { message: "You have already enrolled this session!" },
				};
			}

			const student_session = await insertStudentSession(supabase, {
				session_id: session.id!,
				student_id: user.user_id,
				status: "enrolled",
				amount_from_student: session.price,
				amount_to_tutor: session.price,
				service_fee: session.service_fee,
				held_until: new Date(
					new Date(session.start_time!).getTime() + 7 * 24 * 60 * 60 * 1000,
				).toISOString(),
			});

			if (!student_session) {
				return {
					success: false,
					error: { message: "Something went wrong. Please try again!" },
				};
			}

			return {
				success: true,
				data: "Congrats, You have successfully enrolled 🚀",
			};
		}

		const has_checkout_before = await getEnrollmentCount(supabase, {
			session_id,
			student_id: user.user_id,
			ss_status: ["pending_enroll", "pending_payment"],
		});

		if (!has_checkout_before && has_checkout_before !== 0) {
			return {
				success: false,
				error: { message: "Something went wrong. Please try again!" },
			};
		}

		if (has_checkout_before > 0) {
			return {
				success: false,
				error: {
					message:
						"You have not completed payment process to enroll this session. Please finish your payment.",
				},
			};
		}

		let service_included_amount: number = 0;
		if (session.price) {
			service_included_amount = Number(
				session.price + (session.service_fee ?? 0),
			);
		}

		const student_session = await insertStudentSession(supabase, {
			session_id: session.id!,
			student_id: user.user_id,
			status: "pending_enroll",
			amount_from_student: service_included_amount,
			amount_to_tutor: session.price,
			service_fee: session.service_fee,
			held_until: new Date(
				new Date(session.start_time!).getTime() + 7 * 24 * 60 * 60 * 1000,
			).toISOString(),
		});

		if (!student_session) {
			return {
				success: false,
				error: { message: "Something went wrong. Please try again!" },
			};
		}
		const { client_secret: clientSecret } = await stripe.paymentIntents.create({
			amount: service_included_amount! * 100,
			currency: "thb",
			automatic_payment_methods: {
				enabled: true,
			},
			metadata: {
				student_session_id: student_session.id,
			},
		});
		if (!clientSecret) {
			await deleteStudentSession(supabase, student_session.id);

			return {
				success: false,
				error: { message: "Something went wrong. Please try again!" },
			};
		}

		const updateResult = await updateStripeClientSecrete(supabase, {
			student_session_id: student_session.id,
			stripe_client_secrete: clientSecret,
		});

		if (!updateResult) {
			return {
				success: false,
				error: { message: "Something went wrong. Please try again!" },
			};
		}
		student_session_id = student_session.id;
		const { error } = await supabase.rpc("pgmq_enqueue", {
			queue_name: "expire_payment_jobs",
			message: {
				topic: "expire pending_enroll student session",
				student_session_id,
			},
			delay_seconds: 3600,
		});
		if (error) {
			console.log(error);
			await deleteStudentSession(supabase, student_session.id);
			return {
				success: false,
				error: { message: "Something went wrong. Please try again!" },
			};
		}
	} catch (err) {
		console.log("checkout enrollment server action error: ", err);
		return {
			success: false,
			error: { message: "Something went wrong. Please try again!" },
		};
	}
	redirect(`/checkout/${student_session_id}`);
}

// validate for pending_enroll exist for this student and this session in student_session table.
// to add one more status for after clicking pay now
