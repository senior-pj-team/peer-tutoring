// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import { JWT } from "npm:google-auth-library@9";

type Notification = {
	id: number;
	user_id: string;
	title: string | null;
	body: string | null;
	link: string | null;
	status: "new" | "read";
	type: "student" | "tutor" | "tutor_warning" | "";
	created_at: string;
};

type WebHookPayload = {
	type: "INSERT";
	table: string;
	record: Notification;
	schema: "public";
};
const supabase = createClient(
	Deno.env.get("SUPABASE_URL")!,
	Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);
Deno.serve(async (req) => {
	const payload: WebHookPayload = await req.json();

	const { data, error } = await supabase
		.from("fcm_token")
		.select("fcm_token")
		.eq("user_id", payload.record.user_id)
		.single();

	if (error) {
		throw error;
	}

	if (!data) {
		return new Response(
			JSON.stringify({ message: "no fcm_token for this user" }),
			{
				headers: { "Content-Type": "application/json" },
			},
		);
	}
	const fcm_token = data.fcm_token as string;

	const { default: serviceAccount } = await import("../service-account.json", {
		with: { type: "json" },
	});
	const accessToken = await getAccessToken({
		clientEmail: serviceAccount.client_email,
		privateKey: serviceAccount.private_key,
	});

	const res = await fetch(
		`https://fcm.googleapis.com/v1/projects/${serviceAccount.project_id}/messages:send`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`,
			},
			body: JSON.stringify({
				message: {
					token: fcm_token,
					webpush: {
						fcmOptions: {
							link: "https://localhost:3000",
						},
						notification: {
							title: payload.record.title,
							body: payload.record.body,
						},

						data: {
							link: "https://localhost:3000",
							type: payload.record.type,
						},
					},
				},
			}),
		},
	);

	const res_data = await res.json();
	if (res_data.status < 200 || 299 < res_data.status) {
		throw res_data;
	}

	return new Response(JSON.stringify(data), {
		headers: { "Content-Type": "application/json" },
	});
});

const getAccessToken = ({
	clientEmail,
	privateKey,
}: {
	clientEmail: string;
	privateKey: string;
}): Promise<string> => {
	return new Promise((resolve, reject) => {
		const jwtClient = new JWT({
			email: clientEmail,
			key: privateKey,
			scopes: ["https://www.googleapis.com/auth/firebase.messaging"],
		});
		jwtClient.authorize((err, tokens) => {
			if (err) {
				reject(err);
				return;
			}
			resolve(tokens?.access_token!);
		});
	});
};
