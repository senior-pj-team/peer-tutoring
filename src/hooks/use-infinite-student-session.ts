import { useInfiniteQuery } from "@tanstack/react-query";
import { useSupabase } from "./use-supabase";
import { fetchStudentSession, LIMIT } from "@/utils/app/fetch-student-session";
export const useInfiniteStudentSessions = ({ student_id }: { student_id: string }) => {
    const supabase = useSupabase();
    return useInfiniteQuery({
        queryKey: ['student_sessions', student_id],
        queryFn: ({ pageParam }) =>
            fetchStudentSession({ pageParam, student_id, supabase}),
        getNextPageParam: (lastPage, pages) =>
            lastPage && lastPage.length === LIMIT ? pages.length * LIMIT : undefined,
        initialPageParam: 0,
    });
};
