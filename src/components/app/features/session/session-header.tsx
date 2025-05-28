import Image from "next/image";
import Link from "next/link";
import Rating from "@/components/app/features/rating-review/rating";
import clsx from "clsx";

const SessionHeader = ({data}: {data: TSessionHeaderData}) => {
	const {session_name, course_code, course_name, major, school, tutor_name, tutor_rating, session_status, image}= data;
	const status = "OPEN";
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
								<span> {school} ● </span>{" "}
								<span>{major}</span>
							</div>
						</div>
						<div className="flex items-center">
							<div className="relative w-6 h-6 rounded-full overflow-hidden me-3">
								<Image src="/profile.jpg" alt="Tutor avatar" fill />
							</div>
							<div className="text-xs underline me-3">
								<Link href={""}>{tutor_name}</Link>
							</div>
							|
							<Rating className="ms-3" rating={tutor_rating?? 0} />
						</div>
					</div>
					<div className="mt-5">
						<span
							className={clsx(
								"inline-block text-xs font-semibold px-3 py-1 rounded-full",
								{
									"bg-green-100 text-green-800": status === "OPEN",
									// "bg-red-100 text-red-800": status === "CLOSED",
								},
							)}>
							Status: {session_status}
						</span>
					</div>
				</div>

				<div className="absolute right-0 top-0 bottom-0 lg:w-[70%] w-[50%] z-0">
					<Image
						src={image?? '/React.png'}
						alt="Session Banner"
						fill
						className="object-cover"
					/>
					<div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent"></div>
				</div>
			</div>
		</div>
	);
};

export default SessionHeader;
