type Params = {
	session_id?: number;
	student_id?: string;
	student_session_id?: number;
	ss_status?: Database["public"]["Enums"]["student_session_status"][];
};

export async function getEnrollmentCount(
	supabase: TSupabaseClient,
	{ session_id, student_id, student_session_id, ss_status }: Params,
): Promise<number | null> {
	let query = supabase
		.from("student_session")
		.select("", { count: "exact", head: true });

	if (session_id) query = query.eq("session_id", session_id);
	if (student_id) query = query.eq("student_id", student_id);
	if (student_session_id) query = query.eq("id", student_session_id);
	if (ss_status) query = query.in("status", ss_status);

	const { count, error } = await query;

	if (error) {
		console.log("getSessionDetail Count Error: ", error?.message);
		return null;
	}
	return count || 0;
}
