export const selectStudentSession = async (
  status: string[],
  user: UserSession,
  supabase: TSupabaseClient
): Promise<TStudentSessionViewCardResult[]> => {
  const { data, error } = await supabase
    .from("student_session_view")
    .select(`
      session_id,
      image,
      session_name,
      course_code,
      course_name,
      start_time,
      end_time,
      tutor,
      ss
    `)
    .eq("student_id", user.user_id)
    .in("ss->>status", status);

  if (error) {
    console.log("error", error);
    
    throw error;
  }

  return data ?? [];
};

