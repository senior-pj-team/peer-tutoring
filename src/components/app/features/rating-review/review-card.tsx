import React from "react";
import Image from "next/image";
import Link from "next/link";
import Expandable from "../../shared/expandable-text";
import Rating from "./rating";

const ReviewCard = ({ cutAt = 200 }: { cutAt?: number }) => {
	const review =
		"Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor corporis recusandae dolorem aliquam aut? In recusandae nulla culpa, cupiditate voluptatibus adipisci alias excepturi, pariatur quasi quis quidem explicabo vitae fuga?Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor corporis recusandae dolorem aliquam aut? In recusandae nulla culpa, cupiditate voluptatibus adipisci alias excepturi, pariatur quasi quis quidem explicabo vitae fuga?Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor corporis recusandae dolorem aliquam aut? In recusandae nulla culpa, cupiditate voluptatibus adipisci alias excepturi, pariatur quasi quis quidem explicabo vitae fuga?Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor corporis recusandae dolorem aliquam aut? In recusandae nulla culpa, cupiditate voluptatibus adipisci alias excepturi, pariatur quasi quis quidem explicabo vitae fuga?";
	return (
		<div className="border-t border-gray-200 py-5">
			<div className="flex items-center gap-3">
				<div className="relative w-10 h-10 rounded-full overflow-hidden">
					<Image
						src="/profile.jpg"
						alt="Tutor avatar"
						fill
						className="object-cover"
					/>
				</div>
				<div className="flex flex-col">
					<Link
						href=""
						className="font-semibold text-gray-800 hover:text-orange-500">
						John Doe
					</Link>
					<div className="flex items-center justify-between">
						<div className="flex items-center mt-[2px]">
							<Rating rating={4} size={10} />
						</div>
						<div className="text-xs text-gray-700 ms-1">a week ago</div>
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
