import SessionCard from "@/components/app/shared/sessions/session-card";
import { getUserSession } from "@/utils/getUserSession";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server"
import { getStudentSessionJoin } from "@/data/queries/student-session/get-student-session-join";


const Page = async () => {
  const user = await getUserSession();
  if (!user) {
	redirect("/login");
  }
  const supabase = await createClient();
  const student_sessions= await getStudentSessionJoin(supabase, user.user_id, ["paid"])
  if(!student_sessions) return <></>
  
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
			{student_sessions.length > 0 ? (
				student_sessions.map((ss) => (
					<SessionCard
						key={ss.session_id}
						student_session={ss}
						page="archived"
					/>
				))
			) : (
				<div className="col-span-full text-center text-gray-500">
					No archived sessions found.
				</div>
			)}
		</div>
	);
};

export default Page;
