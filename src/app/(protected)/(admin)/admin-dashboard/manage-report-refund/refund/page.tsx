import RefundRequestCard from "@/components/app/features/refund-report/refund-request-card";
import GeneralError from "@/components/app/shared/error";
import { getRefundReportJoin } from "@/data/queries/refund-and-report/get-refund-report-join";
import { createClient } from "@/utils/supabase/server";
import React from "react";
export default async function RefundPage() {
	const supabase= await createClient()
	const refundRequests= await getRefundReportJoin(supabase, {status: ["pending"], type: ["refund", "refund and report"]})
	if(!refundRequests) return <GeneralError/>
	console.log(refundRequests);
	return (
		<div className="space-y-6 px-4 lg:px-6">
			<h1 className="text-xl font-semibold">Pending Refund Requests</h1>
			<div className="grid gap-4">
				{
					refundRequests.map((refundRequest)=>
						<RefundRequestCard refund={refundRequest} key={refundRequest?.id}/>
					)
				}
			</div>
		</div>
	);
}
