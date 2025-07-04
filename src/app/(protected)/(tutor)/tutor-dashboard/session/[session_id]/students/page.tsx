import React, { Suspense } from "react";
import StudentList from "@/components/app/shared/student-list";
import AmountCard from "@/components/app/shared/amount-card";
import { createClient } from "@/utils/supabase/server";
import GeneralError from "@/components/app/shared/error";
import { getSumTutorAmountByStatus } from "@/data/queries/student-session/get-sum-tutor-amount-by-status";
import GeneralLoading from "@/components/app/shared/general-loading";

type Params = Promise<{
	session_id: string;
}>;

const page = async ({ params }: { params: Params }) => {
	const { session_id } = await params;
	const supabase = await createClient();
	const data = await getSumTutorAmountByStatus(supabase, {
		session_id: Number(session_id),
	});
	if (!data || data.length != 1) return <GeneralError />;
	const amounts = data[0];
	return (
		<div className="min-w-full">
			<div className="flex gap-4 mb-6">
				<AmountCard
					label={"Holding Amount"}
					amount={amounts.holding}
					textColor="text-yellow-500"
				/>
				<AmountCard
					label={"Paid Amount"}
					amount={amounts.paid}
					textColor="text-green-500"
				/>
				<AmountCard
					label={"Refunded Amount"}
					amount={amounts.refunded}
					textColor="text-red-500"
				/>
			</div>
			<Suspense fallback={<GeneralLoading />}>
				<StudentList session_id={session_id} />
			</Suspense>
		</div>
	);
};

export default page;
