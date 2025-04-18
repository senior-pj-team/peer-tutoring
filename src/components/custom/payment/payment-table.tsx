'use client'
import React from 'react'

const PaymentTable = ({ payments }: { payments: any[] }) => {
  return (
    <div className="w-full mt-6 overflow-x-auto">
      <div className="min-w-full inline-block align-middle border border-gray-200">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-600">
            <tr>
              <th className="px-6 py-3 text-left">Session Name</th>
              <th className="px-6 py-3 text-left">Enrolled On</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Invoice #</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {payments.map((payment, index) => (
              <tr key={index} className="hover:bg-gray-50 transition duration-150">
                <td className="px-6 py-4 whitespace-nowrap">{payment.sessionName}</td>
                <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{payment.enrolledDate}</td>
                <td className="px-6 py-4 font-medium text-gray-800 whitespace-nowrap">{payment.price}</td>
                <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{payment.invoiceNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PaymentTable
