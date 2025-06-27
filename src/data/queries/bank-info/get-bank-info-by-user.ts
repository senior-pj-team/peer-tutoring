type Params = {
	user_id: string;
	account_type?: TBankAccountType[];
};

export async function getBankInfoByUser(
	supabase: TSupabaseClient,
	{ user_id, account_type }: Params,
): Promise<TBankInfoResult[] | null> {
	let query = supabase.from("bank_info").select("*").eq("user_id", user_id);

	if (account_type) query = query.in("account_type", account_type);
	const { data, error } = await query;
	if (error) {
		console.log("Error in get bank info: ", error.message);
		return null;
	}

	return (data as TBankInfoResult[]) ?? null;
}
