"use client";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import FinancialStatsCard from "@/components/custom/shared/financial-card";	


export default function FinancialStatsCards() {
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
				<FinancialStatsCard
					title="Gross Revenue"
					stats={7880}
					period={period}
					statsPercent={76}
				/>
				<FinancialStatsCard
					title="Held Funds"
					stats={960}
					period={period}
					statsPercent={23.7}
				/>
				<FinancialStatsCard
					title="Refuned Amount"
					stats={200}
					period={period}
					statsPercent={2.5}
				/>
			</div>
		</div>
	);
}
