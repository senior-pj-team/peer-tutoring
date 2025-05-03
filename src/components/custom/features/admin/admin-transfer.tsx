"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";

type AdminTransferProps = {
  type: "tutor" | "refund";
  triggerLabel?: string;
  amount: number;
  name: string;
  bankInfo: {
    bankName: string;
    accountName: string;
    accountNumber: string;
  };
  onConfirm: () => void;
  autoOpen?: boolean;
  isDialogVersion?: boolean; // Added for checking if it's the dialog version
};

const AdminTransfer: React.FC<AdminTransferProps> = ({
  type,
  triggerLabel,
  amount,
  name,
  bankInfo,
  onConfirm,
  autoOpen = false,
  isDialogVersion = true, // Default to true for dialog version
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (autoOpen) {
      setOpen(true);
    }
  }, [autoOpen]);

  const dialogTitle =
    type === "tutor" ? "Transfer to Tutor" : "Issue Refund to Student";

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const renderReceiptUpload = () => (
    <div>
      <label className="block font-medium mb-2">Upload Transfer Receipt</label>
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer"
        onClick={handleFileClick}
      >
        <p className="text-gray-500 text-sm">
          Drag and drop receipt here or click to browse
        </p>
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          id="receipt-upload"
        />
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {isDialogVersion && !autoOpen && (
        <DialogTrigger asChild>
          <Button variant="default">{triggerLabel || dialogTitle}</Button>
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Transfer Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span>${amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">
                  {type === "tutor" ? "Tutor" : "Student"}:
                </span>
                <span>{name}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Bank Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Bank:</span>
                <span>{bankInfo?.bankName || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Account Name:</span>
                <span>{bankInfo?.accountName || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Account Number:</span>
                <span>{bankInfo?.accountNumber || "N/A"}</span>
              </div>
            </div>
          </div>

          {renderReceiptUpload()}

          <Button className="w-full" onClick={onConfirm}>
            Confirm Transfer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminTransfer;
