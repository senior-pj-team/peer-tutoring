"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ColumnDef } from "@tanstack/react-table";

export type Payouts = {
	id: string;
	session: string;
	student: {
		name: string;
		proile_picture: string;
	};
	released_at: string;
	amount: number;
};

export const columns: ColumnDef<Payouts>[] = [
	{
		accessorKey: "id",
		header: "TRN_ID",
	},
	{
		accessorKey: "session",
		header: "Sessions",
		cell: ({ row }) => {
			return <div className=" w-full truncate">{row.getValue("session")}</div>;
		},
	},
	{
		accessorKey: "student",
		header: "Student",
		cell: ({ row }) => {
			console.log(row.getValue("student"));
			const student = row.getValue("student") as Payouts["student"];
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
		accessorKey: "released_at",
		header: "Released Date",
		cell: ({ row }) => {
			const date = new Date(row.getValue("released_at"));
			const options: Intl.DateTimeFormatOptions = {
				day: "numeric",
				month: "long",
				year: "numeric",
			};
			return date.toLocaleDateString("en-GB", options);
		},
	},
	{
		accessorKey: "amount",
		header: "Amount",
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue("amount"));
			const formatted = new Intl.NumberFormat("th-TH", {
				style: "currency",
				currency: "THB",
			}).format(amount);

			return <div className=" right">{formatted}</div>;
		},
	},
];
