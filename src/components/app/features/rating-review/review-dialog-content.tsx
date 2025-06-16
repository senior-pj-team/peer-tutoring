import { Suspense } from "react";
import RatingReviewListServer from "./rating-review-list-server";
import RatingStats from "./rating-stats";
import RatingStatsSkeleton from "../../shared/skeletons/rating-stats-skeleton";
import {ReviewCardSkeleton} from "../../shared/skeletons/review-card-skeletons";

const ReviewDialogContent = ({ tutor_id }: { tutor_id: string }) => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-[2fr_5fr] gap-6 w-full max-w-6xl mx-auto items-start min-h-[80vh] mt-0 sm:mt-2">
			<Suspense fallback={<RatingStatsSkeleton />}>
				<RatingStats tutor_id={tutor_id} />
			</Suspense>
			<Suspense fallback={<ReviewCardSkeleton/>}>
				<RatingReviewListServer tutor_id={tutor_id} />
			</Suspense>
		</div>
	);
};

export default ReviewDialogContent;
