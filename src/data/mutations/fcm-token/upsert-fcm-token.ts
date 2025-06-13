type Params = {
	user_id: string;
	fcm_token: string;
};

export async function upsertFcmToken(
	supabase: TSupabaseClient,
	{ user_id, fcm_token }: Params,
): Promise<boolean> {
	const { error } = await supabase
		.from("fcm_token")
		.upsert({ fcm_token, user_id }, { onConflict: "user_id" });

	if (error) {
		console.log("upsert fcm_token in fcm_token error: ", error.message);
		return false;
	}
	return true;
}
