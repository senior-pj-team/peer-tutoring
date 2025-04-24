import React from "react";
import RatingReviewBtn from "../rating-review-report-refund/rating-review-btn";
import RefundReportBtn from "../rating-review-report-refund/refund-report-btn";
import ShowReviewRating from "../rating-review-report-refund/show-review-rating";

const CompletedAction = () => {
	return (
		<>
			<ShowReviewRating />
			<RatingReviewBtn />
			<RefundReportBtn isReport={true} />
		</>
	);
};

export default CompletedAction;
