import { NextResponse } from "next/server";
// The client you created from the Server-Side Auth instructions
import { createClient } from "../../../../utils/supabase/server";

export async function GET(request: Request) {
	const { searchParams, origin } = new URL(request.url);
	const code = searchParams.get("code");
	const next = searchParams.get("next") ?? "/";
	const supabase = await createClient();
	if (code) {
		const { error } = await supabase.auth.exchangeCodeForSession(code);

		if (!error) {
			const forwardedHost = request.headers.get("x-forwarded-host");
			const isLocalEnv = process.env.NODE_ENV === "development";
			if (isLocalEnv) {
				return NextResponse.redirect(`${origin}${next}/home`);
			} else if (forwardedHost) {
				return NextResponse.redirect(`https://${forwardedHost}${next}/home`);
			} else {
				return NextResponse.redirect(`${origin}${next}/home`);
			}
		}
	}

	return NextResponse.redirect(`${origin}/error/auth-error`);
}
