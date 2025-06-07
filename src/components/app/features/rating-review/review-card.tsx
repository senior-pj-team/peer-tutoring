import React from "react";
import Image from "next/image";
import Link from "next/link";
import Expandable from "../../shared/expandable-text";
import Rating from "./rating";

const ReviewCard = ({
  cutAt = 200,
  data,
  showTutor = false,
}: {
  cutAt?: number;
  data: TRatingReviewUserViewResult;
  showTutor?: boolean;
}) => {
  const {
    tutor_name,
    tutor_image,
    student_name,
    student_image,
    rating,
    review,
    created_ago,
    session_name,
  } = data;

  return (
    <div className="border border-gray-200 p-5 shadow-sm bg-white hover:shadow-md transition-shadow duration-200 mb-2">
      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-300">
          <Image
            src={student_image ?? "/profile.jpg"}
            alt={`${student_name}'s avatar`}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <Link
            href="#"
            className="font-medium text-gray-900 hover:text-orange-500 transition-colors duration-200"
          >
            {student_name}
          </Link>
          <div className="flex items-center text-sm text-gray-600 mt-1">
            <Rating rating={rating ?? 0} size={12} />
            <span className="ml-4 text-xs text-gray-500">{created_ago} days ago</span>
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-700 mb-3">
        <Expandable max={cutAt} text={review ?? "NA"} />
      </div>

      <div className="text-xs text-gray-600 mb-1">
        <span className="font-semibold text-gray-800">Session:</span> {session_name ?? "NA"}
      </div>

      {showTutor && (
        <div className="flex items-center gap-3 mt-3 border-t pt-3 border-gray-100">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-300">
            <Image
              src={tutor_image ?? "/profile.jpg"}
              alt={`${tutor_name}'s avatar`}
              fill
              className="object-cover"
            />
          </div>
          <Link
            href="#"
            className="text-sm font-medium text-gray-800 hover:text-orange-500 transition-colors duration-200"
          >
            {tutor_name}
          </Link>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
