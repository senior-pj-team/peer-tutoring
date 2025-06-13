"use client";
import { Card, CardHeader } from "@/components/ui/card";
import { HoverCard, HoverCardTrigger } from "@/components/ui/hover-card";
import Image from "next/image";
import Rating from "../../features/rating-review/rating";
import { ClockAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { CustomHoverCard } from "./custom-hover-card";

export default function GeneralSessionCard({
	content,
	type,
	className,
	page,
}: {
	content: TSessionsMatViewResultRow;
	type?: string;
	className?: string;
	page: string;
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
					router.push(`/home/session/${page}/${content.session_id}`);
				}}>
				<HoverCard openDelay={0} closeDelay={0}>
					<HoverCardTrigger>
						{" "}
						<CardHeader className="px-0 m-0 gap-0">
							<div
								className={clsx(
									"relative w-full h-38 mb-2 group rounded-md bg-blue-50",
									className,
								)}>
								<Image
									src={content.image ?? "/no-image.png"}
									sizes="38"
									alt="Card image"
									fill
									className={clsx("object-cover rounded-md", className)}
								/>
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
								{type === "closing" && (
									<div className="flex items-center gap-1 ">
										<span className="text-[0.75rem] text-red-800 font-bold">
											remaining 1hr
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
					<CustomHoverCard content={content} page={page} />
				</HoverCard>
			</Card>
		</div>
	);
}
