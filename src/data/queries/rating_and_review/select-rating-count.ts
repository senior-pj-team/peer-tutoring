export const selectRatingStats = async (
  supabase: TSupabaseClient,
  { tutor_id }: { tutor_id: string }
): Promise<TRatingStat[]> => {
  const { data, error } = await supabase.rpc("get_rating_stats", {
    tid: tutor_id,
  });

  if (error) {
    console.error("Failed to fetch rating stats", error);
    return [];
  }

  return data as TRatingStat[];
};
