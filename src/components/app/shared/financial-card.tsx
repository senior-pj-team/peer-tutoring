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
	description: string;
	message: string;
	stats: number;
	statsPercent?: string;
	enrollments?: number;
	dispute_students?: number;
	refunded_students?: number;
};

export default function FinancialStatsCard({
	title,
	description,
	message,
	stats,
	statsPercent,
}: SessionStatsCardProps) {
	return (
		<Card className="@container/card py-3 ">
			<CardHeader className="relative">
				<CardDescription>{title}</CardDescription>
				<CardTitle
					className={cn(
						"@[250px]/card:text-3xl text-2xl font-semibold tabular-nums flex items-center gap-x-2",
						title === "Gross Revenue" && "text-green-500",
						(title === "Held Funds" || title === "Amount to tutor") &&
							"text-orange-500",
						title === "Churned Amount" && "text-red-500",
						title === "Platform Earnings" && "text-violet-500",
					)}>
					{stats} <span className="text-sm  text-black">฿</span>
				</CardTitle>
			</CardHeader>

			<CardFooter className="flex-col items-start gap-1 text-sm">
				<span className="text-gray-700 text-bold text-sm"> {message}</span>

				<div className="text-muted-foreground text-xs">{description}</div>
				{statsPercent && (
					<div className="flex items-center gap-x-1 gap-y-2 flex-wrap mt-1 text-[0.75rem] text-violet-500 font-extrabold">
						{statsPercent} <Percent className="size-3" /> of total sessions
						earning
					</div>
				)}
			</CardFooter>
		</Card>
	);
}
