export const getRatingStats = async (
	supabase: TSupabaseClient,
	{ tutor_id }: { tutor_id: string },
): Promise<TRatingStat[] | null> => {
	const { data, error } = await supabase.rpc("get_rating_stats", {
		tid: tutor_id,
	});

	if (error) {
		console.log("Failed to fetch rating stats", error);
		return null;
	}

	return data as TRatingStat[];
};
