export async function getUserById(
	supabase: TSupabaseClient,
	userId: string
): Promise<TUser | null> {
	const { data, error } = await supabase
		.from("user")
		.select("*")
		.eq("id", userId)
		.single();

	if (error) {
		console.error("Error fetching user:", error.message);
		return null;
	}
	return data;
}