export async function deleteStudentSession(
	supabase: TSupabaseClient,
	student_session_id: number,
): Promise<boolean> {
	const { error } = await supabase
		.from("student_session")
		.delete()
		.eq("id", student_session_id);
	if (error) {
		console.log("delete student session error: ", error.message);
		return false;
	}
	return true;
}
