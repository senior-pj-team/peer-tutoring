export const getRatingReview = async (
	supabase: TSupabaseClient,
	{
		offset,
		limit,
		tutor_id,
		session_id,
		student_id,
		search = "",
	}: {
		tutor_id?: string;
		offset?: number;
		limit?: number;
		session_id?: number;
		student_id?: string;
		search?: string;
	},
): Promise<TRatingReviewUserViewResult[] | null> => {
	let query = supabase
		.from("rating_review_user_view")
		.select("*")
		.order("created_ago", { ascending: false });

	if (tutor_id) query = query.eq("tutor_id", tutor_id);
	if (session_id) query = query.eq("session_id", session_id);
	if (student_id) query = query.eq("student_id", student_id);

	if (search && search.trim() !== "") {
		query = query.textSearch("search_vector", search, { type: "plain" });
	}

	if (offset != undefined && limit != undefined) {
		query = query.range(offset, offset + limit - 1);
	}

	const { data, error } = await query;

	if (error) {
		console.error("Error fetching rating reviews:", error);
		return null;
	}

	return data as TRatingReviewUserViewResult[];
};
