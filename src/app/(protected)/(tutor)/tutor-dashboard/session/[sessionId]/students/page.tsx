import StudentList from "@/components/custom/shared/student-list";
import React from "react";
import AmountCard from "@/components/custom/shared/amount-card";

const Page = () => {
  const amounts = [
    {
      label: "Total Amount",
      amount: 500,
      color: "text-blue-600"
    },
    {
      label: "Refunded Amount",
      amount: 100,
      color: "text-red-500"
    },
    {
      label: "Paid Amount",
      amount: 400,
      color: "text-green-600"
    },
  ];

  return (
    <div className="w-full p-4 space-y-6">
      <div className="flex flex-wrap gap-4 items-center my-5">
        {amounts.map((item) => (
          <AmountCard
            key={item.label}
            label={item.label}
            amount={item.amount}
            textColor={item.color}
          />
        ))}
      </div>

      <StudentList />
    </div>
  );
};
export default Page;
