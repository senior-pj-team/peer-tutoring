import { useInfiniteQuery } from "@tanstack/react-query";
import { getBankInfoJoinUser } from "@/data/queries/bank-info/get-bank-info-join-user";
import { useSupabase } from "./use-supabase";

const LIMIT = 5;

export const useInfiniteTutorRequests = () =>
	useInfiniteQuery<TBankInfoJoinTutorResult[], Error>({
		queryKey: ["tutor-requests"],
		initialPageParam: 0,
		queryFn: ({ pageParam = 0 }) =>
			fetchTutorRequests({ pageParam: Number(pageParam), LIMIT }),
		getNextPageParam: (lastPage, allPages) =>
			lastPage.length === LIMIT ? allPages.length * LIMIT : undefined,
	});

export async function fetchTutorRequests({
	pageParam,
	LIMIT,
}: {
	pageParam: number;
	LIMIT: number;
}): Promise<TBankInfoJoinTutorResult[]> {
	const supabase = useSupabase();
	const result = await getBankInfoJoinUser(supabase, {
		account_type: ["tutor_transfer", "refund_transfer"],
		tutor_status: ["pending"],
		offset: pageParam,
		limit: LIMIT,
	});
	return result ?? [];
}
