import React from "react";
import GeneralSessionCard from "@/components/app/shared/sessions/general-session-card";

const Page = () => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
			{/* {sessions.map((session) => (
				<GeneralSessionCard
					page="browse"
					key={session.id}
					content={{
						id: session.id,
						sessionName: session.sessionName,
						courseCode: session.courseCode,
						courseName: session.courseName,
						school: session.school,
						major: session.major,
						price: session.price,
						description: session.description,
						tutor: session.tutorName,
						rating: session.tutorRating,
						from: session.startTime,
						to: session.endTime,
						date: session.date,
					}}
				/>
			))} */}
		</div>
	);
};

export default Page;
