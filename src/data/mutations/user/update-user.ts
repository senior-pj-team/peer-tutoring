import { TProfileSchemaServer } from "@/schema/profile-schema-server";

type Params = {
	userData?: TProfileSchemaServer;
	tutorData?: TTutorData;
	uploadedUrl?: string | null;
	user_id: string;
	updateObj?: { [key: string]: any };
};

type TTutorData = {
	school: string;
	major: string;
	year: string;
	phone_number: string;
	studentId_photo: string;
};

export async function updateUser(
	supabase: TSupabaseClient,
	{ userData, tutorData, uploadedUrl, user_id, updateObj }: Params,
): Promise<TUser[] | null> {
	let toUpdate: { [key: string]: any } | undefined;
	if (userData) {
		toUpdate = {
			username: userData.username,
			profile_url: uploadedUrl,
			school: userData.school,
			major: userData.major,
			year: userData.year?.toString(),
			phone_number: userData.phone_number,
			social_links: userData.social_links,
		};
	} else if (tutorData) {
		toUpdate = {
			school: tutorData.school,
			major: tutorData.major,
			year: tutorData.year,
			phone_number: tutorData.phone_number,
			studentId_photo: uploadedUrl,
			tutor_status: "pending",
		};
	} else if (updateObj) {
		toUpdate = updateObj;
	}

	if (!toUpdate) {
		console.warn("No data provided to update.");
		return null;
	}

	const { data, error } = await supabase
		.from("user")
		.update(toUpdate)
		.eq("id", user_id)
		.select("*");

	if (error) {
		console.error("Error updating user:", error.message);
		return null;
	}

	return data;
}
