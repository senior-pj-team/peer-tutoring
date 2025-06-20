import React from "react";

import SessionHeader from "@/components/app/features/session/session-header";
import ReviewRatingAction from "@/components/app/features/session/review-rating-action";
import UpcomingAction from "@/components/app/features/session/upcoming-action";
import EnrollAction from "@/components/app/features/session/enroll-action";
import RefundStatus from "@/components/app/features/session/refund-status";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SessionContent from "@/components/app/features/session/session-content";
import SessionPayment from "@/components/app/features/session/session-payment";
import SessionTutor from "@/components/app/features/session/session-tutor";
import { createClient } from "@/utils/supabase/server";
import { getSessionMatViewbyId } from "@/data/queries/sessions/get-session-mat-view-by-Id";
import GeneralError from "@/components/app/shared/error";
import { getEnrollmentCount } from "@/data/queries/student-session/get-enrollment-count";
import { format, formatDate } from "date-fns";

type Params = Promise<{
	session_id: string;
	page: string;
}>;

const Page = async ({ params }: { params: Params }) => {
	const { session_id, page } = await params;

	const supabase = await createClient();
	const sessionData = await getSessionMatViewbyId(supabase, Number(session_id));

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
		image: sessionData.image,
		session_name: sessionData.session_name,
		school: sessionData.school,
		major: sessionData.major,
		course_code: sessionData.course_code,
		course_name: sessionData.course_name,
		tutor_name: sessionData.tutor!.name,
		tutor_rating: sessionData.tutor!.tutor_rating,
		session_status: sessionData.status,
	};

	const date = formatDate(sessionData.start_time!, "dd MMMM yyyy");
	const start_time = format(sessionData.start_time!, "hh:mm a");
	const end_time = format(sessionData.end_time!, "hh:mm a");

	const contentData = {
		description: sessionData.description,
		requirement: sessionData.requirement,
		location: sessionData.location,
		date,
		start_time,
		end_time,
		max_students: sessionData.max_students,
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
						{page != "browse" && (
							<TabsTrigger
								value="payment"
								className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-orange-700">
								Payment
							</TabsTrigger>
						)}
						{page == "browse" && (
							<TabsTrigger
								value="tutor"
								className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-orange-700">
								Tutor
							</TabsTrigger>
						)}
					</TabsList>
					
					<div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-6 relative ">
						<div className="w-full">
							<TabsContent value="content">
								<SessionContent data={contentData} />
							</TabsContent>

							<TabsContent value="payment">
								<SessionPayment session_id={sessionData.session_id!} />
							</TabsContent>

							{page == "browse" && (
								<TabsContent value="tutor">
									<SessionTutor tutor_id={sessionData.tutor!.tutor_id} />
								</TabsContent>
							)}
						</div>

						<aside className="static xl:block xl:sticky xl:top-40 xl:right-[5rem] h-fit border shadow p-5 rounded-lg bg-white w-[25rem] space-y-3">
							{page === "complete" || page == "archived" ? (
								<ReviewRatingAction ssId={16} sessionId={6} toReport={page=="complete"}/>
							):<></>}
							{page === "upcoming" && (
								<UpcomingAction start={sessionData.start_time} sessionId={6} ssId={16} />
							)}
							{page === "browse" && (
								<EnrollAction
									session_id={sessionData.session_id!}
									price={sessionData.price}
									service_fee={sessionData.service_fee}
								/>
							)}
							{page === "refund" && (
								<RefundStatus sessionId={Number(session_id)} />
							)}
						</aside>
					</div>
				</Tabs>
			</div>
		</div>
	);
};

export default Page;
