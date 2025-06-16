import { getSessionsMatView } from "@/data/queries/sessions/get-sessions-mat-view";

export const LIMIT = 4;
export const fetchSessions = async ({
  pageParam = 0,
  tutor_id,
  supabase
}: {
  pageParam: number;
  tutor_id: string;
  supabase: TSupabaseClient;
}) => {
  const data = await getSessionsMatView(supabase, {
    tutorId: tutor_id,
    offset: pageParam,
    limit: LIMIT,
  })
  if (!data) throw new Error("Server error");
  return data;
}