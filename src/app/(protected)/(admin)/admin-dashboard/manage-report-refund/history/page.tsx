// app/(your-page)/page.tsx
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/server";
import { getRefundReportJoin } from "@/data/queries/refund-and-report/get-refund-report-join";
import RefundReportList from "@/components/app/features/refund-report/refund-report-list";

export default async function Page() {
	const queryClient = new QueryClient();
	const supabase = await createClient();

	await queryClient.prefetchInfiniteQuery({
		queryKey: [
			"refund-report",
			["refund", "refund and report", "report"],
			["approved", "rejected"],
			undefined,
		],
		queryFn: async ({ pageParam = 0 }) =>
			await getRefundReportJoin(supabase, {
				status: ["approved", "rejected"],
				offset: pageParam,
				limit: 5,
			}),

		initialPageParam: 0,
	});
	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<div className="space-y-6 px-4 lg:px-6">
				<h1 className="text-xl font-semibold">
					Report and Refund Report History
				</h1>
				<div className="grid gap-4">
					<RefundReportList
						qKey="refund-report"
						status={["approved", "rejected"]}
						type={["refund", "refund and report", "report"]}
					/>
				</div>
			</div>
		</HydrationBoundary>
	);
}
