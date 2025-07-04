type Params = {
	session_id?: number;
	start_date?: string;
	end_date?: string;
};

export async function getamountSummaries(
	supabase: TSupabaseClient,
	{ session_id, start_date, end_date }: Params,
): Promise<TAmountSummaries | null> {
	const { data, error } = await supabase.rpc("get_amount_summaries", {
		p_session_id: session_id,
		p_start_date: start_date,
		p_end_date: end_date,
	});
	if (error) {
		console.log("Error in get ammount summaries: ", error);
		return null;
	}

	return data as TAmountSummaries;
}
