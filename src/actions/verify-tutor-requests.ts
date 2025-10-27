"use server";
import { deleteImage } from "@/data/mutations/image-bucket/delete-image";
import { updateUser } from "@/data/mutations/user/update-user";
import { createClient } from "@/utils/supabase/server";

export async function verifyTutorRequests(
	action: "approve" | "reject",
	userId: string,
): Promise<ActionResponseType<string>> {
	const supabase = await createClient();
	let student: TUser[] | null;
	console.log("action from server: ", action);
	if (action == "approve") {
		student = await updateUser(supabase, {
			updateObj: {
				tutor_status: "verified",
				role: "tutor",
			},
			user_id: userId,
		});
	} else {
		student = await updateUser(supabase, {
			updateObj: {
				tutor_status: "rejected",
				role: "student",
			},
			user_id: userId,
		});
	}
	if (!student || student.length != 1) {
		return {
			success: false,
			error: { message: "Something went wrong" },
		};
	}
	const toDelete = student[0].studentId_photo;
	const isDeleted = toDelete
		? await deleteImage(supabase, {
				path: "student-id-photos/",
				imageUrl: toDelete,
			})
		: true;
	console.log("photo deleted? ", isDeleted);

	return {
		success: true,
	};
}
