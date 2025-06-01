export async function getSessionsMatView(
	client: TSupabaseClient,
	{
		search = "",
		tutorRating,
		sessionCategory,
		maxPrice,
		minPrice,
		free,
		paid,
		limit = 5,
		offset = 0,
		tutor_id
	}: TBrowseSessionFilters,
): Promise<TSessionsMatViewResult[] | []> {
	const hasSearch = search.trim().length > 0;

	let query = client.from("session_tutor_mat_view").select("*");

	//filter with tutor_id added by NWYT
	if(tutor_id){
		query= query.eq('tutor->>tutor_id', tutor_id)
	}

	if (hasSearch) {
		query = query.textSearch("document", search, {
			config: "simple",
			type: "websearch",
		});
	}
	if (tutorRating !== undefined)
		query = query.gte("tutor->>tutor_rating", tutorRating);
	if (sessionCategory) query = query.eq("session_category", sessionCategory);
	if (minPrice !== undefined) query = query.gte("price", minPrice);
	if (maxPrice !== undefined) query = query.lte("price", maxPrice);

	const freeBol = Boolean(free);
	const paidBol = Boolean(paid);
	if (freeBol && !paidBol) {
		query = query.or("price.is.null,price.eq.0");
	} else if (paid && !free) {
		query = query.or("price.is.not.null,price.neq.0");
	}
	query = query.range(offset, offset + limit - 1);

	query = query.order("session_id", { ascending: false });

	const { data, error } = await query;
	console.log(data);
	if (error) {
		console.log("GetSessionsMatView Error: ", error.message);
		throw error;
	}

	return (data ?? []) as unknown as TSessionsMatViewResult[];
}
