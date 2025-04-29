"use client";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { UserRoundCheck, TriangleAlert, TicketX, Percent } from "lucide-react";
import { useState } from "react";
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

export default function FinanacialStatsCards() {
	const [period, setPeriod] = useState<string>("all time");
	return (
		<div className="flex flex-col gap-3 px-4 lg:px-6">
			<Select onValueChange={setPeriod}>
				<SelectTrigger className="w-[12rem]">
					<SelectValue placeholder="Select period" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Periods</SelectLabel>
						<SelectItem value="all time">all time</SelectItem>
						<SelectItem value="last 7 days">this week</SelectItem>
						<SelectItem value="last 30 days">this month</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
			<div className="*:data-[slot=card]:shadow-lg  @xl/main:grid-cols-2 @5xl/main:grid-cols-3 grid grid-cols-1 gap-4 dark:*:data-[slot=card]:bg-card w-full">
				<FinancialStatsCards
					title="Gross Revenue"
					stats={7880}
					period={period}
					statsPercent={76}
				/>
				<FinancialStatsCards
					title="Held Funds"
					stats={960}
					period={period}
					statsPercent={23.7}
				/>
				<FinancialStatsCards
					title="Refuned Amount"
					stats={200}
					period={period}
					statsPercent={2.5}
				/>
			</div>
		</div>
	);
}

function FinancialStatsCards({
	title,
	stats,
	period,
	statsPercent,
	enrollments,
	dispute_students,
	refunded_students,
}: SessionStatsCardProps) {
	function generateDescription() {
		switch (title) {
			case "Gross Revenue":
				return "all payout received";
			case "Held Funds":
				return "payout to be received";
			case "Refuned Amount":
				return "refuned to students";
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
						title === "Held Funds" && "text-orange-500",
						title === "Refuned Amount" && "text-red-500",
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
