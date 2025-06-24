type Params = {
	student_session_id?: number;
	student_id?: string;
	session_id?: number;
	status?: TStudentSessionStatus[];
  offset?: number;
  limit?: number;
};
export const getStudentSessionJoin = async (
	supabase: TSupabaseClient,
	{ student_session_id, student_id, session_id, status, offset, limit }: Params,
): Promise<TStudentSessionJoinResult[] | null> => {
	let query = supabase.from("student_session").select(
		`   
      id,
      session_id,
      student_id,
      amount_from_student,
      created_at,
      refunded_amount,
      held_until,
      stripe_client_secrete,
      ss_status: status,
      sessions (
        id,
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
  console.log("offset: ", offset, "limit: ", limit, "student_id: ", student_id);
	if (student_id) query = query.eq("student_id", student_id);
	if (student_session_id) query = query.eq("id", student_session_id);
	if (session_id) query = query.eq("session_id", session_id);
	if (status) query = query.in("status", status);

  if (typeof offset === 'number' && typeof limit === 'number') {
  query = query.range(offset, offset + limit - 1);
}

  query = query.order('created_at', { ascending: false })

	const { data, error } = await query;
	if (error) {
		console.log("Error fetching session info:", error);
		return null;
	}
	return (data as unknown as TStudentSessionJoinResult[]) ?? null;
};
