export const getStudentSession = async (
	supabase: TSupabaseClient,
	student_id: string,
	session_id: number,
): Promise<TStudentSessionResult[] | null> => {
	const { data, error } = await supabase
		.from("student_session")
		.select("*")
		.eq("student_id", student_id)
		.eq("session_id", session_id);
	if (error) {
		console.log("Error fetching session info:", error);
		return null;
	}
	return data as TStudentSessionResult[];
};
