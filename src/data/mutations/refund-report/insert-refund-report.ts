export async function insertRefundReport(
  supabase: TSupabaseClient,
  student_id: string,
  session_id: number,
  ss_id: number,
  reason: string,
  description: string,
  type: TRefund
): Promise<Boolean> {
  const { error } = await supabase.from("refund_report").insert({
    student_id,
    session_id,
    ss_id,
    reason,
    description,
    type,
  });

  if (error) {
    console.log("Error: ", error.message);
    return false;
  }
  return true;
}
