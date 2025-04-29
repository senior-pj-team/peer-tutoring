"use client";
import { Card, CardHeader } from "@/components/ui/card";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Heart } from "lucide-react";

import * as RadixHoverCard from "@radix-ui/react-hover-card";
import Image from "next/image";
import Rating from "../features/rating-review/rating";
import { ClockAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import clsx from "clsx";

type Session = {
	id: number;
	sessionName: string;
	courseCode: string;
	courseName: string;
	school: string;
	major: string;
	price: string;
	remaining?: string;
	description: string;
	tutor: string;
	rating: string;
	type?: string;
	from: string;
	to: string;
	date: string;
	page: string;
};
export default function GeneralSessionCard({
	content,
	type,
	className,
}: {
	content: Session;
	type?: string;
	className?: string;
}) {
	const router = useRouter();
	return (
		<div>
			<Card
				className={clsx(
					"cursor-pointer pt-0 pb-2 px-3 border-none shadow-none group",
					className,
				)}
				onClick={() => {
					router.push(`/session/${content.page}/${content.id}/content`);
				}}>
				<HoverCard openDelay={0} closeDelay={0}>
					<HoverCardTrigger>
						{" "}
						<CardHeader className="px-0 m-0 gap-0">
							<div
								className={clsx(
									"relative w-full h-38  mb-2 group rounded-md ",
									className,
								)}>
								<Image
									src={"/React.png"}
									alt="Card image"
									fill
									className={clsx("object-cover rounded-md", className)}
								/>
								<div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-200 rounded-md" />
							</div>

							<p className="line-clamp-2 font-extrabold leading-tight text-[1.15rem] mb-1 ">
								{content.sessionName}
							</p>
							<span className="line-clamp-1 font-extrabold text-[0.75rem] text-gray-500 underline mb-1">
								Tutor {content.tutor}
							</span>

							<Rating className="ms-0 mb-1" rating={4.4} />
							<div className="flex justify-between items-center">
								<span className="font-extrabold text-black text-[0.98rem]">
									{content.type === "free" ? "Free" : `฿${content.price}`}
								</span>
								{type === "closing" && (
									<div className="flex items-center gap-1 ">
										<span className="text-[0.75rem] text-red-800 font-bold">
											remaining {content.remaining}
										</span>
										<ClockAlert
											size={15}
											className="text-[0.75rem] text-red-600 font-extrabold"
										/>
									</div>
								)}
							</div>
						</CardHeader>
					</HoverCardTrigger>
					<CustomHoverCard content={content} />
				</HoverCard>
			</Card>
		</div>
	);
}

function CustomHoverCard({ content }: { content: Session }) {
	return (
		<HoverCardContent
			className="w-80 drop-shadow-md py-4 px-5 bg-white hidden md:block"
			side="right"
			sideOffset={-30}>
			<div className="flex flex-col mb-1">
				<span className="max-w-[full] font-bold text-2xl line-clamp-2">
					{content.sessionName}
				</span>
				<div className="text-[0.65rem] font-bold text-gray-500 ml-[0.2rem] flex items-center space-x-1.5">
					<span className="text-gray-700 font-extrabold">
						{content.courseName} |
					</span>
					<span className="text-gray-700 font-extrabold">
						{content.courseCode}
					</span>
				</div>
			</div>

			<div className="text-[0.6rem] font-extrabold text-gray-800 mb-2 ml-[0.2rem]">
				<span> {content.school} ● </span> <span>{content.major}</span>
			</div>
			<div className="text-[0.75rem] font-extrabold text-gray-900 mb-1 ml-[0.2rem]">
				Date: <span className="font-medium">{content.date}</span>
			</div>
			<div className="text-[0.75rem] font-extrabold text-gray-800 mb-2 ml-[0.2rem]">
				<span>
					From{" "}
					<span className="text-green-700 text-[0.8rem]">{content.from}</span>
				</span>{" "}
				<span>
					To <span className="text-green-700 text-[0.8rem]">{content.to}</span>
				</span>
			</div>
			<div className=" text-[0.75rem] font-extrabold text-gray-800 mb-1 ml-[0.2rem]">
				Description
			</div>
			<div className=" overflow-hidden text-[0.65rem] text-ellipsis line-clamp-6 mb-6 ml-[0.2rem]">
				{content.description}
			</div>

			<div className="flex w-full justify-end gap-5 items-center">
				<Button
					variant="outline"
					className="border-orange-500 text-orange-600 font-semibold hover:bg-orange-50 hover:text-orange-700 hover:border-orange-400 hover:ring-2 hover:ring-orange-500  transition-all duration-200 cursor-pointer">
					Enroll Now
				</Button>
				<Heart
					size={40}
					className="w-10 h-10 p-2 border border-orange-500 rounded-full text-orange-500 hover:text-orange-600 hover:bg-orange-100 transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"></Heart>
			</div>
			<RadixHoverCard.Arrow className="fill-white w-4 h-6 drop-shadow-md" />
		</HoverCardContent>
	);
}
