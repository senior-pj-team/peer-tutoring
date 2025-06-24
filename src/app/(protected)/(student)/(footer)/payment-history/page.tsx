import React from "react";
import PaymentTable from "@/components/app/features/payment/payment-table";
import { createClient } from "@/utils/supabase/server";
import { getUserSession } from "@/utils/get-user-session";
import GeneralError from "@/components/app/shared/error";
import { Roboto_Mono } from "next/font/google";
import clsx from "clsx";
import { getStudentSessionJoin } from "@/data/queries/student-session/get-student-session-join";
const roboto_mono = Roboto_Mono({
	weight: ["700"],
	subsets: ["latin"],
});

const page = async () => {
	const supabase = await createClient();
	const user = await getUserSession();
	if (!user) return <></>;
	const student_session_result = await getStudentSessionJoin(
		supabase,
		{
			student_id: user.user_id,
		}
	);

	if (!student_session_result) return <GeneralError />;

	return (
		<>
			<div className="my-10 mx-auto max-w-5xl">
				<h2
					className={clsx(
						"text-3xl font-semibold my-15",
						roboto_mono.className,
					)}>
					Purchase history
				</h2>
				<div className="mt-10">
					<PaymentTable data={student_session_result} />
				</div>
			</div>
		</>
	);
};

export default page;
