import { getUserSession } from "@/utils/get-user-session";
import { BankForm } from "./bank-form";
import GeneralError from "../../shared/error";
import { createClient } from "@/utils/supabase/server";
import { getBankInfoByUser } from "@/data/queries/bank-info/get-bank-info-by-user";

export async function BankFormServer() {
	const user = await getUserSession();
	if (!user) {
		return (
			<>
				<GeneralError />
			</>
		);
	}
	const supabase = await createClient();
	const bankInfo = await getBankInfoByUser(supabase, user.user_id);
	return (
		<>
			<BankForm bankInfo={bankInfo} />
		</>
	);
}
