import SessionCard from "@/components/app/shared/sessions/session-card";
import { getUserSession } from "@/utils/get-user-session";
import { createClient } from "@/utils/supabase/server";
import { getStudentSessionJoin } from "@/data/queries/student-session/get-student-session-join";
import GeneralError from "@/components/app/shared/error";

const page = async () => {
	const user = await getUserSession();
	if (!user) return <GeneralError/>
	const supabase = await createClient();
	const student_sessions = await getStudentSessionJoin(supabase, {
		student_id: user.user_id,
		status: ["completed"],
	});
	if (!student_sessions) return <GeneralError />;

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
			{student_sessions.length > 0 ? (
				student_sessions.map((ss) => (
					<SessionCard key={ss.id} student_session={ss} page="complete" />
				))
			) : (
				<div className="col-span-full text-center text-gray-500">
					No completed sessions found.
				</div>
			)}
		</div>
	);
};

export default page;
