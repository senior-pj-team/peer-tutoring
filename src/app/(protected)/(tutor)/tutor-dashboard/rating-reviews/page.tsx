import ReviewDialogContent from "@/components/app/features/rating-review/review-dialog-content";
import { Star } from "lucide-react";
import React from "react";

const page = () => {
	return (
		<>
			<div className="flex flex-wrap gap-3 items-center text-base md:text-lg font-bold mt-2">
				<div className="flex gap-2 items-center">
					<Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
					<span>4.7 Overall rating</span>
				</div>
				<span className="hidden sm:inline">|</span>
				<span>86 ratings and reviews</span>
			</div>
			{/* <ReviewDialogContent /> */}
		</>
	);
};

export default page;
