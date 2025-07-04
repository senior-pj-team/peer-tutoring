"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { getTutorWithStats } from "@/data/queries/tutors/get-tutor-with-stats";
import { useSupabase } from "@/hooks/use-supabase";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAvatarFallback } from "@/utils/app/get-avatar-fallback";
import Link from "next/link";
import { PaginationControls } from "../../shared/paginition-controls";
import { insertNotification } from "@/data/mutations/notification/insert-notification";
import { toast } from "sonner";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogFooter,
	DialogTitle,
} from "@/components/ui/dialog";
import { LoadingDots } from "../../shared/loading-dots";
import { suspendTutor } from "@/actions/suspend-tutor";
import { updateUser } from "@/data/mutations/user/update-user";
import { formatDate, parseISO } from "date-fns";
import { DebounceSearchBar } from "../../shared/debounce-search-bar";

export default function TutorTable() {
	const supabase = useSupabase();
	const [page, setPage] = useState(0);
	const limit = 7;
	const offset = page * limit;
	const [isPending, startTransition] = useTransition();
	const [search, setSearch] = useState("");

	const { data, isLoading, isError, refetch } = useQuery({
		queryKey: ["tutors", offset, search],
		queryFn: () =>
			getTutorWithStats(supabase, { p_offset: offset, p_limit: limit, search }),
	});

	const [dialogOpen, setDialogOpen] = useState(false);
	const [selectedTutor, setSelectedTutor] = useState<any>(null);
	const [dialogMode, setDialogMode] = useState<
		"warning" | "suspend" | "unsuspend"
	>("warning");
	const [suspendDays, setSuspendDays] = useState("");

	const queryClient = useQueryClient();

	const openDialog = (
		tutor: any,
		mode: "warning" | "suspend" | "unsuspend",
	) => {
		setSelectedTutor(tutor);
		setDialogMode(mode);
		setDialogOpen(true);
	};

	const closeDialog = () => {
		setSelectedTutor(null);
		setSuspendDays("");
		setDialogOpen(false);
	};

	const handleConfirm = () => {
		if (!selectedTutor) return;

		startTransition(async () => {
			if (dialogMode === "warning") {
				const title = "Warning Regarding Policy Violation";
				const body =
					"We noticed activity that may violate our tutor guidelines. Please review our policies and adjust accordingly. Repeated warnings may lead to suspension. Contact support if you have questions.";

				const result = await insertNotification(
					supabase,
					title,
					body,
					selectedTutor.tutor_id,
					"tutor_warning",
				);
				if (result) {
					toast.success("Warning sent successfully.");
					refetch();
				} else {
					toast.error("Failed to send warning.");
				}
			}

			if (dialogMode === "suspend") {
				const suspendResult = await suspendTutor(
					selectedTutor.tutor_id,
					Number(suspendDays),
				);
				if (suspendResult) {
					toast.success(" Suspended successfully.");
					queryClient.invalidateQueries({ queryKey: ["tutors"] });
				} else {
					toast.error("Failed to suspend tutor.");
				}
			}

			if (dialogMode === "unsuspend") {
				const updateResult = await updateUser(supabase, {
					user_id: selectedTutor.tutor_id,
					updateObj: {
						tutor_status: "verified",
						suspend_until: null,
					},
				});
				if (updateResult) {
					toast.success(" Unsuspended successfully.");
					queryClient.invalidateQueries({ queryKey: ["tutors"] });
				} else {
					toast.error("Failed to Unsuspend tutor.");
				}
			}

			closeDialog();
		});
	};

	return (
		<div className="space-y-4">
			<DebounceSearchBar
				query={search}
				setQuery={setSearch}
				placeholder="Search by name or email..."
				callback={() => setPage(0)}
			/>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[300px]">Tutor</TableHead>
						<TableHead>Engagement</TableHead>
						<TableHead>Warnings</TableHead>
						<TableHead>Status</TableHead>
						<TableHead className="text-right"></TableHead>
						<TableHead className="text-right"></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{isLoading ? (
						<TableRow>
							<TableCell colSpan={5} className="text-center py-8">
								Loading...
							</TableCell>
						</TableRow>
					) : isError || !data || data.length === 0 ? (
						<TableRow>
							<TableCell colSpan={5} className="text-center py-8 text-gray-500">
								No tutors found.
							</TableCell>
						</TableRow>
					) : (
						data.map((tutor) => (
							<TableRow key={tutor.tutor_id}>
								<TableCell>
									<div className="flex items-center gap-3">
										<Avatar>
											<AvatarImage src={tutor.profile_url} />
											<AvatarFallback>
												{getAvatarFallback(tutor.username)}
											</AvatarFallback>
										</Avatar>
										<div>
											<p className="font-medium hover:underline">
												<Link href={`/tutor-view/${tutor.tutor_id}`}>
													{tutor?.username ?? "Unknown"}
												</Link>
											</p>
											<p className="text-xs text-gray-500">{tutor.email}</p>
										</div>
									</div>
								</TableCell>
								<TableCell>
									<p className="text-sm">⭐ {tutor.tutor_rating.toFixed(1)}</p>
									<p className="text-xs text-gray-500">
										{tutor.total_session_count} sessions
									</p>
								</TableCell>
								<TableCell>
									<p className="text-sm font-medium">{tutor.warning_count}</p>
								</TableCell>
								<TableCell>
									<div className="flex flex-col items-start gap-1">
										<span
											className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${
												tutor.tutor_status === "verified"
													? "bg-green-100 text-green-800"
													: tutor.tutor_status === "rejected"
														? "bg-gray-100 text-gray-800"
														: tutor.tutor_status === "pending"
															? "bg-yellow-100 text-yellow-800"
															: "bg-red-100 text-red-800"
											}`}>
											{tutor.tutor_status ?? "Unknown status"}
										</span>

										{tutor.suspend_until && (
											<span className="text-xs text-muted-foreground flex items-center gap-1">
												Until{" "}
												{formatDate(
													parseISO(tutor.suspend_until),
													"yyyy MMMM dd",
												)}
											</span>
										)}
									</div>
								</TableCell>

								<TableCell className="text-right">
									<div>
										<Button
											size="sm"
											variant="outline"
											onClick={() => openDialog(tutor, "warning")}>
											Send Warning
										</Button>
									</div>
								</TableCell>
								<TableCell>
									{tutor.tutor_status != "suspended" ? (
										<Button
											size="sm"
											variant="destructive"
											className="min-w-26"
											onClick={() => openDialog(tutor, "suspend")}>
											Suspend
										</Button>
									) : (
										<Button
											size="sm"
											variant="destructive"
											className="min-w-26 bg-indigo-600 hover:bg-indigo-500"
											onClick={() => openDialog(tutor, "unsuspend")}>
											Unsuspend
										</Button>
									)}
								</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>

			{data && (
				<PaginationControls
					currentPage={page}
					onPageChange={setPage}
					disableBack={page === 0}
					disableForward={data.length < limit}
				/>
			)}

			{/* Shared Dialog for Warning and Suspend */}
			<Dialog open={dialogOpen} onOpenChange={closeDialog}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							{dialogMode === "warning"
								? "Send Warning"
								: dialogMode === "unsuspend"
									? "Unsuspend Tutor"
									: "Suspend Tutor"}
						</DialogTitle>
					</DialogHeader>

					{dialogMode === "warning" ? (
						<p className="text-sm text-muted-foreground">
							Are you sure you want to send a warning to{" "}
							<strong>{selectedTutor?.username}</strong>?
						</p>
					) : dialogMode === "unsuspend" ? (
						<p className="text-sm text-muted-foreground">
							Are you sure you want to unsuspend{" "}
							<strong>{selectedTutor?.username}</strong>?
						</p>
					) : (
						<>
							<p className="text-sm text-muted-foreground mb-3">
								Select suspension period(in days) for{" "}
								<strong>{selectedTutor?.username}</strong>:
							</p>

							<div className="flex gap-3 flex-wrap justify-between mb-3">
								{[3, 5, 7, 10, 30].map((day) => (
									<label key={day} className="relative cursor-pointer">
										<input
											type="radio"
											name="suspendDays"
											value={day}
											checked={suspendDays === String(day)}
											onChange={(e) => setSuspendDays(e.target.value)}
											className="peer hidden"
										/>
										<div
											className={`w-14 h-14 flex items-center justify-center rounded-full border-2 text-lg font-semibold transition-all
            peer-checked:bg-red-600 peer-checked:text-white peer-checked:border-red-600
            border-gray-300 text-gray-700 hover:border-red-500`}>
											{day}
										</div>
									</label>
								))}
							</div>
						</>
					)}

					<DialogFooter className="mt-4">
						<Button variant="ghost" onClick={closeDialog}>
							Cancel
						</Button>
						<Button onClick={handleConfirm}>
							{isPending ? (
								<LoadingDots />
							) : dialogMode === "warning" ? (
								"Send Warning"
							) : dialogMode === "unsuspend" ? (
								"Confirm unsuspend"
							) : (
								"Confirm suspend"
							)}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
