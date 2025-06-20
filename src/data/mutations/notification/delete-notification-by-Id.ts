export async function deleteNotificationbyId(
	supabase: TSupabaseClient,
	id: number,
): Promise<boolean> {
	const { error } = await supabase.from("notification").delete().eq("id", id);

	if (error) {
		console.log("Delete notification by id error: ", error.message);
		return false;
	}
	
	return true;
}
