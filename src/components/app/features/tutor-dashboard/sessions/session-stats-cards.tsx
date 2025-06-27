import { getTutorSessionStats } from "@/data/queries/tutors/get-tutor-session-stats";
import { SessionStatsCard } from "./session-stats-card";
import { createClient } from "@/utils/supabase/server";
import { getUserSession } from "@/utils/get-user-session";
import { Separator } from "@/components/ui/separator";

export default async function SessionStatsCards() {
	const supabase = await createClient();
	const user = await getUserSession();
	if (!user || user.user_role !== "tutor") {
		return null;
	}

	const session_stats = await getTutorSessionStats(supabase, user.user_id);

	if (!session_stats || session_stats.length < 1) {
		return null;
	}

	const {
		all_sessions,
		upcoming_sessions,
		completed_sessions,
		archived_sessions,
		enrollments_for_all_sessions,
		churned_for_all_sessions,
		enrollments_for_completed_sessions,
		churned_for_completed_sessions,
		enrollments_for_upcoming_sessions,
		churned_for_upcoming_sessions,
		enrollments_for_archived_sessions,
		churned_for_archived_sessions,
	} = session_stats[0];
	return (
		<>
			<div className="flex flex-col gap-3 px-4 lg:px-6">
				<div className="*:data-[slot=card]:shadow-lg  @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 dark:*:data-[slot=card]:bg-card">
					<SessionStatsCard
						title="Total Sessions"
						stats={all_sessions}
						enrollments={enrollments_for_all_sessions}
						churneds={churned_for_all_sessions}
					/>
					<SessionStatsCard
						title="Upcoming Sessions"
						stats={upcoming_sessions}
						enrollments={enrollments_for_upcoming_sessions}
						statsPercent={((upcoming_sessions / all_sessions) * 100).toFixed(2)}
						churneds={churned_for_upcoming_sessions}
					/>
					<SessionStatsCard
						title="Completed Sessions"
						stats={completed_sessions}
						enrollments={enrollments_for_completed_sessions}
						statsPercent={((completed_sessions / all_sessions) * 100).toFixed(
							2,
						)}
						churneds={churned_for_completed_sessions}
					/>
					<SessionStatsCard
						title="Archived Sessions"
						stats={archived_sessions}
						enrollments={enrollments_for_archived_sessions}
						statsPercent={((archived_sessions / all_sessions) * 100).toFixed(2)}
						churneds={churned_for_archived_sessions}
					/>
				</div>
			</div>
			<Separator className="my-6" />
		</>
	);
}
