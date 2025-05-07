import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Percent } from "lucide-react";
import { cn } from "@/lib/utils";
type SessionStatsCardProps = {
    title: string;
    stats: number;
    period: string;
    statsPercent?: number;
    enrollments?: number;
    dispute_students?: number;
    refunded_students?: number;
};

export default function FinancialStatsCard({
	title,
	stats,
	period,
	statsPercent,
}: SessionStatsCardProps) {
	function generateDescription() {
		switch (title) {
			case "Gross Revenue":
				return "all payout received";
			case "Held Funds":
				return "payout to be received";
			case "Refuned Amount":
				return "refuned to students";
			case "Platform Earnings":
				return "Only the platform's earnings received";
			case "Refunds":
				return "Amounts refunded for student's request or reports";
			case "Holding Funds":
				return "amounts held by the system for 7 days";
		}
	}
	function generateMessage() {
		switch (title) {
			case "Gross Revenue":
				return "Only released transactions summed";
			case "Held Funds":
				return "Holding for 7 days";
			case "Refuned Amount":
				return "Due to cancellations or disputes";
			case "Platform Earnings":
				return "the total amount earned by the platform";
			case "Refunds":
				return "Refunded amount to students";
			case "Holding Funds":
				return "Holding for 7 days";
		}
	}

	return (
		<Card className="@container/card py-3 ">
			<CardHeader className="relative">
				<CardDescription>{title}</CardDescription>
				<CardTitle
					className={cn(
						"@[250px]/card:text-3xl text-2xl font-semibold tabular-nums flex items-center gap-x-2",
						title === "Gross Revenue" && "text-green-500",
						title === "Held Funds" || title ===  "Holding Funds" && "text-orange-500",
						title === "Refuned Amount" && "text-red-500",
						title === "Platform Earnings" && "text-violet-500",
						title === "Refunds" && "text-red-500",
					)}>
					{stats} <span className="text-sm  text-black">฿</span>
				</CardTitle>
			</CardHeader>

			<CardFooter className="flex-col items-start gap-1 text-sm">
				<span className="text-gray-700 text-bold text-sm">
					{" "}
					{generateMessage()}
				</span>

				<div className="text-muted-foreground text-xs">
					{generateDescription()} {period}
				</div>
				<div className="flex items-center gap-x-1 gap-y-2 flex-wrap mt-1 text-[0.75rem] text-violet-500 font-extrabold">
					{statsPercent} <Percent className="size-3" /> of total sessions
					earning
				</div>
			</CardFooter>
		</Card>
	);
}