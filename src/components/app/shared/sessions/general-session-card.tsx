"use client";
import { Card, CardHeader } from "@/components/ui/card";
import { HoverCard, HoverCardTrigger } from "@/components/ui/hover-card";
import Image from "next/image";
import Rating from "../../features/rating-review/rating";
import { useRouter } from "next/navigation";
import { CustomHoverCard } from "./custom-hover-card";
import { shimmer, toBase64 } from "@/utils/app/shimmer";
import { getRemainingTime } from "@/utils/app/get-remaining-time";
import { cn } from "@/lib/utils";
import { subHours } from "date-fns";
import { Badge } from "@/components/ui/badge";

export default function GeneralSessionCard({
	content,
	page,
	className,
}: {
	content: TSessionsMatViewResultRow;
	page?: string;
	className?: string;
}) {
	const router = useRouter();
	const remainingTime = getRemainingTime(
		subHours(content.start_time ?? "", 24).toISOString(),
	);
	const keywords = ["hour", "minute", "Soon", "Started"];

	return (
		<div>
			<Card
				className={cn(
					"cursor-pointer pt-0 pb-2 px-3 border-none shadow-none group",
					className,
				)}
				onClick={() => {
					if (page) {
						router.push(`/admin-dashboard/session/${content.session_id}`);
					} else {
						router.push(`/home/session/${content.session_id}`);
					}
				}}>
				<HoverCard openDelay={0} closeDelay={0}>
					<HoverCardTrigger>
						{" "}
						<CardHeader className="px-0 m-0 gap-0">
							<div
								className={cn(
									"relative w-full h-40 mb-2 group rounded-md bg-gray-100",
									className,
								)}>
								{content.image ? (
									<Image
										placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(40, 40))}`}
										src={content.image}
										sizes="
    											(max-width: 640px) 100vw,   
    											(max-width: 1024px) 50vw,   
    											33vw                         
  											"
										alt="Card image"
										fill
										className={cn("object-cover rounded-md", className)}
									/>
								) : (
									<span className="flex items-center justify-center w-full h-full text-gray-500">
										No Image
									</span>
								)}
								<div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-200 rounded-md" />
							</div>

							<p className="line-clamp-2 font-extrabold leading-tight text-[1.15rem] mb-1 ">
								{content.session_name}
							</p>
							<span
								className="line-clamp-1 font-extrabold text-[0.75rem] text-gray-500 underline mb-1"
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();

									router.push(`/tutor-view/${content.tutor?.tutor_id}`);
								}}>
								Tutor {content.tutor?.name}
							</span>

							<Rating
								className="ms-0 mb-1"
								rating={
									content.tutor?.tutor_rating?.toFixed(1) as unknown as number
								}
							/>
							<div className="flex justify-between items-center">
								<span className="font-extrabold text-black text-[0.98rem]">
									{content.price! <= 0 || content.price == null
										? "Free"
										: `฿${content.price + (content.service_fee ?? 0)}`}
								</span>
								{page === "admin" && (
									<Badge
										className={cn(
											content.status === "open"
												? "bg-green-100 text-green-500"
												: content.status === "cancelled"
													? "bg-red-100 text-red-500"
													: content.status === "closed"
														? "bg-purple-100 text-purple-500"
														: content.status === "completed"
															? "bg-orange-100 text-orange-500"
															: "bg-gray-100 text-gray-500",
										)}>
										{content.status}
									</Badge>
								)}
								{page !== "admin" &&
									keywords.some((kw) => remainingTime.includes(kw)) && (
										<div className="flex items-center gap-1 ">
											<span className="text-[0.75rem] text-red-800 font-bold">
												{remainingTime} left to enroll
											</span>
										</div>
									)}
							</div>
						</CardHeader>
					</HoverCardTrigger>
					{page !== "admin" && <CustomHoverCard content={content} />}
				</HoverCard>
			</Card>
		</div>
	);
}
