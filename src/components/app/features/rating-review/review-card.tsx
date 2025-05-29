import React from "react";
import Image from "next/image";
import Link from "next/link";
import Expandable from "../../shared/expandable-text";
import Rating from "./rating";

const ReviewCard = ({ cutAt = 200, data }: { cutAt?: number, data: TRatingReviewUserViewResult }) => {
	const {tutor_name, tutor_profile_url, student_name, student_profile_url, rating, review, created_ago} = data;
	return (
		<div className="border-t border-gray-200 py-5">
			<div className="flex items-center gap-3">
				<div className="relative w-10 h-10 rounded-full overflow-hidden">
					<Image
						src={student_profile_url?? "/profile.jpg"}
						alt="Tutor avatar"
						fill
						className="object-cover"
					/>
				</div>
				<div className="flex flex-col">
					<Link
						href=""
						className="font-semibold text-gray-800 hover:text-orange-500">
						{student_name}
					</Link>
					<div className="flex items-center justify-between">
						<div className="flex items-center mt-[2px]">
							<Rating rating={rating} size={10} />
						</div>
						<div className="text-xs text-gray-700 ms-1">{created_ago}</div>
					</div>
				</div>
			</div>
			<div className="text-sm mt-5">
				<Expandable max={cutAt} text={review} />
			</div>
		</div>
	);
};

export default ReviewCard;
