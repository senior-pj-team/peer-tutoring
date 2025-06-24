import React from "react";
import Rating from "./rating";
import { getRatingReview } from "@/data/queries/rating-and-review/get-rating-review-user-view";
import { createClient } from "@/utils/supabase/server";
import GeneralError from "../../shared/error";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDate } from "date-fns";

const ShowReviewRating = async ({ ssId }: { ssId: number | null }) => {
	const supabase = await createClient();
	if (!supabase || !ssId) return <GeneralError />;

	const reviews = await getRatingReview(supabase, { ss_id: ssId });

	if (!reviews || reviews.length === 0) {
		return (
			<div className="text-sm text-gray-500 border border-dashed border-gray-300 p-4 mt-2 rounded">
				You haven't submitted any ratings or reviews yet.
			</div>
		);
	}

	return (
		<ScrollArea className="h-36 overflow-y-auto">
			<div className="bg-white rounded-lg shadow overflow-hidden">
				{reviews.map((r, idx) => (
					<div
						key={idx}
						className={`flex flex-col md:flex-row justify-between p-4 ${
							idx < reviews.length - 1 ? "border-b border-gray-200" : ""
						}`}>
						<div className="flex-1">
							<p className="text-gray-800 text-sm mb-2">
								{r.review ?? "No comment provided."}
							</p>
							<Rating rating={r.rating ?? 0} />
						</div>

						{/* Date */}
						<div className="mt-2 md:mt-0 md:ml-4 flex-shrink-0">
							<div className="text-gray-500 text-xs">
								{formatDate(r.created_at ?? "", "dd MMMM yy")}
							</div>
						</div>
					</div>
				))}
			</div>
		</ScrollArea>
	);
};

export default ShowReviewRating;
