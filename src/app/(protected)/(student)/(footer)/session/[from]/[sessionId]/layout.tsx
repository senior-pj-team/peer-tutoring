import SessionHeader from "@/components/custom/session/session-header";
import React from "react";
import Tabs from "@/components/custom/tabs";
// import EnrollAction from "@/components/custom/session/enroll-action";
// import UpcomingAction from "@/components/custom/session/upcoming-action";
import CompletedAction from "@/components/custom/session/completed-action";
import UpcomingAction from "@/components/custom/session/upcoming-action";
import EnrollAction from "@/components/custom/session/enroll-action";
import ArchivedAction from "@/components/custom/session/archived-action";
// import ArchivedAction from "@/components/custom/session/archived-action";

const layout = ({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { sessionId: string, from: string };
}) => {
	const { sessionId, from } = params;

	const tabs = [
		{ name: "Content", path: `/session/${from}/${sessionId}/content` },
		{ name: "Tutor", path: `/session/${from}/${sessionId}/tutor-info` },
		{ name: "Payment", path: `/session/${from}/${sessionId}/payment-info`},
	];
	return (
		<div>
			<SessionHeader />
			<hr />
			<div className="px-15 pb-10 mt-5">
				<Tabs tabs={tabs} />
				<div className="relative">
					{children}
					<hr className="block xl:hidden" />
					<div className="static xl:absolute xl:top-15 xl:right-15 xl:shadow xl:border xl:shadow-sm xl:max-w-sm p-5 space-y-2">
						{from=="complete" && <CompletedAction />}
						{from=="upcoming" && <UpcomingAction />}
						{from=="browse" && <EnrollAction />}
						{from=="archived" && <ArchivedAction />}
					</div>
				</div>
			</div>
		</div>
	);
};

export default layout;
