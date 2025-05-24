import React from "react";
import PaymentTable from "@/components/app/features/payment/payment-table";

const page = () => {
	const payments = [
		{
			sessionName: "React Basics",
			enrolledDate: "April 10, 2025",
			price: "฿ 500",
			invoiceNumber: "INV-20250410-001",
			status: "refunded",
		},
		{
			sessionName: "React Basics",
			enrolledDate: "April 9, 2025",
			price: "฿ 500",
			invoiceNumber: "INV-20250410-001",
			status: "purchase",
		},
	];
	return (
		<div className="p-6 ">
			<div>
				<h3 className="text-xl font-semibold mt-2">Orion</h3>
				<div className="flex flex-col text-gray-700 text-sm mt-2">
					<span>No. 133 Tha Sut, Amphoe Mueang Chiang Rai</span>
					<span>Chang Wat Chiang Rai</span>
					<span>57100</span>
				</div>
			</div>
			<div className="mt-10">
				<h3 className="text-xl font-semibold mt-2">Enrollment</h3>
				<PaymentTable payments={payments} />
			</div>
		</div>
	);
};

export default page;
