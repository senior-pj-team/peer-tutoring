import React from 'react'
import ReviewCard from './review-card'


const Reviews = async ({ searchParams }: { searchParams: Promise<{ page: string }> }) => {
    const { page = "1" } = await searchParams;
    return (
        <>
            <h1 className='text-lg font-bold'>
                86 ratings and review
            </h1>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-5 gap-x-20 mt-8'>
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