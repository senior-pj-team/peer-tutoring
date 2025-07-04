import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { getAvatarFallback } from "@/utils/app/get-avatar-fallback";

type TtutorInfo = {
	image: string | null;
	name: string | null;
	email: string | null;
	school: string | null;
	major: string | null;
	year: string | null;
};

export const TutorInfo = ({ tutorInfo }: { tutorInfo: TtutorInfo }) => {
	return (
		<div className="flex flex-col md:flex-row items-center gap-6 mb-3">
			<Avatar className="h-24 w-24">
				<AvatarImage src={tutorInfo.image ?? ""} alt="User Avatar" />
				<AvatarFallback>
					{getAvatarFallback(tutorInfo.name ?? "PP")}
				</AvatarFallback>
			</Avatar>
			<div className="text-center md:text-left">
				<h1 className="text-2xl font-semibold">{tutorInfo.name ?? "NA"}</h1>
				<div className="text-muted-foreground">{tutorInfo.email}</div>
				<div className="flex flex-wrap gap-2 mt-15 text-sm text-muted-foreground md:mt-2">
					<span className="bg-muted px-2 py-1 rounded">
						School: {tutorInfo.school ?? "NA"}
					</span>
					<span className="bg-muted px-2 py-1 rounded">
						Major: {tutorInfo.major ?? "NA"}
					</span>
					<span className="bg-muted px-2 py-1 rounded">
						Year: {tutorInfo.year ?? "NA"}
					</span>
				</div>
			</div>
		</div>
	);
};
