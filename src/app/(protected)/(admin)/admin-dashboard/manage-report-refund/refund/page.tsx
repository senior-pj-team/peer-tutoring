"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import ViewRefundRequest from "@/components/app/features/admin/view-refund-request";

// Mock data for pending refunds
const mockPendingRefunds = [
	{
		sessionId: "sess-001",
		courseName: "Intro to Python",
		sessionDate: "2025-05-01",
		tutorName: "John Smith",
		studentName: "Alice Wong",
		refundReason: "Tutor didn't show up",
		amount: 400,
		bankInfo: {
			bankName: "SCB",
			accountName: "Alice Wong",
			accountNumber: "123-456-7890",
		},
	},
	{
		sessionId: "sess-002",
		courseName: "Business English",
		sessionDate: "2025-04-28",
		tutorName: "Jane Doe",
		studentName: "Bob Tan",
		refundReason: "Session was canceled",
		amount: 250,
		bankInfo: {
			bankName: "Bangkok Bank",
			accountName: "Bob Tan",
			accountNumber: "987-654-3210",
		},
	},
];

const formatDate = (dateString: string) => {
	return new Date(dateString).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});
};

export default function RefundPage() {
	return (
		<div className="space-y-6 px-4 lg:px-6">
			<h1 className="text-xl font-semibold">Pending Refund Requests</h1>
			<div className="grid gap-4">
				{mockPendingRefunds.map((refund) => (
					<Card
						key={refund.sessionId}
						className="hover:shadow-sm transition-shadow">
						<CardContent className="p-4 sm:p-6">
							<div className="flex flex-col sm:flex-row justify-between gap-4">
								<div className="space-y-2 flex-1">
									<div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
										<p className="font-medium text-base sm:text-lg">
											{refund.courseName}
										</p>
										<p className="text-sm text-muted-foreground">
											{formatDate(refund.sessionDate)}
										</p>
									</div>

									<div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
										<div>
											<p className="text-muted-foreground">Tutor</p>
											<p>{refund.tutorName}</p>
										</div>
										<div>
											<p className="text-muted-foreground">Student</p>
											<p>{refund.studentName}</p>
										</div>

										<div className="col-span-2">
											<p className="text-muted-foreground">Reason</p>
											<p className="italic line-clamp-2">
												{refund.refundReason}
											</p>
										</div>
									</div>
								</div>

								<div className="flex sm:flex-col justify-end sm:justify-start gap-2">
									<ViewRefundRequest
										tutorName={refund.tutorName}
										reason={refund.refundReason}
										studentName={refund.studentName}
										amount={refund.amount}
										bankInfo={refund.bankInfo}
										sessionId={refund.sessionId}
										sessionDate={refund.sessionDate}
										sessionDateTs={new Date(refund.sessionDate)
											.getTime()
											.toString()}
										courseName={refund.courseName}
									/>
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
