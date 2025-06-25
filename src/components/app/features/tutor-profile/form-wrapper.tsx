"use client";

import { updateTutorProfile } from "@/actions/update-tutor-profile";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
	TTutorProfileSchema,
	tutorProfileSchema,
} from "@/schema/tutor-profile-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

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
	values: TTutorWithStatsResult;

	children: React.ReactNode;
}) {
	const {
		bank_name,
		account_name,
		account_number,
		account_type,
		bio_highlight,
		biography,
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

	return (
		<div>
			{account_type === "refund_transfer" && (
				<div className="mt-2">
					<span className="text-orange-500 text-xs font-extrabold">
						Your bank accounts for refund and transfer are the same. If you want
						to set up new for transferring,{" "}
						<span className="hover:underline cursor-pointer">click here</span>
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
