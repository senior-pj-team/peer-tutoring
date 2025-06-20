type Params = {
	user_id: string;
	type: TNotificationType[];
};

export async function updateNotification(
	supabase: TSupabaseClient,
	{ user_id, type }: Params,
): Promise<boolean> {
	const { error } = await supabase
		.from("notification")
		.update({ status: "read" })
		.eq("user_id", user_id)
		.in("type", type)
		.neq("status", "read");

	if (error) {
		console.log("update notification by id error: ", error.message);
		return false;
	}

	return true;
}
