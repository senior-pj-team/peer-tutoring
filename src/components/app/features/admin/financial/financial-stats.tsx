"use client";

import FinancialStatsCard from "@/components/app/shared/financial-card";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { UseAmountSummariesQuery } from "@/hooks/use-amount-summaries";
import { useSupabase } from "@/hooks/use-supabase";
import { getDateRangeWithOptionalEnd } from "@/utils/app/get-date-range";
import { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { FinancialStatsCardsSkeleton } from "../../tutor/tutor-dashboard/financial/financial-stats-cards-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export function FinancialStats() {
	const supabase = useSupabase();
	const [period, setPeriod] = useState<string>("all time");
	const dateRange = useMemo(() => {
		const now = new Date();
		const dateRange: DateRange = {
			from:
				period === "last 30 days"
					? new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
					: period === "last 7 days"
						? new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
						: undefined,
			to: now,
		};
		return getDateRangeWithOptionalEnd(dateRange);
	}, [period]);
	const { data, isError, isLoading } = UseAmountSummariesQuery({
		supabase,
		start: dateRange.start_date,
		end: dateRange.end_date,
	});

	return (
		<div>
			{" "}
			<Select onValueChange={setPeriod}>
				<SelectTrigger className="w-[12rem]">
					<SelectValue placeholder="Select period" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Periods</SelectLabel>
						<SelectItem value="all time">all time</SelectItem>
						<SelectItem value="last 7 days">Last 7 days</SelectItem>
						<SelectItem value="last 30 days">Last 30 days</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-4 w-full">
				{isLoading &&
					Array.from({ length: 4 }).map((_, idx) => (
						<div className="h-[167px] w-full rounded-md shadow-md bg-white p-2">
							<Skeleton className="w-[50%] h-4 mb-4 rounded-3xl" />
							<Skeleton className="w-30 h-10 mb-5 rounded-xl" />
							<Skeleton className="w-[65%] h-4 mb-2 rounded-3xl" />
							<Skeleton className="w-20 h-3 rounded-3xl mb-2" />
						</div>
					))}
				{!isError && data && (
					<>
						<FinancialStatsCard
							title="Gross Revenue"
							description="tutor fee included and stripe fee excluded"
							message="Total received revenue"
							stats={data[0].sum_revenue ?? 0}
							statsPercent=""
						/>
						<FinancialStatsCard
							title="Platform Earnings"
							description="tutor and stripe fees excluded"
							message="Total received profits"
							stats={Number(
								(
									(data[0].sum_revenue ?? 0) -
									(data[0].sum_amount_to_tutor ?? 0)
								).toFixed(2),
							)}
						/>
						<FinancialStatsCard
							title="Amount to tutor"
							description="all paid out amount included"
							message="Total transferred amount"
							stats={data[0].sum_amount_to_tutor ?? 0}
						/>
						<FinancialStatsCard
							title="Churned Amount"
							description="refuned to students"
							message="Due to refunds or disputes"
							stats={data[0].sum_refunded ?? 0}
						/>
					</>
				)}
			</div>
		</div>
	);
}
