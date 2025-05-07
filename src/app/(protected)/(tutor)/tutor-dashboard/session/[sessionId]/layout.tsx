import React from "react";
import Tabs from "@/components/custom/shared/tabs";
import { Button } from "@/components/ui/button";

const layout = async ({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ sessionId: string }>;
}) => {
	const { sessionId } = await params;

	const tabs = [
		{ name: "Content", path: `/tutor-dashboard/session/${sessionId}/content` },
		{
			name: "Students",
			path: `/tutor-dashboard/session/${sessionId}/students`,
		},
	];
	return (
		<div>
			<div className="mb-5 px-4 lg:px-6">
				<Tabs tabs={tabs} />
			</div>
			{
				sessionId == "1" && (
					<div className="ms-auto mb-5 flex w-fit gap-2 px-4 lg:px-6">
						<Button variant="outline" className="text-red-600 hover:bg-red-50">
							Cancel
						</Button>
					</div>
				)
			}
			{children}
		</div>
	);
};

export default layout;
