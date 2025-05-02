"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import AdminTransfer from "@/components/custom/features/admin/admin-transfer";

type ViewRefundRequestProps = {
  tutorName: string;
  reason: string;
  studentName: string;
  amount: number;
  bankInfo: {
    bankName: string;
    accountName: string;
    accountNumber: string;
  };
  sessionId: string;
  sessionDate: string;
  sessionDateTs: string; // Add sessionDateTs here
  courseName?: string;
  sessionDuration?: string;
  additionalInfo?: string;
};

const ViewRefundRequest: React.FC<ViewRefundRequestProps> = ({
  tutorName,
  reason,
  studentName,
  amount,
  bankInfo,
  sessionId,
  sessionDate,
  courseName,
  sessionDuration,
  additionalInfo,
}) => {
  const [open, setOpen] = useState(false);
  const [showTransfer, setShowTransfer] = useState(false);

  const handleApproveRefund = () => {
    setShowTransfer(true);
  };

  const handleTransferConfirmed = () => {
    setOpen(false);
    setShowTransfer(false);
    alert(`Refund issued to ${studentName}`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">View Refund Request</Button>
      </DialogTrigger>
      <DialogContent>
        {showTransfer ? (
          <AdminTransfer
            type="refund"
            autoOpen
            amount={amount}
            name={studentName}
            bankInfo={bankInfo}
            onConfirm={handleTransferConfirmed}
            isDialogVersion={false} // Pure presentation version within ViewRefundRequest's dialog
          />
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Refund Request</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Session Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Session ID:</span>
                    <span>{sessionId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Session Date:</span>
                    <span>{sessionDate}</span>
                  </div>
                  {courseName && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Course Name:</span>
                      <span>{courseName}</span>
                    </div>
                  )}
                  {sessionDuration && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span>{sessionDuration}</span>
                    </div>
                  )}
                  {additionalInfo && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Additional Info:</span>
                      <span>{additionalInfo}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tutor:</span>
                    <span>{tutorName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Reason:</span>
                    <span>{reason}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Refund Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span>${amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Student:</span>
                    <span>{studentName}</span>
                  </div>
                </div>
              </div>

              <Button
                className="w-full"
                onClick={handleApproveRefund}
                variant="success"
              >
                Approve Refund
              </Button>
              <Button
                className="w-full"
                variant="destructive"
                onClick={() => {
                  setOpen(false);
                  alert("Refund Denied");
                }}
              >
                Deny Refund
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ViewRefundRequest;
