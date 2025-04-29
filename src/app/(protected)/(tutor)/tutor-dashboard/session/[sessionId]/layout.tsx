import React from "react";
import Tabs from "@/components/custom/shared/tabs";

const layout = async ({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { sessionId: string };
}) => {
	const { sessionId } = await params;

	const tabs = [
		{ name: "Content", path: `/tutor-dashboard/session/${sessionId}/content` },
		{ name: "Students", path: `/tutor-dashboard/session/${sessionId}/students` },
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
