import { getSessionsJoin } from "@/data/queries/sessions/get-sessions-join";
import { useInfiniteQuery } from "@tanstack/react-query";

export function UseSessionsJoinInifiniteQuery({
	key,
	supabase,
	status,
	dateFilterCol,
	start,
	end,
	limit,
}: {
	key: string;
	supabase: TSupabaseClient;
	status: TSessionStatus[];
	dateFilterCol?: string;
	start?: string;
	end?: string;
	limit?: number;
}) {
	return useInfiniteQuery({
		queryKey: [key, status, start, end],
		queryFn: async ({ pageParam = 0 }) => {
			const result = await getSessionsJoin(supabase, {
				order_by: "held_until",
				status,
				dateFilterCol,
				start,
				end,
				offset: pageParam,
				limit: limit,
			});
			if (!result) throw Error("pending transfer error");
			return result;
		},
		initialPageParam: 0,
		getNextPageParam: (lastPage, allPages) => {
			const limitValue = limit ?? 10;

			if (!Array.isArray(lastPage) || lastPage.length < limitValue) {
				return undefined;
			}

			return allPages.length * limitValue;
		},
	});
}
