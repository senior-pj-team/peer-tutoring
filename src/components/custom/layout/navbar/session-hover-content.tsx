import { HoverCardContent } from "@/components/ui/hover-card";
import Image from "next/image";
import sessionPicOne from "../../../../../public/session-one.jpg";
import sessionPicTwo from "../../../../../public/session-two.jpg";
import sessionPicThree from "../../../../../public/session-three.jpg";
import { Button } from "@/components/ui/button";
import { StaticImageData } from "next/image";
import Link from "next/link";

export default function SessionHoverContent({ content }: { content: string }) {
	const sessions = [
		{
			image: sessionPicOne,
			title: "Week 1 to 3 web development",
			courseCode: "1502933",
		},
		{
			image: sessionPicTwo,
			title: "MidTerm Math3 Revision",
			courseCode: "1502953",
		},
		{
			image: sessionPicThree,
			title: "Database Project Recap",
			courseCode: "150253",
		},
	];

	const wishList = [
		{
			image: sessionPicOne,
			title: "Week 1 to 3 web development",
			courseCode: "1502933",
		},
	];
	return (
		<HoverCardContent className="w-80 py-2 absolute -right-15">
			{" "}
			<div className="flex flex-col gap-2 px-3 ">
				{content === "MySessions" &&
					sessions.map((session, index) => {
						return (
							<Session
								key={index}
								image={session.image}
								title={session.title}
								courseCode={session.courseCode}
							/>
						);
					})}
				{content === "WishList" &&
					wishList.map((session, index) => {
						return (
							<Session
								key={index}
								image={session.image}
								title={session.title}
								courseCode={session.courseCode}
							/>
						);
					})}
			</div>
			<div className="flex justify-center mt-3 px-3 ">
				<Link
					href={
						content === "MySessions"
							? "/my-sessions/upcoming-sessions"
							: "/wishlist"
					}>
					<Button className=" w-full px-4 py-2 rounded-md bg-orange-400 text-white font-semibold shadow-sm hover:bg-orange-400/85 cursor-pointer">
						{content === "MySessions" ? "Go to My Sessions" : "Go to WishList"}
					</Button>
				</Link>
			</div>
		</HoverCardContent>
	);
}

function Session({
	image,
	title,
	courseCode,
}: {
	image: StaticImageData;
	title: string;
	courseCode: string;
}) {
	return (
		<div>
			<div className="flex space-x-2 max-h-[5rem] cursor-pointer">
				<Image
					width={120}
					height={120}
					alt="session picture"
					src={image}
					className="rounded-md object-contain"
				/>
				<div className="flex flex-col gap-y-1">
					<div className="text-[0.8rem] font-semibold truncate max-w-[10rem]">
						{title}
					</div>
					<div className="text-[0.75rem] font-light">{courseCode}</div>
				</div>
			</div>
			<hr />
		</div>
	);
}
