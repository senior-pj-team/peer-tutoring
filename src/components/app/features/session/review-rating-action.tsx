import React from "react";
import RatingReviewBtn from "../rating-review/rating-review-btn";
import RefundReportBtn from "../refund-report/refund-report-btn";
import ShowReviewRating from "../rating-review/show-review-rating";

const ReviewRatingAction = ({ssId, sessionId, toReport}: {ssId: number | null, sessionId: number | null, toReport: boolean}) => {

	return (
		<>
			<ShowReviewRating ssId={ssId}/>
			<RatingReviewBtn ssId={ssId}/>
			{toReport && <RefundReportBtn isReport={true} ssId={ssId}/>}
		</>
	);
};

export default ReviewRatingAction;
