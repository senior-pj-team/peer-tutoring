"use client";

import { useMemo, useState } from "react";
import { DataTable } from "@/components/app/shared/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";

interface Report {
	id: string;
	sessionName: string;
	tutorName: string;
	reportedBy: string;
	reason: string;
	date: string;
	status: "pending" | "reviewed";
}

const mockReports: Report[] = [
	{
		id: "rep-001",
		sessionName: "Intro to Python",
		tutorName: "John Smith",
		reportedBy: "Alice Wong",
		reason: "Tutor didn't show up",
		date: "2025-04-30",
		status: "pending",
	},
	{
		id: "rep-002",
		sessionName: "Business English",
		tutorName: "Jane Doe",
		reportedBy: "Bob Tan",
		reason: "Inappropriate content",
		date: "2025-04-29",
		status: "reviewed",
	},
];

export default function ReportPage() {
	const [reports, setReports] = useState<Report[]>(mockReports);

	const handleMarkReviewed = (id: string) => {
		setReports((prev) =>
			prev.map((report) =>
				report.id === id ? { ...report, status: "reviewed" } : report,
			),
		);
	};

	const pendingReports = useMemo(
		() => reports.filter((r) => r.status === "pending"),
		[reports],
	);
	const reviewedReports = useMemo(
		() => reports.filter((r) => r.status === "reviewed"),
		[reports],
	);

	const commonColumns: ColumnDef<Report>[] = [
		{
			accessorKey: "reportedBy",
			header: "Student Name",
		},
		{
			accessorKey: "sessionName",
			header: "Session Name",
		},
		{
			accessorKey: "tutorName",
			header: "Tutor Name",
		},
		{
			accessorKey: "reason",
			header: "Reason",
		},
		{
			accessorKey: "date",
			header: "Request Date",
		},
	];

	const pendingColumns: ColumnDef<Report>[] = [
		{
			id: "search",
			accessorFn: (row) =>
				`${row.reportedBy} ${row.tutorName} ${row.sessionName} ${row.reason}`,
			header: () => null,
			cell: () => null,
			enableSorting: false,
			enableColumnFilter: true,
		},
		...commonColumns,
		{
			id: "action",
			header: "Action",
			cell: ({ row }) => (
				<Button size="sm" onClick={() => handleMarkReviewed(row.original.id)}>
					Mark as Reviewed
				</Button>
			),
		},
	];

	const reviewedColumns: ColumnDef<Report>[] = [
		{
			id: "search",
			accessorFn: (row) =>
				`${row.reportedBy} ${row.tutorName} ${row.sessionName} ${row.reason}`,
			header: () => null,
			cell: () => null,
			enableSorting: false,
			enableColumnFilter: true,
		},
		...commonColumns,
		{
			id: "status",
			header: "Status",
			cell: () => <Badge variant="success">Reviewed</Badge>,
		},
	];

	return (
		<div className="space-y-8">
			<div>
				<h2 className="text-lg font-semibold mb-2">Pending Reports</h2>
				<DataTable
					columns={pendingColumns}
					data={pendingReports}
					type="reports"
				/>
			</div>
			<div>
				<h2 className="text-lg font-semibold mb-2">Reviewed Reports</h2>
				<DataTable
					columns={reviewedColumns}
					data={reviewedReports}
					type="reports"
				/>
			</div>
		</div>
	);
}
