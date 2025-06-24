import { DataTable } from "@/components/app/shared/data-table";
import { columns } from "./columns";
import { getStudentSessionJoin } from "@/data/queries/student-session/get-student-session-join";
import { createClient } from "@/utils/supabase/server";
import { getUserSession } from "@/utils/get-user-session";
import GeneralError from "@/components/app/shared/error";

export default async function Students() {
	const supabase = await createClient();
	const user = await getUserSession();

	if (!user || !supabase) return <GeneralError />;

	const student_sessions = await getStudentSessionJoin(supabase, {
		tutor_id: user.user_id,
	});

	if (!student_sessions) return <GeneralError />;
	const students = student_sessions.map((ss) => ({
		session: ss.sessions
			? `${ss.sessions.session_name ?? "Untitled"} - ${ss.sessions.course_name ?? "Unknown Course"}`
			: "Unknown Session",
		student: {
			name: ss.sessions?.tutor?.username,
			proile_picture: ss.sessions?.tutor?.profile_url,
		},
		enrolled_at: ss.created_at ?? "",
		released_amount: ss.amount_from_student ?? 0,
		payment_status:
			ss.ss_status === "refunded"
				? "Refunded"
				: ss.ss_status === "paid"
				? "Pending"
				: ss.ss_status === "enrolled"
				? "Held"
				: "Pending refund",
	}));

	

	return (
		<div className="mb-5 px-4 lg:px-6">
			<DataTable columns={columns} data={students} type="students" />
		</div>
	);
}
