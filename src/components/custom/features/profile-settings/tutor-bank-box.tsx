"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreditCard, Pencil, ChevronDown } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const TutorBankBox = ({
	bankName,
	bankNumber,
	bankAccountName,
}: {
	bankName: string;
	bankNumber: string;
	bankAccountName: string;
}) => {
	const banks = [
		"Bangkok Bank",
		"Kasikorn Bank",
		"Siam Commercial Bank (SCB)",
		"Bank of Ayudhya (Krungsri)",
		"TMBThanachart Bank",
	];

	const [open, setOpen] = useState(false);
	const [disable, setDisable] = useState(true);
	const [position, setPosition] = useState("Select a bank");
	const handleToggle = () => {
		setDisable(!disable);
	};

	return (
		<Card className="w-full">
			<CardHeader className="flex items-center justify-between">
				<h2 className="text-lg font-semibold flex items-center">
					<CreditCard className="w-5 h-5 mr-2 text-muted-foreground" /> Bank
					Account
				</h2>
				<Button
					variant="ghost"
					size="icon"
					onClick={handleToggle}
					className="hover:bg-orange-200 cursor-pointer">
					<Pencil className="w-4 h-4" />
				</Button>
			</CardHeader>
			<CardContent className="space-y-4 w-full">
				<div className="w-full">
					<label className="text-sm font-medium">Bank Name</label>
					<DropdownMenu onOpenChange={setOpen}>
						<DropdownMenuTrigger asChild disabled={disable}>
							<Button variant="outline" className="w-full">
								<div className="flex justify-between w-full">
									<div>{position}</div>
									<div>
										<ChevronDown
											size={10}
											className={`transition-transform duration-200 ${
												open ? "rotate-180" : "rotate-0"
											}`}
										/>
									</div>
								</div>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="xl:w-[50rem] lg:w-[40rem] md:w-[25rem] w-[20rem]">
							<DropdownMenuLabel className="text-xs w-full">
								Choose Bank
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuRadioGroup
								value={position}
								onValueChange={setPosition}
								className="text-xs w-full">
								{banks.map((bank, index) => (
									<DropdownMenuRadioItem
										key={index}
										value={bankName}
										className="w-full">
										{bank}
									</DropdownMenuRadioItem>
								))}
							</DropdownMenuRadioGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
				<div className="w-full">
					<label className="text-sm font-medium">Bank Account Name</label>
					<Input
						placeholder="Enter account name"
						defaultValue={bankAccountName}
						disabled={disable}
						className="w-full"
					/>
				</div>
				<div className="w-full">
					<label className="text-sm font-medium">Bank Number</label>
					<Input
						placeholder="Enter account number"
						defaultValue={bankNumber}
						disabled={disable}
						className="w-full"
					/>
				</div>
			</CardContent>
		</Card>
	);
};

export default TutorBankBox;
