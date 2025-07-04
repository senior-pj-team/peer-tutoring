type Params = {
	bank_name?: string;
	account_name?: string;
	account_number?: string;
	account_type?: TBankAccountType;
};

export async function updateBankInfo(
	supabase: TSupabaseClient,
	bank_id: number,
	user_id: string,
	{ bank_name, account_name, account_number, account_type }: Params,
): Promise<boolean> {
	const updatePayload: Record<string, string> = {};

	if (bank_name !== undefined) updatePayload.bank_name = bank_name;
	if (account_name !== undefined) updatePayload.account_name = account_name;
	if (account_number !== undefined)
		updatePayload.account_number = account_number;
	if (account_type !== undefined) updatePayload.account_type = account_type;

	const { error } = await supabase
		.from("bank_info")
		.update(updatePayload)
		.eq("id", bank_id)
		.eq("user_id", user_id);

	if (error) {
		console.log("Error in updateBankInfo: ", error.message);
		return false;
	}

	return true;
}
