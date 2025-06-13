export async function getSessionsbyId(
	supabase: TSupabaseClient,
	session_id: number,
): Promise<TSessionsResult | null> {
	const { data, error } = await supabase
		.from("sessions")
		.select("*")
		.eq("id", session_id)
		.single();

	if (!data || error) {
		console.log(
			"getSessionDetail From Sessions Table Data Error: ",
			error?.message,
		);
		return null;
	}
	return (data as TSessionsResult) ?? null;
}
