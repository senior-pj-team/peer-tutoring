import React from "react";
import { Clock, CheckCircle, XCircle } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { getRefundReport } from "@/data/queries/refund-and-report/get-refund-report";
import { format, parseISO } from "date-fns";

const statusMap = {
	pending: {
		icon: <Clock className="text-yellow-500" size={20} />,
		text: "Pending",
		color: "text-yellow-500",
	},
	approved: {
		icon: <CheckCircle className="text-green-500" size={20} />,
		text: "Approved",
		color: "text-green-500",
	},
	rejected: {
		icon: <XCircle className="text-red-500" size={20} />,
		text: "Rejected",
		color: "text-red-500",
	},
};

const RefundStatus = async ({ ssId }: { ssId: number }) => {
	const supabase = await createClient();

	const data = await getRefundReport(supabase, {
		ss_id: ssId,
	});
	if (!data || data.length < 1)
		return (
			<div className="text-sm text-gray-500">No refund request found.</div>
		);
	const refund_report = data[0];
	const status = refund_report.status ?? "pending";
	const current = statusMap[status] || statusMap.pending;
	const reason = refund_report.reason ?? "No reason provided";
	const createdDate = format(
		parseISO(refund_report.created_at),
		"yyyy MMMM dd",
	);

	return (
		<>
			<div className="flex items-center space-x-2 mb-1">
				{current.icon}
				<span className={`font-medium ${current.color}`}>{current.text}</span>
			</div>

			{status === "pending" && (
				<p className="text-sm">Your refund request is under review.</p>
			)}
			{status === "approved" && (
				<p className="text-sm">Your refund request has been approved.</p>
			)}
			{status === "rejected" && (
				<p className="text-sm">Your refund request has been rejected.</p>
			)}

			<p className="text-sm mt-1">Reason: {reason}</p>
			<p className="text-sm text-gray-500">Date: {createdDate}</p>
		</>
	);
};

export default RefundStatus;
