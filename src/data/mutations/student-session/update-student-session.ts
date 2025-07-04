export async function updateStudentSession(
	supabase: TSupabaseClient,
	ss_id: number[],
	toUpdate: { [key: string]: any },
): Promise<boolean> {
	const { error } = await supabase
		.from("student_session")
		.update(toUpdate)
		.in("id", ss_id);

	if (error) {
		console.log("update status in student session error: ", error.message);
		return false;
	}
	return true;
}
