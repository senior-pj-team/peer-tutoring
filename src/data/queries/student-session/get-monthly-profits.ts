export async function getMonthlyProfits(
	supabase: TSupabaseClient,
): Promise<TMonthlyProfits | null> {
	const { data, error } = await supabase.rpc("get_monthly_profits");

	if (error || data.length < 1) {
		console.log("Error in get monthly profits: ", error);
		return null;
	}

	return data;
}
