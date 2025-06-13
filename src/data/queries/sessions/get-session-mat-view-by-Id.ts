export async function getSessionMatViewbyId(
	supabase: TSupabaseClient,
	session_id: number,
): Promise<TSessionsMatViewResultRow | null> {
	const { data, error } = await supabase
		.from("session_tutor_mat_view")
		.select("*")
		.eq("session_id", session_id)
		.single();

	if (!data || error) {
		console.log("getSessionDetail Data Error: ", error?.message);
		return null;
	}
	return (data as TSessionsMatViewResultRow) ?? null;
}
