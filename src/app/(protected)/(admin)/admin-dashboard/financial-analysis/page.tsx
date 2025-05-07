"use client"
import { useState } from 'react'
import React from 'react'

import FinancialStatsCard from '@/components/custom/shared/financial-card'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { FinancialChart } from "@/components/custom/features/tutor-dashboard/financial/financial-stats-chart";

const page = () => {
    const [period, setPeriod] = useState<string>("all time");
    return (
        <div>
            <div className="flex flex-col gap-4 mb-3">
                <h1 className="text-2xl font-bold">Financial Analysis</h1>
                <p className="text-sm text-muted-foreground">
                    Analyze your financial data and make informed decisions.
                </p>
            </div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
                <FinancialStatsCard
                    title="Gross Revenue"
                    stats={7880}
                    period={period}
                    statsPercent={76}
                />
                <FinancialStatsCard
                    title="Platform Earnings"
                    stats={7880}
                    period={period}
                    statsPercent={76}
                /><FinancialStatsCard
                    title="Refunds"
                    stats={7880}
                    period={period}
                    statsPercent={76}
                /><FinancialStatsCard
                    title="Holding Funds"
                    stats={7880}
                    period={period}
                    statsPercent={76}
                />
            </div>
            <FinancialChart isAdmin={true} />
        </div>
    )
}

export default page