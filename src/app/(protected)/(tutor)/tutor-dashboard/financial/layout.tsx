import Tabs from "@/components/custom/tabs";
import FinanacialStatsCards from "@/components/custom/tutor-dashboard/financial/financial-stats-cards";
import { Separator } from "@/components/ui/separator";

export default function layout({
	children,
}: {
	children: Readonly<React.ReactNode>;
}) {
	return (
		<div>
			<div className="mb-5 px-4 lg:px-6 ">
				<Tabs
					tabs={[
						{
							name: "Statistics",
							path: "/tutor-dashboard/financial/stats",
						},
						{
							name: "Payouts",
							path: "/tutor-dashboard/financial/payouts",
						},
					]}
				/>
			</div>
			{children}
		</div>
	);
}
