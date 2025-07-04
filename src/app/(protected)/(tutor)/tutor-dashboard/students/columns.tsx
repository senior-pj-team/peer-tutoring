"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { getAvatarFallback } from "@/utils/app/get-avatar-fallback";
import { formatDate, parseISO } from "date-fns";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<TStudentSessionJoinResult>[] = [
	{
		id: "student",
		header: "Student",
		cell: ({ row }) => {
			const student = row.original.student;
			const studentId = student.id;
			const studentName = student.username;
			const studentImage = student.profile_url;
			const studentEmail = student.email;

			return (
				<div className="flex items-center gap-3 max-w-[300px]">
					<Avatar className="flex-shrink-0 w-10 h-10">
						{studentImage && (
							<AvatarImage src={studentImage} alt={studentName ?? "Unknown"} />
						)}

						<AvatarFallback>
							{getAvatarFallback(studentName ?? "U")}
						</AvatarFallback>
					</Avatar>

					<div className="flex flex-col overflow-hidden">
						<Link href={`/student-view/${studentId}`}>
							<span className="font-medium text-sm text-gray-800 hover:underline truncate max-w-[200px]">
								{studentName}
							</span>
						</Link>

						<span
							title={studentEmail}
							className="text-xs text-gray-500 truncate max-w-[200px]">
							{studentEmail}
						</span>
					</div>
				</div>
			);
		},
	},
	{
		id: "session",
		header: "Session",
		cell: ({ row }) => {
			const session = row.original.sessions;
			return (
				<div className="max-w-[250px]">
					<Link href={`/tutor-dashboard/session/${session.id}/content`}>
						<div className="truncate hover:underline">
							{session?.session_name ?? "Unknown"}
						</div>
					</Link>
				</div>
			);
		},
	},
	{
		id: "enrolled_at",
		header: "Enrolled Date",
		cell: ({ row }) => {
			const createdAt = row.original.created_at;
			if (!createdAt) return "-";
			const displayDate = formatDate(parseISO(createdAt), "yyy MMMM dd");
			return <div>{displayDate}</div>;
		},
	},
	{
		id: "released_amount",
		header: "Amount",
		cell: ({ row }) => {
			const amount = row.original.amount_from_student ?? 0;
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
		cell: ({ row }) => {
			const status = row.original.status;
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
	{
		id: "search",
		accessorFn: (row) =>
			`${row.sessions?.session_name} ${row.student.username}`,
		header: () => null,
		cell: () => null,
		enableColumnFilter: true,
		filterFn: "fuzzy",
	},
];
