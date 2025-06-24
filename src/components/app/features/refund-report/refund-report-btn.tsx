"use client";
import React, { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import RefundReportForm from "./refund-report-form";

const RefundReportBtn = ({
	isReport,
	ssId,
}: {
	isReport: boolean;
	ssId: number | null;
}) => {
	const [open, setOpen] = useState(false);
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				{isReport ? (
					<Button
						className="font-bold hover:bg-orange-500 text-orange-600 px-4 py-2 text-sm cursor-pointer w-full hover:text-white"
						variant="outline">
						<div className="flex items-center gap-1">
							<AlertTriangle className="h-5 w-5" />
							<span>Report</span>
						</div>
					</Button>
				) : (
					<Button
						className="font-bold hover:bg-orange-500 text-orange-600 px-4 py-2 text-sm cursor-pointer w-full hover:text-white"
						variant="outline">
						Request refund
					</Button>
				)}
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>
						{isReport ? (
							<span>Submit your report</span>
						) : (
							<span>Submit your refund request</span>
						)}
					</DialogTitle>
					<DialogDescription>
						{isReport ? (
							<span>
								Choose one of the violation below or choose other to write your
								reason.
							</span>
						) : (
							<span>
								Choose one of reason to refund or choose other to write your
								reason
							</span>
						)}
					</DialogDescription>
				</DialogHeader>
				<RefundReportForm
					isReport={isReport}
					ssId={ssId}
					setDialogOpen={setOpen}
				/>
			</DialogContent>
		</Dialog>
	);
};

export default RefundReportBtn;
