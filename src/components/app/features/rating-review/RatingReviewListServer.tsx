import { createClient } from '@/utils/supabase/server';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query';
import { getRatingReview } from '@/data/queries/rating_and_review/get-rating_review_user_view';
import RatingReviewList from './RatingReviewList';

const LIMIT = 5;
const fetchReviews = async ({
  pageParam = 0,
  tutor_id,
}: {
  pageParam: number;
  tutor_id: string;
}) => {
  const supabase = await createClient();
  const data = await getRatingReview(supabase, {
    offset: pageParam,
    limit: LIMIT,
    tutor_id,
  });
  if(!data) throw new Error("Error fetching");
  return data;
}

export default async function RatingReviewListServer({tutor_id}: {tutor_id: string}) {
  const LIMIT = 5;
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['reviews and ratings', tutor_id, ""],
    queryFn: ({ pageParam }) => fetchReviews({ pageParam, tutor_id }),
    getNextPageParam: (lastPage: TRatingReviewUserViewResult[], allPages: TRatingReviewUserViewResult[][]) =>
      lastPage?.length === LIMIT ? allPages.length * LIMIT : undefined,
    initialPageParam: 0,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RatingReviewList tutor_id={tutor_id} />
    </HydrationBoundary>
  );
}