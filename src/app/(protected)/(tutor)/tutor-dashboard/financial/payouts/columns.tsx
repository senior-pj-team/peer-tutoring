"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAvatarFallback } from "@/utils/app/get-avatar-fallback";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate, parseISO } from "date-fns";
import Link from "next/link";

export const columns: ColumnDef<TStudentSessionJoinResult>[] = [
	{
		accessorKey: "id",
		header: "TRN_ID",
	},
	{
		id: "session",
		header: "Session",
		cell: ({ row }) => {
			const session = row.original.sessions;
			return (
				<>
					<div className="truncate">
						{session?.session_name ?? "Unknown"}
					</div>
					<div className="truncate">
						{session?.course_name ?? "Course"}
					</div>
				</>
			);
		},
	},
	{
		id: "student",
		header: "Student",
		cell: ({ row }) => {
			const student = row.original.student;
			const studentId = student.id;
			const studentName = student.username;
			const studentImage = student.profile_url

			return (
				<div className="flex items-center space-x-2">
					<Avatar>
						<AvatarImage src={studentImage ?? "no-image"} alt={studentName ?? "Unknown"} />
						<AvatarFallback>
							{getAvatarFallback(studentName ?? "U")}
						</AvatarFallback>
					</Avatar>
					<Link href={`/student-view/${studentId}`}>
						<span className="hover:underline cursor-pointer">
							{studentName}
						</span>
					</Link>
				</div>
			);
		},
	},
	{
		id: "released_at",
		header: "Paid on",
		cell: ({ row }) => {
			const held_untill = row.original.held_until;
			if (!held_untill) return "-";
			const displayDate = formatDate(parseISO(held_untill), "yyy MMMM dd")
			return <div>{displayDate}</div>;
		},
	},
	{
		id: "released_amount",
		header: "Amount",
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
		id: "search",
		accessorFn: (row) =>
			`${row.sessions?.session_name} ${row.student.username}`,
		header: () => null,
		cell: () => null,
		enableColumnFilter: true,
		filterFn: "fuzzy",
	},
];
