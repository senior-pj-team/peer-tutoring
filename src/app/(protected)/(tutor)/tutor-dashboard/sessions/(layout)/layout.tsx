import Tabs from "@/components/custom/tabs";
import SessionStatsCards from "@/components/custom/tutor-dashboard/sessions/session-stats-cards";

import { Separator } from "@/components/ui/separator";

export default async function Sessions({
	children,
}: {
	children: Readonly<React.ReactNode>;
}) {
	return (
		<div>
			<SessionStatsCards />
			<Separator className="my-6" />

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
