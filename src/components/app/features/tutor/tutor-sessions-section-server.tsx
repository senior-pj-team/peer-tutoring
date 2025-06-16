import { createClient } from '@/utils/supabase/server';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query';
import TutorSessionsSection from './tutor-sessions-section';
import { fetchSessions, LIMIT } from '@/utils/app/fetch-sessions';

export default async function TutorSessionsSectionServer({ tutor_id }: { tutor_id: string }) {
  const queryClient = new QueryClient();
  const supabase= await createClient()

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['sessions', tutor_id],
    queryFn: ({ pageParam }) => fetchSessions({ pageParam, tutor_id, supabase}),
    getNextPageParam: (
      lastPage: { rows: TSessionsMatViewResultRow[] | null; total: number | null },
      pages: { rows: TSessionsMatViewResultRow[] | null; total: number | null }[]
    ) =>
      lastPage?.rows?.length === LIMIT ? pages.length * LIMIT : undefined,
    initialPageParam: 0,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TutorSessionsSection tutor_id={tutor_id} />
    </HydrationBoundary>
  );
}
