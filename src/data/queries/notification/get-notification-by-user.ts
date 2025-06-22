type Params = {
	offset?: number;
	limit?: number;
	user_id: string;
	status?: TNotificationStatus[];
	type?: TNotificationType[];
};

export async function getNotificationByUser(
	supabase: TSupabaseClient,
	{ offset, limit, user_id, status, type }: Params,
): Promise<TNotificationResult[] | null> {
	const query = supabase.from("notification").select("*");

	if (user_id) {
		query.eq("user_id", user_id);
	}
	if (status) {
		query.in("status", status);
	}
	if (type) {
		query.in("type", type);
	}

	if (offset && limit) query.range(offset, offset + limit - 1);

	const { data, error } = await query.order("created_at", { ascending: false });

	if (error) {
		return null;
	}

	return data as TNotificationResult[];
}
