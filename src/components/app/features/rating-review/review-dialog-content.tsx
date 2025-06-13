import RatingReviewListServer from "./rating-review-list-server";
import RatingStats from "./rating-stats";

const ReviewDialogContent = ({ tutor_id }: { tutor_id: string }) => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-[2fr_5fr] gap-6 w-full max-w-6xl mx-auto items-start min-h-[80vh] mt-0 sm:mt-2">
			<RatingStats tutor_id={tutor_id} />
			<RatingReviewListServer tutor_id={tutor_id} />
		</div>
	);
};

export default ReviewDialogContent;
