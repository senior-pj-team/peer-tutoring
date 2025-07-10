"use client";

import { formatDate, parseISO } from "date-fns";
import { Fragment } from "react";

const PaymentTable = ({ data }: { data: TStudentSessionViewResult[] }) => {
	return (
		<div className="mt-6 overflow-x-auto">
			<div className="min-w-full xl:min-w-[60vw] inline-block align-middle border border-gray-200">
				<table className="min-w-full text-sm text-gray-700">
					<thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-600">
						<tr>
							<th className="px-6 py-3 text-left">Session</th>
							<th className="px-6 py-3 text-left">Date</th>
							<th className="px-6 py-3 text-left">Amount</th>
							<th className="px-6 py-3 text-left">Invoice #</th>
							<th className="px-6 py-3 text-left">Transaction Type</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-100">
						{data.map((eachData, index) => {
							const rows = [];

							if (eachData.amount_from_student) {
								rows.push(
									<tr
										key={`purchase-${index}`}
										className="hover:bg-gray-50 transition duration-150">
										<td className="px-6 py-4 whitespace-nowrap">
											{eachData.session_name || "-"}
										</td>
										<td className="px-6 py-4 text-gray-500 whitespace-nowrap">
											{formatDate(
												parseISO(eachData.session_created_at ?? ""),
												"yyy MMMM dd",
											)}
										</td>
										<td className="px-6 py-4 font-medium text-gray-800 whitespace-nowrap">
											{eachData.amount_from_student}฿
										</td>
										<td className="px-6 py-4 text-gray-500 whitespace-nowrap">
											-
										</td>
										<td className="px-6 py-4 text-green-600 font-medium whitespace-nowrap">
											Purchased
										</td>
									</tr>,
								);
							}

							if (eachData.student_session_status == "refunded") {
								rows.push(
									<tr
										key={`refund-${index}`}
										className="hover:bg-gray-50 transition duration-150">
										<td className="px-6 py-4 whitespace-nowrap">
											{eachData.session_name || "-"}
										</td>
										<td className="px-6 py-4 text-gray-500 whitespace-nowrap">
											{eachData.refunded_at
												? formatDate(
														parseISO(eachData.refunded_at),
														"yyy MMMM dd",
													)
												: "Unknown"}
										</td>
										<td className="px-6 py-4 font-medium text-gray-800 whitespace-nowrap">
											{eachData.amount_from_stripe}฿
										</td>
										<td className="px-6 py-4 text-gray-500 whitespace-nowrap">
											-
										</td>
										<td className="px-6 py-4 text-red-600 font-medium whitespace-nowrap">
											Refunded
										</td>
									</tr>,
								);
							}

							return rows;
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default PaymentTable;
