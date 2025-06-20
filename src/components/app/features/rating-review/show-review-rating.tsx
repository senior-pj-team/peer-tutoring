import React from "react";
import Rating from "./rating";
import Expandable from "../../shared/expandable-text";
import { getRatingReview } from "@/data/queries/rating-and-review/get-rating-review-user-view";
import { createClient } from "@/utils/supabase/server";
import GeneralError from "../../shared/error";

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
		<div className="max-h-[20rem] overflow-y-auto space-y-4 p-2 border rounded bg-white shadow-inner">
			{reviews.map((rar, index) => (
				<div
					key={index}
					className="p-4 border border-gray-200 rounded-lg bg-gray-50 shadow-sm"
				>
					<div className="flex justify-between items-center mb-2">
						<span className="text-sm text-gray-700 font-medium">
							Your Rating
						</span>
						<Rating rating={rar.rating ?? 0} />
					</div>
					<div>
						<h4 className="text-sm text-gray-800 font-semibold mb-1">
							Your Review
						</h4>
						<p className="text-gray-600 text-start">{rar?.review ?? "NA"}</p>
					</div>
				</div>
			))}
		</div>
	);
};

export default ShowReviewRating;
