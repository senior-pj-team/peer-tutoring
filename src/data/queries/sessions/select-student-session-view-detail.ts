export async function selectStudentSessionDetail(
  session_id: number,
  user_id: string,
  supabase: TSupabaseClient
): Promise<TStudentSessionViewDetailResult> {
  const { data, error } = await supabase
    .from("student_session_view")
    .select("*")
    .eq("session_id", session_id)
    .eq("student_id", user_id)
    .single();

  if (error || !data) {
    throw error ?? new Error("Session detail not found");
  }
    const { count, error: countError } = await supabase
    .from("student_session_view")
    .select("", { count: "exact", head: true })
    .eq("session_id", session_id)
    .in("ss->>status", ["enrolled", "pending_refund"]);

  if (countError) {
    throw countError;
  }
  const returnCount= (count || 0) + 1;

  return {
    ...data,
    enrolled_students: returnCount
  };
}
