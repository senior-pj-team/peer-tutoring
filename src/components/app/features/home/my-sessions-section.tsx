import CustomCarousel from "@/components/app/features/home/custom-carousel";
import { getStudentSessionView } from "@/data/queries/student-session/get-student-session-view";
import { getUserSession } from "@/utils/get-user-session";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function MySessionsSection() {
	const user = await getUserSession();
	if (!user) {
		return null;
	}
	const supabase = await createClient();
	const student_sessions = await getStudentSessionView(supabase, {
		columns:
			"student_session_id, session_id, student_session_status, session_image, session_name, course_code, course_name, session_start_time, session_end_time, tutor_username, tutor_profile_url, tutor_rating, tutor_id",
		student_id: user.user_id,
		status: ["enrolled"],
	});
	if (!student_sessions)
		return (
			<div className="mt-5 px-10 w-full h-85">
				<div className="text-3xl font-bold tracking-wider">
					<span>My Upcoming Sessions 📗</span>
				</div>
				<div className="flex w-full h-full justify-center items-center ">
					<span className="font-bold text-gray-400 md:text-xl text-lg">
						Something went wrong 🚩
					</span>
				</div>
			</div>
		);

	if (student_sessions.length < 1) {
		return (
			<div className="mt-5 px-10 w-full h-85">
				<div className="text-3xl font-bold tracking-wider">
					<span>My Upcoming Sessions 📗</span>
				</div>
				<div className="flex w-full h-full justify-center items-center ">
					<span className="font-bold text-gray-400 md:text-lg text-xl">
						You don't have upcoming sessions for now 👽
					</span>
				</div>
			</div>
		);
	}

	return (
		<div className="mt-5 px-10">
			<div className="flex items-center justify-between">
				<div className="text-3xl font-bold tracking-wider">
					My Upcoming Sessions 📗
				</div>

				<Link
					href="/my-sessions/upcoming-sessions"
					className="text-orange-400 underline hover:text-orange-500 hover:bg-orange-100 py-2 px-3 text-md font-bold leading-5.5 rounded-sm hidden md:block">
					View my sessions
				</Link>
			</div>

			<CustomCarousel my_sessions={student_sessions} />
		</div>
	);
}
