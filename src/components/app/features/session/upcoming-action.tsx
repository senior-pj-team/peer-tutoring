import React from "react";
import { Hourglass } from "lucide-react";
import RefundReportBtn from "../refund-report/refund-report-btn";
import { getRemainingTime } from "@/utils/app/getRemainingTime";

const UpcomingAction = ({start}: {start: string | null}) => {
	const remainingTime= getRemainingTime(start)
	return (
		<>
			<p className="text-sm font-medium">
				<Hourglass className="w-4 h-4 text-orange-500 font-bold inline me-1" />
				Only <span className="font-bold">{remainingTime}</span> left until session
				starts!
			</p>
			<RefundReportBtn isReport={false} />
		</>
	);
};

export default UpcomingAction;
