"use client";

import React from "react";
import StudentList from "@/components/custom/shared/student-list";
import ViewRefundRequest from "@/components/custom/features/admin/view-refund-request";
import AmountCard from "@/components/custom/shared/amount-card";

const StudentsTab = () => {
  const sessionId = "12345"; // Example session ID
  const sessionDate = new Date().toLocaleDateString(); // Example session date (formatted)
  const sessionDateTs = new Date().toISOString(); // Example session timestamp (ISO format)

  return (
    <div className="min-w-full">
      <div className="flex gap-4 mb-6">
        <AmountCard label={"Amount to transfer"} amount={500} textColor="text-green-500"/>
        <AmountCard label={"Refunded amount"} amount={100} textColor="text-yellow-500"/>
      </div>
      <StudentList
        renderActions={(student) =>
          student.status === "Pending_Refund" ? (
            <ViewRefundRequest
              tutorName="John Doe" // Mock tutor name
              reason="Session was canceled by the tutor" // Mock refund reason
              studentName={student.name}
              amount={200} // Mock refund amount
              bankInfo={{
                bankName: "Bangkok Bank",
                accountName: student.name,
                accountNumber: "123-456-7890",
              }}
              sessionId={sessionId} // Pass sessionId
              sessionDate={sessionDate} // Pass formatted sessionDate
              sessionDateTs={sessionDateTs} // Pass sessionDateTs
            />
          ) : null
        }
      />
    </div>
  );
};

export default StudentsTab;
