import React, { Suspense } from "react";

import SessionHeader from "@/components/app/features/session/session-header";
import ReviewRatingAction from "@/components/app/features/session/review-rating-action";
import UpcomingAction from "@/components/app/features/session/upcoming-action";
import RefundStatus from "@/components/app/features/session/refund-status";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SessionContent from "@/components/app/features/session/session-content";
import SessionPayment from "@/components/app/features/session/session-payment";

import { createClient } from "@/utils/supabase/server";
import GeneralError from "@/components/app/shared/error";
import { getEnrollmentCount } from "@/data/queries/student-session/get-enrollment-count";
import { format, formatDate } from "date-fns";
import GeneralLoading from "@/components/app/shared/general-loading";
import { getStudentSessionView } from "@/data/queries/student-session/get-student-session-view";
import { getSessionsbyId } from "@/data/queries/sessions/get-sessions-by-Id";

type Params = Promise<{
	page: string;
	student_session_id: string;
}>;

const Page = async ({ params }: { params: Params }) => {
	const { student_session_id, page } = await params;

	const supabase = await createClient();

	const [session, enrollment_count] = await Promise.all([
		getStudentSessionView(supabase, {
			columns:
				"student_session_id, session_image, session_name, tutor_school, tutor_major, course_code, course_name, tutor_username, tutor_rating,tutor_profile_url, tutor_id,session_status, session_start_time, session_end_time, description, requirement, location, max_students, learning_materials",
			student_session_id: Number(student_session_id),
		}),
		getEnrollmentCount(supabase, {
			session_id: Number(student_session_id),
			ss_status: ["enrolled", "pending_refund", "completed", "paid"],
		}),
	]);
	if (
		!session ||
		session.length < 1 ||
		(!enrollment_count && enrollment_count !== 0)
	) {
		return (
			<>
				<GeneralError />
			</>
		);
	}
	const sessionData = session[0];
	const headerData = {
		image: sessionData.session_image,
		session_name: sessionData.session_name,
		school: sessionData.tutor_school ?? null,
		major: sessionData.tutor_major ?? null,
		course_code: sessionData.course_code ?? null,
		course_name: sessionData.course_name ?? null,
		tutor_name: sessionData.tutor_username ?? null,
		tutor_rating: sessionData.tutor_rating ?? null,
		tutor_profile_url: sessionData.tutor_profile_url ?? null,
		tutor_id: sessionData.tutor_id ?? "",
		session_status: sessionData.session_status,
	};

	const date = sessionData.session_start_time
		? formatDate(sessionData.session_start_time, "dd MMMM yyyy")
		: "Unknown";
	const start_time = sessionData.session_start_time
		? format(sessionData.session_start_time, "hh:mm a")
		: "Unknown";
	const end_time = sessionData.session_end_time
		? format(sessionData.session_end_time, "hh:mm a")
		: "Unknown";

	const contentData = {
		description: sessionData.description,
		requirement: sessionData.requirement,
		location: sessionData.location,
		date,
		start_time,
		end_time,
		max_students: sessionData.max_students,
		enrolled_students: enrollment_count,
		learning_materials: session[0].learning_materials
	};

	return (
		<div className="overflow-hidden">
			<SessionHeader data={headerData} />
			<hr />
			<div className="relative px-4 pb-10 mt-5 xl:px-15">
				<Tabs defaultValue="content">
					<TabsList className="grid w-full grid-cols-2 max-w-md mb-4 bg-orange-100 rounded-md p-1">
						<TabsTrigger
							value="content"
							className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-orange-700">
							Content
						</TabsTrigger>

						<TabsTrigger
							value="payment"
							className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-orange-700">
							Payment
						</TabsTrigger>
					</TabsList>

					<div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-6 relative ">
						<div className="w-full">
							<TabsContent value="content">
								<SessionContent data={contentData} />
							</TabsContent>

							<TabsContent value="payment">
								<Suspense fallback={<GeneralLoading />}>
									<SessionPayment student_session_id={Number(student_session_id!)} />
								</Suspense>
							</TabsContent>
						</div>

						<aside className="static xl:block xl:sticky xl:top-40 xl:right-[5rem] h-fit border shadow p-5 rounded-lg bg-white w-[25rem] space-y-3">
							{(page === "complete" || page == "archived") && (
								<ReviewRatingAction
									ssId={sessionData.student_session_id}
									toReport={page == "complete"}
								/>
							)}
							{page === "upcoming" && (
								<UpcomingAction
									start={sessionData.session_start_time}
									ssId={sessionData.student_session_id}
								/>
							)}

							{page === "refund" && (
								<Suspense fallback={<GeneralLoading />}>
									<RefundStatus ssId={sessionData.student_session_id ?? 0} />
								</Suspense>
							)}
						</aside>
					</div>
				</Tabs>
			</div>
		</div>
	);
};

export default Page;
