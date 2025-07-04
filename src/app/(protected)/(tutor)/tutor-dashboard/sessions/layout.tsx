import Tabs from "@/components/app/shared/tabs";
import SessionStatsCards from "@/components/app/features/tutor/tutor-dashboard/sessions/session-stats-cards";

import { Suspense } from "react";
import { SessionStatsSkeleton } from "@/components/app/features/tutor/tutor-dashboard/sessions/session-stats-skeleton";

export default async function Sessions({
	children,
}: {
	children: Readonly<React.ReactNode>;
}) {
	return (
		<div>
			<Suspense fallback={<SessionStatsSkeleton />}>
				<SessionStatsCards />
			</Suspense>

			<div className="px-4 lg:px-6">
				<Tabs
					tabs={[
						{
							name: "Upcoming",
							path: "/tutor-dashboard/sessions/upcoming-sessions",
						},
						{
							name: "Completed",
							path: "/tutor-dashboard/sessions/completed-sessions",
						},
						{
							name: "Canceled",
							path: "/tutor-dashboard/sessions/canceled-sessions",
						},
						{
							name: "Archived",
							path: "/tutor-dashboard/sessions/archived-sessions",
						},
					]}
				/>
				{children}
			</div>
		</div>
	);
}
