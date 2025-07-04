import { SessionList } from "@/components/app/features/tutor/tutor-dashboard/sessions/session-list";
import { getSessionsbyId } from "@/data/queries/sessions/get-sessions-by-Id";
import { getUserSession } from "@/utils/get-user-session";
import { createClient } from "@/utils/supabase/server";

export default async function page() {
	const user = await getUserSession();
	if (!user) {
		return (
			<div className="py-5 px-2 w-full flex items-center justify-center h-50">
				<span className="text-md font-bold text-red-500">
					Something went wrong ❌
				</span>
			</div>
		);
	}
	const supabase = await createClient();
	const sessions = await getSessionsbyId(supabase, {
		tutor_id: user.user_id,
		status: ["open", "closed"],
	});
	if (!sessions) {
		return (
			<div className="py-5 px-2 w-full flex items-center justify-center h-50">
				<span className="text-md font-bold text-red-500">
					Something went wrong ❌
				</span>
			</div>
		);
	}

	return <SessionList sessions={sessions} tab="upcoming" />;
}
