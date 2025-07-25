"use server";
import { updateBankInfo } from "@/data/mutations/bank-info/update-bank-info";
import { upsertBankInfo } from "@/data/mutations/bank-info/upsert-bank-info";
import { deleteImage } from "@/data/mutations/image-bucket/delete-image";
import { uploadImage } from "@/data/mutations/image-bucket/upload-image";
import { updateUser } from "@/data/mutations/user/update-user";
import {
	bankInfoSchema,
	profileSchemaServer,
	TBankInfoSchema,
	TProfileSchemaServer,
} from "@/schema/profile-schema-server";
import { getUserSession } from "@/utils/get-user-session";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateUserProfile(
	values: TProfileSchemaServer,
	profile_url: string | null,
	previewUrl: string | null,
): Promise<ActionResponseType<any>> {
	const validatedResult = profileSchemaServer.safeParse(values);
	if (!validatedResult.success) {
		const fieldErrors = validatedResult.error.flatten().fieldErrors;
		const firstFieldErrors =
			Object.values(fieldErrors).flat().filter(Boolean)[0] ??
			"Invalid Inputs ❌";
		return {
			success: false,
			error: { message: firstFieldErrors },
		};
	}
	const user = await getUserSession();
	if (!user) {
		return {
			success: false,
			error: { message: "Something went Wrong ❌" },
		};
	}
	const userData = validatedResult.data;
	const supabase = await createClient();
	let uploadedUrl: string | null = null;

	console.log("old or profile_url: ", profile_url);
	console.log("previewUrl: ", previewUrl);
	console.log("upload url:, ", userData.profile_url);
	if (userData.profile_url) {
		uploadedUrl = await uploadImage(userData.profile_url, supabase, {
			path: "profile-images/",
		});
		if (!uploadedUrl) {
			return {
				success: false,
				error: { message: "Failed to upload image ❌" },
			};
		}

		if (profile_url)
			await deleteImage(supabase, {
				path: "profile-images/",
				imageUrl: profile_url,
			});
	}

	const updateResult = await updateUser(supabase, {
		userData,
		uploadedUrl,
		user_id: user.user_id,
	});
	if (!updateResult) {
		return {
			success: false,
			error: { message: "Something went Wrong ❌" },
		};
	}
	revalidatePath("/profile-setting/update");
	return {
		success: true,
	};
}

export async function updateUserBankInfo(
	values: TBankInfoSchema,
	oldBankID: number | undefined,
): Promise<ActionResponseType<any>> {
	const validatedResult = bankInfoSchema.safeParse(values);
	if (!validatedResult.success) {
		const fieldErrors = validatedResult.error.flatten().fieldErrors;
		const firstFieldErrors =
			Object.values(fieldErrors).flat().filter(Boolean)[0] ?? "Invalid Inputs";
		return {
			success: false,
			error: { message: firstFieldErrors },
		};
	}
	const user = await getUserSession();
	if (!user) {
		return {
			success: false,
			error: { message: "Something went Wrong ❌" },
		};
	}
	const bankData = validatedResult.data;
	const supabase = await createClient();

	const upsertResult = await upsertBankInfo(supabase, {
		user_id: user.user_id,
		bankData,
	});

	if (!upsertResult) {
		return {
			success: false,
			error: { message: "Something went Wrong ❌" },
		};
	}

	if (oldBankID) {
		const updateOldBankResult = await updateBankInfo(
			supabase,
			oldBankID,
			user.user_id,
			{
				account_type: "student_refund",
			},
		);

		if (!updateOldBankResult)
			return {
				success: false,
				error: { message: "Something went Wrong ❌" },
			};
	}
	return {
		success: true,
	};
}
