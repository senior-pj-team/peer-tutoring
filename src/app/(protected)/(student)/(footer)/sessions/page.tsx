import Filter from "@/components/custom/browse/filter";
import { PaginationWithLinks } from "@/components/custom/browse/pagination-with-links";
import GeneralSessionCard from "@/components/custom/general-session-card";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { AlignJustify } from "lucide-react";

export default async function Sessions({
	searchParams,
}: {
	searchParams: Promise<{ page: string }>;
}) {
	const { page = "1" } = await searchParams;

	const sessions = [
		{
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
		},
		{
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
		},
		{
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
		},
		{
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
		},
		{
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
		},
		{
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
		},
		{
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
		},
		{
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
		},
		{
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
		},
		{
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
		},
		{
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
		},
		{
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
		},
		{
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
		},
		{
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
		},
	];
	return (
		<div className="lg:px-[6rem] lg:pt-[4rem] md:px-[4rem] md:pt-[3rem] px-[3rem] pt-[2rem] w-full">
			<span className="lg:text-4xl md:text-2xl text-xl font-bold">
				Result for &quot;database management&quot;
			</span>
			<FilterSheet />
			<div className="flex gap-x-5 mt-10">
				<div className="xl:w-[25%] lg:w-[38%]  hidden lg:block">
					<Filter />
				</div>
				<div className="w-full p-3">
					<div className="grid lg:grid-cols-3 md:grid-cols-2  gap-4">
						{sessions.map((session, index) => {
							return (
								<GeneralSessionCard content={session} type="a" key={index} />
							);
						})}
					</div>
					<div className="my-3">
						<PaginationWithLinks
							page={parseInt(page)}
							pageSize={20}
							totalCount={50}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

function FilterSheet() {
	return (
		<div className="lg:hidden  mt-6">
			<Sheet>
				<SheetTrigger>
					<div className="rounded-sm py-[0.65rem] px-[0.8rem] hover:border-black flex items-center border border-gray-300 hover:bg-gray-200 gap-x-2">
						Filter
						<AlignJustify size={12} />
					</div>
				</SheetTrigger>
				<SheetContent
					className="w-[18rem] md:w-[32rem] overflow-auto h-full"
					side="right">
					<SheetHeader className="p-3 pt-5  h-full">
						<SheetTitle>Filter options</SheetTitle>
						<Filter />
					</SheetHeader>
				</SheetContent>
			</Sheet>
		</div>
	);
}
