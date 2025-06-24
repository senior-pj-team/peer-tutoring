import StudentInfo from "@/components/app/shared/student-info";
import React from "react";
import { Roboto_Mono } from "next/font/google";
import StudentSessionListServer from "@/components/app/features/session/student-session-list-server";

const roboto_mono = Roboto_Mono({
	weight: ["700"],
	subsets: ["latin"],
});

type Params = Promise<{
	student_id: string;
}>;

const page = async ({ params }: { params: Params }) => {
	const {student_id}= await params;
	
	return (
		<>
			<div className="mx-30 items-center my-20">
				<StudentInfo student_id={student_id}/>
				<div className="mt-15">
					<h1 className={roboto_mono.className}>
						Previously completed sessions
					</h1>
					<StudentSessionListServer student_id={student_id}/>
				</div>
			</div>
		</>
	);
};

export default page;
