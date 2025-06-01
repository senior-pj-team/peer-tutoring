import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import ReviewDialogContent from "../rating-review/review-dialog-content";
import { selectRatingReview } from "@/data/queries/rating_and_review/select-rating_review_user_view";
import ReviewCard from "../rating-review/review-card";

const TutorRARSection = async ({
  supabase,
  tutor_id,
  overallRating,
  rarCount,
  initialSize
}: {
  supabase: TSupabaseClient;
  tutor_id: string;
  overallRating: number;
  rarCount: number;
  initialSize: number;
}) => {
  let rating_reviews: TRatingReviewUserViewResult[] | null = null;
  rating_reviews = await selectRatingReview(supabase, {
    tutor_id: tutor_id,
    offset: 0,
    limit: initialSize,
  });
  return (
    <>
      {rating_reviews && (
        <div className="grid gap-6 my-4 grid-cols-[repeat(auto-fit,minmax(350px,1fr))]">
          {rating_reviews.map((rar, index) => (
            <ReviewCard key={index} data={rar} />
          ))}
        </div>
      )}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="border border-orange-600 hover:bg-orange-200 text-orange-600 px-4 py-2 text-sm md:text-base rounded-none"
          >
            View all reviews
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] max-h-[90vh] overflow-y-clip">
          <DialogHeader>
            <DialogTitle>
              <div className="flex flex-wrap gap-3 items-center text-base md:text-lg font-bold">
                <div className="flex gap-2 items-center">
                  <Star
                    className="w-4 h-4 text-yellow-500"
                    fill="currentColor"
                  />
                  <span>{overallRating} Overall Rating</span>
                </div>
                <span className="hidden sm:inline">|</span>
                <span className="hidden sm:inline">{rarCount} Reviews</span>
              </div>
            </DialogTitle>
          </DialogHeader>
          <ReviewDialogContent tutor_id={tutor_id} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TutorRARSection;
