import { TBankInfoSchema } from "@/schema/profile-schema-server";

type Params = {
	user_id: string;
	bankData: TBankInfoSchema;
};

export async function upsertBankInfo(
	supabase: TSupabaseClient,
	{ user_id, bankData }: Params,
): Promise<boolean> {
	const { error } = await supabase.from("bank_info").upsert(
		{
			bank_name: bankData.bank_name,
			account_name: bankData.account_name,
			account_number: bankData.account_number,
			account_type: bankData.account_type,
			user_id,
		},
		{ onConflict: "user_id,account_type" },
	);
	if (error) {
		console.log("Error in upsert bank info: ", error.message);
		return false;
	}
	return true;
}
