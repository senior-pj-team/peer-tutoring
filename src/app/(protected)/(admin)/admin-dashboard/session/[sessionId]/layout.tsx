"use client";
import React from "react";
import Tabs from "@/components/custom/shared/tabs";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

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
      <div className="px-4 lg:px-6">
        {
          sessionId == "sess-001" && (
            <div className="ms-auto mb-5 flex w-fit gap-2 px-4 lg:px-6">
              <Button variant="outline" className="text-red-600 hover:bg-red-50">
                Cancel
              </Button>
            </div>
          )
        }
        {children}
      </div>
    </div>
  );
};

export default Layout;
