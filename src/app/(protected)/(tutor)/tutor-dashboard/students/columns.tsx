"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { getAvatarFallback } from "@/utils/app/get-avatar-fallback";
import { formatDate, parseISO } from "date-fns";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<TStudentSessionViewResult>[] = [
	{
		id: "student",
		header: "Student",
		accessorKey: "student",
		cell: ({ row }) => {
			return (
				<div className="flex items-center gap-3 max-w-[300px]">
					<Avatar className="flex-shrink-0 w-10 h-10">
						{row.original.student_profile_url && (
							<AvatarImage
								src={row.original.student_profile_url}
								alt={row.original.student_username ?? "Unknown"}
							/>
						)}

						<AvatarFallback>
							{getAvatarFallback(row.original.student_username ?? "U")}
						</AvatarFallback>
					</Avatar>

					<div className="flex flex-col overflow-hidden">
						<Link href={`/home/student-view/${row.original.student_id}`}>
							<span className="font-medium text-sm text-gray-800 hover:underline truncate max-w-[200px]">
								{row.original.student_username}
							</span>
						</Link>

						<span
							title={row.original.student_email ?? "NA"}
							className="text-xs text-gray-500 truncate max-w-[200px]">
							{row.original.student_email}
						</span>
					</div>
				</div>
			);
		},
	},
	{
		id: "session",
		header: "Session",
		accessorKey: "session",
		cell: ({ row }) => {
			return (
				<div className="max-w-[250px]">
					<Link
						href={`/tutor-dashboard/session/${row.original.session_id}/content`}>
						<div className="truncate hover:underline">
							{row.original.session_name ?? "Unknown"}
						</div>
					</Link>
				</div>
			);
		},
	},
	{
		id: "enrolled_at",
		header: "Enrolled Date",
		accessorKey: "enrolled_at",
		cell: ({ row }) => {
			if (!row.original.enrolled_at) return "-";
			const displayDate = formatDate(
				parseISO(row.original.enrolled_at),
				"yyy MMMM dd",
			);
			return <div>{displayDate}</div>;
		},
	},
	{
		id: "released_amount",
		header: "Amount",
		accessorKey: "released_amount",
		cell: ({ row }) => {
			const amount = row.original.amount_to_tutor ?? 0;
			const formatted = new Intl.NumberFormat("th-TH", {
				style: "currency",
				currency: "THB",
			}).format(amount);
			return <div>{formatted}</div>;
		},
	},
	{
		id: "enrollment_status",
		header: "Enrollment Status",
		accessorKey: "enrollment_status",
		cell: ({ row }) => {
			const status = row.original.student_session_status;
			const color =
				status === "enrolled"
					? "text-purple-500 bg-purple-100"
					: status === "paid"
						? "text-green-600 bg-green-100"
						: status === "completed"
							? "text-green-400 bg-green-50"
							: status === "refunded"
								? "text-orange-500 bg-orange-100"
								: status === "failed_payment" || status === "expired_payment"
									? "text-red-500 bg-red-100"
									: "text-gray-600 bg-gray-100";
			return (
				<div>
					<Badge className={`${color}`}>{status}</Badge>
				</div>
			);
		},
	},
];
