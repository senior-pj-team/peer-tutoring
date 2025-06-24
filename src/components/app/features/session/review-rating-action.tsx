import React, { Suspense } from "react";
import RatingReviewBtn from "../rating-review/rating-review-btn";
import RefundReportBtn from "../refund-report/refund-report-btn";
import ShowReviewRating from "../rating-review/show-review-rating";
import { Skeleton } from "@/components/ui/skeleton";

<<<<<<< HEAD
const ReviewRatingAction = ({ssId, toReport}: {ssId: number | null, toReport: boolean}) => {

	return (
		<>
			<ShowReviewRating ssId={ssId}/>
			<RatingReviewBtn ssId={ssId}/>
			{toReport && <RefundReportBtn isReport={true} ssId={ssId}/>}
=======
const ReviewRatingAction = ({
	ssId,
	toReport,
}: {
	ssId: number | null;
	toReport: boolean;
}) => {
	return (
		<>
			<div className="text-lg font-bold my-2">Your Reviews</div>
			<Suspense
				fallback={
					<Skeleton className="text-sm text-gray-500 border-gray-300 p-4 w-full h-20 mt-2 rounded" />
				}>
				<ShowReviewRating ssId={ssId} />
			</Suspense>

			<RatingReviewBtn ssId={ssId} />
			{toReport && <RefundReportBtn isReport={true} ssId={ssId} />}
>>>>>>> main
		</>
	);
};

export default ReviewRatingAction;
