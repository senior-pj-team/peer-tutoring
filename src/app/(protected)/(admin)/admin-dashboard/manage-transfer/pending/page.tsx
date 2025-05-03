"use client";

import React, { useState } from "react";
import Link from "next/link"; // Import the Link component from next/link
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AdminTransfer from "@/components/custom/features/admin/admin-transfer";

// Example session-based transfers
const mockSessionTransfers = [
  {
    sessionId: "sess-001",
    courseName: "Intro to Python",
    sessionDate: "2025-05-01",
    transferTarget: "Tutor", // or "Student"
    name: "Alice Wong",
    amount: 400,
    bankInfo: {
      bankName: "SCB",
      accountName: "Alice Wong",
      accountNumber: "123-456-7890",
    },
  },
  {
    sessionId: "sess-002",
    courseName: "Business English",
    sessionDate: "2025-04-28",
    transferTarget: "Student", // refund case
    name: "Bob Tan",
    amount: 250,
    bankInfo: {
      bankName: "Bangkok Bank",
      accountName: "Bob Tan",
      accountNumber: "987-654-3210",
    },
  },
];

const ManageTransferPage = () => {
  const [selectedTransfer, setSelectedTransfer] = useState<
    null | (typeof mockSessionTransfers)[0]
  >(null);

  const handleConfirm = () => {
    alert(
      `Transfer issued to ${selectedTransfer?.name} for session ${selectedTransfer?.sessionId}`
    );
    setSelectedTransfer(null);
  };

  return (
    <div className="space-y-6 px-4 lg:px-6">
      <h1 className="text-xl font-semibold">Manage Session Transfers</h1>
      <div className="grid gap-4">
        {mockSessionTransfers.map((transfer) => (
          <Link
            key={transfer.sessionId}
            href={`/admin-dashboard/session/${transfer.sessionId}/content`}
          >
            <Card className="cursor-pointer hover:bg-gray-100 transition-all duration-300">
              <CardContent className="flex justify-between items-center p-4">
                <div>
                  <p className="font-medium">{transfer.courseName}</p>
                  <p className="text-sm text-muted-foreground">
                    Session on {transfer.sessionDate} —{" "}
                    {transfer.transferTarget} Transfer to {transfer.name}
                  </p>
                </div>
                <Button onClick={(e) => e.stopPropagation()}>Transfer</Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {selectedTransfer && (
        <AdminTransfer
          type={
            selectedTransfer.transferTarget.toLowerCase() === "tutor"
              ? "tutor"
              : "refund"
          }
          autoOpen
          amount={selectedTransfer.amount}
          name={selectedTransfer.name}
          bankInfo={selectedTransfer.bankInfo}
          onConfirm={handleConfirm}
          isDialogVersion={true}
        />
      )}
    </div>
  );
};

export default ManageTransferPage;
