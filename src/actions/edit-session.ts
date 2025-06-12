'use server'

import { deleteImage } from "@/data/mutations/sessions/delete-session-images";
import { uploadImage } from "@/data/mutations/sessions/insert-session-images";
import { updateSession } from "@/data/mutations/sessions/update-sessions";
import { SessionSchemaT } from "@/schema/session-schema";
import { getDateWithTime } from "@/utils/app/get-date-with-time";
import { getUserSession } from "@/utils/get-user-session";
import { createClient } from "@/utils/supabase/server";

export const editSession = async (
	sessionId: number,
	values: SessionSchemaT,
	imageString: string,
): Promise<ActionResponseType<any>> => {
	const start = getDateWithTime(values.date, values.startTime);
	const end = getDateWithTime(values.date, values.endTime);

	const user: UserSession | null = await getUserSession();

	if (!user) {
		return {
			success: false,
			error: { message: "User not found" },
		};
	}

	if (user.user_role !== "tutor") {
		return {
			success: false,
			error: { message: "User not authorized" },
		};
	}

	const tutor_id = user.user_id;
	const supabase: TSupabaseClient=await createClient();

	let isDelete;
	let uploadedUrl: string | null = null;
	if (values.image) {
		uploadedUrl = await uploadImage(values.image, supabase);
		if (!uploadedUrl) {
			return {
				success: false,
				error: { message: "Failed to upload image" },
			};
		}
		isDelete = await deleteImage(imageString, supabase);
	}
	
	const { data, error } = await updateSession(
		sessionId,
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