"use client";

import { cancelSession } from "@/actions/cancel-session";
import { sendEmail } from "@/actions/send-email";
import { LoadingDots } from "@/components/app/shared/loading-dots";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { insertNotification } from "@/data/mutations/notification/insert-notification";
import { useSupabase } from "@/hooks/use-supabase";
import { XCircle } from "lucide-react";
import { useCallback, useState, useTransition } from "react";
import { toast } from "sonner";

export function SessionCancelBtn({
	session_id,
	session_name,
	tutor_email,
	tutor_id,
}: {
	session_id: number | undefined;
	session_name: string;
	tutor_email: string;
	tutor_id: string;
}) {
	const [dialogOpen, setDialogOpen] = useState<boolean>(false);
	const [isPending, startTransition] = useTransition();
	const supabase = useSupabase();
	function handleSubmit() {
		startTransition(async () => {
			const response = await cancelSession(session_id);
			if (response.success) {
				toast.success("Session canceled successfully");
				await Promise.all([sendResponseEmail(), sendNotification()]);
			} else {
				toast.error("Something went wrong", {
					description: `We couldn't complete your request. ${response.error.message}`,
				});
			}
			setDialogOpen(false);
		});
	}

	const sendResponseEmail = useCallback(async () => {
		await sendEmail({
			preview: "Session canceled ⚠️",
			title: `Your ${session_name} session has been canceled`,
			detail: `Unfortunenately, your ${session_name} session has been canceled by admin team due to inappropriate or false information. Please content to our admin team for furthur inquiry for this issue.`,
			to: "williamkhant4@gmail.com",
		});
	}, [tutor_email]);
	const sendNotification = useCallback(async () => {
		await insertNotification(
			supabase,
			"Session canceled ⚠️",
			`Your ${session_name} session has been canceled`,
			tutor_id ?? "",
			"tutor",
		);
	}, [tutor_email]);
	return (
		<Dialog open={dialogOpen} onOpenChange={(open) => setDialogOpen(open)}>
			<DialogTrigger asChild>
				<Button className="md:w-[9rem] w-[5.5rem] md:text-[0.88rem] text-[0.65rem] cursor-pointer hover:ring-2 hover:ring-red-300 hover:bg-red-600/90 bg-red-600 hover:text-white font-bold px-5 py-6 border-red-600 text-white">
					<XCircle size={20} />
					Cancel Session
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<form action={handleSubmit}>
					<input type="hidden" name="session_id" value={session_id} />
					<DialogHeader className="mb-5">
						<DialogTitle className="text-2xl mb-4">Cancel Session</DialogTitle>
						<DialogDescription>
							This action cannot be undone. Are you sure to cancel this session?
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline" className="cursor-pointer">
								Cancel
							</Button>
						</DialogClose>
						<Button
							type="submit"
							className="cursor-pointer"
							disabled={isPending}>
							{isPending ? (
								<div className="flex items-center gap-1">
									<span>Loading</span>
									<LoadingDots />
								</div>
							) : (
								"Confirm Cancel"
							)}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
