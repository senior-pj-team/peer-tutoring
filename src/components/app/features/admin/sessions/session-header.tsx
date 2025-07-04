import Image from "next/image";
import { shimmer, toBase64 } from "@/utils/app/shimmer";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAvatarFallback } from "@/utils/app/get-avatar-fallback";
import Link from "next/link";
import Rating from "@/components/app/features/rating-review/rating";

import { SessionCancelBtn } from "./session-cancel-btn";

type Params = {
	enrollment: number;
	content: {
		session_id: number | undefined;
		image: string | null;
		session_name: string | null;
		course_code: string | null;
		course_name: string | null;
		school: string | null;
		major: string | null;
		status: TSessionStatus | null;
		tutor: TTutor | null;
	};
};

export function SessionHeader({
	enrollment,
	content: {
		session_id,
		image,
		session_name,
		course_code,
		course_name,
		school,
		major,
		status,
		tutor,
	},
}: Params) {
	return (
		<div className="max-w-[95%] mx-auto pt-8 pb-10 space-y-10">
			{/* Banner */}
			<div className="relative h-64 w-full rounded-lg overflow-hidden">
				{image ? (
					<Image
						src={image}
						alt="Session banner"
						placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(100, 100))}`}
						sizes="95vw"
						fill
						className="object-cover"
					/>
				) : (
					<div className="w-full h-full bg-gray-200 text-gray-500 flex items-center justify-center">
						No Image
					</div>
				)}
			</div>

			{/* Header Info */}
			<section className="space-y-2">
				<div className="flex items-center gap-x-5">
					<div className="flex items-center gap-4 mt-2 ">
						<h1 className="text-3xl font-bold">{session_name}</h1>
						<span
							className={cn(
								"inline-block px-3 py-1 rounded-full text-sm font-medium",
								status === "open"
									? "bg-green-100 text-green-500"
									: status === "cancelled"
										? "bg-red-100 text-red-500"
										: status === "closed"
											? "bg-purple-100 text-purple-500"
											: status === "completed"
												? "bg-orange-100 text-orange-500"
												: "bg-gray-100 text-gray-500",
							)}>
							{status}
						</span>
					</div>
				</div>

				<p className="text-gray-600 text-sm">
					{course_code} | {course_name} • {school} ● {major}
				</p>
				<section className="flex items-center gap-4 justify-between">
					<div className="flex items-center">
						<Avatar>
							{tutor?.tutor_profile && (
								<AvatarImage
									src={tutor.tutor_profile}
									width={48}
									height={48}
									alt="User Avatar"
								/>
							)}

							<AvatarFallback>
								{getAvatarFallback(tutor?.name ?? "")}
							</AvatarFallback>
						</Avatar>
						<div className="text-xs underline mx-3">
							<Link href={`/tutor-view/${tutor?.tutor_id}`}>{tutor?.name}</Link>
						</div>
						|
						<Rating
							className="ms-3"
							rating={tutor?.tutor_rating?.toFixed(1) as unknown as number}
						/>
					</div>
					{enrollment < 1 && <SessionCancelBtn session_id={session_id} />}
				</section>
			</section>
		</div>
	);
}
