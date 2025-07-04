import { useInfiniteQuery } from "@tanstack/react-query";
import { useSupabase } from "./use-supabase";
import { fetchStudentSession } from "@/utils/app/fetch-student-session";

const LIMIT = 8;
export const useInfiniteStudentSessions = ({
	student_id,
}: {
	student_id: string;
}) => {
	const supabase = useSupabase();
	return useInfiniteQuery({
		queryKey: ["student_sessions", student_id],
		queryFn: ({ pageParam }) =>
			fetchStudentSession({
				pageParam,
				student_id,
				supabase,
				limit: LIMIT,
				status: ["enrolled", "completed", "paid"],
			}),
		getNextPageParam: (lastPage, pages) =>
			lastPage && lastPage.length === LIMIT ? pages.length * LIMIT : undefined,
		initialPageParam: 0,
	});
};
// to delete
