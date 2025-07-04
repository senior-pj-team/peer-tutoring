import React from "react";
import Tabs from "@/components/app/shared/tabs";

const Layout = ({ children }: { children: React.ReactNode }) => {
	const tabs = [
		{
			name: "Statistics",
			path: "/admin-dashboard/financial/stats",
		},
		{
			name: "Transactions",
			path: "/admin-dashboard/financial/transactions",
		},
	];

	return (
		<div className="space-y-6">
			<div className="px-4 lg:px-6">
				<Tabs tabs={tabs} />
			</div>
			<div className="px-4 lg:px-6">{children}</div>
		</div>
	);
};

export default Layout;
