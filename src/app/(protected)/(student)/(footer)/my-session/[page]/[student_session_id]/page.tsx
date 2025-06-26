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
import { getStudentSessionJoinById } from "@/data/queries/student-session/get-student-session-join-By-Id";
import GeneralLoading from "@/components/app/shared/GeneralLoading";

type Params = Promise<{
	page: string;
	student_session_id: string;
}>;

const Page = async ({ params }: { params: Params }) => {
	const { student_session_id, page } = await params;

	const supabase = await createClient();

	const sessionData = await getStudentSessionJoinById(
		supabase,
		Number(student_session_id),
	);

	if (!sessionData) {
		return (
			<>
				<GeneralError />
			</>
		);
	}
	const enrollment_count = await getEnrollmentCount(supabase, {
		session_id: sessionData.session_id!,
		ss_status: ["enrolled", "pending_refund", "completed", "paid"],
	});

	if (!enrollment_count && enrollment_count !== 0) {
		return (
			<>
				<GeneralError />
			</>
		);
	}

	const headerData = {
		image: sessionData.sessions?.image,
		session_name: sessionData.sessions?.session_name,
		school: sessionData.sessions?.tutor?.school ?? null,
		major: sessionData.sessions?.tutor?.major ?? null,
		course_code: sessionData.sessions?.course_code ?? null,
		course_name: sessionData.sessions?.course_name ?? null,
		tutor_name: sessionData.sessions?.tutor?.username ?? null,
		tutor_rating: sessionData.sessions?.tutor?.tutor_rating ?? null,
		tutor_profile_url: sessionData.sessions?.tutor?.profile_url ?? null,
		tutor_id: sessionData.sessions?.tutor_id,
		session_status: sessionData.status,
	};

	const date = formatDate(sessionData.sessions?.start_time!, "dd MMMM yyyy");
	const start_time = format(sessionData.sessions?.start_time!, "hh:mm a");
	const end_time = format(sessionData.sessions?.end_time!, "hh:mm a");

	const contentData = {
		description: sessionData.sessions?.description,
		requirement: sessionData.sessions?.requirement,
		location: sessionData.sessions?.location,
		date,
		start_time,
		end_time,
		max_students: sessionData.sessions?.max_students,
		enrolled_students: enrollment_count,
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
								<Suspense fallback={<GeneralLoading/>}>
									<SessionPayment session_id={sessionData.session_id!} />
								</Suspense>
							</TabsContent>
						</div>

						<aside className="static xl:block xl:sticky xl:top-40 xl:right-[5rem] h-fit border shadow p-5 rounded-lg bg-white w-[25rem] space-y-3">
							{(page === "complete" || page == "archived") && (
								<ReviewRatingAction
									ssId={sessionData.id}
									toReport={page == "complete"}
								/>
							)}
							{page === "upcoming" && (
								<UpcomingAction
									start={sessionData.sessions?.start_time}
									ssId={sessionData.id}
								/>
							)}

							{
								page === "refund" &&
								<Suspense fallback={<GeneralLoading/>}>
									<RefundStatus ssId={sessionData.id} />
								</Suspense> 
							}
						</aside>
					</div>
				</Tabs>
			</div>
		</div>
	);
};

export default Page;
