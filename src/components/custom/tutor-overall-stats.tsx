import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Rating from './rating-review-report-refund/rating'

const TutorOverallStats = () => {
  return (
    <>
      <div className="text-l mb-3 font-semibold">
        <Link href={""}>John Doe</Link>
      </div>
      <div className="flex items-center">
        <div className="relative w-40 h-40 rounded-full overflow-hidden me-3">
          <Image
            src="/profile.jpg"
            alt="Tutor avatar"
            fill
          />
        </div>
      </div>
    </>
  )
}

export default TutorOverallStats