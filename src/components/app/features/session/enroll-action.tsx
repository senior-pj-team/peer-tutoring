"use client";
import React, { useActionState, useEffect, useState } from "react";
import {
	Hourglass,
	Heart,
	FrownIcon,
	TriangleIcon,
	CircleCheck,
	TriangleAlertIcon,
} from "lucide-react";
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
import { checkoutEnrollment } from "@/actions/checkout-enrollment";
import { useRouter } from "next/navigation";
import Link from "next/link";

const initialState: ActionResponseType<TStudentSessionResult> = {
	success: false,
	error: {
		message: "",
	},
};
const EnrollAction = ({
	session_id,
	price,
	service_fee,
}: {
	session_id: number;
	price: number | null;
	service_fee: number | null;
}) => {
	const [state, action, isPending] = useActionState(
		checkoutEnrollment,
		initialState,
	);
	const [responseDialogOpen, setresponseDialogOpen] = useState<boolean>(false);
	const [dialogOpen, setDialogOpen] = useState<boolean>(false);
	const router = useRouter();

	useEffect(() => {
		if (!state.success && state.error.message) {
			setDialogOpen(false);
			setresponseDialogOpen(true);
		}

		if (state.success && state.data) {
			setDialogOpen(false);
			setresponseDialogOpen(true);
		}
	}, [state, router]);

	return (
		<>
			<p className="text-sm font-medium">
				<Hourglass className="w-4 h-4 text-orange-500 font-bold inline me-1" />
				Only <span className="font-bold">2 days</span> left until session
				starts!
			</p>

			<p className="text-lg font-bold text-gray-800">
				Price:{" "}
				{price! <= 0 || price == null ? (
					<span className="text-green-600">Free</span>
				) : (
					<span className="text-orange-600">
						{" "}
						฿{price + (service_fee ?? 0)}{" "}
					</span>
				)}
			</p>

			<div className="grid grid-cols-[8fr_1fr] gap-2 w-full">
				<Dialog open={dialogOpen} onOpenChange={(open) => setDialogOpen(open)}>
					<DialogTrigger asChild>
						<Button className="bg-orange-500 hover:bg-orange-600 text-white w-full px-4 py-2 text-sm cursor-pointer">
							Enroll Now
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[425px]">
						<form action={action}>
							<input type="hidden" name="session_id" value={session_id} />
							<DialogHeader className="mb-5">
								<DialogTitle className="text-2xl mb-4">
									You’re Almost There! 🎉
								</DialogTitle>
								<DialogDescription>
									To reserve your seat, please proceed to payment.
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
											<div className="flex items-center gap-0.5">
												<div className="h-1 w-1 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
												<div className="h-1 w-1 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
												<div className="h-1 w-1 bg-white rounded-full animate-bounce"></div>
											</div>
										</div>
									) : (
										"Checkout"
									)}
								</Button>
							</DialogFooter>
						</form>
					</DialogContent>
				</Dialog>
				{state && (
					<Dialog
						open={responseDialogOpen}
						onOpenChange={(open) => setresponseDialogOpen(open)}>
						<DialogContent className="sm:max-w-[400px]">
							<DialogHeader className="mb-2">
								<DialogTitle className="text-2xl">
									{!state.success && state.error ? (
										<div className="flex gap-1 items-center text-red-400">
											<TriangleAlertIcon size={18} />
											<span className="text-[1.25rem]">Ops</span>
										</div>
									) : (
										<div className="flex gap-1 items-center text-green-500">
											<CircleCheck size={18} />
											<span className="text-[1.25rem]">
												Enrollment Successful
											</span>
										</div>
									)}
								</DialogTitle>
							</DialogHeader>
							<DialogDescription className="text-sm text-gray-700">
								<>
									{!state.success && state.error ? state.error.message : ""}
									{state.success && state.data ? state.data : ""}
								</>
							</DialogDescription>
							<DialogFooter>
								{state.success && (
									<Link href="/home/sessions?page=1">
										<Button>Back to explore</Button>
									</Link>
								)}
								<DialogClose asChild>
									<Button variant="outline">Close</Button>
								</DialogClose>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				)}

				<div className="p-2 border rounded-sm cursor-pointer text-orange-500 group">
					<Heart size="20" className="group-hover:fill-orange-500" />
				</div>
			</div>
		</>
	);
};

export default EnrollAction;
