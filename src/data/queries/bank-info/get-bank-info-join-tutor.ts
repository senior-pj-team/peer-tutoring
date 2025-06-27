type Params = {
	user_id: string;
	account_type?: TBankAccountType[];
};

export async function getBankInfoJoinBank(
	supabase: TSupabaseClient,
	{ user_id, account_type }: Params,
): Promise<TBankInfoJoinTutorResult | null> {
	let query = supabase
		.from("bank_info")
		.select(
			`
           *,
            user(
            profile_url,
            email,
            username,
            school,
            major,
            year,
            bio_highlight,
            biography)
        `,
		)
		.eq("user_id", user_id);

	if (account_type) query = query.in("account_type", account_type);
	const { data, error } = await query;
	if (error) {
		console.log("Error in get bank info: ", error.message);
		return null;
	}

	return data as unknown as TBankInfoJoinTutorResult;
}
