import { fetchSessions, LIMIT } from "@/utils/app/fetch-sessions";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSupabase } from "./use-supabase";
export const useInfiniteSessions= ({tutor_id}: {tutor_id: string})=>{
    const supabase= useSupabase()
    return useInfiniteQuery({
    queryKey: ["sessions", tutor_id],
    queryFn: ({ pageParam }) => fetchSessions({ pageParam, tutor_id, supabase }),
    getNextPageParam: (lastPage, pages) =>
      lastPage && lastPage.rows && lastPage.rows.length === LIMIT
        ? pages.length * LIMIT
        : undefined,
    initialPageParam: 0,
  })
}