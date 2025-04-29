"use client";
import React from "react";
import {
	Card,
	CardHeader,
	CardDescription,
	CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import Rating from "../features/rating-review/rating";
import {
	Clock,
	User,
	UserRoundCheck,
	EllipsisVertical,
	Folder,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type SessionCardProp = {
	id: number;
	image?: string;
	sessionName: string;
	courseCode: string;
	courseName: string;
	enroll_status?: string;
	remainingTime?: string;
	date?: string;
	start_time?: string;
	end_time?: string;
	tutor_name?: string;
	tutor_rating?: number;

	status?: string;
	enrollments?: number;
	pending_refund_students?: number;
	refunded_students?: number;
	paid_students?: number;
	action?: string;

	page?: string;
};

const SessionCard = ({
	id,
	image = "",
	sessionName,
	courseCode,
	courseName,
	enroll_status,
	remainingTime,
	date,
	start_time,
	end_time,
	tutor_name,
	tutor_rating,

	status,
	enrollments,
	pending_refund_students,
	refunded_students,
	paid_students,
	action,

	page="my-session"
}: SessionCardProp) => {
	return (
		<Card className="cursor-pointer rounded-none pt-0 pb-2">
			<CardHeader className="px-0 m-0">
				<div className="relative w-full h-38">
					<Image
						src={image}
						alt="Card image"
						sizes="12"
						fill
						className="object-cover"
					/>
					{action && (
						<div className="absolute top-2 right-2 p-2 bg-blue-50/75 rounded-md flex items-center ">
							<DropdownMenu>
								<DropdownMenuTrigger className="cursor-pointer">
									<EllipsisVertical size={20} color="black" />
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuItem className="text-xs flex items-center gap-2">
										{action && (
											<div className="flex items-center gap-x-2">
												<Folder />
												<span> Move to archive</span>
											</div>
										)}
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					)}
				</div>
				<CardTitle className="flex justify-between items-start gap-5 px-3 mt-1 w-full min-w-0">
					<Link href={page=='tutor'?`/tutor-dashboard/session/${id}/content`:`/session/${page}/${id}/content`} className="flex-1 min-w-0">
						<h3 className="xl:text-lg md:text-sm font-semibold overflow-hidden text-ellipsis line-clamp-2 leading-tight break-words">
							{sessionName}
						</h3>
					</Link>

					{remainingTime && (
						<div className="flex items-center gap-1 xl:text-xs md:text-[0.6rem] text-red-700 shrink-0 mt-1">
							<Clock className="w-4 h-4" />
							<span>{remainingTime}</span>
						</div>
					)}
					{enroll_status == "refunded" && (
						<div className="flex items-center gap-1 text-xs shrink-0 mt-1">
							<span className="text-green-500">{enroll_status}</span>
						</div>
					)}
					{
						enroll_status == "pending_refund" &&(
							<div className="flex items-center gap-1 text-xs shrink-0 mt-1">
							<span className="text-yellow-500">pending</span>
						</div>
						)
					}
				</CardTitle>

				<CardDescription className="px-3 w-full min-w-0 flex lg:text-xs md:text-[0.65rem]">
					<span className="me-1">{courseCode}</span>|
					<span className="ms-1 font-medium truncate overflow-hidden text-ellipsis flex-1">
						{courseName}
					</span>
				</CardDescription>

				<div className="px-3 my-2">
					<div className="flex items-center gap-1 text-[0.75rem] text-gray-700 mb-1">
						<span className="font-semibold">Date:</span>
						<span>{date ? date : "TBD"}</span>
					</div>
					<div className="flex items-center gap-4 text-[0.75rem] text-gray-700">
						<div className="flex items-center gap-1">
							<span className="font-semibold">Start:</span>
							<span>{start_time ? start_time : "-"}</span>
						</div>
						<div className="flex items-center gap-1">
							<span className="font-semibold">End:</span>
							<span>{end_time ? end_time : "-"}</span>
						</div>
					</div>
				</div>

				{status && (
					<div className="px-3 mt-2 w-full">
						<Badge
							variant="outline"
							className={cn(
								"flex gap-1 rounded-full text-xs px-4 py-1 bg-secondary",
								status === "open" ? "text-green-600" : " text-red-600",
							)}>
							<span className="text-[0.65rem] md:text-[0.8rem] font-extrabold">
								{status.split("")[0].toUpperCase()}
								{status.slice(1)}
							</span>
						</Badge>
					</div>
				)}

				<div className="px-3 mt-2 w-full">
					{!enrollments && !pending_refund_students && !refunded_students && (
						<div className="flex items-center flex-wrap">
							<div className="relative w-8 h-8 rounded-full overflow-hidden me-3 shrink-0">
								<Image
									src="/profile.jpg"
									alt="Tutor avatar"
									fill
									className="object-fill"
								/>
							</div>
							<div className="text-xs underline me-3">
								<Link href={"/tutor-view"}>{tutor_name ? tutor_name : "Unknown Tutor"}</Link>
							</div>
							|
							<Rating className="ms-3" rating={tutor_rating ? tutor_rating : 0} />
						</div>
					)}
					<div className="flex items-center flex-wrap gap-2">
						{(enrollments || 0) != 0 && (
							<Badge
								variant="outline"
								className="flex gap-1 rounded-lg text-xs bg-green-100">
								<UserRoundCheck />
								<span className="text-[0.5rem] md:text-[0.6rem] text-gray-800">
									enrollments: {enrollments}
								</span>
							</Badge>
						)}
						{(pending_refund_students || 0) !=0 && (
							<Badge
								variant="outline"
								className="flex gap-1 rounded-lg text-xs bg-orange-100">
								<UserRoundCheck />
								<span className="text-[0.5rem] md:text-[0.6rem] text-gray-800">
									disputes: {pending_refund_students}
								</span>
							</Badge>
						)}
						{(refunded_students || 0) !=0 && (
							<Badge
								variant="outline"
								className="flex gap-1 rounded-lg text-xs bg-red-100">
								<UserRoundCheck />
								<span className="text-[0.5rem] md:text-[0.6rem] text-gray-800">
									refunded: {refunded_students}
								</span>
							</Badge>
						)}
						{(paid_students || 0) !=0 && (
							<Badge
								variant="outline"
								className="flex gap-1 rounded-lg text-xs bg-green-300">
								<UserRoundCheck />
								<span className="text-[0.5rem] md:text-[0.6rem] text-gray-800">
									released: {paid_students}
								</span>
							</Badge>
						)}
					</div>
				</div>
			</CardHeader>
		</Card>
	);
};

export default SessionCard;
