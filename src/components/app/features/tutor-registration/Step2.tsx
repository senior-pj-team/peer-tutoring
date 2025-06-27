"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";

const BANKS = [
	"Siam Commercial Bank",
	"Kasikorn Bank",
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

type Step2Props = {
	bankData: TBankInfoResult | null;
};

export default function Step2({ bankData }: Step2Props) {
	const form = useFormContext();
	const [useExisting, setUseExisting] = useState(false);

	const useExistingBankInfo = () => {
		if (bankData) {
			form.setValue("bankName", bankData.bank_name ?? "");
			form.setValue("accountNumber", bankData.account_number ?? "");
			form.setValue("accountName", bankData.account_name ?? "");
			form.setValue("type", "refund_transfer");
		}
	};

	const handleSwitchChange = (checked: boolean) => {
		setUseExisting(checked);
		if (checked) {
			useExistingBankInfo();
		} else {
			form.resetField("bankName");
			form.resetField("accountNumber");
			form.resetField("accountName");
			form.resetField("type");
		}
	};

	const bankName = form.watch("bankName");

	return (
		<div className="space-y-6">
			{/* Toggle */}
			{bankData && (
				<div className="flex items-center justify-between">
					<Label htmlFor="use-existing">Use existing student bank info?</Label>
					<Switch
						id="use-existing"
						checked={useExisting}
						onCheckedChange={handleSwitchChange}
					/>
				</div>
			)}

			{/* Form Fields */}
			<div className="grid gap-4">
				{/* Bank Name */}
				{!useExisting && (
					<FormField
						control={form.control}
						name="bankName"
						render={({ field }) => (
							<FormItem className="grid w-full items-center gap-y-2">
								<FormLabel className="text-xs md:text-sm">Bank Name</FormLabel>
								<FormControl>
									<Select
										{...field}
										disabled={useExisting}
										value={field.value}
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
				)}
				{(bankName === "Other" || useExisting) && (
					<FormField
						control={form.control}
						name="bankName"
						render={({ field }) => (
							<FormItem className="grid w-full items-center gap-y-2">
								<FormLabel
									className={
										useExisting
											? "text-xs md:text-sm"
											: "font-extralight text-gray-500  md:text-[0.8rem] text-[0.65rem]"
									}>
									{useExisting ? "Bank Name" : "Manually Enter Bank Name"}
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="Enter Bank"
										value={field.value}
										className="text-[0.6rem] md:text-sm"
										disabled={useExisting}
									/>
								</FormControl>
								<FormMessage className="md:text-[0.75rem] text-[0.55rem]" />
							</FormItem>
						)}
					/>
				)}

				{/* Account Name */}
				<FormField
					control={form.control}
					name="accountName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Bank Account Name</FormLabel>
							<FormControl>
								<Input
									placeholder="Account Name"
									{...field}
									disabled={useExisting}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Account Number */}
				<FormField
					control={form.control}
					name="accountNumber"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Account Number</FormLabel>
							<FormControl>
								<Input
									placeholder="1234567890"
									{...field}
									// onChange={(e) => {
									//   let formatted = e.target.value.replace(/[^\d]/g, "");
									//   if (formatted.length > 10)
									//     formatted = formatted.slice(0, 10);
									//   field.onChange(formatted);
									// }}
									disabled={useExisting}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		</div>
	);
}
