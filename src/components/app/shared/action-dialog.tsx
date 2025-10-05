"use client";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	approveRefundTransferSchema,
	TApproveRefundTransferSchema,
} from "@/schema/appove-refund-transfer";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText } from "lucide-react";
import Link from "next/link";
import { Dispatch, RefObject, SetStateAction, useRef, useState } from "react";

import { useForm } from "react-hook-form";
import { LoadingDots } from "./loading-dots";
import { useBankInfoQuery } from "@/hooks/use-bank-info";
import { useSupabase } from "@/hooks/use-supabase";
import { Skeleton } from "@/components/ui/skeleton";
import { useSumAmountToTutorQuery } from "@/hooks/use-sum-amount";

type Params = {
	isPending: boolean;
	dialogTitle: string;
	onSubmit: (formValues: TApproveRefundTransferSchema) => Promise<void>;
	openDialog: boolean;
	setOpenDialog: Dispatch<SetStateAction<boolean>>;
	type: "refund" | "transfer";
	content: {
		session_id: number;
		session_name: string | null;
		student_id?: string;
		student_name?: string | null;
		tutor_id: string;
		tutor_name: string | null;
	};
	ref?: RefObject<number | null>;
};
export function ActionDialog({
	isPending,
	dialogTitle,
	onSubmit,
	openDialog,
	setOpenDialog,
	type,
	content,
	ref,
}: Params) {
	const [isDragging, setIsDragging] = useState(false);
	const supabase = useSupabase();

	const form = useForm<TApproveRefundTransferSchema>({
		resolver: zodResolver(approveRefundTransferSchema),
		defaultValues: {
			receipt: undefined,
		},
	});

	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const user_id =
		type === "refund" && content.student_id
			? content.student_id
			: content.tutor_id;
	const account_type: TBankAccountType[] =
		type === "refund"
			? ["student_refund", "refund_transfer"]
			: ["tutor_transfer", "refund_transfer"];

	const { data, isError, isLoading } = useBankInfoQuery(
		supabase,
		user_id,
		account_type,
		openDialog,
	);
	const enabled_sum_query = type === "transfer" && openDialog ? true : false;
	const { data: sums } = useSumAmountToTutorQuery(
		supabase,
		content.session_id,
		enabled_sum_query,
	);
	const amount_to_tutor_sums: number | null | undefined =
		sums && type === "transfer" ? sums[0].sum_amount_to_tutor : null;

	const amount_from_student_sums: number | null | undefined =
		sums && type === "transfer" ? sums[0].sum_amount_from_student : null;

	const amount_from_stripe_sums: number | null | undefined =
		sums && type === "transfer" ? sums[0].sum_revenue : null;

	if (ref) ref.current = sums ? sums[0].sum_amount_to_tutor : null;

	const bankInfo = !data ? undefined : data[0];

	return (
		<div>
			{/* Approve Dialog */}
			<Dialog open={openDialog} onOpenChange={setOpenDialog}>
				<DialogContent
					className="max-w-md sm:max-w-lg"
					onOpenAutoFocus={(e) => e.preventDefault()}>
					<DialogHeader>
						<DialogTitle>{dialogTitle}</DialogTitle>
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
							{content.student_id && (
								<div className="flex justify-between">
									<span className="text-gray-600">Student:</span>
									<Link href={`/home/student-view/${content.student_id}`}>
										<span className="hover:underline">
											{content.student_name || "N/A"}
										</span>
									</Link>
								</div>
							)}

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
									Total amount to transfer :
								</span>
								<span className="font-extrabold">
									{amount_to_tutor_sums || "N/A"} ฿
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

						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-3 my-5">
								<FormField
									control={form.control}
									name="receipt"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Upload Receipt</FormLabel>
											<FormControl>
												<div
													className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer ${
														isDragging
															? "border-blue-400 bg-blue-50"
															: "border-gray-300"
													}`}
													onClick={() => fileInputRef.current?.click()}
													onDragOver={(e) => {
														e.preventDefault();
														setIsDragging(true);
													}}
													onDragLeave={() => setIsDragging(false)}
													onDrop={(e) => {
														e.preventDefault();
														setIsDragging(false);
														if (
															e.dataTransfer.files &&
															e.dataTransfer.files.length > 0
														) {
															field.onChange(e.dataTransfer.files[0]);
															e.dataTransfer.clearData();
														}
													}}>
													<div className="text-gray-500 text-sm my-5">
														{field.value ? (
															<div className="flex items-center gap-2 justify-center text-sm text-gray-700">
																<FileText className="w-4 h-4" />
																<span>{field.value.name}</span>
															</div>
														) : (
															<span>
																Drag and drop receipt here or click to browse
															</span>
														)}
													</div>
													<input
														type="file"
														ref={fileInputRef}
														className="hidden"
														onChange={(e) => {
															if (e.target.files && e.target.files[0]) {
																field.onChange(e.target.files[0]);
															}
														}}
													/>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className="flex gap-2 justify-end">
									<Button
										variant="outline"
										type="button"
										onClick={() => {
											form.reset();
											setOpenDialog(false);
										}}>
										Cancel
									</Button>
									<Button variant="default" type="submit" disabled={isPending}>
										{isPending ? (
											<>
												<span className="ml-2">Loading</span>
												<LoadingDots />
											</>
										) : (
											"Submit"
										)}
									</Button>
								</div>
							</form>
						</Form>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}
