"use server";
import { upsertBankInfo } from "@/data/mutations/bank-info/upsert-bank-info";
import { deleteImage } from "@/data/mutations/sessions/delete-session-images";
import { uploadImage } from "@/data/mutations/sessions/insert-session-images";
import { updateUser } from "@/data/mutations/user/update-user";
import {
	bankInfoSchema,
	profileSchemaServer,
	TBankInfoSchema,
	TProfileSchemaServer,
} from "@/schema/profile-schema-server";
import { getUserSession } from "@/utils/get-user-session";
import { createClient } from "@/utils/supabase/server";

export async function updateUserProfile(
	values: TProfileSchemaServer,
	profile_url: string | null,
): Promise<ActionResponseType<any>> {
	const validatedResult = profileSchemaServer.safeParse(values);
	if (!validatedResult.success) {
		const fieldErrors = validatedResult.error.flatten().fieldErrors;
		const firstFieldErrors =
			Object.values(fieldErrors).flat().filter(Boolean)[0] ??
			"Some input is wrong";
		return {
			success: false,
			error: { message: firstFieldErrors },
		};
	}
	const user = await getUserSession();
	if (!user) {
		return {
			success: false,
			error: { message: "Something went Wrong!" },
		};
	}
	const userData = validatedResult.data;
	const supabase = await createClient();
	let uploadedUrl: string | null = null;

	if (userData.profile_url) {
		uploadedUrl = await uploadImage(userData.profile_url, supabase);
		if (!uploadedUrl) {
			return {
				success: false,
				error: { message: "Failed to upload image" },
			};
		}

		if (profile_url) await deleteImage(profile_url, supabase);
	}

	const updateResult = await updateUser(supabase, {
		userData,
		uploadedUrl,
		user_id: user.user_id,
	});
	if (!updateResult) {
		return {
			success: false,
			error: { message: "Something went Wrong!" },
		};
	}
	return {
		success: true,
	};
}

export async function updateBankInfo(
	values: TBankInfoSchema,
): Promise<ActionResponseType<any>> {
	const validatedResult = bankInfoSchema.safeParse(values);
	if (!validatedResult.success) {
		const fieldErrors = validatedResult.error.flatten().fieldErrors;
		const firstFieldErrors =
			Object.values(fieldErrors).flat().filter(Boolean)[0] ??
			"Some input is wrong";
		return {
			success: false,
			error: { message: firstFieldErrors },
		};
	}
	const user = await getUserSession();
	if (!user) {
		return {
			success: false,
			error: { message: "Something went Wrong!" },
		};
	}
	const bankData = validatedResult.data;
	const supabase = await createClient();

	const upsertResult = await upsertBankInfo(supabase, {
		user_id: user.user_id,
		bankData,
		account_type: "student_refund",
	});

	if (!upsertResult) {
		return {
			success: false,
			error: { message: "Something went Wrong!" },
		};
	}
	return {
		success: true,
	};
}
