import React from "react";
import { Hourglass } from "lucide-react";
import RefundReportBtn from "../refund-report/refund-report-btn";
import { getRemainingTime } from "@/utils/app/get-remaining-time";

const UpcomingAction = ({ start, ssId, sessionId }: { start: string | null, ssId: number | null, sessionId: number | null }) => {
  const remainingTime = getRemainingTime(start);
  return (
    <>
      <p className="text-sm font-medium">
        <Hourglass className="w-4 h-4 text-orange-500 font-bold inline me-1" />
        {remainingTime == "Started" && <span>Session has started</span>}
        {remainingTime == "Soon" && <span> Session is about to start</span>}
        {remainingTime == "Invalid time" && (
          <span>
            Only <span className="font-bold">{remainingTime}</span> left until
            session starts!
          </span>
        )}
      </p>
      <RefundReportBtn isReport={false} ssId={ssId} sessionId={sessionId}/>
    </>
  );
};

export default UpcomingAction;
