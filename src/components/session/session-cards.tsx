import React from "react";
import {
	Card,
	CardContent as CardBody,
	CardFooter,
	CardHeader,
	CardDescription as CardInfo,
	CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import Rating from "../custom/rating";
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
		<Card className="cursor-pointer">
			<CardHeader>
				<CardTitle className="flex justify-between items-center">
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
				<CardInfo>
					<span className="me-1">{courseCode}</span>|
					<span className="ms-1">{courseName}</span>
				</CardInfo>
			</CardHeader>
			<CardBody>
				<div className="flex items-center gap-1 text-sm text-gray-700">
					<span className="font-semibold">Date:</span>
					<span>01 May 2025</span>
				</div>
				<div className="flex items-center gap-4 text-sm text-gray-700">
					<div className="flex items-center gap-1">
						<span className="font-semibold">Start:</span>
						<span>10:00 AM</span>
					</div>
					<div className="flex items-center gap-1">
						<span className="font-semibold">End:</span>
						<span>11:00 AM</span>
					</div>
				</div>
				<div>
					<span className="text-xl">฿150</span>
				</div>
			</CardBody>
			<CardFooter>
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
					<Rating className="ms-3" />
				</div>
			</CardFooter>
		</Card>
	);
};

export default SessionCards;
