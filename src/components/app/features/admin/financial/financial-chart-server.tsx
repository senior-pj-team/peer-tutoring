import { getTutorMonthlyPaidSum } from "@/data/queries/student-session/get-tutor-monthly-paid-sum";
import { createClient } from "@/utils/supabase/server";
import { FinancialStatsChart } from "../../../shared/financial-stats-chart";
import { getMonthlyProfits } from "@/data/queries/student-session/get-monthly-profits";

export async function FinancialChartServer() {
	const supabase = await createClient();
	const chartData = await getMonthlyProfits(supabase);
	if (!chartData) {
		return (
			<div className="flex justify-center items-center w-full text-md text-red-500 h-40">
				Something went wrong ❌
			</div>
		);
	}
	const transformed = chartData.map(
		({ month, total_amount_from_stripe, total_amount_to_tutor }) => ({
			month,
			total: total_amount_from_stripe - total_amount_to_tutor,
		}),
	);

	return <FinancialStatsChart chartData={transformed} />;
}
