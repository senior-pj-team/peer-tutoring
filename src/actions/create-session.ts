"use server";

import { uploadImage } from "@/data/mutations/sessions/insert-session-images";
import { sessionSchema, SessionSchemaT } from "@/schema/session-schema";
import { getDateWithTime } from "@/utils/app/get-date-with-time";
import { createClient } from "@/utils/supabase/server";
import { insertSession } from "@/data/mutations/sessions/insert-session";

import { getUserSession } from "@/utils/get-user-session";
import { getUserById } from "@/data/queries/user/get-user-by-id";
import { addDays } from "date-fns";

export const createSession = async (
	rawValues: SessionSchemaT,
): Promise<ActionResponseType<any>> => {
	console.log(rawValues);
	const result = sessionSchema.safeParse(rawValues);
	if (!result.success)
		return {
			success: false,
			error: { message: "Validation error" },
		};
	const values = result.data;

	const start = getDateWithTime(values.date, values.startTime);
	const end = getDateWithTime(values.date, values.endTime);
	const user = await getUserSession();

	if (!user?.user_id) {
		return {
			success: false,
			error: { message: "User not found" },
		};
	}
	const supabase = await createClient();
	const userData = await getUserById(supabase, user.user_id);

	if (!userData) {
		return {
			success: false,
			error: { message: "User not found" },
		};
	}

	const { role, tutor_status } = userData;
	if ((role != "tutor" && role != "admin") || tutor_status == "suspended") {
		return {
			success: false,
			error: { message: "User not authorized" },
		};
	}

	const tutor_id = userData.id;
	let uploadedUrl: string | null = null;

	if (values.image) {
		uploadedUrl = await uploadImage(values.image, supabase, {
			path: "session_images/",
		});
		if (!uploadedUrl) {
			return {
				success: false,
				error: { message: "Failed to upload image" },
			};
		}
	}

	const insertResult = await insertSession(
		values,
		uploadedUrl,
		start,
		end,
		addDays(new Date(), 7).toISOString(),
		tutor_id,
		supabase,
	);

	if (!insertResult) {
		return {
			success: false,
			error: { message: "Something went wrong" },
		};
	} else {
		return {
			success: true,
		};
	}
};
