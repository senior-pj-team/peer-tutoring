type Params = {
	student_id?: string;
	type?: TRefundType[];
	status?: TRefundStatus[];
};
export async function getRefundReportJoin(
	supabase: TSupabaseClient,
	{ student_id, type, status }: Params,
): Promise<TRefundReportJoinResult[] | null> {
	let query = supabase.from("refund_report").select(`*,
    student_session!inner (
      student_id,
      ss_status: status,
      session:sessions (
        image,
        session_name,
        course_code,
        course_name,
        max_students,
        start_time,
        end_time,
        tutor: user (
          id,
          profile_url,
          username,
          tutor_rating
        )
      )
    )`);
	if (student_id) query = query.eq("student_session.student_id", student_id);
	if (type) query = query.in("type", type);
	if (status) query = query.in("status", status);

	const { data, error } = await query;
	if (error) {
		console.log("Get refund report join error: ", error.message);
		return null;
	}
	return data as unknown as TRefundReportJoinResult[];
}
