"use client";
import { useCallback, useRef, useState, useTransition } from "react";
import { ActionDialog } from "../../../shared/action-dialog";
import { TApproveRefundTransferSchema } from "@/schema/appove-refund-transfer";
import { Button } from "@/components/ui/button";
import { transferTutor } from "@/actions/transfer-tutor";
import { toast } from "sonner";
import { sendEmail } from "@/actions/send-email";
import { insertNotification } from "@/data/mutations/notification/insert-notification";
import { useSupabase } from "@/hooks/use-supabase";
import { useQueryClient } from "@tanstack/react-query";

type Params = {
	session_id: number;
	session_name: string | null;
	tutor_id: string;
	tutor_name: string | null;
	tutor_email: string;
	amount?: number;
	start?: string | undefined;
	end?: string | undefined;
};

export function TransferActionDialog({
	session_id,
	session_name,
	tutor_id,
	tutor_name,
	tutor_email,
	start,
	end,
}: Params) {
	const [isPending, startTransition] = useTransition();
	const [openDialog, setOpenDialog] = useState<boolean>(false);
	const amountRef = useRef<number | null>(null);
	const supabase = useSupabase();
	const queryClient = useQueryClient();
	async function onSubmit(values: TApproveRefundTransferSchema) {
		startTransition(async () => {
			const response = await transferTutor(session_id, values);

			if (response.success) {
				toast.success("Approved", {
					description: (
						<span className="text-muted-foreground text-sm">
							Transferred Successful!
						</span>
					),
				});
				queryClient.invalidateQueries({
					queryKey: ["sessions_join", ["completed"], start, end],
				});
				await Promise.all([sendResponseEmail(), sendNotification()]);
			} else {
				toast.error("Something went wrong", {
					description: `${response.error.message} `,
				});
			}
		});
		setOpenDialog(false);
	}

	const sendResponseEmail = useCallback(async () => {
		await sendEmail({
			preview: "Your Payout Has Been Transferred 🎉",
			title: `Thank you for creating great learning experiences on our platform`,
			detail: `You should see the funds ${amountRef.current}฿ for Session ${session_name} in your account, depending on your bank’s processing times. If you have any questions or don’t receive the payment within that window, please reach out to our support team.You can log in to your tutor dashboard and go to “Payouts” to check.`,
			to: "williamkhant4@gmail.com",
		});
	}, [tutor_email]);

	const sendNotification = useCallback(async () => {
		await insertNotification(
			supabase,
			"Your Payout Has Been Transferred 🎉",
			`Funds ${amountRef.current}฿ for Session ${session_name} has been paid out to you`,
			tutor_id ?? "",
			"tutor",
		);
	}, [tutor_email, supabase]);

	return (
		<div>
			<Button
				onClick={() => setOpenDialog((prev) => !prev)}
				className="md:w-[9.5rem] w-[6.5rem] md:text-[1rem] text-[0.7rem] cursor-pointer hover:ring-2 hover:ring-orange-300  px-5 py-6">
				Transfer to tutor
			</Button>
			<ActionDialog
				ref={amountRef}
				type="transfer"
				isPending={isPending}
				onSubmit={onSubmit}
				openDialog={openDialog}
				setOpenDialog={setOpenDialog}
				dialogTitle="Transfer Money To Tutor"
				content={{ session_id, session_name, tutor_id, tutor_name }}
			/>
		</div>
	);
}
