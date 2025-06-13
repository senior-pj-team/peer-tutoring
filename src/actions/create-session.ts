"use server";

import { uploadImage } from "@/data/mutations/sessions/insert-session-images";
import { SessionSchemaT } from "@/schema/session-schema";
import { getDateWithTime } from "@/utils/app/get-date-with-time";
import { createClient } from "@/utils/supabase/server";
import { insertSession } from "@/data/mutations/sessions/insert-session";

import { getUserSession } from "@/utils/get-user-session";

export const createSession = async (
	values: SessionSchemaT,
): Promise<ActionResponseType<any>> => {
	const start = getDateWithTime(values.date, values.startTime);
	const end = getDateWithTime(values.date, values.endTime);

	const user: UserSession | null = await getUserSession();

	if (!user) {
		return {
			success: false,
			error: { message: "You are not authorized for this action!" },
		};
	}
	if (user.user_role != "tutor") {
		return {
			success: false,
			error: { message: "You are not authorized for this action!" },
		};
	}

	const tutor_id = user.user_id;

	// data
	const supabase: TSupabaseClient = await createClient();

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
		supabase,
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
