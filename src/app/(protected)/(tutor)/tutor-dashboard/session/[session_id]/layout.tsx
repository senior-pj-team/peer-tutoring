import React from "react";
import Tabs from "@/components/app/shared/tabs";
import { Button } from "@/components/ui/button";

const layout = async ({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ session_id: string }>;
}) => {
	const { session_id } = await params;

	const tabs = [
		{ name: "Content", path: `/tutor-dashboard/session/${session_id}/content` },
		{
			name: "Students",
			path: `/tutor-dashboard/session/${session_id}/students`,
		},
	];
	return (
		<div>
			<div className="mb-5 px-4 lg:px-6">
				<Tabs tabs={tabs} />
			</div>
			{children}
		</div>
	);
};

export default layout;
