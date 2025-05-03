import Link from "next/link";
import CustomCarousel from "@/components/custom/features/home/custom-carousel";
import GeneralSessionCard from "@/components/custom/shared/general-session-card";

export default function SessionsSection({ type }: { type: string }) {
	const freeSessions = [
		{
			id: 1,
			sessionName: "React Redux Nodejs and Kafka basic",
			courseCode: "10125",
			courseName: "Web development",
			school: "Applied Digital Science",
			major: "Computer Engineering",
			price: "400",
			remaining: "2hr",
			description:
				"This session will deep dive into advanced React concepts like hooks, context, and performance optimization.",
			tutor: "Eric",
			rating: "5",
			type: "free",
			from: "11:00 AM",
			to: "2:00 PM",
			date: "23 April 2025",
			page: "browse",
		},
		{
			id: 1,
			sessionName: "React with NodeJS",
			courseCode: "10125",
			courseName: "Web development",
			school: "Applied Digital Science",
			major: "Computer Engineering",
			price: "400",
			remaining: "2hr",
			description:
				"This session will deep dive into advanced React concepts like hooks, context, and performance optimization.",
			tutor: "Eric",
			rating: "5",
			type: "free",
			from: "11:00 AM",
			to: "2:00 PM",
			date: "23 April 2025",
			page: "browse",
		},
		{
			id: 1,
			sessionName: "Next JS",
			courseCode: "10125",
			courseName: "Web development",
			school: "Applied Digital Science",
			major: "Computer Engineering",
			price: "400",
			remaining: "2hr",
			description:
				"This session will deep dive into advanced React concepts like hooks, context, and performance optimization.",
			tutor: "Eric",
			rating: "5",
			type: "free",
			from: "11:00 AM",
			to: "2:00 PM",
			date: "23 April 2025",
			page: "browse",
		},
		{
			id: 1,
			sessionName: "Machine Learing with SkitLearn",
			courseCode: "10125",
			courseName: "Web development",
			school: "Applied Digital Science",
			major: "Computer Engineering",
			price: "400",
			remaining: "2hr",
			description:
				"This session will deep dive into advanced React concepts like hooks, context, and performance optimization.",
			tutor: "Eric",
			rating: "5",
			type: "free",
			from: "11:00 AM",
			to: "2:00 PM",
			date: "23 April 2025",
			page: "browse",
		},
		{
			id: 1,
			sessionName: "Database Management Miderm Course",
			courseCode: "10125",
			courseName: "Web development",
			school: "Applied Digital Science",
			major: "Computer Engineering",
			price: "400",
			remaining: "2hr",
			description:
				"This session will deep dive into advanced React concepts like hooks, context, and performance optimization.",
			tutor: "Eric",
			rating: "5",
			type: "free",
			from: "11:00 AM",
			to: "2:00 PM",
			date: "23 April 2025",
			page: "browse",
		},
	];

	const closingSessions = [
		{
			id: 1,
			sessionName: "React Redux Nodejs and Kafka basic",
			courseCode: "10125",
			courseName: "Web development",
			school: "Applied Digital Science",
			major: "Computer Engineering",
			price: "400",
			remaining: "2hr",
			description:
				"This session will deep dive into advanced React concepts like hooks, context, and performance optimization.",
			tutor: "Eric",
			rating: "5",
			type: "free",
			from: "11:00 AM",
			to: "2:00 PM",
			date: "23 April 2025",
			page: "browse",
		},
		{
			id: 1,
			sessionName: "React with NodeJS",
			courseCode: "10125",
			courseName: "Web development",
			school: "Applied Digital Science",
			major: "Computer Engineering",
			price: "400",
			remaining: "2hr",
			description:
				"This session will deep dive into advanced React concepts like hooks, context, and performance optimization.",
			tutor: "Eric",
			rating: "5",
			type: "paid",
			from: "11:00 AM",
			to: "2:00 PM",
			date: "23 April 2025",
			page: "browse",
		},
		{
			id: 1,
			sessionName: "Next JS",
			courseCode: "10125",
			courseName: "Web development",
			school: "Applied Digital Science",
			major: "Computer Engineering",
			price: "400",
			remaining: "2hr",
			description:
				"This session will deep dive into advanced React concepts like hooks, context, and performance optimization.",
			tutor: "Eric",
			rating: "5",
			type: "paid",
			from: "11:00 AM",
			to: "2:00 PM",
			date: "23 April 2025",
			page: "browse",
		},
		{
			id: 1,
			sessionName: "Machine Learing with SkitLearn",
			courseCode: "10125",
			courseName: "Web development",
			school: "Applied Digital Science",
			major: "Computer Engineering",
			price: "400",
			remaining: "2hr",
			description:
				"This session will deep dive into advanced React concepts like hooks, context, and performance optimization.",
			tutor: "Eric",
			rating: "5",
			type: "free",
			from: "11:00 AM",
			to: "2:00 PM",
			date: "23 April 2025",
			page: "browse",
		},
		{
			id: 1,
			sessionName: "Database Management Miderm Course",
			courseCode: "10125",
			courseName: "Web development",
			school: "Applied Digital Science",
			major: "Computer Engineering",
			price: "400",
			remaining: "2hr",
			description:
				"This session will deep dive into advanced React concepts like hooks, context, and performance optimization.",
			tutor: "Eric",
			rating: "5",
			type: "free",
			from: "11:00 AM",
			to: "2:00 PM",
			date: "23 April 2025",
			page: "browse",
		},
	];
	return (
		<div className="mt-5 px-10">
			<div className="flex items-center justify-between">
				<div className="text-3xl font-bold tracking-wider">
					{type === "free" && <span>Free Sessions</span>}
					{type === "closing" && <span>Sessions Closing Soon </span>}
				</div>

				<Link
					href="/"
					className="text-orange-400 underline hover:text-orange-500 hover:bg-orange-100 py-2 px-3 text-md font-bold leading-5.5 rounded-sm hidden md:block">
					View more
				</Link>
			</div>

			{type === "free" ? (
				<div className="hidden md:block">
					<CustomCarousel content={freeSessions} type={type} />
				</div>
			) : (
				<div className="mt-5 md:hidden">
					{freeSessions.map((session, index) => {
						if (index > 3) {
							return null;
						}
						return (
							<GeneralSessionCard
								page="browse"
								content={session}
								type={type}
								key={index}
							/>
						);
					})}
					<div className="max-auto text-orange-400 underline hover:text-orange-500 hover:bg-orange-100 py-2 px-3 text-md font-bold leading-5.5 rounded-sm  md:hidden">
						View more
					</div>
				</div>
			)}
			{type === "closing" ? (
				<div className="hidden md:block">
					<CustomCarousel content={closingSessions} type={type} />
				</div>
			) : (
				<div className="mt-5 md:hidden">
					{freeSessions.map((session, index) => {
						if (index > 2) {
							return null;
						}
						return (
							<GeneralSessionCard
								page="browse"
								content={session}
								type={type}
								key={index}
							/>
						);
					})}
					<div className="max-auto text-orange-400 underline hover:text-orange-500 hover:bg-orange-100 py-2 px-3 text-md font-bold leading-5.5 rounded-sm  md:hidden">
						View more
					</div>
				</div>
			)}
		</div>
	);
}
