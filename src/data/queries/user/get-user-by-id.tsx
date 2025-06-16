export async function getUserbyId(
	supabase: TSupabaseClient,
	user_id: string,
): Promise<TUserResult | null> {
	const { data, error } = await supabase
		.from("user")
		.select("*")
		.eq("id", user_id)
		.single();

	if (error) {
		console.log("Error in getUserbyId: ", error.message);
		return null;
	}

	return data as TUserResult;
}
