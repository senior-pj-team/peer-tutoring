export const getStudentSessionJoinById = async (
	supabase: TSupabaseClient,
	student_session_id: number,
): Promise<TStudentSessionJoinByIdResult | null> => {
	const query = supabase.from("student_session").select(`
    *,
    sessions(
      *,
      tutor:user(
        id,
        profile_url,
        username,
        school,
        major,
        tutor_rating
      )
    )
  `);

	if (student_session_id) query.eq("id", student_session_id).single();

	const { data, error } = await query;

	if (error) {
		console.log("Error fetching session info:", error);
		return null;
	}
	return data as unknown as TStudentSessionJoinByIdResult;
};
