import SessionHeader from "@/components/custom/features/session/session-header";
import React from "react";
import Tabs from "@/components/custom/shared/tabs";
import CompletedAction from "@/components/custom/features/session/completed-action";
import UpcomingAction from "@/components/custom/features/session/upcoming-action";
import EnrollAction from "@/components/custom/features/session/enroll-action";
import ArchivedAction from "@/components/custom/features/session/archived-action";
import RefundStatus from "@/components/custom/features/session/refund-status";
import { Separator } from "@/components/ui/separator";

const layout = async ({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { sessionId: string; page: string };
}) => {
	const { sessionId, page } = await params;

	const tabs = [
		{ name: "Content", path: `/session/${page}/${sessionId}/content` },
	];
	if (page == "browse") {
		tabs.push({
			name: "Tutor",
			path: `/session/${page}/${sessionId}/tutor-info`,
		});
	} else if (page != "browse") {
		tabs.push({
			name: "Payment",
			path: `/session/${page}/${sessionId}/payment-info`,
		});
	}

	return (
		<div>
			<SessionHeader />
			<hr />
			<div className="px-15 pb-10 mt-5">
				<Tabs tabs={tabs} />

				<div className="relative">
					{children}
					<Separator className="my-2 block xl:hidden text-red" />
					<div className="static xl:absolute xl:top-15 xl:right-15 xl:shadow xl:border xl:max-w-sm p-5 space-y-2">
						{page == "complete" && <CompletedAction />}
						{page == "upcoming" && <UpcomingAction />}
						{page == "browse" && <EnrollAction />}
						{page == "archived" && <ArchivedAction />}
						{page == "refund" && <RefundStatus status="rejected" />}
					</div>
				</div>
			</div>
		</div>
	);
};

export default layout;
