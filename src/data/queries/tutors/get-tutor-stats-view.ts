export const getTutorStats = async (
  tutor_id: string,
  supabase: TSupabaseClient
): Promise<TTutorStats | null> => {
  const { data, error } = await supabase.rpc('get_tutor_stats', { p_tutor_id: tutor_id });
  if (error) {
    console.log("error", error);
    return  null;
  }
  return data as TTutorStats;
};
