"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAvatarFallback } from "@/utils/app/get-avatar-fallback";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { formatDate, parseISO } from "date-fns";

export const columns: ColumnDef<TStudentSessionViewResult>[] = [
	{
		id: "id",
		header: "TRN_ID",
		accessorKey: "id",
		cell: ({ row }) => {
			return <div>{row.original.student_session_id}</div>;
		},
	},
	{
		id: "session",
		header: "Session",
		accessorKey: "session",
		cell: ({ row }) => {
			return (
				<div className="max-w-[250px]">
					<div className="truncate font-medium">
						{row.original.session_name ?? "Unknown"}
					</div>
					<div className="truncate text-sm text-muted-foreground">
						{row.original.course_name ?? "Course"}
					</div>
				</div>
			);
		},
	},
	{
		id: "student",
		header: "Student",
		accessorKey: "student",
		cell: ({ row }) => {
			return (
				<div className="flex items-center gap-3 max-w-[300px]">
					<Avatar className="flex-shrink-0 w-10 h-10">
						{row.original.student_profile_url && (
							<AvatarImage src={row.original.student_profile_url} alt={row.original.student_username ?? "Unknown"} />
						)}
						<AvatarFallback>
							{getAvatarFallback(row.original.student_username?? "U")}
						</AvatarFallback>
					</Avatar>

					<div className="flex flex-col overflow-hidden">
						<Link href={`/student-view/${row.original.student_id}`}>
							<span className="font-medium text-sm text-gray-800 hover:underline truncate max-w-[200px]">
								{row.original.student_username ?? "-"}
							</span>
						</Link>
						<span
							title={row.original.student_email?? ""}
							className="text-xs text-gray-500 truncate max-w-[200px]">
							{row.original.student_email ?? "-"}
						</span>
					</div>
				</div>
			);
		},
	},
	{
		id: "paid_at",
		header: "Paid at",
		accessorKey: "paid_out_at",
		cell: ({ row }) => {
			const paidAt = row.original.paid_out_at;
			if (!paidAt) return "-";
			const displayDate = formatDate(parseISO(paidAt), "yyyy MMMM dd");
			return <div>{displayDate}</div>;
		},
	},
	{
		id: "amount",
		header: "Amount",
		accessorKey: "amount_to_tutor",
		cell: ({ row }) => {
			const amount = row.original.amount_to_tutor ?? 0;
			const formatted = new Intl.NumberFormat("th-TH", {
				style: "currency",
				currency: "THB",
			}).format(amount);
			return <div>{formatted}</div>;
		},
	},
];
