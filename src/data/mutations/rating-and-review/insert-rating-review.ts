export async function insertRatingReview(
	ss_id: number,

	rating: number,
	review: string,
	supabase: TSupabaseClient,
): Promise<Boolean> {
	const { error } = await supabase.from("rating_and_review").insert({
		ss_id,
		rating,
		review,
	});

	if (error) {
		console.log("Error updated: ", error.message);
		return false;
	}
	return true;
}
