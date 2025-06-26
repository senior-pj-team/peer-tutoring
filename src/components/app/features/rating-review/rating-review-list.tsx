'use client'
import { useEffect, useState } from "react";
import ReviewCard from "./review-card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useInfiniteRatingReviews } from "@/hooks/use-infinite-rating-review";

export default function RatingReviewList({ tutor_id }: { tutor_id: string }) {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchTerm(searchInput);
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchInput]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isLoading,
  } = useInfiniteRatingReviews({ tutor_id, searchTerm });

  const reviews = data?.pages.flat() || [];

  return (
    <div>
      <div className="mt-5 flex flex-col md:flex-row gap-2 w-full items-center px-2">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search reviews..."
          className="w-full px-3 py-2 text-sm border border-orange-400 rounded-xl focus:outline-none focus:border-orange-800"
        />
      </div>

      <ScrollArea className="h-[60vh] md:h-[70vh] p-4 bg-white space-y-4">
        {isLoading && reviews.length === 0 ? (
          <div>Loading reviews...</div>
        ) : reviews.length > 0 ? (
          reviews.map((rar, index) =>
            rar ? <ReviewCard key={index} data={rar} /> : null
          )
        ) : (
          <div className="text-center text-gray-500 mt-10">No reviews found.</div>
        )}

        {isError && (
          <div className="text-center text-sm text-red-600 mt-4">
            Failed to load more reviews. Please try again.
          </div>
        )}

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
}
