import { createClient } from '@/utils/supabase/server';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query';
import { fetchStudentSession, LIMIT } from '@/utils/app/fetch-student-session';
import StudentSessionList from './student-session-list';

export default async function StudentSessionListServer({ student_id }: { student_id: string }) {
  const queryClient = new QueryClient();
  const supabase= await createClient()

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['student_sessions', student_id],
    queryFn: ({ pageParam }) => fetchStudentSession({ pageParam, student_id, supabase}),
    getNextPageParam: (
      lastPage: TStudentSessionJoinResult[] | null,
      pages: (TStudentSessionJoinResult[]| null)[]
    ) =>
      lastPage && lastPage.length === LIMIT ? pages.length * LIMIT : undefined,
    initialPageParam: 0,
  });
  
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StudentSessionList student_id={student_id}/>
    </HydrationBoundary>
  );
}
