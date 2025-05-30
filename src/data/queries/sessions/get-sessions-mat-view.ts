export async function getSessionsMatView(
	client: TSupabaseClient,
	{
		search = "",
		tutorRating,
		sessionCategory,
		maxPrice,
		minPrice,
		free = true,
		paid = true,
		limit = 5,
		offset = 0,
		status = ["open"],
	}: TBrowseSessionFilters,
): Promise<TSessionsMatViewResult | null> {
	console.log(
		search,
		tutorRating,
		sessionCategory,
		maxPrice,
		minPrice,
		free,
		paid,
		limit,
		offset,
		status,
	);
	const { data, error } = await client.rpc("select_session_tutor_mat_view", {
		search_text: search,
		tutor_rating: tutorRating,
		categories: sessionCategory,
		max_price: maxPrice,
		min_price: minPrice,
		free_only: free,
		paid_only: paid,
		limit_count: limit,
		offset_count: offset,
		s_status: status,
	});
	if (error) {
		console.log("GetSessionsMatView Error: ", error.message);
	}
	return (data as TSessionsMatViewResult) ?? null;
}
