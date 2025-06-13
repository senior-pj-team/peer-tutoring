type TBrowseSessionFilters = {
	search?: string;
	tutorRating?: number;
	sessionCategory?: string[];
	maxPrice?: number;
	minPrice?: number;
	free?: boolean;
	paid?: boolean;
	limit?: number;
	offset?: number;
	tutorId?: string;
	status?: TSessionStatus[];
};

export async function getSessionsMatView(
	client: TSupabaseClient,
	{
		search = "",
		tutorRating,
		tutorId,
		sessionCategory,
		maxPrice,
		minPrice,
		free = true,
		paid = true,
		limit = 5,
		offset = 0,
		status,
	}: TBrowseSessionFilters,
): Promise<TSelectSessionsMatViewResult | null> {
	const { data, error } = await client.rpc("select_session_tutor_mat_view", {
		search_text: search,
		tutor_rating: tutorRating,
		tutor_id: tutorId,
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
		return null;
	}
	return (data as TSelectSessionsMatViewResult) ?? null;
}
