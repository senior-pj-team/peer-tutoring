import { TProfileSchemaServer } from "@/schema/profile-schema-server";
import { tutorFormSchemaT } from "@/schema/tutor-form-schema";

type Params = {
  userData?: TProfileSchemaServer;
  tutorData?: tutorFormSchemaT;
  uploadedUrl: string | null;
  user_id: string;
};

export async function updateUser(
  supabase: TSupabaseClient,
  { userData, tutorData, uploadedUrl, user_id }: Params
): Promise<boolean> {
  let toUpdate: { [key: string]: any; } | undefined;

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
  }

  if (!toUpdate) {
    console.warn("No data provided to update.");
    return false;
  }

  const { error } = await supabase
    .from("user")
    .update(toUpdate)
    .eq("id", user_id);

  if (error) {
    console.error("Error updating user:", error.message);
    return false;
  }

  return true;
}
