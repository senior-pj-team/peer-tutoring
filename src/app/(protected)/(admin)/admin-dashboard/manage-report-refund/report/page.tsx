import RefundReportList from "@/components/app/features/refund-report/refund-report-list";

import { getRefundReportJoin } from "@/data/queries/refund-and-report/get-refund-report-join";
import { createClient } from "@/utils/supabase/server";
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";
import React from "react";
export default async function ReportPage() {
	const queryClient = new QueryClient();
	const supabase = await createClient();

	await queryClient.prefetchInfiniteQuery({
		queryKey: [
			"refund-report",
			["report", "refund and report"],
			["pending"],
			undefined,
		],
		queryFn: async ({ pageParam = 0 }) =>
			await getRefundReportJoin(supabase, {
				status: ["pending"],
				type: ["report", "refund and report"],
				offset: pageParam,
				limit: 5,
			}),
		getNextPageParam: (
			lastPage: TRefundReportJoinResult[] | null,
			allPages: (TRefundReportJoinResult[] | null)[],
		) => (lastPage && lastPage.length === 5 ? allPages.length * 5 : undefined),
		initialPageParam: 0,
	});
	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<div className="space-y-6 px-4 lg:px-6">
				<h1 className="text-xl font-semibold">Pending Reports</h1>
				<div className="grid gap-4">
					<RefundReportList
						qKey="refund-report"
						status={["pending"]}
						type={["report", "refund and report"]}
					/>
				</div>
			</div>
		</HydrationBoundary>
	);
}
