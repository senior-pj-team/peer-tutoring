"use server";

import { createClient } from "@/utils/supabase/server";
import { getUserSession } from "@/utils/get-user-session";
import { tutorFormSchema, tutorFormSchemaT } from "@/schema/tutor-form-schema";
import { updateUser } from "@/data/mutations/user/update-user";
import { upsertBankInfo } from "@/data/mutations/bank-info/upsert-bank-info";
import { updateBankInfo } from "@/data/mutations/bank-info/update-bank-info";
import { uploadImage } from "@/data/mutations/image-bucket/upload-image";

export async function submitTutorRegistration(
	formData: tutorFormSchemaT,
): Promise<ActionResponseType<string>> {
	const supabase = await createClient();
	const user = await getUserSession();

	if (!user?.user_id) {
		return {
			success: false,
			error: { message: "Something went wrong" },
		};
	}

	const parsed = tutorFormSchema.safeParse({
		school: formData.school,
		major: formData.major,
		year: formData.year,
		phone_number: formData.phone_number,
		type: formData.type,
		bankName: formData.bankName,
		accountName: formData.accountName,
		accountNumber: formData.accountNumber,
		studentIdPhoto: formData.studentIdPhoto,
		isChecked: formData.isChecked,
		bankId: formData.bankId,
	});

	if (!parsed.success) {
		return {
			success: false,
			error: { message: "Invalid input ❌" },
		};
	}

	const {
		school,
		major,
		year,
		phone_number,
		type,
		bankName,
		accountName,
		accountNumber,
		studentIdPhoto,
		bankId,
	} = parsed.data;

	let uploadedUrl: string | null = null;
		if (studentIdPhoto) {
			uploadedUrl = await uploadImage(studentIdPhoto, supabase, {
				path: "student-id-photos/",
			});
			if (!uploadedUrl) {
				return {
					success: false,
					error: { message: "Failed to upload receipt" },
				};
			}
		}

	const updateResult = await updateUser(supabase, {
		tutorData: {
			school: school,
			major: major,
			year: year,
			phone_number: phone_number,
			studentId_photo: uploadedUrl?? "",
		},
		uploadedUrl: uploadedUrl,
		user_id: user.user_id,
	});
	if (!updateResult) {
		return {
			success: false,
			error: { message: "Something went wrong 1" },
		};
	}

	if (type == "refund_transfer" && bankId) {
		const updateResult = await updateBankInfo(
			supabase,
			Number(bankId),
			user.user_id,
			{ account_type: type },
		);
		if (!updateResult) {
			return {
				success: false,
				error: { message: "Something went wrong 2" },
			};
		}
	} else if (type == "tutor_transfer") {
		const insertResult = await upsertBankInfo(supabase, {
			user_id: user.user_id,
			bankData: {
				bank_name: bankName,
				account_name: accountName,
				account_number: accountNumber,
				account_type: type,
				other_bank: "",
			},
		});
		if (insertResult) {
			return {
				success: false,
				error: { message: "Something went wrong 3" },
			};
		}
	} else {
		return {
			success: false,
			error: { message: "Something went wrong 4" },
		};
	}

	return { success: true };
}
