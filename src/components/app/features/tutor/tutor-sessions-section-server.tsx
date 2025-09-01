import { createClient } from "@/utils/supabase/server";
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";
import TutorSessionsSection from "./tutor-sessions-section";
import { fetchSessions } from "@/utils/app/fetch-sessions";

export default async function TutorSessionsSectionServer({
	tutor_id,
}: {
	tutor_id: string;
}) {
	const queryClient = new QueryClient();
	const supabase = await createClient();

	await queryClient.prefetchQuery({
		queryKey: ["tutor-sessions", 1, undefined, undefined, tutor_id],
		queryFn: async () =>
			await fetchSessions({ pageParam: 1, tutor_id, supabase, limit: 4 }),
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<TutorSessionsSection tutor_id={tutor_id} />
		</HydrationBoundary>
	);
}
