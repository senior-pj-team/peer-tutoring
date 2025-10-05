"use client";

import FinancialStatsCard from "@/components/app/shared/financial-card";

import { UseAmountSummariesQuery } from "@/hooks/use-amount-summaries";
import { useSupabase } from "@/hooks/use-supabase";
import { getDateRange } from "@/utils/app/get-date-range";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Skeleton } from "@/components/ui/skeleton";
import { DatePickerWithRange } from "@/components/app/shared/date-range-picker";

export function FinancialStats() {
	const supabase = useSupabase();
	const [dateFilter, setDateFilter] = useState<DateRange | undefined>(
		undefined,
	);
	const { data, isError, isLoading } = UseAmountSummariesQuery({
		supabase,
		start: getDateRange(dateFilter).start_date,
		end: getDateRange(dateFilter).end_date,
	});

	return (
		<div>
			<DatePickerWithRange date={dateFilter} setDate={setDateFilter} />
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-4 w-full">
				{isLoading &&
					Array.from({ length: 4 }).map((_, idx) => (
						<div
							className="h-[167px] w-full rounded-md shadow-md bg-white p-2"
							key={idx}>
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
