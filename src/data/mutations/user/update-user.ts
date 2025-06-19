import { TProfileSchemaServer } from "@/schema/profile-schema-server";
type Params = {
	userData: TProfileSchemaServer;
	uploadedUrl: string | null;
	user_id: string;
};

export async function updateUser(
	supabase: TSupabaseClient,
	{ userData, uploadedUrl, user_id }: Params,
): Promise<boolean> {
	const { error } = await supabase
		.from("user")
		.update({
			username: userData.username,
			profile_url: uploadedUrl,
			school: userData.school,
			major: userData.major,
			year: userData.year?.toString(),
			phone_number: userData.phone_number,
			social_links: userData.social_links,
		})
		.eq("id", user_id);
	if (error) {
		console.log("Error in updating user: ", error.message);
		return false;
	}
	return true;
}
