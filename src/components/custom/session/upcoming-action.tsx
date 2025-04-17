import React from 'react'
import { Hourglass, Heart } from 'lucide-react'

const UpcomingAction = () => {
  return (
    <>
      <p className="text-sm font-medium">
        <Hourglass className="w-4 h-4 text-orange-500 font-bold inline me-1" />
        Only <span className="font-bold">6 hours</span> left until session starts!
      </p>
      <button className="border border-orange-600 hover:bg-orange-200 text-orange-600 px-4 py-2 text-sm cursor-pointer w-full">
        Request refund
      </button>
    </>
  )
}

export default UpcomingAction