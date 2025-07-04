"use client";
import { updateUserBankInfo } from "@/actions/update-user-profile";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
	bankInfoSchema,
	TBankInfoSchema,
} from "@/schema/profile-schema-server";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { Dispatch, SetStateAction, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { LoadingDots } from "../../shared/loading-dots";

const BANKS = [
	"Siam Commercial Bank",
	"Kasikornbank",
	"Krung Thai Bank",
	"Bangkok Bank",
	"TMB Bank",
	"Bank of Ayudhya",
	"Government Savings Bank",
	"BAAC",
	"CIMB Thai",
	"Standard Chartered",
	"UOB (Thailand)",
];

export function BankForm({
	bankInfo,
	oldBankID,
	openDialog,
}: {
	bankInfo: TBankInfoResult | null;
	oldBankID?: number;
	openDialog?: Dispatch<SetStateAction<boolean>>;
}) {
	let bank_name_data: string | null = null;
	let account_name_data: string | null = null;
	let account_number_data: string | null = null;
	let account_type_data:
		| "student_refund"
		| "tutor_transfer"
		| "refund_transfer"
		| undefined = oldBankID !== undefined ? "tutor_transfer" : "student_refund";
	const [isPending, startTransition] = useTransition();

	if (bankInfo) {
		const { bank_name, account_name, account_number, account_type } = bankInfo;
		bank_name_data = bank_name;
		account_name_data = account_name;
		account_number_data = account_number;
		account_type_data = account_type;
	}
	const isKnownBank = BANKS.includes(bank_name_data ?? "");

	const form = useForm<TBankInfoSchema>({
		resolver: zodResolver(bankInfoSchema),
		defaultValues: {
			bank_name: !bank_name_data
				? ""
				: isKnownBank
					? (bank_name_data ?? "")
					: "Other",
			other_bank: !bank_name_data
				? ""
				: isKnownBank
					? ""
					: (bank_name_data ?? ""),
			account_name: account_name_data ?? "",
			account_number: account_number_data ?? "",
			account_type: account_type_data,
		},
	});
	const bankName = form.watch("bank_name");

	const handleSubmit = (values: TBankInfoSchema) => {
		try {
			startTransition(async () => {
				const response = await updateUserBankInfo(values, oldBankID);
				response.success
					? toast.success("Bank Info updated successfully")
					: toast.error(response.error.message);
				if (openDialog) {
					console.log(openDialog);
					openDialog(false);
				}
			});
		} catch (err) {
			toast.error("Something went wrong", {
				description: "We couldn't complete your request. Please try again.",
			});
		}
	};
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className={cn(
					"grid items-center ",
					oldBankID !== undefined ? "gap-y-5 w-full" : "gap-y-8 w-[85%]",
				)}>
				<FormField
					control={form.control}
					name="account_type"
					render={({ field }) => (
						<input type="hidden" {...field} value={account_type_data} />
					)}
				/>
				<FormField
					control={form.control}
					name="bank_name"
					render={({ field }) => (
						<FormItem className="grid w-full items-center gap-y-2">
							<FormLabel className="text-xs md:text-sm">Bank Name</FormLabel>
							<FormControl>
								<Select
									{...field}
									disabled={false}
									value={field.value || ""}
									onValueChange={field.onChange}>
									<SelectTrigger className="text-[0.6rem] md:text-sm w-full">
										<SelectValue placeholder="Select a bank" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>Banks</SelectLabel>
											{BANKS.map((name) => (
												<SelectItem key={name} value={name} className="py-2">
													{name}
												</SelectItem>
											))}
											<SelectItem value="Other">Other Banks</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage className="md:text-[0.75rem] text-[0.55rem]" />
						</FormItem>
					)}
				/>
				{bankName === "Other" && (
					<FormField
						control={form.control}
						name="other_bank"
						render={({ field }) => (
							<FormItem className="grid w-full items-center gap-y-2">
								<FormLabel className="font-extralight text-gray-500  md:text-[0.8rem] text-[0.65rem]">
									Manually Enter Bank Name
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="Enter Bank"
										value={field.value || ""}
										className="text-[0.6rem] md:text-sm"
										disabled={false}
									/>
								</FormControl>
								<FormMessage className="md:text-[0.75rem] text-[0.55rem]" />
							</FormItem>
						)}
					/>
				)}

				<FormField
					control={form.control}
					name="account_name"
					render={({ field }) => (
						<FormItem className="grid w-full items-center gap-y-2">
							<FormLabel className="text-xs md:text-sm">
								Bank Account Name
							</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder="Enter Bank Account Name"
									value={field.value || ""}
									className="text-[0.6rem] md:text-sm"
									disabled={false}
								/>
							</FormControl>
							<FormMessage className="md:text-[0.75rem] text-[0.55rem]" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="account_number"
					render={({ field }) => (
						<FormItem className="grid w-full items-center gap-y-2">
							<FormLabel className="text-xs md:text-sm">
								Bank Account Number
							</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder="Enter Bank Account Number"
									value={field.value ?? ""}
									className="text-[0.6rem] md:text-sm"
									disabled={false}
								/>
							</FormControl>

							<FormMessage className="md:text-[0.75rem] text-[0.55rem]" />
						</FormItem>
					)}
				/>

				<div
					className={cn(oldBankID !== undefined && "w-full flex justify-end")}>
					<Button
						disabled={isPending}
						size="lg"
						type="submit"
						className="md:w-[8.5rem] w-[6.5rem] md:text-[0.9rem] text-[0.7rem] cursor-pointer hover:ring-2 hover:ring-orange-300">
						{isPending ? (
							<div className="flex items-center gap-1">
								<span>Loading</span>
								<LoadingDots />
							</div>
						) : oldBankID !== undefined ? (
							"Create Account"
						) : (
							"Save Bank Info"
						)}
					</Button>
				</div>
			</form>
		</Form>
	);
}
