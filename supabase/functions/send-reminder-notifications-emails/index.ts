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
		const { topic } = job;
		if (topic === "send reminders" || topic === "send session complete") {
			const { session_name, start_time, tutor_id, students } = job.message;
			const studentSSIDs = students.map(
				(s: { student_id: string; id: number }) => s.id,
			);
			const status = topic === "send reminders" ? "enrolled" : "completed";
			const { data: ss_data, error: ss_data_error } = await supabase
				.from("student_session")
				.select("student_id")
				.in("id", [studentSSIDs])
				.eq("status", status);

			if (ss_data_error) {
				throw ss_data_error;
			}
			const studentIds = ss_data.map(
				(s: { student_id: string }) => s.student_id,
			);
			const [tutorRes, studentsRes] = await Promise.all([
				supabase.from("user").select("email").eq("id", tutor_id).single(),
				supabase.from("user").select("id, email").in("id", studentIds),
			]);
			if (tutorRes.error) throw tutorRes.error;
			if (studentsRes.error) throw studentsRes.error;

			const tutorEmail = tutorRes.data.email;
			const studentsResData = studentsRes.data;

			const noti_title =
				topic === "send reminders"
					? "Reminder notification"
					: "Session Completed";
			const noti_body_student =
				topic === "send reminders"
					? `Be prepared. ${session_name} session is starting tomorrow ⌛`
					: `Congrats, ${session_name} session is completed. You can give reviews and ratings for tutor now 🚀`;
			const noti_body_tutor =
				topic === "send reminders"
					? `Prepare for tomorrow ${session_name} session ⌛`
					: `You have completed tutoring ${session_name} session. Your fund out will be held for 7 days.`;

			const notifications = [
				...studentsResData.map((s) => ({
					title: noti_title,
					body: noti_body_student,
					status: "new",
					user_id: s.id,
					type: "student",
				})),
				{
					title: noti_title,
					body: noti_body_tutor,
					status: "new",
					user_id: tutor_id,
					type: "tutor_reminder",
				},
			];
			const { error: insert_noti_error } = await supabase
				.from("notification")
				.insert(notifications);

			if (insert_noti_error) {
				throw insert_noti_error;
			}

			const sessionStartTime_date = new Date(start_time);

			const sessionStartTime = `${sessionStartTime_date.getDate()} ${sessionStartTime_date.toLocaleString(
				"default",
				{ month: "short" },
			)} ${sessionStartTime_date.getFullYear()}`;

			const tutor_email_template = await renderAsync(
				React.createElement(ReminderEmail, {
					sessionName: session_name,
					sessionStartTime: sessionStartTime,
					receipent: "tutor",
					type: topic,
				}),
			);
			const student_email_template = await renderAsync(
				React.createElement(ReminderEmail, {
					sessionName: session_name,
					sessionStartTime: sessionStartTime,
					receipent: "student",
					type: topic,
				}),
			);
			await Promise.all(
				notifications.map((n) =>
					resend.emails.send({
						from: "welcome <onboarding@resend.dev>",
						to: ["williamkhant4@gmail.com"],
						subject: "Reminder for upcoming session!",
						html:
							n.type === "student"
								? student_email_template
								: tutor_email_template,
					}),
				),
			);
		}
	}

	return new Response(JSON.stringify({ ok: true }), {
		headers: { "Content-Type": "application/json" },
	});
});
