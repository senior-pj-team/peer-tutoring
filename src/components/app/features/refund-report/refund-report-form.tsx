"use client";

import React, {
	useRef,
	useState,
	useEffect,
	useCallback,
	Dispatch,
	SetStateAction,
} from "react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, CircleCheck, TriangleAlertIcon } from "lucide-react";
import { useActionState } from "react";
import { submitRefundOrReport } from "@/actions/submit-refund-report";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { sendRefundEmail } from "@/actions/send-refund-email";
import { toast } from "sonner";

const initialState: ActionResponseType<string> = {
	success: false,
	error: { message: "" },
};

const RefundReportForm = ({
	isReport,
	ssId,
	setDialogOpen,
}: {
	isReport: boolean;
	ssId: number | null;
	setDialogOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	const options = isReport
		? [
				"Inappropriate Behavior",
				"Harassment or Discrimination",
				"Unreliable or No-Show",
				"Inaccurate or Misleading Information",
				"Unethical Practices",
				"other",
			]
		: [
				"Scheduling Conflict",
				"Emergency or Personal Issues",
				"Mistaken Booking",
				"Change of Plans",
				"other",
			];

	const [position, setPosition] = useState("Select a reason");
	const [description, setDes] = useState("");
	const [error, setError] = useState("");
	const textRef = useRef<HTMLTextAreaElement>(null);
	const [check, setCheck] = useState(false);
	const [open, setOpen] = useState(false);

	const [state, formAction, isPending] = useActionState(
		submitRefundOrReport,
		initialState,
	);

	const type = isReport ? (check ? "refund and report" : "report") : "refund";

	const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCheck(e.target.checked);
	};

	const handleValidate = () => {
		if (position === "other" && description.trim() === "") {
			textRef.current?.focus();
			if (textRef.current) {
				textRef.current.style.boxShadow = "0 0 0 1px red";
			}
			setError("Please enter your reason.");
			return false;
		}
		if (position === "Select a reason") {
			setError("Please choose a reason.");
			return false;
		}

		setError("");
		if (textRef.current) textRef.current.style.boxShadow = "";
		return true;
	};

	const sendResponseEmail = useCallback(async () => {
		if (!state.success) return;

		let title = "";
		let detail = "";
		let preview = "";

		switch (type) {
			case "report":
				title = "Your report is being processed.";
				detail =
					"Thank you for reporting the issue. We will investigate and take appropriate actions.";
				preview = "Thanks for your report. We're looking into it.";
				break;
			case "refund":
				title = "Your refund request is being processed.";
				detail =
					"The refund will be issued to your account soon. Thank you for your patience.";
				preview = "Your refund is on the way.";
				break;
			case "refund and report":
				title = "Your report and refund request are being processed.";
				detail =
					"We've received your report and will issue a refund shortly. Thank you for letting us know.";
				preview = "We've received your report and refund request.";
				break;
		}

		await sendRefundEmail({
			preview,
			title,
			detail,
			to: "williamkhant4@gmail.com", // Replace with dynamic user email in production
		});
	}, [state.success, type]);

	useEffect(() => {
		if (state.success || state.error.message) {
			if (state.success) {
				setDialogOpen(false);
				toast.success("Report submitted successfully 🎉");
				sendResponseEmail();
			}
		}
	}, [state, sendResponseEmail]);

	return (
		<form
			action={formAction}
			onSubmit={(e) => {
				if (!handleValidate()) e.preventDefault();
			}}>
			<input type="hidden" name="reason" value={position} />
			<input type="hidden" name="description" value={description} />
			<input type="hidden" name="type" value={type} />
			<input type="hidden" name="ss_id" value={ssId ?? ""} />

			<DropdownMenu onOpenChange={setOpen}>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" className="w-full">
						<div className="flex justify-between w-full">
							<div>{position}</div>
							<ChevronDown
								size={10}
								className={`transition-transform duration-200 ${
									open ? "rotate-180" : "rotate-0"
								}`}
							/>
						</div>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-[32rem] md:w-[24rem]">
					<DropdownMenuLabel className="text-xs">
						{isReport ? "Reason for Reporting" : "Reason to Refund"}
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuRadioGroup
						value={position}
						onValueChange={setPosition}
						className="text-xs">
						{options.map((option, index) => (
							<DropdownMenuRadioItem key={index} value={option}>
								{option}
							</DropdownMenuRadioItem>
						))}
					</DropdownMenuRadioGroup>
				</DropdownMenuContent>
			</DropdownMenu>

			<Textarea
				ref={textRef}
				placeholder="Write your reason here..."
				value={description}
				onChange={(e) => setDes(e.target.value)}
				className="h-[5rem] mt-5 w-full whitespace-normal"
				style={{ overflowWrap: "anywhere" }}
			/>
			{error && <p className="text-xs text-red-500 mt-1">{error}</p>}
			{!state.success && state.error.message && (
				<span className="text-xs text-red-500 mt-1">{state.error.message}</span>
			)}

			{isReport && (
				<label className="flex items-center space-x-2 text-xs mt-3">
					<input
						type="checkbox"
						checked={check}
						onChange={handleCheck}
						className="form-checkbox text-blue-600 pointer-cursor"
					/>
					<span>Request refund for this session</span>
				</label>
			)}

			<div className="mt-4 text-right">
				<Button
					type="submit"
					className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 text-sm rounded"
					disabled={isPending}>
					{isPending ? "Submitting..." : "Submit"}
				</Button>
			</div>
		</form>
	);
};

export default RefundReportForm;
