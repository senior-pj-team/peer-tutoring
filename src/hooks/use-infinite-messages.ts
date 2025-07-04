import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchMessage, LIMIT } from "@/utils/app/fetch-messages";
import { useSupabase } from "./use-supabase";

export const useInfiniteMessage = ({ chatId }: { chatId: string }) => {
	const supabase = useSupabase();
	return useInfiniteQuery({
		queryKey: ["chat-messages", chatId],
		queryFn: async ({ pageParam = 0 }) =>
			fetchMessage({ pageParam, chatId, supabase }),
		getNextPageParam: (lastPage, allPages) => {
			if (!lastPage || lastPage.length < LIMIT) return undefined;
			return allPages.length * 10;
		},
		initialPageParam: 0,
	});
};
