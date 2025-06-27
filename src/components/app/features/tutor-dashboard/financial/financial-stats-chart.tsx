"use client";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { format, parseISO } from "date-fns";
const chartConfig = {
	Revenue_Label: {
		label: "Gross Revenue over last 12",
	},
	revenue: {
		label: "Revenue",
		color: "hsl(31.43, 100%, 51.32%)",
	},
} satisfies ChartConfig;

export function FinancialStatsChart({
	chartData,
}: {
	chartData: TTutorMonthlyPaidSum;
}) {
	return (
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
					tickFormatter={(value) => format(parseISO(value), "MMM")}
				/>
				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent indicator="dot" />}
				/>
				<Area
					dataKey="total"
					type="natural"
					fill="url(#fillRevenue)"
					stroke="var(--color-revenue)"
					stackId="a"
				/>
			</AreaChart>
		</ChartContainer>
	);
}
