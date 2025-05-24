import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/lib/database.types";
import { SupabaseClient } from "@supabase/supabase-js";

let client: TSupabaseClient | undefined = undefined;
export function createClient() {
	if (!client) {
		client = createBrowserClient<Database>(
			process.env.NEXT_PUBLIC_SUPABASE_URL!,
			process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		);
	}
	return client;
}
