export const getStudentSession = async (
  supabase: TSupabaseClient,
  {
    student_id,
    session_id,
  }: {
    student_id: string;
    session_id?: number;
  }
): Promise<(TStudentSessionWithSessionName[]) | null> => {
  const query = supabase
    .from("student_session")
    .select(
    `
  		*,
  		session:session_id (
   				 session_name
  		)
	`)
    .eq("student_id", student_id);

  if (session_id) query.eq("session_id", session_id);

  const { data, error } = await query;

  if (error) {
    console.log("Error fetching session info:", error);
    return null;
  }
  return data;
};
