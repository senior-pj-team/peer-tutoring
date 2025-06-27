type Params = {
	session_id?: number;
	tutor_id?: string;
	status?: TSessionStatus[];
};

export async function getSessionsbyId(
	supabase: TSupabaseClient,
	{ session_id, tutor_id, status }: Params,
): Promise<TSessionsResult[] | null> {
	let query = supabase.from("sessions").select("*");

	if (session_id) query = query.eq("id", session_id);
	if (tutor_id) query = query.eq("tutor_id", tutor_id);
	if (status) query = query.in("status", status);
	const { data, error } = await query;
	if (error) {
		console.log(
			"getSessionDetail From Sessions Table Data Error: ",
			error?.message,
		);
		return null;
	}
	return (data as TSessionsResult[]) ?? null;
}
