"use client";

import React, { useState } from "react";
import SessionCard from "@/components/app/shared/session-card";
import { DebounceSearchBar } from "@/components/app/shared/debounce-search-bar";

export default function ArchivedSessions() {
	// Sample data for sessions (same as before, you can replace this with actual dynamic data)
	const [sessionName, setSessionName] = useState("");
	const sessions = [
		{
			id: 1,
			sessionName: "Full Stack Web Development Bootcamp",
			image: "/React.png",
			courseCode: "10125",
			courseName: "Web Development",
			enrollments: 25,
			pending_refund_students: 2,
			refunded_students: 3,
			paid_students: 1,
		},
		{
			id: 2,
			sessionName: "Creative UI/UX Design Workshop",
			image: "/React.png",
			courseCode: "10235",
			courseName: "UI/UX Design",
			enrollments: 20,
			pending_refund_students: 1,
			refunded_students: 0,
			paid_students: 1,
		},
		{
			id: 3,
			sessionName: "Data Science for Beginners",
			courseCode: "10345",
			image: "/React.png",
			courseName: "Data Science",
			enrollments: 18,
			pending_refund_students: 0,
			refunded_students: 1,
			paid_students: 0,
		},
	];
	const filteredSessions = sessions.filter((session) =>
		session.sessionName.toLowerCase().includes(sessionName.toLowerCase()),
	);

	return (
		<div className="py-5">
			<DebounceSearchBar
				query={sessionName}
				setQuery={setSessionName}
				placeholder="Search with session name..."
				className="p-4 pr-10 border border-gray-300 rounded-lg focus:outline-primary focus:ring-primary overflow-clip mr-auto"
			/>
			<div className="mb-5"></div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:grid-cols-3">
				{filteredSessions.map((session) => (
					<SessionCard
						key={session.id}
						id={session.id}
						sessionName={session.sessionName}
						image={session.image}
						courseCode={session.courseCode}
						courseName={session.courseName}
						enrollments={session.enrollments}
						pending_refund_students={session.pending_refund_students}
						page="tutor"
					/>
				))}
			</div>
		</div>
	);
}
