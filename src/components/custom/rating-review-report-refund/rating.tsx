import React from "react";
import { Star } from "lucide-react";
import clsx from "clsx";

const Rating = ({
	className,
	rating,
	showText = true,
}: {
	className?: string;
	rating: number;
	showText?: boolean
}) => {
	return (
		<div className={"flex items-center text-sm " + className}>
			{[1, 2, 3, 4, 5].map((star) => (
				<Star
					key={star}
					className={clsx(
						"w-3 h-3",
						rating >= star ? "text-yellow-300" : "text-gray-300",
					)}
					fill="currentColor"
				/>
			))}
			{
				showText && <p className="ms-1 text-xs font-medium text-gray-500 dark:text-gray-400">
					{rating}
				</p>
			}
			{
				showText && <p className="ms-1 text-xs font-medium text-gray-500 dark:text-gray-400">
					out of
				</p>
			}
			{
				showText && <p className="ms-1 text-xs font-medium text-gray-500 dark:text-gray-400">
					5
				</p>
			}
		</div>
	);
};

export default Rating;
