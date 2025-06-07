"use client";

const PaymentTable = ({
  data,
}: {
  data: {
    paidAmount?: number | null;
    paidAt?: string | null;
    refundAmount?: number | null;
    refundAt?: string | null;
  };
}) => {
  return (
    <div className="w-full mt-6 overflow-x-auto">
      <div className="min-w-full xl:min-w-[60vw] inline-block align-middle border border-gray-200">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-600">
            <tr>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Amount</th>
              <th className="px-6 py-3 text-left">Invoice #</th>
              <th className="px-6 py-3 text-left">Transaction type</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.paidAmount && (
              <tr className="hover:bg-gray-50 transition duration-150">
                <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                  {data.paidAt}
                </td>
                <td className="px-6 py-4 font-medium text-gray-800 whitespace-nowrap">
                  {data.paidAmount}
                </td>
                <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                  {""}
                </td>
                <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                  <span>purchased</span>
                </td>
              </tr>
            )}
            {data.refundAmount && (
              <tr className="hover:bg-gray-50 transition duration-150">
                <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                  {data.refundAt}
                </td>
                <td className="px-6 py-4 font-medium text-gray-800 whitespace-nowrap">
                  {data.refundAmount}
                </td>
                <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                  {""}
                </td>
                <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                  <span>refunded</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentTable;
