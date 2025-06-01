"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReviewCard from "./review-card";
import { selectRatingReview } from "@/data/queries/rating_and_review/select-rating_review_user_view";
import { createClient } from "@/utils/supabase/client";

const LIMIT = 5;
const fetchReviews = async ({
  pageParam = 0,
  tutor_id,
}: {
  pageParam: number;
  tutor_id: string;
}) => {
  const supabase = createClient();
  const data = await selectRatingReview(supabase, {
    offset: pageParam,
    limit: LIMIT,
    tutor_id,
  });
  return data;
};

const RatingReviewList = ({ tutor_id }: { tutor_id: string }) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["reviews and ratings", tutor_id],
      queryFn: ({ pageParam }) => fetchReviews({ pageParam, tutor_id }),
      getNextPageParam: (lastPage, pages) =>
        lastPage.length === LIMIT ? pages.length * LIMIT : undefined,
      initialPageParam: 0,
    });

  if (status === "pending") return <div>Loading reviews...</div>;
  if (status === "error") return <div>Error loading reviews.</div>;
  
  console.log("fetch in dialog");
    
  return (
    <div>
      <div className="mt-5 flex flex-col md:flex-row gap-2 w-full items-center px-2">
        <input
          type="text"
          placeholder="Search reviews..."
          className="w-full px-3 py-2 text-sm border border-orange-400 rounded-sm focus:outline-none focus:border-orange-800"
        />
        <Button className="w-full md:w-auto rounded-sm">Search</Button>
      </div>

      <ScrollArea className="h-[60vh] md:h-[70vh] p-4 bg-white space-y-4">
        {data.pages.flat().map((rar, index) => (
          <ReviewCard key={index} data={rar} />
        ))}
        {hasNextPage && (
          <div className="text-center mt-4">
            <Button
              variant="outline"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="border border-orange-600 hover:bg-orange-200 text-orange-600 px-4 py-2 text-sm md:text-base cursor-pointer rounded-none"
            >
              {isFetchingNextPage ? "Loading..." : "Show more reviews"}
            </Button>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default RatingReviewList;
