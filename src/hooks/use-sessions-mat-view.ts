import { getSessionsMatView } from "@/data/queries/sessions/get-sessions-mat-view";
import { useSupabase } from "./use-supabase";
import { useQuery } from "@tanstack/react-query";

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


