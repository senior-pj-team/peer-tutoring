import { getUnreadMessageCount } from "@/data/mutations/message/get-unread-message-count";
import { useQuery } from "@tanstack/react-query";

export function useUnreadMessageCount(
	user_id: string,
	enabled: boolean,
	supabase: TSupabaseClient,
) {
	return useQuery({
		queryKey: ["navbar_chat_count", user_id],
		queryFn: async () => await getUnreadMessageCount(supabase, user_id),
		enabled,
		refetchOnWindowFocus: true,
	});
}
