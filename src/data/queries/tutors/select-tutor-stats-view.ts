export const selectTutorStats = async (
  tutor_id: string,
  supabase: TSupabaseClient
): Promise<TTutorStatsViewResult> => {
  const { data, error } = await supabase
    .from("tutor_stats_view")
    .select("*")
    .eq("tutor_id", tutor_id)
    .single();
  if (error) {
    console.log("error", error);
    throw error;
  }
  return data;
};
