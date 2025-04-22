import React from 'react'
import ReviewCard from '../rating-review-report-refund/review-card'

const Reviews = () => {
    return (
        <>
            <h1 className='text-lg font-bold'>
                86 ratings and review
            </h1>
            <div className='grid grid-cols-1 xl:grid-cols-2 gap-20 mt-8'>
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
            </div>
        </>
    )
}

export default Reviews