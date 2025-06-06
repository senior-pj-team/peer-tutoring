"use server";

import { getDateWithTime } from "@/utils/app/getDateWithTime";
import { SessionSchemaT, sessionSchema } from "@/schema/sessionSchema";
import { insertSession } from "@/data/mutations/sessions/insert-session";
import { uploadImage } from "@/data/mutations/sessions/insert-session-images";
import { createClient } from "@/utils/supabase/server";
import { getUserSession } from "@/utils/getUserSession";

export const createSession = async (
	rawValues: SessionSchemaT,
): Promise<ActionResponseType<any>> => {

	const result = sessionSchema.safeParse(rawValues);
	if(!result.success) return {
			success: false,
			error: { message: "Validation error" },
	}
	const values = result.data;	
	
	const start = getDateWithTime(values.date, values.startTime);
	const end = getDateWithTime(values.date, values.endTime);
	const user: UserSession | null = await getUserSession();

	if (!user) {
		return {
			success: false,
			error: { message: "User not found" },
		};
	}
	if (user.user_role != "tutor") {
		return {
			success: false,
			error: { message: "User access denied" },
		};
	}

	const tutor_id = user.user_id;

	// data
	const supabase: TSupabaseClient=await createClient();
	
	let uploadedUrl: string | null = null;
	if (values.image) {
		uploadedUrl = await uploadImage(values.image, supabase);
		if (!uploadedUrl) {
			return {
				success: false,
				error: { message: "Failed to upload image" },
			};
		}
	}

	const { data, error } = await insertSession(
		values,
		uploadedUrl,
		start,
		end,
		tutor_id,
		supabase
	);

	if (error) {
		return {
			success: false,
			error: { message: error.message },
		};
	}

	return {
		success: true,
		data,
	};
};