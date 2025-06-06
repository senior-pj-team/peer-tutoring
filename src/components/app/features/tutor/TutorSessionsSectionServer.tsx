// app/components/your_path/TutorSessionsSectionServer.tsx
import { createClient } from '@/utils/supabase/server';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query';
import { getSessionsMatView } from '@/data/queries/sessions/get-sessions-mat-view';
import TutorSessionsSection from './TutorSessionsSection';

const LIMIT = 4;

const fetchSessions = async ({
  pageParam = 0,
  tutor_id,
}: {
  pageParam: number;
  tutor_id: string;
}) => {
  const supabase = await createClient();
  const data = await getSessionsMatView(supabase, {
    tutorId: tutor_id,
    offset: pageParam,
    limit: LIMIT,
  });
  if(!data) throw new Error("Server error");
  return data;
}

export default async function TutorSessionsSectionServer({ tutor_id }: { tutor_id: string }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['sessions', tutor_id],
    queryFn: ({ pageParam }) => fetchSessions({ pageParam, tutor_id }),
    getNextPageParam: (lastPage: TSessionsMatViewResult, pages: TSessionsMatViewResult[]) =>
      lastPage?.rows?.length === LIMIT ? pages.length * LIMIT : undefined,
    initialPageParam: 0,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TutorSessionsSection tutor_id={tutor_id} />
    </HydrationBoundary>
  );
}
