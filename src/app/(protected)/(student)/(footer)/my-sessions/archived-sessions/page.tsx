import SessionCard from "@/components/app/shared/sessions/session-card";
import { getUserSession } from "@/utils/get-user-session";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import GeneralError from "@/components/app/shared/error";
import { getStudentSessionView } from "@/data/queries/student-session/get-student-session-view";

const page = async () => {
	const user = await getUserSession();
	if (!user) return <GeneralError />;
	const supabase = await createClient();
	const student_sessions = await getStudentSessionView(supabase, {
		columns:
			"student_session_id, session_id, student_session_status, session_image, session_name, course_code, course_name, session_start_time, session_end_time, tutor_username, tutor_profile_url, tutor_rating, tutor_id",
		student_id: user.user_id,
		status: ["paid"],
	});
	if (!student_sessions) return <GeneralError />;

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
			{student_sessions.length > 0 ? (
				student_sessions.map((ss) => (
					<SessionCard
						key={ss.student_session_id}
						student_session={ss}
						page="archived"
					/>
				))
			) : (
				<div className="col-span-full text-center text-gray-500">
					No archived sessions found 👽
				</div>
			)}
		</div>
	);
};

export default page;
