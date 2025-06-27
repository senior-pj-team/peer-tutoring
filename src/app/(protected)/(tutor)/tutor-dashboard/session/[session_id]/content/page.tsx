import SessionForm from "@/components/app/shared/sessions/session-form";
import { getSessionsbyId } from "@/data/queries/sessions/get-sessions-by-Id";
import { createClient } from "@/utils/supabase/server";
import GeneralError from "@/components/app/shared/error";
import React from "react";
import { getEnrollmentCount } from "@/data/queries/student-session/get-enrollment-count";

type Params = Promise<{
	session_id: string;
}>;
const page = async ({ params }: { params: Params }) => {
	const { session_id } = await params;
	const supabase = await createClient();
	const session_result = await getSessionsbyId(supabase, {
		session_id: Number(session_id),
	});

	if (!session_result) return <GeneralError />;

	const enrollments = await getEnrollmentCount(supabase, {
		session_id: Number(session_id),
	});
	const session = session_result[0];
	const mappedSession = {
		school: session.school ?? "",
		major: session.major ?? "",
		courseCode: session.course_code ?? "",
		courseName: session.course_name ?? "",
		description: session.description ?? "",
		requirements: session.requirement ?? "",
		date: new Date(session.start_time),
		startTime: session.start_time.slice(11, 16),
		endTime: session.end_time.slice(11, 16),
		maxStudents: session.max_students ?? 1,
		paid: session.price != null ? session.price === 0 : false,
		amount: session.price ?? 0,
		imageString: session.image ?? "",
		isEdit: true,
		sessionName: session.session_name ?? "",
		location: session.location ?? "",
		category: String(session.category_id),
		sessionId: session.id,
		toCancel: true,
	};

	return <SessionForm data={mappedSession} />;
};

export default page;
