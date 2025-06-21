"use client";

import React from "react";
import { CheckCircleIcon } from "lucide-react";

export default function Step3() {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <h2 className="text-lg font-semibold">Confirm your application</h2>

      <div className="border rounded-lg p-6 max-w-sm w-full bg-white shadow-sm">
        <p className="text-sm font-medium">Admins will validate the application</p>
        <p className="text-sm text-muted-foreground mt-1"> This typically takes 1-2 working days. We'll notify you once your account is approved.
        </p>
      </div>

      <div className="flex items-center gap-2 mt-1">
        <CheckCircleIcon className="w-4 h-4 text-green-500" />
        <span className="text-xs text-muted-foreground">
          You'll receive an email notification when your application is processed
        </span>
      </div>
    </div>
  );
}
