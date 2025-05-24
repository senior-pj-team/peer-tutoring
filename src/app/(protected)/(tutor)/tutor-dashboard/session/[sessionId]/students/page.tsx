"use client";
import React from "react";
import StudentList from "@/components/app/shared/student-list";
import AmountCard from "@/components/app/shared/amount-card";

// Mock data for pending refund requests
const pendingRefundRequests = [
	{
		studentId: "3",
		name: "Charlie",
		email: "charlie@mfu.ac.th",
		amount: 50,
		reason: "Session was cancelled",
	},
	{
		studentId: "7",
		name: "George",
		email: "george@mfu.ac.th",
		amount: 50,
		reason: "Unable to attend",
	},
];

const StudentsTab = () => {
	return (
		<div className="min-w-full">
			<div className="flex gap-4 mb-6">
				<AmountCard
					label={"Enrolled Amount"}
					amount={500}
					textColor="text-violet-500"
				/>
				<AmountCard
					label={"Paid Amount"}
					amount={400}
					textColor="text-green-500"
				/>
				<AmountCard
					label={"Refunded Amount"}
					amount={100}
					textColor="text-red-500"
				/>
				<AmountCard
					label={"Holding Amount"}
					amount={0}
					textColor="text-yellow-500"
				/>
			</div>
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
