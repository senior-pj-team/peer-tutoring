export const getStudentSessionJoin = async (
  supabase: TSupabaseClient,
  student_id: string,
  status: TStudentSessionStatus[]
) :Promise<TStudentSessionJoinResult[] | null> => {
  const { data, error } = await supabase
    .from('student_session')
    .select(`
      session_id,
      student_id,
      ss_status: status,
      sessions (
        image,
        session_name,
        course_code,
        course_name,
        start_time,
        end_time,
        tutor:user (
          tutor_id: id,
          profile_url,
          username,
          tutor_rating
        )
      )
    `)
    .eq('student_id', student_id)
    .in('status', status);
  if (error) {
    console.error('Error fetching session info:', error);
    return null
  }
  return data as TStudentSessionJoinResult[]
};
