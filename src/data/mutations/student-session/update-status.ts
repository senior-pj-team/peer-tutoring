type Params = {
	student_session_id: number;
	ss_status?: TStudentSessionStatus;
};

export async function updateStudentSessionStatus(
	supabase: TSupabaseClient,
	{ student_session_id, ss_status }: Params,
): Promise<boolean> {
	const { error } = await supabase
		.from("student_session")
		.update({ status: ss_status })
		.eq("id", student_session_id);

	if (error) {
		console.log("update status in student session error: ", error.message);
		return false;
	}
	return true;
}
