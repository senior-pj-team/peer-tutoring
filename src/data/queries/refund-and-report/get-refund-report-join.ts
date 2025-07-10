type Params = {
	student_id?: string;
	session_id?: number;
	type?: TRefundType[];
	status?: TRefundStatus[];
	offset?: number;
	limit?: number;
};
export async function getRefundReportJoin(
	supabase: TSupabaseClient,
	{ student_id, session_id, type, status, offset, limit }: Params,
): Promise<TRefundReportJoinResult[] | null> {
	let query = supabase.from("refund_report").select(`*,
    student_session!inner (
      id,
      student_id,
      ss_status: status,
      amount_from_stripe,
      student: user!inner(
          id,
          profile_url,
          username,
          tutor_rating,
          email
      ),
      session:sessions!inner(
        id,
        image,
        session_name,
        course_code,
        course_name,
        max_students,
        start_time,
        end_time,
        tutor: user!inner(
          id,
          profile_url,
          username,
          tutor_rating,
          email
        )
      )
    )`);
	if (student_id) query = query.eq("student_session.student_id", student_id);
	if (session_id) query = query.eq("student_session.sessions.id", session_id);
	if (type) query = query.in("type", type);
	if (status) query = query.in("status", status);

	if (offset != undefined && limit != undefined)
		query = query.range(offset, offset + limit - 1);

	const { data, error } = await query;
	if (error) {
		console.log("Get refund report join error: ", error.message);
		return null;
	}
	return data as unknown as TRefundReportJoinResult[];
}
