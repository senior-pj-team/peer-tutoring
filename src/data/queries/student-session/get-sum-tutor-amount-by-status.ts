export async function getSumTutorAmountByStatus(
  supabase: TSupabaseClient,
  { session_id, tutor_id }: { session_id?: number, tutor_id?: string }
): Promise<TAmountByStatuses | null> {
    
  const { data, error } = await supabase.rpc("sum_tutor_amounts_by_status", {
    p_session_id: session_id,
    p_tutor_id: tutor_id
  });

  if (error){
    console.error(error);
    return null;
  }

  return data;
}
