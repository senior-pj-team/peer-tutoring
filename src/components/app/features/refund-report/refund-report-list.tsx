"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { getRefundReportJoin } from "@/data/queries/refund-and-report/get-refund-report-join";
import { Ban } from "lucide-react";
import { useSupabase } from "@/hooks/use-supabase";
import RefundReportCard from "./refund-report-card";
import GeneralLoading from "../../shared/general-loading";

export default function RefundReportList({
	session_id,
	qKey,
	status,
	type,
}: {
	session_id?: number;
	qKey: string;
	status: TRefundStatus[];
	type: TRefundType[];
}) {
	const supabase = useSupabase();
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isLoading,
		isFetchingNextPage,
		isError,
	} = useInfiniteQuery({
		queryKey: [qKey, type, status, session_id],
		queryFn: async ({ pageParam = 0 }) =>
			await getRefundReportJoin(supabase, {
				status,
				type,
				session_id,
				offset: pageParam * 5,
				limit: 5,
			}),
		initialPageParam: 0,
		getNextPageParam: (lastPage, allPages) =>
			Array.isArray(lastPage) && lastPage.length === 5
				? allPages.length + 1
				: undefined,
	});

	const results = data?.pages.flat() || [];

	if (isLoading)
		return (
			<div className="w-full">
				<GeneralLoading />
			</div>
		);
	if (isError)
		return <p>Something went wrong while loading refund requests.</p>;

	return (
		<div className="space-y-4">
			{results.length > 0 ? (
				<>
					{results.map((result) =>
						result ? <RefundReportCard data={result} key={result.id} /> : null,
					)}
					{hasNextPage && (
						<div className="text-center">
							<Button
								variant="outline"
								onClick={() => fetchNextPage()}
								disabled={isFetchingNextPage}>
								{isFetchingNextPage ? "Loading..." : "Show More"}
							</Button>
						</div>
					)}
				</>
			) : (
				<div className="flex flex-col items-center justify-center mt-[10rem] text-center text-gray-500">
					<Ban className="w-12 h-12 mb-4 text-gray-400" />
					<p className="text-lg font-medium">No data found</p>
					<p className="text-sm text-gray-400">
						There are currently no refund and report
					</p>
				</div>
			)}
		</div>
	);
}
