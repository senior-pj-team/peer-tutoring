"use client";

const PaymentTable = ({data}: {data: TSessionPaymentData}) => {
	const {amount_from_student, enrolled_at, refunded_amount, refunded_at, session_name} = data;
	return (
		<div className="w-full mt-6 overflow-x-auto">
			<div className="min-w-full xl:min-w-[60vw] inline-block align-middle border border-gray-200">
				<table className="min-w-full text-sm text-gray-700">
					<thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-600">
						<tr>
							<th className="px-6 py-3 text-left">Session Name</th>
							<th className="px-6 py-3 text-left">Date</th>
							<th className="px-6 py-3 text-left">Amount</th>
							<th className="px-6 py-3 text-left">Invoice #</th>
							<th className="px-6 py-3 text-left">Transaction type</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-100">
						<tr
								className="hover:bg-gray-50 transition duration-150">
								<td className="px-6 py-4 whitespace-nowrap">
									{session_name}
								</td>
								<td className="px-6 py-4 text-gray-500 whitespace-nowrap">
									{enrolled_at}
								</td>
								<td className="px-6 py-4 font-medium text-gray-800 whitespace-nowrap">
									{amount_from_student}
								</td>
								<td className="px-6 py-4 text-gray-500 whitespace-nowrap">
									{""}
								</td>
								<td className="px-6 py-4 text-gray-500 whitespace-nowrap">
									<span>
										purchased
									</span>
								</td>
							</tr>
							{
								refunded_amount &&
								<tr
								className="hover:bg-gray-50 transition duration-150">
								<td className="px-6 py-4 whitespace-nowrap">
									{session_name}
								</td>
								<td className="px-6 py-4 text-gray-500 whitespace-nowrap">
									{refunded_at}
								</td>
								<td className="px-6 py-4 font-medium text-gray-800 whitespace-nowrap">
									{refunded_amount}
								</td>
								<td className="px-6 py-4 text-gray-500 whitespace-nowrap">
									{""}
								</td>
								<td className="px-6 py-4 text-gray-500 whitespace-nowrap">
									<span>
										refunded
									</span>
								</td>
							</tr>
							}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default PaymentTable;
