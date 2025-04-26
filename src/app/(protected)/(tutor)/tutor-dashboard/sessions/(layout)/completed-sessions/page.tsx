"use client";

import SessionCard from "@/components/custom/session/session-card";
import SessionSearchBar from "@/components/custom/tutor-dashboard/tutor-search-bar";
import { useState } from "react";

export default function CompletedSession() {
	const [sessions, setSessions] = useState("");
	return (
		<div className="py-5 ">
			<SessionSearchBar
				query={sessions}
				setQuery={setSessions}
				type="sessions"
			/>
			<div className=" grid grid-cols-1 md:grid-cols-2 gap-4 xl:grid-cols-3 ">
				{Array.from({ length: 18 }).map((_, index) => (
					<SessionCard
						key={index}
						sessionName="Example session name"
						courseCode="10125"
						courseName="Web development"
						cardType="upcoming"
						enrollments={5}
						dispute_students={4}
						refunded_students={1}
						released_students={1}
						action="archive"
					/>
				))}
			</div>
		</div>
	);
}
