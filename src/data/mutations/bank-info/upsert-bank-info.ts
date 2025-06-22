import { TBankInfoSchema } from "@/schema/profile-schema-server";

type Params = {
	user_id: string;
	bankData: TBankInfoSchema ;
	account_type: TBankAccountType;
	onConflict?: string
};

export async function upsertBankInfo(
	supabase: TSupabaseClient,
	{ user_id, bankData, account_type, onConflict="user_id, account_type" }: Params,
): Promise<boolean> {
	const { error } = await supabase.from("bank_info").upsert(
		{
			bank_name: bankData.bank_name,
			account_name: bankData.account_name,
			account_number: bankData.account_number,
			account_type,
			user_id,
		},
		{ onConflict: onConflict },
	);
	if (error) {
		console.log("Error in upsert bank info: ", error.message);
		return false;
	}
	return true;
}
