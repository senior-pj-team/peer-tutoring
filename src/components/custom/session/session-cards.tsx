import React from "react";
import {
	Card,
	CardHeader,
	CardDescription,
	CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import Rating from "../rating-review-report-refund/rating";
import { Clock } from "lucide-react";

const SessionCards = ({
	sessionName,
	courseCode,
	courseName,
	cardType,
}: {
	sessionName: string;
	courseCode: string;
	courseName: string;
	cardType?: string;
}) => {
	return (
		<Card className="cursor-pointer rounded-none pt-0 pb-2">
			<CardHeader className="px-0 m-0">
				<div className="relative w-full h-38">
					<Image
						src={"/React.png"}
						alt="Card image"
						fill
						className="object-cover"
					/>
				</div>
				<CardTitle className="flex justify-between items-center px-3 mt-1">
					<h3 className="max-w-[80%] trancate">{sessionName}</h3>

					{cardType == "upcoming" && (
						<div className="flex items-center gap-1 text-xs">
							<Clock className="w-4 h-4" />
							<span>25 mins</span>
						</div>
					)}
					{cardType == "refunding" && (
						<div className="flex items-center gap-1 text-xs text-bg-200">
							<span className="text-green-500">Refunded</span>
						</div>
					)}
				</CardTitle>
				<CardDescription className="px-3 ">
					<span className="me-1">{courseCode}</span>|
					<span className="ms-1">{courseName}</span>
				</CardDescription>
				<div className="px-3 my-2">
					<div className="flex items-center gap-1 text-[0.75rem] text-gray-700 mb-1">
						<span className="font-semibold">Date:</span>
						<span>01 May 2025</span>
					</div>
					<div className="flex items-center gap-4 text-[0.75rem] text-gray-700">
						<div className="flex items-center gap-1">
							<span className="font-semibold">Start:</span>
							<span>10:00 AM</span>
						</div>
						<div className="flex items-center gap-1">
							<span className="font-semibold">End:</span>
							<span>11:00 AM</span>
						</div>
					</div>
				</div>
				<div className="px-3 mt-2">
					<div className="flex items-center">
						<div className="relative w-8 h-8 rounded-full overflow-hidden me-3">
							<Image
								src="/profile.jpg"
								alt="Tutor avatar"
								fill
								className="object-fill"
							/>
						</div>
						<div className="text-xs underline me-3">
							<Link href={""}>John Doe</Link>
						</div>
						|
						<Rating className="ms-3" rating={4.95} />
					</div>
				</div>
				<div></div>
			</CardHeader>
		</Card>
	);
};

export default SessionCards;
