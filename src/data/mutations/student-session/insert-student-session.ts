type InsertStudentSessionParams = {
	student_id: string;
	session_id: number;
	status: TStudentSessionStatus;
	amount_from_student: number | null;
	amount_to_tutor: number | null;
	service_fee: number | null;
	held_until: string;
};

export async function insertStudentSession(
	supabase: TSupabaseClient,
	{
		student_id,
		session_id,
		status,
		amount_from_student,
		amount_to_tutor,
		service_fee,
		held_until,
	}: InsertStudentSessionParams,
): Promise<TStudentSessionResult | null> {
	const { data, error } = await supabase
		.from("student_session")
		.insert({
			session_id,
			student_id,
			status,
			amount_from_student,
			amount_to_tutor,
			service_fees: service_fee,
			held_until,
		})
		.select();

	if (error) {
		console.log("Insert student session error: ", error.message);
		return null;
	}

	return (data[0] as TStudentSessionResult) ?? null;
}
