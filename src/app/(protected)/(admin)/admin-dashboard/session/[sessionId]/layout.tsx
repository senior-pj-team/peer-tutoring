"use client";
import React from "react";
import Tabs from "@/components/custom/shared/tabs";
import { useParams } from "next/navigation"; // Import the 'useParams' hook

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  // Unwrap params using useParams()
  const params = useParams(); // This will unwrap the params object

  // Safe access to sessionId after unwrapping
  const sessionId = params?.sessionId;

  // UI demo state - would normally come from backend
  const hasPendingRefunds = true;
  const needsTransfer = true;
  const tabs = [
    {
      name: needsTransfer ? "Content ⚠️" : "Content ",
      path: `/admin-dashboard/session/${sessionId}/content`,
    },
    {
      name: hasPendingRefunds ? "Students ⚠️" : "Students",
      path: `/admin-dashboard/session/${sessionId}/students`,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="px-4 lg:px-6">
        {/* Demo toggle for UI purposes - remove in production */}
        <Tabs tabs={tabs} />
      </div>
      <div className="px-4 lg:px-6">{children}</div>
    </div>
  );
};

export default Layout;
