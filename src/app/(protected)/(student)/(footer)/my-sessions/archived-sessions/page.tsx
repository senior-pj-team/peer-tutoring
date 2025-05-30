<<<<<<< HEAD
import SessionCard from "@/components/app/shared/sessions/session-card";
import { getSessions } from "@/actions/sessionActions";
=======
import SessionCard from "@/components/app/shared/session-card";
import { selectStudentSession } from "@/data/queries/sessions/select-student-session-view";
import { getUserSession } from "@/utils/getUserSession";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
>>>>>>> main

const Page = async () => {
	const user = await getUserSession();
	if (!user) {
		redirect("/login");
	}
	const supabase = await createClient();
	const sessions: TStudentSessionViewCardResult[] = await selectStudentSession(['paid'], user, supabase);

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
			{sessions.length > 0 ? (
				sessions.map((session) => (
					<SessionCard
						key={session.session_id}
						studentSession={session}
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
