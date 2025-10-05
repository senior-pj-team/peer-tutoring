"use client";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useBankInfoQuery } from "@/hooks/use-bank-info";
import { useSumAmountToTutorQuery } from "@/hooks/use-sum-amount";
import { useSupabase } from "@/hooks/use-supabase";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Params = {
	receipt: string | null;
	content: {
		session_id: number;
		session_name: string | null;
		tutor_id: string;
		tutor_name: string | null;
		transferred_amount: number | null;
	};
};
export function TransferReceiptDialog({ receipt, content }: Params) {
	const [openDialog, setOpenDialog] = useState<boolean>(false);
	const supabase = useSupabase();

	const { data, isError, isLoading } = useBankInfoQuery(
		supabase,
		content.tutor_id,
		["tutor_transfer", "refund_transfer"],
		openDialog,
	);

	const { data: sums } = useSumAmountToTutorQuery(
		supabase,
		content.session_id,
		openDialog,
	);
	const amount_to_tutor_sums: number | null | undefined = sums
		? sums[0].sum_amount_to_tutor
		: null;

	const amount_from_student_sums: number | null | undefined = sums
		? sums[0].sum_amount_from_student
		: null;

	const amount_from_stripe_sums: number | null | undefined = sums
		? sums[0].sum_revenue
		: null;
	const bankInfo = !data ? undefined : data[0];

	return (
		<div>
			{/* Approve Dialog */}
			<Dialog open={openDialog} onOpenChange={setOpenDialog}>
				<DialogTrigger className="hover:underline text-sm text-gray-500 cursor-pointer">
					View Receipt
				</DialogTrigger>
				<DialogContent
					className="max-w-md sm:max-w-lg"
					onOpenAutoFocus={(e) => e.preventDefault()}>
					<DialogHeader>
						<DialogTitle>Transfer Receipt</DialogTitle>
					</DialogHeader>
					{isError && !isLoading && !bankInfo && (
						<div className="p-5 h-15 w-full flex justify-center items-center text-red-500 text-sm">
							Something went wrong ❌
						</div>
					)}

					<div className="text-sm text-gray-700 space-y-4">
						<div className="bg-gray-50 p-4 rounded-lg space-y-2">
							<div className="flex justify-between">
								<span className="text-gray-600">Session:</span>
								<span>{content.session_name || "N/A"}</span>
							</div>

							<div className="flex justify-between">
								<span className="text-gray-600">Tutor:</span>
								<Link href={`/home/tutor-view/${content.tutor_id}`}>
									<span className="hover:underline">
										{content.tutor_name || "N/A"}
									</span>
								</Link>
							</div>

							<div className="flex justify-between">
								<span className="text-gray-600">
									Total transferred amount :
								</span>
								<span className="font-extrabold">
									{content.transferred_amount || "N/A"} ฿
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-600">
									Total amount from student :
								</span>
								<span>{amount_from_student_sums || "N/A"} ฿</span>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-600">Total amount from stripe:</span>
								<span>{amount_from_stripe_sums || "N/A"} ฿</span>
							</div>
						</div>

						<div className="bg-gray-50 p-4 rounded-lg mt-2">
							<h3 className="font-medium mb-2">Bank Information</h3>
							<div className="space-y-2">
								<div className="flex justify-between">
									<span className="text-gray-600">Bank:</span>
									{isLoading && !isError && <Skeleton className="w-12 h-4" />}
									{bankInfo && <span>{bankInfo.bank_name || "N/A"}</span>}
								</div>
								<div className="flex justify-between">
									<span className="text-gray-600">Account Name:</span>
									{isLoading && !isError && <Skeleton className="w-12 h-4" />}
									{bankInfo && <span>{bankInfo.account_name || "N/A"}</span>}
								</div>
								<div className="flex justify-between">
									<span className="text-gray-600">Account Number:</span>
									{isLoading && !isError && <Skeleton className="w-12 h-4" />}
									{bankInfo && <span>{bankInfo.account_number || "N/A"}</span>}
								</div>
								<div className="flex justify-between">
									<span className="text-gray-600">Account Type:</span>
									{isLoading && !isError && <Skeleton className="w-12 h-4" />}
									{bankInfo && <span>{bankInfo.account_type || "N/A"}</span>}
								</div>
							</div>
						</div>
						<div className="rounded p-2 bg-white overflow-auto ">
							{receipt ? (
								<Image
									src={receipt}
									alt="Refund receipt"
									width={300}
									height={300}
									sizes="50vw"
									className="w-full max-h-[300px] object-cover"
								/>
							) : (
								<span className="text-sm text-gray-500">
									No receipt to show
								</span>
							)}
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}
