import React from "react";
import PaymentTable from "@/components/app/features/payment/payment-table";
import { createClient } from "@/utils/supabase/server";
import { getUserSession } from "@/utils/get-user-session";
import { getStudentSession } from "@/data/queries/student-session/get-student-session";
import GeneralError from "../../shared/error";

const SessionPayment = async ({ session_id }: { session_id: number }) => {
	const supabase = await createClient();
	const user = await getUserSession();
	if (!user) return <></>;
	const student_session_result = await getStudentSession(supabase, {
		student_id: user.user_id,
		session_id,
	});

	if (!student_session_result) return <GeneralError />;
	return (
		<div className="p-6 ">
			<div>
				<h3 className="text-xl font-semibold mt-2">Orion</h3>
				<div className="flex flex-col text-gray-700 text-sm mt-2">
					<span>No. 133 Tha Sut, Amphoe Mueang Chiang Rai</span>
					<span>Chang Wat Chiang Rai</span>
					<span>57100</span>
				</div>
			</div>
			<div className="mt-10">
				<h3 className="text-xl font-semibold mt-2">Payment</h3>
				<PaymentTable data={student_session_result} />
			</div>
		</div>
	);
};

export default SessionPayment;
