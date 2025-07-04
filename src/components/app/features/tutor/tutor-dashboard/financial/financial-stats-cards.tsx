import FinancialStatsCard from "@/components/app/shared/financial-card";
import { getSumTutorAmountByStatus } from "@/data/queries/student-session/get-sum-tutor-amount-by-status";
import { createClient } from "@/utils/supabase/server";

export default async function FinancialStatsCards({
	tutor_id,
}: {
	tutor_id: string;
}) {
	const supabase = await createClient();
	const result = await getSumTutorAmountByStatus(supabase, {
		tutor_id,
	});

	if (!result) {
		return null;
	}
	const fin_result = result[0];

	return (
		<div className="flex flex-col gap-3 px-4 lg:px-6">
			<div className="*:data-[slot=card]:shadow-lg  @xl/main:grid-cols-2 @5xl/main:grid-cols-3 grid grid-cols-1 gap-4 dark:*:data-[slot=card]:bg-card w-full">
				<FinancialStatsCard
					title="Gross Revenue"
					description="all payout received"
					message="Only paid amount summed"
					stats={fin_result.paid}
					statsPercent={(
						(fin_result.paid /
							(fin_result.paid + fin_result.holding + fin_result.refunded)) *
						100
					).toPrecision(2)}
				/>
				<FinancialStatsCard
					title="Held Funds"
					description="payout to be received"
					message="Holding for 7 days"
					stats={fin_result.holding}
					statsPercent={(
						(fin_result.holding /
							(fin_result.paid + fin_result.holding + fin_result.refunded)) *
						100
					).toPrecision(2)}
				/>
				<FinancialStatsCard
					title="Churned Amount"
					description="refuned to students"
					message="Due to cancellations or disputes"
					stats={fin_result.refunded}
					statsPercent={(
						(fin_result.refunded /
							(fin_result.paid + fin_result.holding + fin_result.refunded)) *
						100
					).toPrecision(2)}
				/>
			</div>
		</div>
	);
}
