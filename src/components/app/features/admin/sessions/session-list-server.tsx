import { getQueryClient } from "@/utils/app/get-query-client";
import { createClient } from "@/utils/supabase/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { SessionList } from "./session-list";
import { fetchSessions } from "@/utils/app/fetch-sessions";
const LIMIT = 12;
export async function SessionListServer() {
	const queryClient = getQueryClient();
	const supabase = await createClient();
	const page = 1;
	const search = "";
	const status = null;
	await queryClient.prefetchQuery({
		queryKey: ["sessions", 1, "", null, undefined],
		queryFn: () =>
			fetchSessions({ page, search, status, supabase, limit: LIMIT }),
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<SessionList />
		</HydrationBoundary>
	);
}
