import React from 'react'
import { Hourglass, Heart } from 'lucide-react'
import RefundReportBtn from '../rating-review-report-refund/refund-report-btn'

const UpcomingAction = () => {
  return (
    <>
      <p className="text-sm font-medium">
        <Hourglass className="w-4 h-4 text-orange-500 font-bold inline me-1" />
        Only <span className="font-bold">6 hours</span> left until session starts!
      </p>
      <RefundReportBtn isReport={false}/>
      </>
  )
}

export default UpcomingAction