import FinancialStatsCards from "@/components/app/features/tutor-dashboard/financial/financial-stats-cards";
import { FinancialStatsCardsSkeleton } from "@/components/app/features/tutor-dashboard/financial/financial-stats-cards-skeleton";
import { FinancialStatsChartServer } from "@/components/app/features/tutor-dashboard/financial/financial-stats-chart-server";
import GeneralError from "@/components/app/shared/error";
import GeneralLoading from "@/components/app/shared/general-loading";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { getUserSession } from "@/utils/get-user-session";
import { Suspense } from "react";

export default async function page() {
	const user = await getUserSession();
	if (!user) {
		return <GeneralError />;
	}
	return (
		<div>
			<Suspense fallback={<FinancialStatsCardsSkeleton />}>
				<FinancialStatsCards tutor_id={user.user_id} />
			</Suspense>
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
						<Suspense fallback={<GeneralLoading />}>
							<FinancialStatsChartServer tutor_id={user.user_id} />
						</Suspense>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
