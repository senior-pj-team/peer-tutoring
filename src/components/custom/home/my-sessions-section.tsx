import CustomCarousel from "@/components/custom/home/custom-carousel";
import Link from "next/link";

export default function MySessionsSection() {
	const sessions = [
		{
			id: 1,
			image: '/React.png',
			sessionName: "Example session name",
			courseCode: "10125",
			courseName: "Web development",
			remainingTime: "15hr",
		},
		{
			id: 2,
			image: '/Chinese.jpg',
			sessionName: "Example session name",
			courseCode: "10125",
			courseName: "Web development",
			remainingTime: "15hr",
		},
		{
			id: 3,
			image: "/Courses.jpg",
			sessionName: "Example session name",
			courseCode: "10125",
			courseName: "Web development",
			remainingTime: "15hr",
		},
		{
			id: 4,
			image: "/React.png",
			sessionName: "Example session name",
			courseCode: "10125",
			courseName: "Web development",
			remainingTime: "15hr",
		},
		{
			id: 5,
			image: "/Chinese.jpg",
			sessionName: "Example session name",
			courseCode: "10125",
			courseName: "Web development",
			remainingTime: "15hr",
		},
	];
	return (
		<div className="mt-5 px-10">
			<div className="flex items-center justify-between">
				<div className="text-3xl font-bold tracking-wider">
					My Upcoming Sessions
				</div>

				<Link
					href="/"
					className="text-orange-400 underline hover:text-orange-500 hover:bg-orange-100 py-2 px-3 text-md font-bold leading-5.5 rounded-sm hidden md:block">
					View my sessions
				</Link>
			</div>

			<CustomCarousel content={sessions} />
		</div>
	);
}
