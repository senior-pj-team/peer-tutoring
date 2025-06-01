export const selectRatingReview = async (
  supabase: TSupabaseClient,
  {
    offset,
    limit,
    tutor_id
  }: {
    tutor_id?: string, 
    offset?: number,
    limit?: number,
  }
): Promise<TRatingReviewUserViewResult[]> => {
  let query = supabase
    .from("rating_review_user_view")
    .select("*")
    .order("created_ago", { ascending: false });
  if (tutor_id) query = query.eq("tutor_id", tutor_id);
  if(offset != undefined && limit != undefined) query = query.range(offset, offset + limit - 1);
  const { data, error } = await query;

  if (error) {
    console.error("Error fetching rating reviews:", error);
    throw error;
  }

  return data;
};
