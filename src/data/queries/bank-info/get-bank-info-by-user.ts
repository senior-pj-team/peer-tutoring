export async function getBankInfoByUser(
	supabase: TSupabaseClient,
	user_id: string,
): Promise<TBankInfoResult | null> {
	const { data, error } = await supabase
		.from("bank_info")
		.select("*")
		.eq("user_id", user_id)
		.single();

	if (error) {
		console.log("Error in get bank info: ", error.message);
		return null;
	}

	return (data as TBankInfoResult) ?? null;
}
