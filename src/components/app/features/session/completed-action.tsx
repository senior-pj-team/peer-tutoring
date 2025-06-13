import React from "react";
import RatingReviewBtn from "../rating-review/rating-review-btn";
import RefundReportBtn from "../refund-report/refund-report-btn";
import ShowReviewRating from "../rating-review/show-review-rating";

const CompletedAction = ({sessionId}: {sessionId: number | null}) => {

	return (
		<>
			<ShowReviewRating sessionId={sessionId}/>
			<RatingReviewBtn />
			<RefundReportBtn isReport={true} />
		</>
	);
};

export default CompletedAction;
