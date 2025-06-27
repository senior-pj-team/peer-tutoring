import FinancialStatsCards from "@/components/app/features/tutor-dashboard/financial/financial-stats-cards";
import { FinancialStatsChartServer } from "@/components/app/features/tutor-dashboard/financial/financial-stats-chart-server";
import GeneralError from "@/components/app/shared/error";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { getUserSession } from "@/utils/get-user-session";

export default async function page() {
	const user = await getUserSession();
	if (!user) {
		return <GeneralError />;
	}
	return (
		<div>
			<FinancialStatsCards user_id={user.user_id} />
			<div className="px-4 lg:px-6 mt-5">
				<Card className="@container/card">
					<CardHeader className="relative">
						<CardTitle> Gross Revenue</CardTitle>
						<CardDescription>
							<span className="@[540px]/card:block hidden">
								System Earnings over last 12 months
							</span>
							<span className="@[540px]/card:hidden">Last 12 months</span>
						</CardDescription>
					</CardHeader>
					<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
						<FinancialStatsChartServer tutor_id={user.user_id} />
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
