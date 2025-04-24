import React from "react";
import {
	Card,
	CardHeader,
	CardDescription,
	CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import Rating from "../rating-review-report-refund/rating";
import {
	Clock,
	UserRoundCheck,
	EllipsisVertical,
	Folder,
	Trash2,
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
	sessionName: string;
	courseCode: string;
	courseName: string;
	cardType?: string;
	remainingTime?: string;
	status?: string;
	enrollments?: number;
	dispute_students?: number;
	refunded_students?: number;
	released_students?: number;
	action?: string;
};

const SessionCard = ({
	sessionName,
	courseCode,
	courseName,
	remainingTime,
	status,
	enrollments,
	dispute_students,
	refunded_students,
	released_students,
	action,
	cardType,
}: SessionCardProp) => {
	return (
		<Card className="cursor-pointer rounded-none pt-0 pb-2">
			<CardHeader className="px-0 m-0">
				<div className="relative w-full h-38">
					<Image
						src={"/React.png"}
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
									<DropdownMenuItem
										className={cn(
											"text-xs flex items-center gap-2",
											action === "Delete"
												? "text-red-500 focus:text-red-500"
												: "",
										)}>
										{action === "archive" && <Folder />}
										{action === "Delete" && <Trash2 color="red" />}
										{action === "archive" && "Move to "}
										{action}
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					)}
				</div>
				<CardTitle className="flex justify-between items-center gap-5 px-3 mt-1 w-full min-w-0">
					<h3 className="xl:text-lg md:text-sm font-semibold truncate overflow-hidden text-ellipsis flex-1 xl:py-2 mb-0 ">
						{sessionName}
					</h3>

					{remainingTime && (
						<div className="flex items-center gap-1 xl:text-xs md:text-[0.6rem] text-red-700 shrink-0">
							<Clock className="w-4 h-4" />
							<span>{remainingTime}</span>
						</div>
					)}
					{cardType == "refunding" && (
						<div className="flex items-center gap-1 text-xs shrink-0">
							<span className="text-green-500">Refunded</span>
						</div>
					)}
				</CardTitle>
				<CardDescription className="px-3 w-full min-w-0 flex lg:text-xs md:text-[0.65rem]">
					<span className="me-1 ">{courseCode}</span>|
					<span className="ms-1 font-medium truncate overflow-hidden text-ellipsis flex-1">
						{courseName}
					</span>
				</CardDescription>
				<div className="px-3 my-2">
					<div className="flex items-center gap-1 text-[0.75rem] text-gray-700 mb-1">
						<span className="font-semibold">Date:</span>
						<span>01 May 2025</span>
					</div>
					<div className="flex items-center gap-4 text-[0.75rem] text-gray-700">
						<div className="flex items-center gap-1">
							<span className="font-semibold">Start:</span>
							<span>10:00 AM</span>
						</div>
						<div className="flex items-center gap-1">
							<span className="font-semibold">End:</span>
							<span>11:00 AM</span>
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
								{status.slice(1, status.length)}
							</span>
						</Badge>
					</div>
				)}
				<div className="px-3 mt-2 w-full">
					{!enrollments && !dispute_students && !refunded_students && (
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
								<Link href={""}>John Doe</Link>
							</div>
							|
							<Rating className="ms-3" rating={4.95} />
						</div>
					)}
					<div className="flex items-center flex-wrap gap-2">
						{enrollments && (
							<>
								<Badge
									variant="outline"
									className="flex gap-1 rounded-lg text-xs bg-green-100">
									<UserRoundCheck />
									<span className="text-[0.5rem] md:text-[0.6rem] text-gray-800">
										enrollments: {enrollments}
									</span>
								</Badge>
							</>
						)}
						{dispute_students && (
							<>
								<Badge
									variant="outline"
									className="flex gap-1 rounded-lg text-xs bg-orange-100">
									<UserRoundCheck />
									<span className="text-[0.5rem] md:text-[0.6rem] text-gray-800">
										disputes: {dispute_students}
									</span>
								</Badge>
							</>
						)}
						{refunded_students && (
							<>
								<Badge
									variant="outline"
									className="flex gap-1 rounded-lg text-xs bg-red-100">
									<UserRoundCheck />
									<span className="text-[0.5rem] md:text-[0.6rem] text-gray-800">
										refunded: {refunded_students}
									</span>
								</Badge>
							</>
						)}
						{released_students && (
							<>
								<Badge
									variant="outline"
									className="flex gap-1 rounded-lg text-xs bg-green-300">
									<UserRoundCheck />
									<span className="text-[0.5rem] md:text-[0.6rem] text-gray-800">
										released: {refunded_students}
									</span>
								</Badge>
							</>
						)}
					</div>
				</div>
				<div></div>
			</CardHeader>
		</Card>
	);
};

export default SessionCard;
