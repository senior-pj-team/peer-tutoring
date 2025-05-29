import React from "react";
import ReviewCard from "../rating-review/review-card";
import { selectRatingReview } from "@/data/queries/rating_and_review/select-rating_review_user_view";

const RatingReviewList = async ({tutor_id, supabase}: {tutor_id: string, supabase: TSupabaseClient}) => {
  const rating_reviews: TRatingReviewUserViewResult[] | null = await selectRatingReview(supabase, 1, 4, {tutor_id: tutor_id})
  return (
    <>
      {
        rating_reviews.map((rar: TRatingReviewUserViewResult)=>{
          return <ReviewCard  key={rar.rar_id} data={rar}/>
        })
      }
    </>
  );
};

export default RatingReviewList;
