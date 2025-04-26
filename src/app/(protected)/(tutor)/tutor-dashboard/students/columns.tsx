"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ColumnDef } from "@tanstack/react-table";

export type Student = {
	session: string;
	student: {
		name: string;
		proile_picture: string;
	};
	enrolled_at: string;
	released_amount: number;
	payment_status: "held" | "released" | "refunded" | "disputes";
};

export const columns: ColumnDef<Student>[] = [
	{
		accessorKey: "student",
		header: "Student",
		cell: ({ row }) => {
			const student = row.getValue("student") as Student["student"];
			return (
				<div className="flex items-center space-x-1.5 ">
					{" "}
					<Avatar>
						<AvatarImage src={student.proile_picture} alt="profile_picture" />
						<AvatarFallback>P</AvatarFallback>
					</Avatar>
					<span className="w-full truncate">{student.name}</span>
				</div>
			);
		},
	},

	{
		accessorKey: "session",
		header: "Session",
		cell: ({ row }) => {
			return <div className=" w-full truncate">{row.getValue("session")}</div>;
		},
	},

	{
		accessorKey: "enrolled_at",
		header: "Enrolled Date",
		cell: ({ row }) => {
			const date = new Date(row.getValue("enrolled_at"));
			const options: Intl.DateTimeFormatOptions = {
				day: "numeric",
				month: "long",
				year: "numeric",
			};
			return date.toLocaleDateString("en-GB", options);
		},
	},
	{
		accessorKey: "released_amount",
		header: "Amount",
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue("released_amount"));
			const formatted = new Intl.NumberFormat("th-TH", {
				style: "currency",
				currency: "THB",
			}).format(amount);

			return <div className=" right">{formatted}</div>;
		},
	},

	{
		accessorKey: "payment_status",
		header: "Payment Status",
		cell: ({ row }) => {
			const status = row.getValue(
				"payment_status",
			) as Student["payment_status"];

			const color =
				status === "held"
					? "text-yellow-500"
					: status === "released"
					? "text-green-500"
					: status === "disputes"
					? "text-orange-500"
					: "text-red-500";

			return <div className={color}>{status}</div>;
		},
	},
	{
		id: "search",
		accessorFn: (row) => `${row.session} ${row.student?.name}`,
		header: () => null,
		cell: () => null,
		enableColumnFilter: true,
		filterFn: "fuzzy",
	},
];
