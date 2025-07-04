import { getTutorMonthlyPaidSum } from "@/data/queries/student-session/get-tutor-monthly-paid-sum";
import { createClient } from "@/utils/supabase/server";
import { FinancialStatsChart } from "../../../../shared/financial-stats-chart";

export async function FinancialStatsChartServer({
	tutor_id,
}: {
	tutor_id: string;
}) {
	const supabase = await createClient();
	const chartData = await getTutorMonthlyPaidSum(supabase, tutor_id);
	if (!chartData) {
		return (
			<div className="flex justify-center items-center w-full text-md text-red-500 h-40">
				Something went wrong ❌
			</div>
		);
	}
	return <FinancialStatsChart chartData={chartData} />;
}
