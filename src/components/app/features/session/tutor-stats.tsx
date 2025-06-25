import React from "react";
import { BookOpen, Mail, Pencil, Phone, Star, Users } from "lucide-react";
import Expandable from "../../shared/expandable-text";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAvatarFallback } from "@/utils/app/get-avatar-fallback";
import { cn } from "@/lib/utils";
import { shimmer, toBase64 } from "@/utils/app/shimmer";

const TutorStats = ({ data }: { data: TTutorWithStatsResult[number] }) => {
	return (
		<div>
			<div className="flex flex-col mb-2 text">
				<span className="max-w-[full] font-bold text-2xl truncate">
					{data.username}
				</span>
			</div>
			<div className="flex items-center mt-5 gap-x-23 pl-8">
				<div
					className={cn(
						"relative w-30 h-30 mb-2 group rounded-full bg-gray-100",
					)}>
					{data.profile_url ? (
						<Image
							placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(50, 50))}`}
							src={data.profile_url}
							sizes="50"
							alt="Card image"
							fill
							className={cn("object-cover rounded-full")}
						/>
					) : (
						<span className="flex items-center text-2xl justify-center w-full h-full text-gray-500">
							{getAvatarFallback(data.username ?? "NA")}
						</span>
					)}
				</div>
				<div>
					<ul className="space-y-2">
						<li>
							<div className="flex items-center gap-5">
								<span className="text-sm">🌟 Rating</span>
								<div className="flex items-center gap-1">
									<span className="text-sm font-bold">
										{data.tutor_rating ?? 0}
									</span>
								</div>
							</div>
						</li>
						<li>
							<div className="flex items-center gap-5">
								<span className="text-sm"> 📝 Reviews</span>
								<div className="flex items-center gap-1">
									<span className="text-sm font-bold">
										{data.total_review_count ?? 0}
									</span>
								</div>
							</div>
						</li>
						<li>
							<div className="flex items-center gap-5">
								<span className="text-sm"> 🎓 Enrolled students</span>
								<div className="flex items-center gap-1">
									<span className="text-sm font-bold">
										{data.total_student_count ?? 0}
									</span>
								</div>
							</div>
						</li>
						<li>
							<div className="flex items-center gap-5">
								<span className="text-sm">📗 Sessions</span>
								<div className="flex items-center gap-1">
									<span className="text-sm font-bold">
										{data.total_session_count ?? 0}
									</span>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div>
				<div className="text-sm font-bold text-gray-500 ml-[0.2rem] mt-5 mb-3">
					📫
					<span className="text-gray-700 font-extrabold ml-2">
						{data.email}
					</span>
				</div>
				<div className="text-sm font-bold text-gray-500 ml-[0.2rem]">
					☎️
					<span className="text-gray-700 font-extrabold ml-2">
						{data.phone_number}
					</span>
				</div>
			</div>
			{data.bio_highlight && (
				<div className="mt-5 text-sm"> {data.bio_highlight} </div>
			)}
			{data.biography && (
				<Expandable text={data.biography} className="mt-5 text-sm" max={300} />
			)}
		</div>
	);
};

export default TutorStats;
