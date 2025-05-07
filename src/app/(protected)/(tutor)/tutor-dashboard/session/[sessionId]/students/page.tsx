"use client";
import React from "react";
import StudentList from "@/components/custom/shared/student-list";
import { Button } from "@/components/ui/button";

// Mock data for pending refund requests
const pendingRefundRequests = [
	{
		studentId: "3", // Matching Charlie's ID from your StudentList
		name: "Charlie",
		email: "charlie@mfu.ac.th",
		amount: 50,
		reason: "Session was cancelled",
	},
	{
		studentId: "7", // Matching George's ID from your StudentList
		name: "George",
		email: "george@mfu.ac.th",
		amount: 50,
		reason: "Unable to attend",
	},
];

const StudentsTab = () => {
	return (
		<div className="min-w-full">
			<StudentList />

			{/* Floating action button for demo purposes
			{pendingRefundRequests.length > 0 && (
				<div className="fixed bottom-6 right-20 flex gap-2">
					<Button variant="default" className="shadow-lg">
						View Refund Requests ({pendingRefundRequests.length})
					</Button>
				</div>
			)} */}
		</div>
	);
};

export default StudentsTab;
