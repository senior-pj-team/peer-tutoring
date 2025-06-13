import React from "react";
import PaymentTable from "@/components/app/features/payment/payment-table";
import { Roboto_Mono } from "next/font/google";
import clsx from "clsx";
const roboto_mono = Roboto_Mono({
	weight: ["700"],
	subsets: ["latin"],
});

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
		{
			sessionName: "JavaScript Fundamentals",
			enrolledDate: "April 12, 2025",
			price: "฿ 700",
			invoiceNumber: "INV-20250412-002",
			status: "purchase",
		},
		{
			sessionName: "CSS Advanced",
			enrolledDate: "April 13, 2025",
			price: "฿ 400",
			invoiceNumber: "INV-20250413-003",
			status: "purchase",
		},
		{
			sessionName: "Node.js for Beginners",
			enrolledDate: "April 14, 2025",
			price: "฿ 600",
			invoiceNumber: "INV-20250414-004",
			status: "refunded",
		},
		{
			sessionName: "Vue.js Essentials",
			enrolledDate: "April 16, 2025",
			price: "฿ 550",
			invoiceNumber: "INV-20250416-005",
			status: "purchase",
		},
		{
			sessionName: "React Native Basics",
			enrolledDate: "April 18, 2025",
			price: "฿ 650",
			invoiceNumber: "INV-20250418-006",
			status: "purchase",
		},
		{
			sessionName: "TypeScript for Beginners",
			enrolledDate: "April 19, 2025",
			price: "฿ 750",
			invoiceNumber: "INV-20250419-007",
			status: "refunded",
		},
		{
			sessionName: "Advanced JavaScript",
			enrolledDate: "April 21, 2025",
			price: "฿ 800",
			invoiceNumber: "INV-20250421-008",
			status: "purchase",
		},
		{
			sessionName: "PHP and MySQL Mastery",
			enrolledDate: "April 23, 2025",
			price: "฿ 700",
			invoiceNumber: "INV-20250423-009",
			status: "purchase",
		},
	];

	return (
		<>
			<div className="my-10 px-3 mx-auto max-w-4xl ">
				<h2
					className={clsx(
						"text-3xl font-semibold my-15",
						roboto_mono.className,
					)}>
					Purchase history
				</h2>
				
			</div>
		</>
	);
};

export default page;
