"use client";

import { format, formatDate, parseISO } from "date-fns";
import { useCallback, useRef, useState, useTransition } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAvatarFallback } from "@/utils/app/get-avatar-fallback";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import { updateRefundReport } from "@/data/mutations/refund-report/update-refund-report";
import { useSupabase } from "@/hooks/use-supabase";
import { toast } from "sonner";
import { LoadingDots } from "@/components/app/shared/loading-dots";
import { AlertTriangle } from "lucide-react";

import {
	TApproveRefundTransferSchema,
} from "@/schema/appove-refund-transfer";
import { approveRefund } from "@/actions/approve-refund";
import { sendEmail } from "@/actions/send-email";
import { insertNotification } from "@/data/mutations/notification/insert-notification";
import Image from "next/image";
import { ActionDialog } from "../../shared/action-dialog";
import { useRouter } from "next/navigation";

export default function RefundReportCard({
	data,
}: {
	data: TRefundReportJoinResult;
}) {
	const supabase = useSupabase();
	const router = useRouter();

	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
	const [isPending, startTransition] = useTransition();
	const [currentAction, setCurrentAction] = useState<
		"approve" | "reject" | null
	>(null);

	if (
		!data ||
		!data.student_session?.session ||
		!data.student_session?.session.tutor
	) {
		return (
			<div className="flex items-center gap-3 p-4 border border-red-300 bg-red-50 text-red-600 rounded-md">
				<AlertTriangle className="w-5 h-5" />
				<div>
					<p className="font-semibold">Failed to load refund request</p>
					<p className="text-sm text-red-500">
						Some required session or tutor data is missing.
					</p>
				</div>
			</div>
		);
	}

	const session = data.student_session.session;
	const student = data.student_session.student;
	const tutor = session.tutor;

	const handleReject = () => {
		setCurrentAction("reject");
		startTransition(async () => {
			const rejectResult = await updateRefundReport(
				supabase,
				{ status: "rejected", processed_at: new Date().toISOString() },
				{ id: data.id },
			);

			if (rejectResult) {
				toast.success("Rejected", {
					description: (
						<span className="text-muted-foreground text-sm">
							Rejected the ${data.type} on {format(Date.now(), "yyyy MMMM dd")}
						</span>
					),
				});

				await Promise.all([
					sendResponseEmail("rejected"),
					sendNotification("rejected"),
				]);
				window.location.reload();
			} else {
				toast.error("Something went wrong", {
					description: `Error rejecting this ${data.type}`,
				});
			}
		});
		router.refresh();
	};

	const handleApprove = async () => {
		if (data.type == "report") {
			setCurrentAction("approve");
			startTransition(async () => {
				const rejectResult = await updateRefundReport(
					supabase,
					{ status: "approved", processed_at: new Date().toISOString() },
					{ id: data.id },
				);
				
				if (rejectResult) {
					toast.success("Approved", {
						description: (
							<span className="text-muted-foreground text-sm">
								Approved the ${data.type} on{" "}
								{format(Date.now(), "yyyy MMMM dd")}
							</span>
						),
					});

					await Promise.all([
						sendResponseEmail("approved"),
						sendNotification("approved"),
					]);
				} else {
					toast.error("Something went wrong", {
						description: `Error rejecting this ${data.type}`,
					});
				}
			});
			router.refresh();
		} else {
			setIsApproveDialogOpen(true);
		}
	};

	const handleApproveConfirm = async (
		formValues: TApproveRefundTransferSchema,
	) => {
		setCurrentAction("approve");
		startTransition(async () => {
			const response = await approveRefund(
				data.student_session.id,
				data.id,
				formValues,
			);

			if (response.success) {
				toast.success("Approved", {
					description: (
						<span className="text-muted-foreground text-sm">
							Approved the ${data.type} on {format(Date.now(), "yyyy MMMM dd")}
						</span>
					),
				});

				console.log("status: ", response.success);

				await Promise.all([
					sendResponseEmail("approved"),
					sendNotification("approved"),
				]);
			} else {
				toast.error("Something went wrong", {
					description: `Error approving this ${data.type}. ${response.error.message}`,
				});
				console.log("status: ", response.success);
			}
		});
		router.refresh();
	};


	const sendResponseEmail = useCallback(
		async (status: "approved" | "rejected") => {
			const title = `${data.type} ${status}`;
			const detail =
				status === "approved"
					? `Your ${data.type}  has been approved. Session's fees will be transferred to your bank account shortly. But you will be detuced a transaction fees`
					: `Your ${data.type}  has been rejected. Please contact support for further details.`;
			const preview = `Refund ${status}`;

			const studentEmailPromise = sendEmail({
				preview,
				title,
				detail,
				to: student.email ?? "",
			});

			if (status === "approved") {
				const tutorEmailPromise = sendEmail({
					preview: `Student ${data.type} approved`,
					title: `Student ${data.type} approved`,
					detail: `${student.username}'s ${data.type} is approved for ${session.session_name} on ${formatDate(
						Date.now(),
						"yyyy MMMM dd",
					)}. Reason: ${data.reason}. ${data.description ?? ""}`,
					to: tutor?.email ?? "",
				});

				await Promise.all([studentEmailPromise, tutorEmailPromise]);
			} else {
				await studentEmailPromise;
			}
		},
		[student.email, tutor?.email],
	);

	const sendNotification = useCallback(
		async (status: "approved" | "rejected") => {
			if (!student || !tutor) return;

			const title = `${data.type} ${status}`;
			const body =
				status === "approved"
					? `Your ${data.type} for ${session.session_name} has been approved on ${formatDate(
							Date.now(),
							"yyyy MMMM dd",
						)}.`
					: `Your ${data.type} for ${session.session_name} has been rejected on ${formatDate(
							Date.now(),
							"yyyy MMMM dd",
						)}.`;

			const studentNotif = insertNotification(
				supabase,
				title,
				body,
				student.id ?? "",
				"student",
			);

			if (status === "approved") {
				const tutorNotif = insertNotification(
					supabase,
					`Student ${data.type} approved`,
					`${student.username}'s ${data.type} is approved for ${session.session_name} on ${formatDate(
						Date.now(),
						"yyyy MMMM dd",
					)}.`,
					tutor.id ?? "",
					"tutor",
				);

				await Promise.all([studentNotif, tutorNotif]);
			} else {
				await studentNotif;
			}
		},
		[student, tutor, supabase],
	);
	return (
		<>
			<Card className="hover:shadow-sm transition-shadow p-0">
				<CardContent className="p-4 sm:p-6">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
						{/* Left: Session + Tutor */}
						<div className="space-y-2">
							<p className="font-semibold text-base text-gray-800">
								{session.session_name ?? "Untitled Session"}
							</p>
							<p className="text-sm text-muted-foreground">Tutor</p>
							<div className="flex items-center gap-2">
								<Avatar className="w-9 h-9">
									<AvatarImage src={tutor?.profile_url ?? ""} />
									<AvatarFallback>
										{getAvatarFallback(tutor?.username ?? "T")}
									</AvatarFallback>
								</Avatar>
								<div>
									<p className="text-sm font-medium text-gray-800 hover:underline">
										<Link href={`/tutor-view/${tutor?.id}`}>
											{tutor?.username ?? "Unknown"}
										</Link>
									</p>
									<p className="text-xs text-muted-foreground">
										{tutor?.email ?? " - "}
									</p>
								</div>
							</div>
						</div>

						{/* Middle: Student */}
						<div className="space-y-2 mt-10">
							<p className="text-sm text-muted-foreground">Student</p>
							<div className="flex items-center gap-2">
								<Avatar className="w-9 h-9">
									<AvatarImage src={student?.profile_url ?? ""} />
									<AvatarFallback>
										{getAvatarFallback(student?.username ?? "S")}
									</AvatarFallback>
								</Avatar>
								<div>
									<p className="text-sm font-medium text-gray-800 hover:underline">
										<Link href={`/student-view/${student?.id}`}>
											{student?.username ?? "Unknown"}
										</Link>
									</p>
									<p className="text-xs text-muted-foreground">
										{student?.email ?? " - "}
									</p>
								</div>
							</div>
						</div>

						{/* Right: Status + Date + Action Buttons */}
						<div className="flex flex-col items-start md:items-end gap-3 w-full md:w-auto">
							<div className="flex flex-wrap items-center gap-2">
								<p className="text-sm text-muted-foreground">
									{format(new Date(data.created_at), "yyyy MMMM dd")}
								</p>
								{data.type === "refund" && (
									<Badge
										variant="outline"
										className="text-yellow-700 border-yellow-500 bg-yellow-50 text-xs capitalize">
										Refund only
									</Badge>
								)}
								{data.type === "refund and report" && (
									<Badge
										variant="outline"
										className="text-purple-700 border-purple-500 bg-purple-50 text-xs capitalize">
										Refund & Report
									</Badge>
								)}
								{data.type === "report" && (
									<Badge
										variant="outline"
										className="text-red-700 border-red-500 bg-red-50 text-xs capitalize">
										Report only
									</Badge>
								)}
							</div>

							<div className="flex flex-col gap-2 mt-2 w-full md:w-auto">
								<Button
									variant="outline"
									size="sm"
									onClick={() => setIsDialogOpen(true)}
									className="w-full md:w-auto">
									View Detail
								</Button>

								{data.status === "pending" ? (
									<div className="flex gap-2 w-full md:w-auto">
										<Button
											variant="destructive"
											size="sm"
											onClick={handleReject}
											className="flex-1">
											{isPending && currentAction === "reject" ? (
												<LoadingDots />
											) : (
												"Reject"
											)}
										</Button>
										<Button
											variant="default"
											size="sm"
											onClick={handleApprove}
											className="flex-1">
											{isPending && currentAction === "approve" ? (
												<LoadingDots />
											) : (
												"Approve"
											)}
										</Button>
									</div>
								) : (
									<div className="flex items-center justify-between gap-2 text-sm text-muted-foreground mt-2">
										<span>
											{data.processed_at
												? format(new Date(data.processed_at), "yyyy MMMM dd")
												: "NA"}
										</span>

										<Badge
											className={`text-xs capitalize px-2 py-1 rounded-md font-medium ${
												data.status === "approved"
													? "bg-green-600 text-white"
													: data.status === "rejected"
														? "bg-red-600 text-white"
														: "bg-gray-400 text-white"
											}`}>
											{data.status}
										</Badge>
									</div>
								)}
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* View Detail Dialog */}
			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent className="max-w-md sm:max-w-lg">
					<DialogHeader>
						<DialogTitle className="text-xl font-semibold">
							Refund Request Detail
						</DialogTitle>
					</DialogHeader>

					<div className="space-y-6 text-sm text-gray-800">
						{/* Session Header */}
						<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-2 mb-4">
							<h2 className="text-lg font-semibold">
								{session.session_name ?? "Untitled Session"}
							</h2>
							<span className="text-xs text-gray-500">
								{data.created_at
									? format(new Date(data.created_at), "yyyy MMMM dd")
									: "Unknown date"}
							</span>
						</div>
						{/* Meta Info */}
						{data.status != "pending" && (
							<div className="flex justify-between">
								<span className="font-semibold">Processed At:</span>
								<span>
									{data.processed_at &&
										formatDate(parseISO(data.processed_at), "yyyy MMMM dd")}
								</span>
							</div>
						)}
						<div className="text-sm">
							<h6 className="font-semibold mb-1">Reason</h6>
							<p className="whitespace-pre-wrap text-gray-700">
								{data.reason ?? "—"}
							</p>
						</div>
						<div className="text-sm">
							<h6 className="font-semibold mb-1">Description</h6>
							<p className="whitespace-pre-wrap text-gray-700">
								{data.description ?? "—"}
							</p>
						</div>
						{data.status === "approved" && data.type !== "report" && (
							<div>
								<h3 className="font-semibold mb-2 text-gray-800 text-sm">
									Receipt
								</h3>
								<div className="rounded border p-2 bg-white overflow-auto max-h-70 sm:max-h-96">
									{data.receipt ? (
										<div className="w-full">
											<Image
												src={data.receipt}
												alt="Refund receipt"
												width={0}
												height={0}
												sizes="50vw"
												className="w-full max-h-[300px] object-contain rounded"
											/>
										</div>
									) : (
										<span className="text-sm text-gray-500">
											No receipt to show
										</span>
									)}
								</div>
							</div>
						)}
					</div>
				</DialogContent>
			</Dialog>

			{/* Approve Dialog */}
			<ActionDialog
				type="refund"
				isPending={isPending}
				onSubmit={handleApproveConfirm}
				openDialog={isApproveDialogOpen}
				setopenDialog={setIsApproveDialogOpen}
				dialogTitle="Refund money to student"
				content={ 
					{ 
					  session_id: data.student_session.session.id, 
					  session_name: data.student_session.session.session_name, 
					  tutor_id: data.student_session.session.tutor.id ?? "" , 
					  tutor_name: data.student_session.session.tutor.username, 
					  student_id: data.student_session.student.id?? "",
					  student_name: data.student_session.student.username,
					  amount: data.student_session.amount_from_stripe
					}
				}
			/>
		</>
	);
}
