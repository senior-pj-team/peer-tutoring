import React from "react";
import RefundReportBtn from "../refund-report/refund-report-btn";
import { getRemainingTime } from "@/utils/app/get-remaining-time";

const UpcomingAction = ({
	start,
	ssId,
}: {
	start: string | null;
	ssId: number | null;
}) => {
	const remainingTime = getRemainingTime(start);

	return (
		<>
			<div className="text-xs text-gray-400 font-bold mb-3">
				You can request refund before the session starts
			</div>
			<p className="text-[0.95rem] font-bold">
				{remainingTime == "Started" && (
					<span>Session has already started ⌛</span>
				)}
				{remainingTime == "Soon" && <span> Session is about to start ⌛</span>}
				{remainingTime !== "Started" &&
					remainingTime !== "Invalid time" &&
					remainingTime !== "Soon" && (
						<span>
							Only <span className="font-extrabold">{remainingTime}</span> left
							until session starts ⌛!
						</span>
					)}
			</p>
			<RefundReportBtn isReport={false} ssId={ssId} />
		</>
	);
};

export default UpcomingAction;
