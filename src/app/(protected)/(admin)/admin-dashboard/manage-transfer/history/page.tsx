import React from "react";
import { TransferList } from "@/components/app/features/admin/transfer/transfer-list";
import { getQueryClient } from "@/utils/app/get-query-client";
import { createClient } from "@/utils/supabase/server";
import { getSessionsJoin } from "@/data/queries/sessions/get-sessions-join";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function page() {
	const queryClient = getQueryClient();
	const supabase = await createClient();

	queryClient.prefetchInfiniteQuery({
		queryKey: ["sessions_join", ["archived"], undefined, undefined],
		queryFn: async ({ pageParam = 0 }) => {
			const result = await getSessionsJoin(supabase, {
				order_by: "held_until",
				status: ["archived"],
				dateFilterCol: "held_until",
				start: undefined,
				end: undefined,
				offset: pageParam,
				limit: 10,
			});
			if (!result) throw Error("pending transfer error");
			return result;
		},
		initialPageParam: 0,
	});
	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<TransferList status={["archived"]} />
		</HydrationBoundary>
	);
}
