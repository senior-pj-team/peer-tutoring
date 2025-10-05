"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Rating from "@/components/app/features/rating-review/rating";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import * as RadixHoverCard from "@radix-ui/react-hover-card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { shimmer, toBase64 } from "@/utils/app/shimmer";
import { getAvatarFallback } from "@/utils/app/get-avatar-fallback";
import { formatDate } from "date-fns";
import { getYear } from "@/utils/app/get-year";
import { GoToChatButton } from "./go-to-chat-button";

export default function TutorCard({
	user,
	tutor,
}: {
	user: UserSession | null;
	tutor: TTutorWithStatsResult[number];
}) {
	const router = useRouter();

	return (
		<Card className="cursor-pointer  max-w-[20rem]  py-2 overflow-hidden  rounded-md shadow-md border-1 border-gray-100 hover:opacity-70">
			<HoverCard>
				<HoverCardTrigger>
					<CardHeader className="p-0">
						<div className="w-full flex justify-center">
							<div
								className={cn(
									"relative w-50 h-50 mb-2 group rounded-full bg-gray-100",
								)}>
								{tutor.profile_url ? (
									<Image
										placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(50, 50))}`}
										src={tutor.profile_url}
										sizes="50"
										alt="Card image"
										fill
										className={cn("object-cover rounded-full")}
									/>
								) : (
									<span className="flex items-center text-6xl justify-center w-full h-full text-gray-500">
										{getAvatarFallback(tutor.username ?? "NA")}
									</span>
								)}
							</div>
						</div>

						<CardTitle>
							<div className="px-3 flex flex-col items-center justify-center w-full">
								<div className="max-w-[full] text-xl truncate mb-2">
									{tutor.username ?? "NA"}
								</div>
								<Rating
									className="ms-0 mb-2"
									rating={tutor.tutor_rating ?? 0}
								/>
								<div className="flex items-center justify-center gap-2 mb-3">
									<div className="flex flex-col gap-1 justify-center">
										<span className="text-sm font-bold text-gray-500">
											📗 Total Sessions
										</span>
										<span className="text-sm font-bold text-gray-500">
											🎓 Total Students
										</span>
										<span className="text-sm font-bold text-gray-500">
											📝 Total Reviews
										</span>
									</div>
									<div className="flex flex-col gap-1 justify-center">
										<span className="text-sm font-bold ">
											{tutor.total_session_count}
										</span>
										<span className="text-sm font-bold">
											{tutor.total_student_count}
										</span>
										<span className="text-sm font-bold">
											{tutor.total_review_count}
										</span>
									</div>
								</div>
								<span
									className="mx-auto text-orange-400 underline hover:text-orange-500  text-md font-bold leading-5.5 md:hidden"
									onClick={(e) => {
										e.stopPropagation();
										router.push(`/home/tutor-view/${tutor.tutor_id}`);
									}}>
									View Profile
								</span>
							</div>
						</CardTitle>
					</CardHeader>
				</HoverCardTrigger>
				<HoverCardContent
					className="w-80 drop-shadow-md py-4 px-5 bg-white hidden md:block"
					side="right"
					sideOffset={-30}>
					<div className="flex flex-col mb-2 ">
						<span className="max-w-[full] font-bold text-2xl truncate mb-1">
							{tutor.username ?? "NA"}
						</span>
						<div className="text-[0.65rem] font-bold text-gray-500 ml-[0.2rem] flex item-centers space-x-1.5">
							<Mail size={12} />
							<span className="text-gray-700 font-extrabold">
								{tutor.email ?? "NA"}
							</span>
						</div>
						<div className="text-[0.65rem] font-bold text-gray-500 ml-[0.2rem] flex item-centers space-x-1.5">
							<Phone size={12} />
							<span className="text-gray-700 font-extrabold">
								{tutor.phone_number ?? "NA"}
							</span>
						</div>
					</div>
					<div className="text-[0.6rem] text-green-800 mb-2">
						Joined{" "}
						<span className="font-extrabold">
							{formatDate(
								tutor.registered_tutor_at ?? Date.now(),
								"dd MMMM yyyy",
							)}
						</span>
					</div>
					<div className="text-[0.6rem] font-extrabold text-gray-800 mb-2">
						<span>{tutor.school ?? "NA"} ● </span>{" "}
						<span>{tutor.major ?? "NA"} ●</span>{" "}
						<span>{getYear(tutor.year)} </span>
					</div>
					<div className=" text-[0.75rem] font-extrabold text-gray-800 mb-1">
						About me
					</div>
					<div className=" overflow-hidden text-[0.65rem] text-ellipsis line-clamp-6 mb-5">
						{tutor.biography ?? "Tutor has not fill any biography"}
					</div>
					<div className="flex w-full gap-x-5 items-center">
						<Button
							onClick={(e) => {
								e.stopPropagation();
								router.push(`/home/tutor-view/${tutor.tutor_id}`);
							}}
							variant="outline"
							className="border-orange-500 text-orange-600 font-semibold hover:bg-orange-50 hover:text-orange-700 hover:border-orange-400 hover:ring-2 hover:ring-orange-500  transition-all duration-200 cursor-pointer">
							View Profile
						</Button>
						{user && (
							<GoToChatButton
								size={28}
								user1_id={tutor.tutor_id}
								user2_id={user.user_id}
							/>
						)}
					</div>
					<RadixHoverCard.Arrow className="fill-white w-4 h-6 drop-shadow-md" />
				</HoverCardContent>
			</HoverCard>
		</Card>
	);
}
