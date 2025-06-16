"use server";
import { createClient } from "../supabase/server";
import { jwtDecode } from "jwt-decode";

export const getUserSession = async (): Promise<UserSession | null> => {
	const supabase = await createClient();
	const {
		data: { session },
	} = await supabase.auth.getSession();
	if (!session) {
		return null;
	}
	const decoded = jwtDecode<MyJwtPayload>(session?.access_token as string);
	return {
		user_id: decoded.app_user_id,
		email: decoded.email,
		full_name: decoded.user_metadata.full_name,
		profile_url: decoded.profile_image,
		user_role: decoded.user_role,
	} as UserSession;
};
