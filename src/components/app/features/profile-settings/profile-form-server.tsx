import { getUserSession } from "@/utils/get-user-session";
import { ProfileForm } from "./profile-form";
import GeneralError from "../../shared/error";
import { getUserById } from "@/data/queries/user/get-user-by-id";
import { createClient } from "@/utils/supabase/server";

export async function ProfileFromServer() {
	const user = await getUserSession();
	if (!user) {
		return (
			<>
				<GeneralError />
			</>
		);
	}
	const supabase = await createClient();
	const userData = await getUserById(supabase, user.user_id);

	if (!userData) {
		return (
			<>
				<GeneralError />
			</>
		);
	}

	return (
		<>
			<ProfileForm userData={userData} />
		</>
	);
}
