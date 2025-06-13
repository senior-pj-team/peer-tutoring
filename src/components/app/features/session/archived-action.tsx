import React from 'react'
import ShowReviewRating from '../rating-review/show-review-rating'

const ArchivedAction = ({sessionId}: {sessionId: number | null}) => {
    return (
        <>
            <ShowReviewRating sessionId={sessionId}/>
        </>
    )
}

export default ArchivedAction