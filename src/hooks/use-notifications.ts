import { deleteNotificationbyId } from "@/data/mutations/notification/delete-notification-by-Id";
import { getNotificationByUser } from "@/data/queries/notification/get-notification-by-user";
import { QueryKey, useInfiniteQuery, useMutation } from "@tanstack/react-query";

const LIMIT = 3;

async function fetchNotifications({
	pageParam,
	user_id,
	type,
	supabase,
}: {
	pageParam: number;
	user_id: string;
	type: TNotificationType[];
	supabase: TSupabaseClient;
}) {
	const data = await getNotificationByUser(supabase, {
		offset: pageParam,
		limit: LIMIT,
		user_id,
		type,
	});
	if (!data) throw new Error("Error fetching");

	return data;
}

export function useNotifications(
	key: string,
	user_id: string,
	type: TNotificationType[],
	count: number,
	supabase: TSupabaseClient,
) {
	return useInfiniteQuery({
		queryKey: [key, user_id, type],
		queryFn: ({ pageParam = 0 }) =>
			fetchNotifications({ pageParam, user_id, type, supabase }),
		initialPageParam: 0,
		getNextPageParam: (_, allPages) => {
			return count - allPages.length * LIMIT > 0
				? allPages.length * LIMIT
				: undefined;
		},
	});
}

export function useDeleteNotification(
	key: string,
	user_id: string,
	type: TNotificationType[],
	supabase: TSupabaseClient,
) {
	return useMutation({
		mutationFn: async (id: number) => {
			const delete_noti_result = await deleteNotificationbyId(supabase, id);
			if (!delete_noti_result) {
				throw Error("delete notification error");
			}
		},
	});
}
