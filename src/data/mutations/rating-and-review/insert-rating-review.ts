export async function insertRatingReview(
  ss_id: number,
  student_id: string,
  session_id: number,
  rating: number,
  review: string,
  supabase: TSupabaseClient
): Promise<Boolean> {
  const { data, error } = await supabase.from("rating_and_review").insert({
    session_id,
    ss_id,
    rating,
    review,
    student_id,
  });

  if (error) {
    console.log("Error updated: ", error.message);
    return false;
  }
  return true;
}
