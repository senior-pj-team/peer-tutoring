import React from 'react'
import Rating from './rating'
import Expandable from '../../shared/expandable-text'
import { getRatingReview } from '@/data/queries/rating_and_review/get-rating_review_user_view'
import { createClient } from '@/utils/supabase/server'
import { getUserSession } from '@/utils/getUserSession'

const ShowReviewRating = async ({ sessionId }: { sessionId: number | null }) => {
  const user = await getUserSession()
  const supabase = await createClient()
  if (!user || !supabase || !sessionId) return <></>

  const data = await getRatingReview(supabase, {
    session_id: sessionId,
    student_id: user.user_id
  })
  if(!data)return <></>
  const rar: TRatingReviewUserViewResult = data[0]
  
  return (
    <>
      {rar ? (
        <div>
          <span className="text-sm text-gray-700">Your rating</span>
          <Rating rating={rar.rating ?? 0} />
        </div>
      ) : (
        <div className="text-sm text-gray-500 border border-dashed border-gray-300 p-4 mt-2 rounded">
          You haven't submitted a rating or review yet.
        </div>
      )}
      <div className="border border-gray-300 p-4 bg-gray-50 shadow-sm mt-3">
        <h3 className="text-gray-800 font-semibold mb-2">Your Review</h3>
        <Expandable text={rar?.review ?? 'NA'} max={100} />
      </div>
    </>
  )
}

export default ShowReviewRating
