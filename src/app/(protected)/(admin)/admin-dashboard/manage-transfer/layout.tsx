import React from "react";
import Tabs from "@/components/custom/shared/tabs";

export default function ManageTransferLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tabs = [
    {
      name: "Pending Transfers",
      path: "/admin-dashboard/manage-transfer/pending",
    },
    {
      name: "Transfer History",
      path: "/admin-dashboard/manage-transfer/history",
    },
  ];

  return (
    <div className="space-y-6 px-4 lg:px-6">
      <Tabs tabs={tabs} />
      {children}
    </div>
  );
}
