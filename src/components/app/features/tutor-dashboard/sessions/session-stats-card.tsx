import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { User, TicketX, Percent } from "lucide-react";

type SessionStatsCardProps = {
	title: string;
	stats: number;
	statsPercent?: string;
	enrollments?: number;
	churneds?: number;
};

export function SessionStatsCard({
	title,
	stats,
	statsPercent,
	enrollments,
	churneds,
}: SessionStatsCardProps) {
	function generateDescription() {
		switch (title) {
			case "Total Sessions":
				return "All sessions you have created";
			case "Upcoming Sessions":
				return "All opened and closed sessions ";
			case "Completed Sessions":
				return "All completed sessions";
			case "Archived Sessions":
				return "All paid sessions to you";
		}
	}
	return (
		<Card className="@container/card py-3 ">
			<CardHeader className="relative">
				<CardDescription>{title}</CardDescription>
				<CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
					{stats}
				</CardTitle>
				<div className="absolute right-4 top-0">
					{statsPercent && (
						<Badge
							variant="outline"
							className="flex gap-1 rounded-lg text-xs font-extrabold text-primary bg-orange-100 border-orange-400">
							{statsPercent}
							<Percent className="size-3" />
						</Badge>
					)}
				</div>
				<div className="text-muted-foreground text-xs">
					{generateDescription()}
				</div>
			</CardHeader>
			<CardFooter className="flex-col items-start gap-1 text-sm">
				<div className="flex items-center gap-x-1 gap-y-2 flex-wrap mt-1">
					<Badge
						variant="outline"
						className="flex gap-1 rounded-lg text-xs bg-green-100">
						<User />
						<span className="text-[0.5rem] md:text-[0.6rem] text-gray-800">
							enrollments: {enrollments}
						</span>
					</Badge>

					<Badge
						variant="outline"
						className="flex gap-1 rounded-lg text-xs bg-red-100">
						<TicketX />
						<span className="text-[0.5rem] md:text-[0.6rem] text-gray-800">
							churned: {churneds}
						</span>
					</Badge>
				</div>
			</CardFooter>
		</Card>
	);
}
