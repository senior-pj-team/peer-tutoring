import Image from "next/image";
import Link from "next/link";
import Rating from "@/components/app/features/rating-review/rating";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAvatarFallback } from "@/utils/app/get-avatar-fallback";
import { cn } from "@/lib/utils";

type TSessionHeaderData = {
	image: string | null;
	session_name: string | null;
	course_code: string | null;
	course_name: string | null;
	school: string | null;
	major: string | null;
	tutor_name: string | null;
	tutor_profile_url: string | null;
	tutor_id: string;
	tutor_rating: number | null;
	session_status: string | null;
};

const SessionHeader = ({ data }: { data: TSessionHeaderData }) => {
	const {
		session_name,
		course_code,
		course_name,
		major,
		school,
		tutor_name,
		tutor_rating,
		session_status,
		tutor_profile_url,
		tutor_id,
		image,
	} = data;
	return (
		<div className="bg-white ps-6">
			<div className="flex flex-col relative">
				<div className="px-6 py-15 z-1">
					<h1 className="text-6xl">{session_name}</h1>
					<div className="mt-5 text-gray-500">
						<div className="space-y-1 my-3">
							<div className="text-sm">
								<span>{course_code} </span>|<span> {course_name}</span>
							</div>
							<div className="text-xs font-extrabold">
								<span> {school} ● </span> <span>{major}</span>
							</div>
						</div>
						<div className="flex items-center">
							<Avatar>
								<AvatarImage
									src={tutor_profile_url ?? ""}
									width={48}
									height={48}
									alt="User Avatar"
								/>
								<AvatarFallback>
									{getAvatarFallback(tutor_name ?? "")}
								</AvatarFallback>
							</Avatar>
							<div className="text-xs underline mx-3">
								<Link href={`/tutor-view/${tutor_id}`}>{tutor_name}</Link>
							</div>
							|
							<Rating
								className="ms-3"
								rating={tutor_rating?.toFixed(1) as unknown as number}
							/>
						</div>
					</div>
					<div className="mt-5">
						<span
							className={cn(
								"inline-block text-xs font-semibold px-3 py-1 rounded-full",

								session_status === "open"
									? "bg-green-100 text-green-800"
									: session_status === "closed"
										? "bg-red-100 text-red-800"
										: session_status === "enrolled"
											? "bg-orange-100 text-green-800"
											: "",
							)}>
							Status: {session_status}
						</span>
					</div>
				</div>

				<div className="absolute right-0 top-0 bottom-0 lg:w-[70%] w-[50%] z-0">
					{image ? (
						<Image
							src={image}
							sizes="100vw"
							alt="Session Banner"
							fill
							className="object-cover"
						/>
					) : (
						<div className="w-full h-full bg-gray-300"></div>
					)}

					<div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent"></div>
				</div>
			</div>
		</div>
	);
};

export default SessionHeader;
