"use client";

import { useCallback, useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDate, parseISO } from "date-fns";
import { toast } from "sonner";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LoadingDots } from "@/components/app/shared/loading-dots";

import { verifyTutorRequests } from "@/actions/verify-tutor-requests";
import { getAvatarFallback } from "@/utils/app/get-avatar-fallback";
import { insertNotification } from "@/data/mutations/notification/insert-notification";
import { useSupabase } from "@/hooks/use-supabase";
import { sendEmail } from "@/actions/send-email";

type ActionType = "approve" | "reject";

export default function TutorOnboardingCard({
	request,
}: {
	request: TBankInfoJoinTutorResult;
}) {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isPending, startTransition] = useTransition();
	const [currentAction, setCurrentAction] = useState<ActionType | null>(null);

	const supabase = useSupabase();
	const user = request.user;

	const handleAction = (action: ActionType) => {
		setCurrentAction(action);
		startTransition(async () => {
			const response = await verifyTutorRequests(action, request.user_id);

			if (response.success) {
				toast.success(`${action === "approve" ? "Approved" : "Rejected"}`, {
					description: (
						<span className="text-muted-foreground text-sm">
							{action}d on {formatDate(Date.now(), "yyyy MMMM dd")}
						</span>
					),
				});
				await Promise.all([
					await sendResponseEmail(),
					await sendNotification(),
				]);
			} else {
				toast.error("Something went wrong", {
					description: response.error.message,
				});
			}
			setIsDialogOpen(false);
			console.log("1");
			window.location.reload();
			console.log("2");
		});
	};
	const sendResponseEmail = useCallback(async () => {
		const title = `Your tutor registration request ${currentAction == "approve" ? "approved" : "rejected"}.`;
		const detail =
			currentAction == "approve"
				? "Congratulations you have been approved as a tutor at Peertube. Please comply with the terms and conditions as a tutor"
				: "Sorry, your tutor registration request has been rejected";
		const preview = `Tutor registration ${currentAction == "approve" ? "approved" : "rejected"}`;
		await sendEmail({
			preview,
			title,
			detail,
			to: request.user.email, //user.email,
		});
	}, []);

	const sendNotification = async () => {
		if (!user) return;
		const title = `Tutor registration ${currentAction == "approve" ? "approved" : "rejected"}`;
		const body = `Your tutor registration request has been approved on. ${formatDate(Date.now(), "yyyy MMMM dd")}`;
		await insertNotification(supabase, title, body, user.id, "student");
	};

	return (
		<>
			{/* Tutor Card */}
			<Card className="p-6 shadow-md hover:shadow-lg transition-shadow rounded-xl">
				<div className="flex flex-col md:flex-row gap-6">
					{/* Profile Info */}
					<div className="flex items-start gap-4 flex-1">
						<Avatar className="w-16 h-16 rounded-full border-2 border-blue-200 shadow-sm">
							<AvatarImage
								src={user.profile_url ?? ""}
								alt={user.username ?? "U"}
								className="object-cover"
							/>
							<AvatarFallback className="text-md font-medium">
								{getAvatarFallback(user.username ?? "U")}
							</AvatarFallback>
						</Avatar>

						<div className="space-y-1">
							<h3 className="text-lg font-semibold text-gray-900">
								<Link
									href={`/home/student-view/${user.id}`}
									className="hover:underline">
									{user.username}
								</Link>
							</h3>
							<p className="text-sm text-gray-600">{user.email}</p>
							<p className="text-sm text-gray-600">{user.phone_number}</p>

							<div className="flex flex-wrap gap-2 mt-2 text-xs">
								{user.school && (
									<span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
										{user.school}
									</span>
								)}
								{user.major && (
									<span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
										{user.major}
									</span>
								)}
								{user.year && (
									<span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
										Year {user.year}
									</span>
								)}
							</div>
						</div>
					</div>

					{/* Bank Info & Actions */}
					<div className="md:w-64 flex flex-col justify-between">
						<div className="space-y-3">
							<h4 className="font-medium text-sm text-gray-800">
								Bank Information
							</h4>
							<div className="bg-white border rounded-lg shadow-sm p-4 space-y-2 text-sm text-gray-700">
								<div className="flex justify-between">
									<span className="text-gray-500 font-medium">Bank Name:</span>
									<span>{request.bank_name}</span>
								</div>
								<div className="flex justify-between">
									<span className="text-gray-500 font-medium">
										Account Name:
									</span>
									<span>{request.account_name}</span>
								</div>
								<div className="flex justify-between">
									<span className="text-gray-500 font-medium">
										Account Number:
									</span>
									<span>{request.account_number}</span>
								</div>
							</div>
						</div>

						<div className="flex flex-col gap-2 mt-4">
							<Button
								variant="outline"
								size="sm"
								onClick={() => setIsDialogOpen(true)}>
								View Verification
							</Button>
							<div className="flex gap-2">
								<Button
									variant="destructive"
									size="sm"
									className="flex-1"
									onClick={() => handleAction("reject")}
									disabled={isPending}>
									{isPending && currentAction === "reject" ? (
										<LoadingDots />
									) : (
										"Reject"
									)}
								</Button>
								<Button
									variant="default"
									size="sm"
									className="flex-1"
									onClick={() => handleAction("approve")}
									disabled={isPending}>
									{isPending && currentAction === "approve" ? (
										<LoadingDots />
									) : (
										"Approve"
									)}
								</Button>
							</div>
						</div>
					</div>
				</div>
			</Card>

			{/* Verification Dialog */}
			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent className="max-w-5xl md:min-w-[700px]">
					<DialogHeader>
						<DialogTitle className="text-lg font-semibold">
							Tutor Request Details
						</DialogTitle>
					</DialogHeader>

					<div className="flex flex-col md:flex-row gap-6">
						<div className="md:w-1/2">
							{user.studentId_photo ? (
								<Image
									src={user.studentId_photo}
									alt="Student holding ID"
									width={400}
									height={300}
									className="rounded-md border object-cover"
								/>
							) : (
								<div className="text-sm text-gray-500">
									No student ID photo provided
								</div>
							)}
						</div>

						<div className="md:w-1/2 space-y-2 text-sm text-gray-700">
							<p>
								<strong>Name:</strong> {user.username}
							</p>
							<p>
								<strong>Email:</strong> {user.email}
							</p>
							<p>
								<strong>Bank:</strong> {request.bank_name}
							</p>
							<p>
								<strong>Account Name:</strong> {request.account_name}
							</p>
							<p>
								<strong>Account No.:</strong> {request.account_number}
							</p>
							<p>
								<strong>Requested On:</strong>{" "}
								{formatDate(parseISO(request.created_at), "yyyy MMMM dd")}
							</p>

							<div className="flex gap-2 mt-4">
								<Button
									variant="destructive"
									size="sm"
									className="flex-1"
									onClick={() => handleAction("reject")}
									disabled={isPending}>
									{isPending && currentAction === "reject" ? (
										<LoadingDots />
									) : (
										"Reject"
									)}
								</Button>
								<Button
									variant="default"
									size="sm"
									className="flex-1"
									onClick={() => handleAction("approve")}
									disabled={isPending}>
									{isPending && currentAction === "approve" ? (
										<LoadingDots />
									) : (
										"Approve"
									)}
								</Button>
							</div>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
}
