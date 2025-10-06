import { NextResponse } from "next/server";
// The client you created from the Server-Side Auth instructions
import { createClient } from "../../../../utils/supabase/server";

export async function GET(request: Request) {
	const { searchParams, origin } = new URL(request.url);
	const code = searchParams.get("code");
	const next = searchParams.get("next") ?? "/";
	const supabase = await createClient();
	console.log("Origin: ", origin);
	if (code) {
		const { error } = await supabase.auth.exchangeCodeForSession(code);
		if (error) {
			return NextResponse.redirect(`${origin}/error/auth-error`);
		}
		const {
			data: { user },
			error: userError,
		} = await supabase.auth.getUser();

		if (userError || !user) {
			return NextResponse.redirect(`${origin}/error/auth-error`);
		}
		const { data: userRow, error: dbError } = await supabase
			.from("user")
			.select("role")
			.eq("auth_user_id", user.id)
			.single();

		if (dbError || !userRow) {
			return NextResponse.redirect(`${origin}/error/auth-error`);
		}

		const forwardedHost = request.headers.get("x-forwarded-host");

		const isLocalEnv = process.env.NODE_ENV === "development";

		let baseUrl = origin;
		console.log("@@: ", forwardedHost, " ", isLocalEnv, " ", baseUrl);
		if (!isLocalEnv && forwardedHost) {
			baseUrl = `https://${forwardedHost}`;
		}
		if (userRow.role === "admin") {
			return NextResponse.redirect(
				`${baseUrl}${next}/admin-dashboard/browse-session`,
			);
		} else {
			return NextResponse.redirect(`${baseUrl}${next}/home`);
		}
	}

	return NextResponse.redirect(`${origin}/error/auth-error`);
}
