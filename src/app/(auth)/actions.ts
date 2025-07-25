"use server";
import { redirect } from "next/navigation";

import { createClient } from "../../utils/supabase/server";
import { headers } from "next/headers";

export async function signIn() {
	const origin = (await headers()).get("origin");
	const supabase = await createClient();

	const { error, data } = await supabase.auth.signInWithOAuth({
		provider: "google",
		options: {
			redirectTo: `${origin}/auth/callback`,
		},
	});
	if (error) {
		console.log("Error ", error);
	} else {
		console.log("Redirect ", data.url);
		return redirect(data.url);
	}
}

export async function signOut() {
	const supabase = await createClient();
	return await supabase.auth.signOut();
}
