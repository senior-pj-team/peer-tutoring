"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { getAvatarFallback } from "@/utils/app/get-avatar-fallback";
import { formatDate, parseISO } from "date-fns";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<TStudentSessionViewResult>[] = [
	{
		id: "id",
		accessorKey: "id",
		header: "ID",
		cell: ({ row }) => {
			const id = row.original.student_session_id;
			return <div>{id}</div>;
		},
	},
	{
		id: "stripe_id",
		header: "Stripe ID",
		accessorKey: "stripe_id",
		cell: ({ row }) => {
			const stripe_id = row.original.stripe_payment_intent_id;
			return <div>{stripe_id}</div>;
		},
	},
	{
		id: "session",
		header: "Session",
		accessorKey: "session",
		cell: ({ row }) => {
			return (
				<div className="max-w-[250px]">
					<Link href={`/admin-dashboard/session/${row.original.session_id}`}>
						<div className="truncate hover:underline">
							{row.original.session_name ?? "Unknown"}
						</div>
					</Link>
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
						<Link href={`/student-view/${row.original.student_id}`}>
							<span className="font-medium text-sm text-gray-800 hover:underline truncate max-w-[200px]">
								{row.original.student_username ?? "-"}
							</span>
						</Link>

						<span
							title={row.original.student_email ?? ""}
							className="text-xs text-gray-500 truncate max-w-[200px]">
							{row.original.student_email ?? "-"}
						</span>
					</div>
				</div>
			);
		},
	},

	{
		id: "tutor",
		header: "Tutor",
		accessorKey: "tutor",
		cell: ({ row }) => {
			return (
				<div className="flex items-center gap-3 max-w-[300px]">
					<Avatar className="flex-shrink-0 w-10 h-10">
						{row.original.tutor_profile_url && (
							<AvatarImage
								src={row.original.tutor_profile_url}
								alt={row.original.tutor_username ?? "Unknown"}
							/>
						)}

						<AvatarFallback>
							{getAvatarFallback(row.original.tutor_username ?? "U")}
						</AvatarFallback>
					</Avatar>

					<div className="flex flex-col overflow-hidden">
						<Link href={`/student-view/${row.original.tutor_id}`}>
							<span className="font-medium text-sm text-gray-800 hover:underline truncate max-w-[200px]">
								{row.original.tutor_username ?? "-"}
							</span>
						</Link>

						<span
							title={row.original.tutor_email ?? ""}
							className="text-xs text-gray-500 truncate max-w-[200px]">
							{row.original.tutor_email ?? "-"}
						</span>
					</div>
				</div>
			);
		},
	},

	{
		id: "amount_from_student",
		header: "Amount from student",
		accessorKey: "amount_from_student",
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
		id: "amount_to_tutor",
		header: "Amount to tutor",
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

	{
		id: "amount_from_stripe",
		header: "Amount from stripe",
		accessorKey: "amount_from_stripe",
		cell: ({ row }) => {
			const amount = row.original.amount_from_stripe ?? 0;
			const formatted = new Intl.NumberFormat("th-TH", {
				style: "currency",
				currency: "THB",
			}).format(amount);
			return <div>{formatted}</div>;
		},
	},

	{
		id: "profit",
		header: "Profit",
		accessorKey: "profit",
		cell: ({ row }) => {
			const amount_from_stripe = row.original.amount_from_stripe ?? 0;
			const amount_to_tutor = row.original.amount_to_tutor ?? 0;
			const profit = amount_from_stripe - amount_to_tutor;
			const formatted = new Intl.NumberFormat("th-TH", {
				style: "currency",
				currency: "THB",
			}).format(profit);
			return <div>{formatted}</div>;
		},
	},

	{
		id: "status",
		header: "Status",
		accessorKey: "status",
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
	{
		id: "enrolled_at",
		header: "Enrolled Date",
		accessorKey: "enrolled_at",
		cell: ({ row }) => {
			const createdAt = row.original.enrolled_at;
			if (!createdAt) return "-";
			const displayDate = formatDate(parseISO(createdAt), "yyy MMMM dd");
			return <div>{displayDate}</div>;
		},
	},

	{
		id: "refunded_at",
		header: "Refunded Date",
		accessorKey: "refunded_at",
		cell: ({ row }) => {
			const refuned_at = row.original.refunded_at;
			if (!refuned_at) return "-";
			const displayDate = formatDate(parseISO(refuned_at), "yyy MMMM dd");
			return <div>{displayDate}</div>;
		},
	},
	{
		id: "held_until",
		header: "Held Until",
		accessorKey: "held_until",
		cell: ({ row }) => {
			const held_until = row.original.held_until;
			if (!held_until) return "-";
			const displayDate = formatDate(parseISO(held_until), "yyy MMMM dd");
			return <div>{displayDate}</div>;
		},
	},
];
