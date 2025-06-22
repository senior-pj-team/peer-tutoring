type Params = {
	p_min_rating?: number;
	p_filter_tutor_id?: string;
};

export const getTutorWithStats = async (
	supabase: TSupabaseClient,
	{ p_min_rating, p_filter_tutor_id }: Params,
): Promise<TTutorWithStatsResult | null> => {
	const { data, error } = await supabase.rpc("get_tutors_with_stats", {
		p_min_rating,
		p_filter_tutor_id,
	});
	if (error) {
		console.log("error", error);
		return null;
	}
	return data as TTutorWithStatsResult;
};
