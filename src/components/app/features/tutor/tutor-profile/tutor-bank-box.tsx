"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreditCard, Pencil } from "lucide-react";

import { useFormContext } from "react-hook-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
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
const TutorBankBox = () => {
	const { control, watch } = useFormContext();
	const [disable, setDisable] = useState(true);
	const bankName = watch("bank_name");

	return (
		<Card className="w-full mt-8">
			<CardHeader className="flex items-center justify-between">
				<h2 className="text-lg font-semibold flex items-center">
					<CreditCard className="w-5 h-5 mr-2 text-muted-foreground" /> Bank
					Account
				</h2>
				<Button
					variant="ghost"
					size="icon"
					onClick={(e) => {
						e.preventDefault();
						setDisable((prev) => !prev);
					}}
					className="hover:bg-orange-200 cursor-pointer">
					<Pencil className="w-4 h-4" />
				</Button>
			</CardHeader>
			<CardContent className="space-y-4 w-full">
				<FormField
					control={control}
					name="bank_name"
					render={({ field }) => (
						<FormItem className="grid w-full items-center gap-y-2">
							<FormLabel className="text-xs md:text-sm">Bank Name</FormLabel>
							<FormControl>
								<Select
									{...field}
									disabled={disable}
									value={field.value || undefined}
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
						control={control}
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
										disabled={disable}
									/>
								</FormControl>
								<FormMessage className="md:text-[0.75rem] text-[0.55rem]" />
							</FormItem>
						)}
					/>
				)}

				<FormField
					control={control}
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
									disabled={disable}
								/>
							</FormControl>
							<FormMessage className="md:text-[0.75rem] text-[0.55rem]" />
						</FormItem>
					)}
				/>
				<FormField
					control={control}
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
									value={field.value?.toString() || ""}
									className="text-[0.6rem] md:text-sm"
									disabled={disable}
								/>
							</FormControl>

							<FormMessage className="md:text-[0.75rem] text-[0.55rem]" />
						</FormItem>
					)}
				/>
			</CardContent>
		</Card>
	);
};

export default TutorBankBox;
