import FinancialStatsCards from "@/components/custom/features/tutor-dashboard/financial/financial-stats-cards";
import { FinancialChart } from "@/components/custom/features/tutor-dashboard/financial/financial-stats-chart";

export default function FinancialStats() {
	return (
		<div>
			<FinancialStatsCards />
			<div className="px-4 lg:px-6 mt-5">
				<FinancialChart />
			</div>
		</div>
	);
}
