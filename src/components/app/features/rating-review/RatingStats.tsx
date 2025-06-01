import React from "react";
import Rating from "./rating";
import { selectRatingStats } from "@/data/queries/rating_and_review/select-rating-count";
import { createClient } from "@/utils/supabase/server";

const RatingStats = async ({ tutor_id }: { tutor_id: string }) => {
  const supabase: TSupabaseClient = await createClient();
  const ratingStats: TRatingStat[] | [] = await selectRatingStats(supabase, {
    tutor_id,
  });

  const total = ratingStats.reduce((sum, item) => sum + item.count, 0);
  const ratings = ratingStats.map((item) => ({
    rating: item.rating,
    percent: Math.round((item.count / total) * 100),
  }));

  return (
    <div className="mt-6 w-full max-w-md px-5 hidden md:block">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Rating Breakdown
      </h3>
      {ratings.map((item, index) => (
        <div key={index} className="flex flex-col gap-1 mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Rating rating={item.rating} size={15} color="text-yellow-500" />
            </div>
            <span className="text-sm text-muted-foreground">{item.percent}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-yellow-500 transition-all duration-300"
              style={{ width: `${item.percent}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default RatingStats;
