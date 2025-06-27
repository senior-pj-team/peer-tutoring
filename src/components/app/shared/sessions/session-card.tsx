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
import Rating from "../../features/rating-review/rating";
import { Clock, UserRoundCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { getRemainingTime } from "@/utils/app/get-remaining-time";
import { format, formatDate } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { getAvatarFallback } from "@/utils/app/get-avatar-fallback";
import { useEnrollmentCount } from "@/hooks/use-enrollment-count";
import { useSupabase } from "@/hooks/use-supabase";
import { Skeleton } from "@/components/ui/skeleton";

type SessionCardProp = {
	session?: TSessionsResult;
	student_session?: TStudentSessionJoinResult;
	refund_report?: TRefundReportJoinResult;
	page?: string;
};

const SessionCard = ({
	session,
	student_session,
	refund_report,
	page,
}: SessionCardProp) => {
	let ss_id: number | null = null;
	let session_id: number | null = null;
	let ss_status: TStudentSessionStatus | null = null;
	let s_status: TSessionStatus | null = null;
	let rr_status: TRefundStatus | null = null;
	let image: string | null = "";
	let session_name: string | null = "";
	let course_code: string | null = "";
	let course_name: string | null = "";
	let start_time: string | null = null;
	let end_time: string | null = null;
	let profile_url: string | null = "N/A";
	let username: string | null = "";
	let tutor_rating: number | null = 0;
	let tutor_id: string | null = "";
	let enabled: boolean = false;
	if (!student_session && !refund_report && !session) return null;

	if (student_session) {
		session_id = student_session.sessions?.id ?? null;
		ss_id = student_session.id;
		ss_status = student_session.ss_status;
		image = student_session.sessions?.image ?? "";
		session_name = student_session.sessions?.session_name ?? "";
		course_code = student_session.sessions?.course_code ?? "no info";
		course_name = student_session.sessions?.course_name ?? "no info";
		start_time = student_session.sessions?.start_time ?? "";
		end_time = student_session.sessions?.end_time ?? "";
		profile_url =
			student_session.sessions?.tutor?.profile_url ?? "/no-image.png";
		username = student_session.sessions?.tutor?.username ?? "";
		tutor_rating = student_session.sessions?.tutor?.tutor_rating ?? 0;
		tutor_id = student_session.sessions?.tutor?.id ?? "";
	} else if (refund_report) {
		ss_id = refund_report.ss_id;
		rr_status = refund_report.status;
		image = refund_report.student_session.session.image ?? "";
		session_name = refund_report.student_session.session.session_name ?? "";
		course_code =
			refund_report.student_session.session.course_code ?? "no info";
		course_name =
			refund_report.student_session.session.course_name ?? "no info";
		start_time = refund_report.student_session.session.start_time ?? "";
		end_time = refund_report.student_session.session.end_time ?? "";
		profile_url =
			refund_report.student_session.session.tutor?.profile_url ?? "NA";
		username = refund_report.student_session.session.tutor?.username ?? "";
		tutor_rating =
			refund_report.student_session.session?.tutor?.tutor_rating ?? 0;
		tutor_id = refund_report.student_session.session.tutor?.id ?? "";
	} else if (session) {
		session_id = session.id;
		s_status = session.status;
		image = session.image ?? "";
		session_name = session.session_name ?? "";
		course_code = session.course_code ?? "no info";
		course_name = session.course_name ?? "no info";
		start_time = session.start_time ?? "";
		end_time = session.end_time ?? "";
		enabled = true;
	}

	const start = format(start_time!, "hh:mm a");
	const end = format(end_time!, "hh:mm a");
	const date = formatDate(start_time ?? "NA", "yy MMMM dd");
	const remaining_time =
		ss_status == "enrolled" ? getRemainingTime(start_time) : undefined;
	const router = useRouter();
	const supabase = useSupabase();
	const {
		data: enrollments,
		isLoading: enrollment_loading,
		isError: enrollment_error,
	} = useEnrollmentCount(
		session_id ?? 0,
		supabase,
		["enrolled", "completed", "paid"],
		enabled,
	);
	const {
		data: churneds,
		isLoading: churneds_loading,
		isError: churneds_error,
	} = useEnrollmentCount(session_id ?? 0, supabase, ["refunded"], enabled);

	const handleCardClick = () => {
		if (page === "browse") return router.push(`/home/session/${session_id}`);

		const nextPage =
			page === "admin"
				? `/admin-dashboard/session/${1}/content`
				: page === "tutor"
					? `/tutor-dashboard/session/${session_id}/content`
					: `/my-session/${page}/${ss_id}`;

		router.push(nextPage);
	};

	return (
		<Card
			className="cursor-pointer rounded-none pt-0 pb-2"
			onClick={handleCardClick}>
			<CardHeader className="px-0 m-0">
				<div className="relative w-full h-38">
					{image ? (
						<Image
							src={image}
							alt="Card image"
							sizes="12"
							fill
							className="object-cover"
						/>
					) : (
						<span className="flex items-center justify-center w-full h-full text-gray-500 border-b-1 bg-gray-100">
							No Image
						</span>
					)}
				</div>
				<CardTitle className="flex justify-between items-start gap-5 px-3 mt-1 w-full min-w-0">
					<div className="flex-1 min-w-0">
						<h3 className="xl:text-lg md:text-sm font-semibold overflow-hidden text-ellipsis line-clamp-2 leading-tight break-words">
							{session_name}
						</h3>
					</div>

					{remaining_time && (
						<div className="flex items-center gap-1 xl:text-xs md:text-[0.6rem] text-red-700 shrink-0 mt-1">
							<Clock className="w-4 h-4" />
							<span>{remaining_time}</span>
						</div>
					)}
					{rr_status && (
						<div className="flex items-center gap-1 text-xs shrink-0 mt-1">
							<span
								className={cn(
									rr_status === "approved"
										? "text-green-500"
										: rr_status === "rejected"
											? "text-red-500"
											: "text-yellow-500",
								)}>
								{rr_status}
							</span>
						</div>
					)}
				</CardTitle>

				<CardDescription className="px-3 w-full min-w-0 flex lg:text-xs md:text-[0.65rem]">
					<span className="me-1">{course_code}</span>|
					<span className="ms-1 font-medium truncate overflow-hidden text-ellipsis flex-1">
						{course_name}
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
							<span>{start ? start : "-"}</span>
						</div>
						<div className="flex items-center gap-1">
							<span className="font-semibold">End:</span>
							<span>{end ? end : "-"}</span>
						</div>
					</div>
				</div>

				{(s_status === "open" || s_status === "closed") && (
					<div className="px-3 mt-2 w-full">
						<Badge
							variant="outline"
							className={cn(
								"flex gap-1 rounded-full text-xs px-4 py-1 bg-secondary",
								s_status === "open" ? "text-green-600" : " text-red-600",
							)}>
							<span className="text-[0.65rem] md:text-[0.8rem] font-extrabold">
								{s_status.split("")[0].toUpperCase()}
								{s_status.slice(1)}
							</span>
						</Badge>
					</div>
				)}

				<div className="px-3 mt-2 w-full">
					{profile_url !== "N/A" && (
						<div className="flex items-center flex-wrap">
							<div className="relative w-8 h-8 rounded-full overflow-hidden me-3 shrink-0">
								<Avatar>
									<AvatarImage
										src={profile_url}
										width={50}
										height={50}
										alt="User Avatar"
									/>
									<AvatarFallback className="flex items-center justify-center w-full h-full text-center bg-gray-200">
										{username && getAvatarFallback(username)}
									</AvatarFallback>
								</Avatar>
							</div>
							<div className="text-xs underline me-3">
								<Link
									href={`/tutor-view/${tutor_id}`}
									onClick={(e) => e.stopPropagation()}>
									{username ?? "Unknown tutor"}
								</Link>
							</div>
							|
							<Rating className="ms-3" rating={tutor_rating ?? 0} />
						</div>
					)}
					<div className="flex items-center flex-wrap gap-2">
						{enrollments !== null &&
							enrollments !== undefined &&
							(enrollment_error ? null : enrollment_loading ? (
								<Skeleton className="flex gap-1 h-3 w-10 rounded-lg " />
							) : (
								<Badge
									variant="outline"
									className="flex gap-1 rounded-lg text-xs bg-green-100">
									<UserRoundCheck />
									<span className="text-[0.5rem] md:text-[0.6rem] text-gray-800">
										enrollments: {enrollments}
									</span>
								</Badge>
							))}

						{churneds !== null &&
							churneds !== undefined &&
							(churneds_error ? null : churneds_loading ? (
								<Skeleton className="flex gap-1 h-3 w-10 rounded-lg " />
							) : (
								<Badge
									variant="outline"
									className="flex gap-1 rounded-lg text-xs bg-red-100">
									<UserRoundCheck />
									<span className="text-[0.5rem] md:text-[0.6rem] text-gray-800">
										chruned: {churneds}
									</span>
								</Badge>
							))}
					</div>
				</div>
			</CardHeader>
		</Card>
	);
};

export default SessionCard;
