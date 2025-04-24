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

type SessionStatsCardProps = {
	title: string;
	stats: number;
	period: string;
	statsPercent?: number;
	enrollments?: number;
	dispute_students?: number;
	refunded_students?: number;
};

export default function SessionStatsCards() {
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
			<div className="*:data-[slot=card]:shadow-lg  @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 dark:*:data-[slot=card]:bg-card">
				<SessionStatsCard
					title="Total Sessions"
					stats={126}
					period={period}
					enrollments={215}
					dispute_students={5}
					refunded_students={3}
				/>
				<SessionStatsCard
					title="Upcoming Sessions"
					stats={9}
					period={period}
					enrollments={14}
					statsPercent={9}
					dispute_students={0}
					refunded_students={0}
				/>
				<SessionStatsCard
					title="Completed Sessions"
					stats={117}
					period={period}
					enrollments={199}
					statsPercent={79}
					dispute_students={3}
					refunded_students={1}
				/>
				<SessionStatsCard
					title="Canceled Sessions"
					stats={2}
					period={period}
					enrollments={2}
					statsPercent={0.54}
					dispute_students={2}
					refunded_students={2}
				/>
			</div>
		</div>
	);
}

function SessionStatsCard({
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
			case "Total Sessions":
				return "Sessions created";
			case "Upcoming Sessions":
				return "Sessions upcoming";
			case "Completed Sessions":
				return "Sessions completed";
			case "Canceled Sessions":
				return "Sessions canceled";
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
							className="flex gap-1 rounded-lg text-xs font-extrabold border-gray-400">
							{statsPercent}
							<Percent className="size-3" />
						</Badge>
					)}
				</div>
			</CardHeader>
			<CardFooter className="flex-col items-start gap-1 text-sm">
				<div className="text-muted-foreground text-xs">
					{generateDescription()} {period}
				</div>
				<div className="flex items-center gap-x-1 gap-y-2 flex-wrap mt-1">
					<Badge
						variant="outline"
						className="flex gap-1 rounded-lg text-xs bg-green-100">
						<UserRoundCheck />
						<span className="text-[0.5rem] md:text-[0.6rem] text-gray-800">
							enrollments: {enrollments}
						</span>
					</Badge>

					<Badge
						variant="outline"
						className="flex gap-1 rounded-lg text-xs bg-orange-100">
						<TriangleAlert className="size-2" />
						<span className="text-[0.5rem] md:text-[0.6rem] text-gray-800">
							disputes: {dispute_students}
						</span>
					</Badge>

					<Badge
						variant="outline"
						className="flex gap-1 rounded-lg text-xs bg-red-100">
						<TicketX />
						<span className="text-[0.5rem] md:text-[0.6rem] text-gray-800">
							refunded: {refunded_students}
						</span>
					</Badge>
				</div>
			</CardFooter>
		</Card>
	);
}
