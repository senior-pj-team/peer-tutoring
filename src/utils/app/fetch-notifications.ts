import { getNotificationByUser } from "@/data/queries/notification/get-notification-by-user";

export async function fetchNotifications({
	pageParam,
	limit,
	user_id,
	status,
	type,
	supabase,
}: {
	pageParam?: number;
	limit?: number;
	user_id: string;
	status?: TNotificationStatus[];
	type: TNotificationType[];
	supabase: TSupabaseClient;
}) {
	const data = await getNotificationByUser(supabase, {
		offset: pageParam,
		status,
		limit,
		user_id,
		type,
	});
	if (!data) throw new Error("Error fetching");

	return data;
}
