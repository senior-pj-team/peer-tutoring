"use client";

import SessionCard from "@/components/custom/session/session-card";
import SessionSearchBar from "@/components/custom/tutor-dashboard/tutor-search-bar";
import { useState } from "react";

export default function UpcomingSessions() {
	const [sessions, setSessions] = useState("");
	return (
		<div className="py-5">
			<SessionSearchBar
				query={sessions}
				setQuery={setSessions}
				type="session"
			/>
			<div className="grid grid-cols-1  md:grid-cols-2 gap-4 xl:grid-cols-3 ">
				{Array.from({ length: 8 }).map((_, index) => (
					<SessionCard
						key={index}
						sessionName="Example session name"
						courseCode="10125"
						courseName="Web development"
						cardType="upcoming"
						remainingTime="25 mins"
						status="open"
						enrollments={5}
						dispute_students={4}
						refunded_students={1}
					/>
				))}
			</div>
		</div>
	);
}
