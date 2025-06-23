import React from "react";
import RatingReviewBtn from "../rating-review/rating-review-btn";
import RefundReportBtn from "../refund-report/refund-report-btn";
import ShowReviewRating from "../rating-review/show-review-rating";

const ReviewRatingAction = ({ssId, toReport}: {ssId: number | null, toReport: boolean}) => {

	return (
		<>
			<ShowReviewRating ssId={ssId}/>
			<RatingReviewBtn ssId={ssId}/>
			{toReport && <RefundReportBtn isReport={true} ssId={ssId}/>}
		</>
	);
};

export default ReviewRatingAction;
