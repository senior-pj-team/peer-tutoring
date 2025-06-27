import StudentInfo from "@/components/app/shared/student-info";
import React, { Suspense } from "react";
import { Roboto_Mono } from "next/font/google";
import StudentSessionListServer from "@/components/app/features/session/student-session-list-server";
import { SessionSkeletonList } from "@/components/app/shared/sessions/session-skeleton-list";
import GeneralLoading from "@/components/app/shared/general-loading";

const roboto_mono = Roboto_Mono({
	weight: ["700"],
	subsets: ["latin"],
});

type Params = Promise<{
	student_id: string;
}>;

const page = async ({ params }: { params: Params }) => {
	const { student_id } = await params;

	return (
		<>
			<div className="mx-30 items-center my-20">
				<Suspense fallback={<GeneralLoading />}>
					<StudentInfo student_id={student_id} />
				</Suspense>
				<div className="mt-15">
					<h1 className={roboto_mono.className}>
						Previously completed sessions
					</h1>
					<Suspense fallback={<SessionSkeletonList />}>
						<StudentSessionListServer student_id={student_id} />
					</Suspense>
				</div>
			</div>
		</>
	);
};

export default page;
