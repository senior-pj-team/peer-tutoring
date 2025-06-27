import React from "react";
import Stepper from "@/components/app/features/tutor-registration/Stepper";
import { getUserSession } from "@/utils/get-user-session";
import GeneralError from "@/components/app/shared/error";
import { getUserById } from "@/data/queries/user/get-user-by-id";
import { createClient } from "@/utils/supabase/server";
import { getBankInfoByUser } from "@/data/queries/bank-info/get-bank-info-by-user";

export default async function BecomeTutorPage() {
	const user = await getUserSession();
	const supabase = await createClient();
	if (!user?.user_id) return <GeneralError />;

	const userData = await getUserById(supabase, user.user_id);
	const bankData = await getBankInfoByUser(supabase, { user_id: user.user_id });

	if (!bankData) {
		return (
			<>
				<GeneralError />
			</>
		);
	}

	return (
		<div className="max-w-2xl mx-auto p-4">
			<Stepper userData={userData} bankData={bankData[0] ?? null} />
		</div>
	);
}
