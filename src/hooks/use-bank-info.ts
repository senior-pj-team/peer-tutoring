import { getBankInfoByUser } from "@/data/queries/bank-info/get-bank-info-by-user";
import { useQuery } from "@tanstack/react-query";

export function useBankInfoQuery(
	supabase: TSupabaseClient,
	user_id: string,
	account_type: TBankAccountType[],
	enabled: boolean,
) {
	return useQuery({
		queryKey: ["bank_info", user_id, account_type],
		queryFn: async () => {
			const bankInfo = await getBankInfoByUser(supabase, {
				user_id: user_id,
				account_type: account_type,
			});
			if (!bankInfo) throw Error("user bank info fetching Error");
			return bankInfo;
		},
		enabled,
	});
}
