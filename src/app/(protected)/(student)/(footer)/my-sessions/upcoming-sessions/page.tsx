import SessionCard from "@/components/app/shared/session-card";
import { getSessions } from "@/actions/sessionActions";

import { getRemainingTime } from "@/utils/sessionsUtils";

const Page = async () => {
	const response = await getSessions(["enrolled"]);
	const sessions = response.data;

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
			{sessions &&
				sessions.map((session) => (
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
						remainingTime={getRemainingTime(
							session.date.toDateString(),
							session.start_time,
						)}
						page="upcoming"
					/>
				))}
		</div>
	);
};

export default Page;
