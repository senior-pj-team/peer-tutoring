"use client";

import React, { useEffect, useState } from "react";
import SessionCard from "@/components/custom/shared/session-card";
import { getSessions } from "@/actions/sessionActions";
import { Sessions } from "@/types/sessions";

const Page = () => {
	const [sessions, setSessions] = useState<Sessions | undefined>([])
		useEffect(()=>{
			const fetchData= async ()=>{
				const response = await getSessions(['completed']);
				console.log("Session Data");
				console.log(response);
				setSessions(response.data);
			}
			fetchData();
		},[])

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
			{ sessions && sessions.map((session) => (
				<SessionCard
					key={session.session_id}
					id={session.session_id}
					image={session.image}
					sessionName={session.session_name}
					courseCode={session.course_code}
					courseName={session.course_name}
					date={session.date.toDateString()}
					start_time={session.start_time}
					end_time={session.end_time}
					tutor_name={session.tutor_name}
					tutor_rating={session.tutor_rating}
					enroll_status={session.status}
					page="complete"
				/>
			))}
		</div>
	);
};

export default Page;
