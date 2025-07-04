import { getSessionsMatView } from "@/data/queries/sessions/get-sessions-mat-view";
import { useSupabase } from "./use-supabase";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchSessions } from "@/utils/app/fetch-sessions";

export function useSessionsMatviewQuery(
	search: string,
	enabled: boolean = false,
) {
	const client = useSupabase();
	const queryFn = async () => {
		if (!search) return null;
		return getSessionsMatView(client, { search, status: ["open"] });
	};
	return useQuery({ queryKey: ["sessions", search], queryFn, enabled });
}

export function usePaginatedSessionsMatViewQuery({
	key,
	page,
	limit,
	tutor_id,
	search,
	status,
}: {
	key: string;
	page: number;
	limit: number;
	tutor_id?: string;
	search?: string;
	status?: TSessionStatus[] | null;
}) {
	const supabase = useSupabase();

	return useQuery({
		queryKey: [key, page, search, status, tutor_id],
		queryFn: () =>
			fetchSessions({ page, tutor_id, search, status, limit, supabase }),
		placeholderData: keepPreviousData,
	});
}
