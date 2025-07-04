import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import clsx from "clsx";
import { Star } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";
import { submitRatingReview } from "@/actions/submit-rating-review";
import { useActionState } from "react";
import { toast } from "sonner";
import { LoadingDots } from "../../shared/loading-dots";

const initialState: ActionResponseType<string> = {
	success: false,
	error: {
		message: "",
	},
};

const RatingReviewForm = ({
	ssId,
	setOpen,
}: {
	ssId: number | null;
	setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	const [rating, setRating] = useState(0);
	const [review, setReview] = useState("");
	const [error, setError] = useState(false);
	const [state, action, isPending] = useActionState(
		submitRatingReview,
		initialState,
	);

	useEffect(() => {
		if (state.success) {
			setOpen(false);
			toast.success("Rating and reviews submitted successfully 🎉");
		}
	}, [state]);

	return (
		<div>
			{/* Stars & Textarea */}
			<div className="flex items-center gap-1 my-2">
				{[1, 2, 3, 4, 5].map((star) => (
					<Star
						key={star}
						className={clsx(
							"h-6 w-6 cursor-pointer",
							rating >= star ? "text-yellow-300" : "text-gray-300",
						)}
						onClick={() => setRating(star)}
						strokeWidth={1.5}
						fill={rating >= star ? "#FACC15" : "none"}
					/>
				))}
			</div>
			<Textarea
				placeholder="Write your review here..."
				value={review}
				onChange={(e) => setReview(e.target.value)}
				className="h-[5rem] mt-2 w-full whitespace-normal"
				style={{ overflowWrap: "anywhere" }}
			/>
			{error && (
				<span className="text-xs text-red-500">
					You have to submit either review or rating{" "}
				</span>
			)}
			{!state.success && state.error.message && (
				<span className="text-xs text-red-500">{state.error.message}</span>
			)}

			<form
				action={action}
				onSubmit={(e) => {
					if (!rating || !review.trim()) {
						e.preventDefault();
						setError(true);
						return;
					}

					setError(false);
				}}>
				<input type="hidden" name="ss_id" value={ssId ?? undefined} />
				<input type="hidden" name="rating" value={rating} />
				<input type="hidden" name="review" value={review} />
				<div className="text-right mt-4">
					<Button type="submit" disabled={isPending}>
						{isPending ? (
							<div className="flex items-center gap-1">
								<span>Loading</span>
								<LoadingDots />
							</div>
						) : (
							"Submit"
						)}
					</Button>
				</div>
			</form>
		</div>
	);
};

export default RatingReviewForm;
