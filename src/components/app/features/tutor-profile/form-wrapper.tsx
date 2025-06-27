"use client";

import { updateTutorProfile } from "@/actions/update-tutor-profile";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	TTutorProfileSchema,
	tutorProfileSchema,
} from "@/schema/tutor-profile-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { BankForm } from "../profile-settings/bank-form";

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
export function FormWrapper({
	values,
	children,
}: {
	values: TBankInfoJoinTutorResult;
	children: React.ReactNode;
}) {
	const {
		id,
		bank_name,
		account_name,
		account_number,
		account_type,
		user: { bio_highlight, biography },
	} = values[0];

	const isKnownBank = BANKS.includes(bank_name ?? "");
	const defaultValues = {
		bank_name: !bank_name ? "" : isKnownBank ? (bank_name ?? "") : "Other",
		other_bank: !bank_name ? "" : isKnownBank ? "" : (bank_name ?? ""),
		account_name: account_name ?? "",
		account_number: account_number ?? "",
		account_type: account_type ?? "tutor_transfer",
		bio_highlight: bio_highlight ?? "",
		biography: biography ?? "",
	};
	const methods = useForm<TTutorProfileSchema>({
		resolver: zodResolver(tutorProfileSchema),
		defaultValues,
	});

	const [isPending, startTransition] = useTransition();

	const handleSubmit = (values: TTutorProfileSchema) => {
		try {
			startTransition(async () => {
				const response = await updateTutorProfile(values);
				response.success
					? toast.success("Tutor profile updated successfully")
					: toast.error(response.error.message);
			});
		} catch (err) {
			toast.error("Something went wrong", {
				description: "We couldn't complete your request. Please try again.",
			});
		}
	};
	const [open, setOpen] = useState<boolean>(false);
	return (
		<div>
			{account_type === "refund_transfer" && (
				<div className="mt-2">
					<span className="text-orange-500 text-xs font-extrabold">
						Your bank accounts for refund and transfer are the same. If you want
						to set up new for transferring,{" "}
						<Dialog open={open} onOpenChange={setOpen}>
							<DialogTrigger>
								<span className="hover:underline cursor-pointer">
									click here
								</span>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Set up new Bank Account</DialogTitle>
								</DialogHeader>
								<DialogDescription className="text-xs">
									This new account will only be used to transfer money to you.
									The existing account will be used for refund cases.
								</DialogDescription>
								<BankForm bankInfo={null} oldBankID={id} openDialog={setOpen} />
							</DialogContent>
						</Dialog>
					</span>
				</div>
			)}

			<Form {...methods}>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(handleSubmit)}>
						{children}
						<div className="flex justify-end">
							<Button
								type="submit"
								className="mt-4 cursor-pointer"
								disabled={isPending}>
								{isPending ? (
									<div className="flex items-center gap-1">
										<span>Loading</span>
										<div className="flex items-center gap-0.5">
											<div className="h-1 w-1 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
											<div className="h-1 w-1 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
											<div className="h-1 w-1 bg-white rounded-full animate-bounce"></div>
										</div>
									</div>
								) : (
									"Save Changes"
								)}
							</Button>
						</div>
					</form>
				</FormProvider>
			</Form>
		</div>
	);
}
