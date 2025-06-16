type Params = {
	user_id: string;
	status?: TNotificationStatus[];
	type?: TNotificationType[];
};

export async function getNotificationCount(
	supabase: TSupabaseClient,
	{ user_id, status, type }: Params,
): Promise<number | null> {
	const count_query = supabase
		.from("notification")
		.select("", { count: "exact", head: true });

	if (user_id) {
		count_query.eq("user_id", user_id);
	}
	if (status) {
		count_query.in("status", status);
	}
	if (type) {
		count_query.in("type", type);
	}

	const { count, error } = await count_query;
	if (error) {
		console.log();
		return null;
	}
	return count || 0;
}
