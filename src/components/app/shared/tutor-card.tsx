"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Rating from "@/components/app/features/rating-review/rating";
import Image from "next/image";
import { MessageCircleCode, Mail, Phone } from "lucide-react";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import * as RadixHoverCard from "@radix-ui/react-hover-card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function TutorCard({
	name,
	totalSessions,
	totalStudents,
	image,
}: {
	name: string;
	totalSessions: number;
	totalStudents: number;
	image: string;
}) {
	const router = useRouter();
	return (
		<Card className="cursor-pointer shadow-none border-none max-w-[20rem] pt-0 pb-2 overflow-hidden">
			<HoverCard>
				<HoverCardTrigger>
					<CardHeader className="p-0">
						{" "}
						<div className="relative mx-auto">
							<Image
								src={image}
								alt="tutor image"
								className="rounded-full object-cover bg-clip-border border-4 bg-indigo-500"
								width={180}
								height={150}
							/>
						</div>
						<CardTitle>
							<div className="px-3 flex flex-col items-center justify-center w-full">
								<div className="max-w-[full] text-xl truncate mb-2">{name}</div>
								<Rating className="ms-0 mb-2" rating={4.5} />
								<div className="flex items-center justify-center gap-2 mb-2">
									<div className="flex flex-col gap-1 justify-center">
										<span className="text-sm font-bold text-gray-500">
											Total Sessions -{" "}
										</span>
										<span className="text-sm font-bold text-gray-500">
											Total Students -{" "}
										</span>
									</div>
									<div className="flex flex-col gap-1 justify-center">
										<span className="text-sm font-medium ">
											{totalSessions}
										</span>
										<span className="text-sm font-medium">{totalStudents}</span>
									</div>
								</div>

								<span
									className="mx-auto text-orange-400 underline hover:text-orange-500  text-md font-bold leading-5.5 md:hidden"
									onClick={(e) => {
										e.stopPropagation();
										router.push("/tutor-view");
									}}>
									View Profile
								</span>
							</div>
						</CardTitle>
					</CardHeader>
				</HoverCardTrigger>
				<CustomHoverCard />
			</HoverCard>
		</Card>
	);
}

function CustomHoverCard() {
	const router = useRouter();

	return (
		<HoverCardContent
			className="w-80 drop-shadow-md py-4 px-5 bg-white hidden md:block"
			side="right"
			sideOffset={-30}>
			<div className="flex flex-col mb-2 ">
				<span className="max-w-[full] font-bold text-2xl truncate">
					John Mayer
				</span>
				<div className="text-[0.65rem] font-bold text-gray-500 ml-[0.2rem] flex item-centers space-x-1.5">
					<Mail size={12} />
					<span className="text-gray-700 font-extrabold">john@example.com</span>
				</div>
				<div className="text-[0.65rem] font-bold text-gray-500 ml-[0.2rem] flex item-centers space-x-1.5">
					<Phone size={12} />
					<span className="text-gray-700 font-extrabold">+66 847782371</span>
				</div>
			</div>
			<div className="text-[0.6rem] text-green-800 mb-2">
				Joined May <span className="font-extrabold">2025</span>
			</div>
			<div className="text-[0.6rem] font-extrabold text-gray-800 mb-2">
				<span>Third Year ● </span> <span> ADT ● </span>{" "}
				<span>Computer Engineering </span>
			</div>
			<div className=" text-[0.75rem] font-extrabold text-gray-800 mb-1">
				About me
			</div>
			<div className=" overflow-hidden text-[0.65rem] text-ellipsis line-clamp-6 mb-5">
				Hello! I&apos; Alex, a passionate and experienced tutor dedicated to
				helping students reach their full academic potential. With over 3 years
				of tutoring experience, I specialize in subjects like Mathematics,
				Physics, and Computer Science, offering clear explanations, real-world
				examples, and personalized support. Whether you&apos;re struggling with
				fundamentals or aiming for top grades, I adapt my teaching to your pace
				and learning style. I believe that learning should be engaging,
				supportive, and confidence-building, and I take pride in seeing my
				students grow both academically and personally. Sessions are
				interactive, goal-oriented, and focused on practical understanding — not
				just memorization.
			</div>
			<div className="flex w-full justify-between items-center">
				<Button
					onClick={(e) => {
						e.stopPropagation();
						router.push("/tutor-view");
					}}
					variant="outline"
					className="border-orange-500 text-orange-600 font-semibold hover:bg-orange-50 hover:text-orange-700 hover:border-orange-400 hover:ring-2 hover:ring-orange-500  transition-all duration-200 cursor-pointer">
					View Profile
				</Button>
				<MessageCircleCode
					onClick={(e) => {
						e.stopPropagation();
						router.push("/chat");
					}}
					size={40}
					className=" text-orange-500 hover:text-orange-600 transition-colors duration-200 cursor-pointer p-1 rounded-full hover:bg-orange-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 w-15"
				/>
			</div>
			<RadixHoverCard.Arrow className="fill-white w-4 h-6 drop-shadow-md" />
		</HoverCardContent>
	);
}
