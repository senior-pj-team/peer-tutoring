import {
	HydrationBoundary,
	dehydrate,
	QueryClient,
} from "@tanstack/react-query";
import RatingReviewList from "./rating-review-list";
import { fetchReviews } from "@/utils/app/fetch-reviews";
import { createClient } from "@/utils/supabase/server";

export default async function RatingReviewListServer({
	tutor_id,
}: {
	tutor_id: string;
}) {
	const queryClient = new QueryClient();
	const supabase = await createClient();
	await queryClient.prefetchInfiniteQuery({
		queryKey: ["reviews and ratings", tutor_id, ""],
		queryFn: ({ pageParam }) =>
			fetchReviews({ pageParam, tutor_id, supabase, LIMIT: 5 }),
		getNextPageParam: (
			lastPage: TRatingReviewUserViewResult[],
			allPages: TRatingReviewUserViewResult[][],
		) => (lastPage?.length === 5 ? allPages.length * 5 : undefined),
		initialPageParam: 0,
	});
	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<RatingReviewList tutor_id={tutor_id} />
		</HydrationBoundary>
	);
}
