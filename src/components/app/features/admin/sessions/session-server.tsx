import React, { Suspense } from "react";
import { createClient } from "@/utils/supabase/server";
import { getSessionMatViewbyId } from "@/data/queries/sessions/get-session-mat-view-by-Id";
import GeneralError from "@/components/app/shared/error";

import { getEnrollmentCount } from "@/data/queries/student-session/get-enrollment-count";
import { SessionHeader } from "@/components/app/features/admin/sessions/session-header";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SessionContent } from "./session-content";
import GeneralLoading from "../../../shared/general-loading";
import StudentList from "../../../shared/student-list";
import { FinancialTabServer } from "../financial/financial-tab-server";

export async function SessionServer({ session_id }: { session_id: string }) {
	const supabase = await createClient();
	const [sessionData, enrollment_count] = await Promise.all([
		getSessionMatViewbyId(supabase, Number(session_id)),
		await getEnrollmentCount(supabase, {
			session_id: Number(session_id),
			ss_status: ["enrolled", "pending_refund", "completed", "paid"],
		}),
	]);

	if (!sessionData || (!enrollment_count && enrollment_count !== 0)) {
		return (
			<>
				<GeneralError />
			</>
		);
	}
	const sessionHeader = {
		session_id: sessionData.session_id ?? undefined,
		image: sessionData.image,
		session_name: sessionData.session_name,
		course_code: sessionData.course_code,
		course_name: sessionData.course_name,
		school: sessionData.school,
		major: sessionData.major,
		status: sessionData.status,
		tutor: sessionData.tutor,
	};
	const sessionContent = {
		description: sessionData.description,
		requirement: sessionData.requirement,
		location: sessionData.location,
		start_time: sessionData.start_time,
		end_time: sessionData.end_time,
		max_students: sessionData.max_students,
		service_fee: sessionData.service_fee,
		price: sessionData.price,
		enrollment_count: enrollment_count,
	};

	return (
		<div className="space-y-6">
			<div className="px-4 lg:px-6">
				<SessionHeader content={sessionHeader} enrollment={enrollment_count} />
				<Tabs defaultValue="content" className="px-3">
					<TabsList className=" w-full flex max-w-md mb-4 bg-orange-100 rounded-md px-1 py-5">
						<TabsTrigger
							value="content"
							className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-orange-700 py-4">
							Content
						</TabsTrigger>
						<TabsTrigger
							value="students"
							className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-orange-700 py-4">
							Students
						</TabsTrigger>
						<TabsTrigger
							value="financial"
							className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-orange-700 py-4">
							Financial
						</TabsTrigger>
					</TabsList>
					<div className="px-4 lg:px-6">
						<TabsContent value="content">
							<SessionContent content={sessionContent} />
						</TabsContent>
						<TabsContent value="students">
							<Suspense fallback={<GeneralLoading />}>
								<StudentList session_id={session_id} admin={true} />
							</Suspense>
						</TabsContent>
						<TabsContent value="financial">
							<Suspense fallback={<GeneralLoading />}>
								<FinancialTabServer
									session_id={sessionData.session_id ?? 0}
									session_name={sessionData.session_name}
									tutor_id={sessionData.tutor?.tutor_id ?? ""}
									tutor_name={sessionData.tutor?.name ?? null}
									tutor_email={sessionData.tutor?.email ?? ""}
									status={sessionData.status ?? "open"}
									held_until={sessionData.held_until ?? "N/A"}
									paid_out_at={sessionData.paid_out_at}
								/>
							</Suspense>
						</TabsContent>
					</div>
				</Tabs>
			</div>
		</div>
	);
}
