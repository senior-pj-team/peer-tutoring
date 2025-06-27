import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_PATHS = [
	"/login",
	"/auth", // all /auth/* API routes
	"/home",
	"/tutor-view",
	"/sessions",
	"/session/browse", // all /session/browse/*
	"/error",
];
export async function updateSession(request: NextRequest) {
	let supabaseResponse = NextResponse.next({
		request,
	});

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll() {
					return request.cookies.getAll();
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value }) =>
						request.cookies.set(name, value),
					);
					supabaseResponse = NextResponse.next({
						request,
					});
					cookiesToSet.forEach(({ name, value, options }) =>
						supabaseResponse.cookies.set(name, value, options),
					);
				},
			},
		},
	);

	// IMPORTANT: DO NOT REMOVE auth.getUser()
	const {
		data: { user },
	} = await supabase.auth.getUser();

	const { pathname } = request.nextUrl;

	if (
		!user &&
		!PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"))
	) {
		const url = request.nextUrl.clone();
		url.pathname = "/login";
		url.search = "";
		return NextResponse.redirect(url);
	}

	return supabaseResponse;
}
