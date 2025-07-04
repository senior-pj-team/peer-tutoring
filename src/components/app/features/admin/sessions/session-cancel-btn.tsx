"use client";

import { cancelSession } from "@/actions/cancel-session";
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
import { XCircle } from "lucide-react";
import { useActionState, useState, useTransition } from "react";
import { toast } from "sonner";

export function SessionCancelBtn({
	session_id,
}: {
	session_id: number | undefined;
}) {
	const [dialogOpen, setDialogOpen] = useState<boolean>(false);
	const [isPending, startTransition] = useTransition();
	function handleSubmit() {
		startTransition(async () => {
			const response = await cancelSession(session_id);
			if (response.success) {
				toast.success("Session canceled successfully");
			} else {
				toast.error("Something went wrong", {
					description: `We couldn't complete your request. ${response.error.message}`,
				});
			}
			setDialogOpen(false);
		});
	}
	return (
		<Dialog open={dialogOpen} onOpenChange={(open) => setDialogOpen(open)}>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					className="md:w-[9rem] w-[5.5rem] md:text-[0.88rem] text-[0.65rem] cursor-pointer hover:ring-2 hover:ring-red-300 hover:bg-red-400 hover:text-white font-bold px-5 py-6 border-red-600 text-red-500">
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
