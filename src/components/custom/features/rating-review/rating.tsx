import React from "react";
import { Star } from "lucide-react";
import clsx from "clsx";

const Rating = ({
	className,
	rating,
	showText = true,
	size = 10,
	color = "text-yellow-700",
}: {
	className?: string;
	rating: number;
	showText?: boolean;
	size?: number;
	color?: string;
}) => {
	return (
		<div className={"flex items-center text-sm " + className}>
			{[1, 2, 3, 4, 5].map((star) => (
				<Star
					key={star}
					size={size}
					className={clsx(rating >= star ? color : "text-gray-300")}
					fill="currentColor"
				/>
			))}
			<div className="ms-3">
				{showText && (
					<p className=" text-xs font-medium text-gray-500  text-center">
						{rating} / 5
					</p>
				)}
			</div>
		</div>
	);
};

export default Rating;
