export async function updateNotification(
	supabase: TSupabaseClient,
	user_id: string,
): Promise<boolean> {
	const { error } = await supabase
		.from("notification")
		.update({ status: "read" })
		.eq("user_id", user_id)
		.neq("status", "read");

	if (error) {
		console.log("update notification by id error: ", error.message);
		return false;
	}

	return true;
}
