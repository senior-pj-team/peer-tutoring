"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
	{ month: "May 2024", revenue: 320 },
	{ month: "Jun 2024", revenue: 450 },
	{ month: "Jul 2024", revenue: 500 },
	{ month: "Aug 2024", revenue: 470 },
	{ month: "Sep 2024", revenue: 520 },
	{ month: "Oct 2024", revenue: 610 },
	{ month: "Nov 2024", revenue: 580 },
	{ month: "Dec 2024", revenue: 630 },
	{ month: "Jan 2025", revenue: 700 },
	{ month: "Feb 2025", revenue: 680 },
	{ month: "Mar 2025", revenue: 740 },
	{ month: "Apr 2025", revenue: 810 },
];

const chartConfig = {
	Revenue_Label: {
		label: "Gross Revenue over last 12",
	},
	revenue: {
		label: "Revenue",
		color: "hsl(31.43, 100%, 51.32%)",
	},
} satisfies ChartConfig;

export function FinancialChart() {
	return (
		<Card className="@container/card">
			<CardHeader className="relative">
				<CardTitle>Gross Revenue </CardTitle>
				<CardDescription>
					<span className="@[540px]/card:block hidden">
						Gross Revenue over last 12 months
					</span>
					<span className="@[540px]/card:hidden">Last 12 months</span>
				</CardDescription>
			</CardHeader>
			<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
				<ChartContainer
					config={chartConfig}
					className="aspect-auto h-[250px] w-full">
					<AreaChart data={chartData}>
						<defs>
							<linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
								<stop
									offset="5%"
									stopColor="var(--color-revenue)"
									stopOpacity={1.0}
								/>
								<stop
									offset="95%"
									stopColor="var(--color-revenue)"
									stopOpacity={0.1}
								/>
							</linearGradient>
						</defs>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="month"
							tickLine={false}
							axisLine={false}
							tickMargin={10}
							minTickGap={38}
							tickFormatter={(value) => value.slice(0, 3)}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator="dot" />}
						/>
						<Area
							dataKey="revenue"
							type="natural"
							fill="url(#fillRevenue)"
							stroke="var(--color-revenue)"
							stackId="a"
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
