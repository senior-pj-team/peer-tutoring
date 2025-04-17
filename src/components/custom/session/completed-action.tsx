import React from 'react'
import Rating from '@/components/custom/rating-review-report-refund/rating'
import Expandable from './expandable-text'
import RatingReviewBtn from '../rating-review-report-refund/rating-review-btn'
import ReportBtn from '../rating-review-report-refund/report-btn'
import ShowReviewRating from '../rating-review-report-refund/show-review-rating'

const CompletedAction = () => {
    return (
        <>
            <ShowReviewRating/>
            <RatingReviewBtn/>
            <ReportBtn/>
        </>
    )
}

export default CompletedAction