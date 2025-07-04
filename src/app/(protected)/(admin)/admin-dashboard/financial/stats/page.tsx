import { FinancialChartServer } from "@/components/app/features/admin/financial/financial-chart-server";
import { FinancialStats } from "@/components/app/features/admin/financial/financial-stats";
import GeneralLoading from "@/components/app/shared/general-loading";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import React, { Suspense } from "react";

const page = () => {
	return (
		<div>
			<div className="flex flex-col gap-4 mb-3">
				<h1 className="text-2xl font-bold">Financial Analysis</h1>
				<p className="text-sm text-muted-foreground">
					Analyze your financial data and make informed decisions.
				</p>
			</div>
			<FinancialStats />
			<div className="  mt-5">
				<Card className="@container/card">
					<CardHeader className="relative">
						<CardTitle>Gross Profits</CardTitle>
						<CardDescription>
							<span className="@[540px]/card:block hidden">
								System Earnings over last 12 months
							</span>
							<span className="@[540px]/card:hidden">Last 12 months</span>
						</CardDescription>
					</CardHeader>
					<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
						<Suspense fallback={<GeneralLoading />}>
							<FinancialChartServer />
						</Suspense>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default page;
