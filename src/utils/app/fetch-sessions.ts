import { getSessionsMatView } from "@/data/queries/sessions/get-sessions-mat-view";

export const fetchSessions = async ({
	pageParam = 0,
	limit,
	tutor_id,
	supabase,
	status,
	search,
	page,
}: {
	pageParam?: number;
	limit: number;
	tutor_id?: string;
	supabase: TSupabaseClient;
	status?: TSessionStatus[] | null;
	search?: string;
	page?: number;
}) => {
	if (page) {
		pageParam = (page - 1) * limit;
	}
	const data = await getSessionsMatView(supabase, {
		search,
		status: status ?? undefined,
		tutorId: tutor_id,
		offset: pageParam,
		limit,
	});
	if (!data) throw new Error("Server error");
	return data;
};
