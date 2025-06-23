type Params = {
	student_session_id?: number;
	student_id?: string;
	session_id?: number;
	status?: TStudentSessionStatus[];
};
export const getStudentSessionJoin = async (
	supabase: TSupabaseClient,
	{ student_session_id, student_id, session_id, status }: Params,
): Promise<TStudentSessionJoinResult[] | null> => {
	let query = supabase.from("student_session").select(
		`   
      id,
      session_id,
      student_id,
      amount_from_student,
      stripe_client_secrete,
      ss_status: status,
      sessions (
        image,
        session_name,
        course_code,
        course_name,
        max_students,
        start_time,
        end_time,
        tutor:user (
          id,
          profile_url,
          username,
          tutor_rating
        )
      )
    `,
	);

	if (student_id) query = query.eq("student_id", student_id);
	if (student_session_id) query = query.eq("id", student_session_id);
	if (session_id) query = query.eq("session_id", session_id);
	if (status) query = query.in("status", status);

	const { data, error } = await query;

	if (error) {
		console.log("Error fetching session info:", error);
		return null;
	}
	return (data as unknown as TStudentSessionJoinResult[]) ?? null;
};
