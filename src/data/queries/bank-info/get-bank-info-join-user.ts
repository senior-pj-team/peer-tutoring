type Params = {
	user_id?: string;
	account_type?: TBankAccountType[];
	tutor_status?: TTutorStatus[];
	offset?: number;
	limit?: number;
};

export async function getBankInfoJoinUser(
	supabase: TSupabaseClient,
	{ user_id, account_type, tutor_status, offset, limit }: Params,
): Promise<TBankInfoJoinTutorResult[] | null> {
	let query = supabase.from("bank_info").select(
		`
           *,
            user!inner(
            *)
        `,
	);

	if (user_id) query = query.eq("user_id", user_id);
	if (account_type) query = query.in("account_type", account_type);
	if (tutor_status) query = query.in("user.tutor_status", tutor_status);

	if (offset != undefined && limit != undefined)
		query = query.range(offset, offset + limit - 1);

	console.log(query);

	const { data, error } = await query;

	if (error) {
		console.log("Error in get bank info: ", error.message);
		return null;
	}
	console.log(user_id, account_type, tutor_status, limit, offset, data);
	return data;
}
