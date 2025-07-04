export async function getTutorMonthlyPaidSum(
	supabase: TSupabaseClient,
	tutor_id: string,
): Promise<TTutorMonthlyPaidSum | null> {
	const { data, error } = await supabase.rpc("get_monthly_tutor_amounts_paid", {
		p_tutor_id: tutor_id,
	});

	if (error) {
		console.log("Error in get tutor session stats: ", error);
		return null;
	}

	return data as TTutorMonthlyPaidSum;
}
