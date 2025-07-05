"use server";

import { deleteImage } from "@/data/mutations/image-bucket/delete-image";
import { uploadImage } from "@/data/mutations/image-bucket/upload-image";
import { updateSession } from "@/data/mutations/sessions/update-sessions";
import { sessionSchema, SessionSchemaT } from "@/schema/session-schema";
import { getDateWithTime } from "@/utils/app/get-date-with-time";
import { createClient } from "@/utils/supabase/server";

import { getUserSession } from "@/utils/get-user-session";
import { getUserById } from "@/data/queries/user/get-user-by-id";
import { getEnrollmentCount } from "@/data/queries/student-session/get-enrollment-count";

export const editSession = async (
	sessionId: number,
	rawValues: SessionSchemaT,
	oldImageString: string | null,
	previewImageString: string | null,
): Promise<ActionResponseType<any>> => {
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
	const { role } = userData;
	if (role != "tutor" && role != "admin") {
		return {
			success: false,
			error: { message: "User not authorized" },
		};
	}
	const tutor_id = userData.id;

	const enrollments = await getEnrollmentCount(supabase, {
		session_id: sessionId,
	});
	if ((enrollments ?? 1) > 0) {
		return {
			success: false,
			error: { message: "You cannot edit sessions with enrollments" },
		};
	}

	let uploadedUrl: string | null = null;
	let isDelete;
	if (values.image) {
		uploadedUrl = await uploadImage(supabase, {
			image: values.image,
			path: "session_images/",
		});
		if (!uploadedUrl) {
			return {
				success: false,
				error: { message: "Failed to upload image" },
			};
		}
		isDelete = oldImageString
			? await deleteImage(supabase, {
					path: "session-images/",
					imageUrl: oldImageString,
				})
			: true;
	} else if (!previewImageString) {
		//user remove the image
		isDelete = oldImageString
			? await deleteImage(supabase, {
					path: "session-images/",
					imageUrl: oldImageString,
				})
			: true;
	}

	const updateResult = await updateSession(supabase, sessionId, {
		values,
		uploadedUrl,
		start,
		end,
		tutor_id,
		status: "open",
	});

	if (!updateResult) {
		return {
			success: false,
			error: { message: "Something went wrong" },
		};
	}

	return {
		success: true,
	};
};
