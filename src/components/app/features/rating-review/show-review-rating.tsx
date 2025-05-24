import React from 'react'
import Rating from './rating'
import Expandable from '../../shared/expandable-text'

const ShowReviewRating = () => {
  return (
    <>
        <div>
                <span>Your rating</span>
                <Rating rating={4} />
            </div>
            <div className="border border-gray-300 p-4 bg-gray-50 shadow-sm mt-3">
                <h3 className="text-gray-800 font-semibold mb-2">Your Review</h3>
                <Expandable text="If the user has given the review already, it will be display here.." max={100}/>
            </div>
    </>
  )
}

export default ShowReviewRating