import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const Rating = ({
	searchBar,
	className,
	rating,
	showText = true,
	size = 10,
	color = "text-yellow-700",
}: {
	searchBar?: boolean;
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
					className={cn(rating >= star ? color : "text-gray-300")}
					fill="currentColor"
				/>
			))}
			<div className={cn(searchBar ? "ms-2" : "ms-3")}>
				{showText && (
					rating > 0 ?
						(
							<p
								className={cn(
									searchBar
										? "text-[0.65rem] font-medium text-gray-500 text-center"
										: "text-xs font-medium text-gray-500 text-center",
								)}>
								{Math.floor(rating * 10) / 10} / 5
								{/* truncated */}
							</p>
						)
						: (
							<p className="text-xs font-medium text-gray-500 text-center">No tutor rating</p>
						)
				)}
			</div>
		</div>
	);
};

export default Rating;
