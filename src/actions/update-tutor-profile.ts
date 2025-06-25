"use server";

import { upsertBankInfo } from "@/data/mutations/bank-info/upsert-bank-info";
import { getUserById } from "@/data/queries/user/get-user-by-id";
import {
	TTutorProfileSchema,
	tutorProfileSchema,
} from "@/schema/tutor-profile-schema";
import { getUserSession } from "@/utils/get-user-session";
import { createClient } from "@/utils/supabase/server";
import { updateTutor } from "@/data/mutations/tutor/update-tutor";

export async function updateTutorProfile(
	values: TTutorProfileSchema,
): Promise<ActionResponseType<any>> {
	const validatedResult = tutorProfileSchema.safeParse(values);
	if (!validatedResult.success) {
		const fieldErrors = validatedResult.error.flatten().fieldErrors;
		const firstFieldErrors =
			Object.values(fieldErrors).flat().filter(Boolean)[0] ?? "Invalid Inputs";
		return {
			success: false,
			error: { message: firstFieldErrors },
		};
	}
	const tutorData = validatedResult.data;
	const user = await getUserSession();
	if (!user) {
		return {
			success: false,
			error: { message: "Somemthing went wrong ❌" },
		};
	}
	const supabase = await createClient();
	const userData = await getUserById(supabase, user.user_id);

	if (!userData) {
		return {
			success: false,
			error: { message: "Somemthing went wrong ❌" },
		};
	}
	const { role } = userData;
	if (role != "tutor") {
		return {
			success: false,
			error: { message: "User is not authorized ❌" },
		};
	}

	const [updateBankResult, updateUserResult] = await Promise.all([
		await upsertBankInfo(supabase, {
			user_id: user.user_id,
			bankData: {
				bank_name: tutorData.bank_name,
				other_bank: tutorData.other_bank,
				account_name: tutorData.account_name,
				account_number: tutorData.account_number,
				account_type: tutorData.account_type ?? "tutor_transfer",
			},
		}),
		await updateTutor(supabase, {
			bio_highlight: tutorData.bio_highlight,
			biography: tutorData.biography,
			user_id: user.user_id,
		}),
	]);

	if (!updateBankResult) {
		return {
			success: false,
			error: { message: "Somemthing went wrong ❌" },
		};
	}
	if (!updateUserResult) {
		return {
			success: false,
			error: { message: "Somemthing went wrong ❌" },
		};
	}

	return { success: true };
}
