import { SupabaseClient } from "@supabase/supabase-js";
import { SessionSchemaT } from "@/schema/sessionSchema";
import { createClient } from "@/utils/supabase/server";

export const insertSession = async (
	values: SessionSchemaT,
	uploadedUrl: string | null,
	start: Date,
	end: Date,
	tutor_id: String,
) => {
	const supabase: SupabaseClient = await createClient();
	return await supabase.from("sessions").insert({
		session_name: values.sessionName,
		course_code: values.courseCode,
		course_name: values.courseName,
		school: values.school,
		major: values.major,
		image: uploadedUrl,
		description: values.description,
		requirement: values.requirements,
		start_time: start.toISOString(),
		end_time: end.toISOString(),
		max_students: values.maxStudents,
		location: values.location,
		category_id: values.category,
		paid_session: values.paid,
		price: values.paid ? values.amount : 0,
		status: "open",
		tutor_id: tutor_id,
	});
};

export const updateSession = async (
	sessionId: string,
	values: SessionSchemaT,
	uploadedUrl: string | null,
	start: Date,
	end: Date,
	tutor_id: string,
) => {
	if (!sessionId) {
		return {
			data: null,
			error: { message: "Missing session ID" },
		};
	}
	const supabase: SupabaseClient = await createClient();
	return await supabase
		.from("sessions")
		.update({
			session_name: values.sessionName,
			course_code: values.courseCode,
			course_name: values.courseName,
			school: values.school,
			major: values.major,
			image: uploadedUrl,
			description: values.description,
			requirement: values.requirements,
			start_time: start.toISOString(),
			end_time: end.toISOString(),
			max_students: values.maxStudents,
			location: values.location,
			category_id: values.category,
			paid_session: values.paid,
			price: values.paid ? values.amount : 0,
			tutor_id: tutor_id,
		})
		.eq("id", sessionId);
};

export const uploadImage = async (image: File): Promise<string | null> => {
	const supabase: SupabaseClient = await createClient();

	const fileExt = image.name.split(".").pop();
	const filePath = `${Date.now()}.${fileExt}`;

	const { error } = await supabase.storage
		.from("session-images")
		.upload(filePath, image);

	if (error) {
		console.error("Upload error:", error.message);
		return null;
	}

	const { data } = supabase.storage
		.from("session-images")
		.getPublicUrl(filePath);

	return data?.publicUrl ?? null;
};

export const deleteImage = async (imageUrl: string): Promise<boolean> => {
	if (!imageUrl) return false;

	const supabase: SupabaseClient = await createClient();

	try {
		const urlParts = imageUrl.split("/");
		const fileName = urlParts[urlParts.length - 1];

		console.log("to delete: ", fileName);

		const { error } = await supabase.storage
			.from("session-images")
			.remove([fileName]);

		if (error) {
			console.error("Delete error:", error.message);
			return false;
		}

		return true;
	} catch (err) {
		console.error("Unexpected delete error:", err);
		return false;
	}
};

export const selectSessionCardData = async (
	status: TStudentSessionStatus[],
	user: UserSession,
) => {
	const supabase = await createClient();

	return await supabase
		.from("student_session_view")
		.select(
			`
      session_id,
      image,
      session_name,
      course_code,
      course_name,
      start_time,
      end_time,
      tutor_name,
      tutor_rating,
      student_session_status
    `,
		)
		.eq("student_id", user.user_id)
		.in("student_session_status", status);
};
