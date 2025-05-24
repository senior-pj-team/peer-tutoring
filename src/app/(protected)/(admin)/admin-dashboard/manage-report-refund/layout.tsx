import React from "react";
import Tabs from "@/components/app/shared/tabs";

export default function ManageReportRefundLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const tabs = [
		{
			name: "Reports",
			path: "/admin-dashboard/manage-report-refund/report",
		},
		{
			name: "Refunds",
			path: "/admin-dashboard/manage-report-refund/refund",
		},
		{
			name: "Refund History",
			path: "/admin-dashboard/manage-report-refund/refund-history",
		},
	];

	return (
		<div className="space-y-6 px-4 lg:px-6">
			<h1 className="text-xl font-semibold">Manage Reports & Refunds</h1>
			<Tabs tabs={tabs} />
			{children}
		</div>
	);
}
