import { deleteNotificationbyId } from "@/data/mutations/notification/delete-notification-by-Id";
import { updateNotification } from "@/data/mutations/notification/update-notification";
import { getNotificationByUser } from "@/data/queries/notification/get-notification-by-user";
import {
	InfiniteData,
	useInfiniteQuery,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";

const LIMIT = 15;

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
	q_key: string,
	user_id: string,
	type: TNotificationType[],
	count: number,
	supabase: TSupabaseClient,
) {
	return useInfiniteQuery({
		queryKey: [q_key, user_id, type],
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
	q_key: string,
	user_id: string,
	type: TNotificationType[],
	supabase: TSupabaseClient,
) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: number) => {
			const delete_noti_result = await deleteNotificationbyId(supabase, id);
			if (!delete_noti_result) {
				throw Error("delete notification error");
			}
		},
		onMutate: async (id: number) => {
			await queryClient.cancelQueries({ queryKey: [q_key, user_id, type] });
			const previousData = queryClient.getQueryData<
				InfiniteData<TNotificationResult[]>
			>([q_key, user_id, type]);

			queryClient.setQueryData<InfiniteData<TNotificationResult[]>>(
				[q_key, user_id, type],
				(old) => {
					if (!old) return old;
					return {
						pageParams: old.pageParams,
						pages: old.pages.map((page) =>
							page.filter((noti) => {
								console.log(noti.id, id);
								return id !== noti.id;
							}),
						),
					};
				},
			);

			return { previousData };
		},

		onError: (_, __, context) => {
			if (context?.previousData) {
				queryClient.setQueryData([q_key, user_id, type], context.previousData);
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: [q_key, user_id, type] });
		},
	});
}

export function useMarkAsAllRead(
	q_key: string,
	user_id: string,
	type: TNotificationType[],
	supabase: TSupabaseClient,
) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async () => {
			const update_noti_result = await updateNotification(supabase, user_id);
			if (!update_noti_result) {
				throw Error("delete notification error");
			}
		},
		onMutate: async (status: TNotificationStatus) => {
			await queryClient.cancelQueries({ queryKey: [q_key, user_id, type] });
			const previousData = queryClient.getQueryData<
				InfiniteData<TNotificationResult>
			>([q_key, user_id, type]);

			queryClient.setQueryData<InfiniteData<TNotificationResult[]>>(
				[q_key, user_id, type],
				(old) => {
					if (!old) return old;
					return {
						pageParams: old.pageParams,
						pages: old.pages.map((page) =>
							page.map((noti) => {
								return {
									...noti,
									status,
								};
							}),
						),
					};
				},
			);

			return { previousData };
		},

		onError: (_, __, context) => {
			if (context?.previousData) {
				queryClient.setQueryData([q_key, user_id, type], context.previousData);
			}
		},

		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: [q_key, user_id, type] });
		},
	});
}
