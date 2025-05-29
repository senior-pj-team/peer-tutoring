export const selectRatingReview = async (
  supabase: TSupabaseClient,
  start: number,
    end: number,
  options?: {
    tutor_id?: string;
  }
): Promise<TRatingReviewUserViewResult[]> => {
  let query = supabase
    .from("rating_review_user_view")
    .select("*")
    .order("created_ago", { ascending: false });
  if (options?.tutor_id) {
    query = query.eq("tutor_id", options.tutor_id);
  }
  query = query.range(start, end);
  const { data, error } = await query;

  if (error) {
    console.error("Error fetching rating reviews:", error);
    throw error;
  }

  return data;
};
