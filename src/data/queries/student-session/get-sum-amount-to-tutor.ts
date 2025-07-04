export async function getSumAmountToTutor(
	supabase: TSupabaseClient,
	session_id: number,
): Promise<TSumAmountToTutor | null> {
	let query = supabase
		.from("student_session")
		.select("session_id, amount_to_tutor.sum()");

	if (session_id)
		query = query
			.eq("session_id", session_id)
			.in("status", ["enrolled", "completed"]);
	const { data, error } = await query;

	if (error) {
		console.log("getSumAmountToTutor error: ", error.message);
		return null;
	}
	console.log(data);

	return data as TSumAmountToTutor;
}
