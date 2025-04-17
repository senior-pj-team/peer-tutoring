import React from 'react'
import Rating from '@/components/custom/rating'
import { AlertTriangle } from 'lucide-react'
import Expandable from './expandable-text'

const CompletedAction = () => {
    return (
        <>
            <div>
                <span>Your rating</span>
                <Rating rating={4} />
            </div>
            <div className="border border-gray-300 p-4 bg-gray-50 shadow-sm">
                <h3 className="text-gray-800 font-semibold mb-2">Your Review</h3>
                <Expandable text="If the user has given the review already, it will be display here.." />
            </div>

            <button className="border border-orange-600 hover:bg-orange-200 text-orange-600 px-4 py-2 text-sm cursor-pointer w-full">
                Rating and review
            </button>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 text-sm cursor-pointer rounded">
                <div className="flex items-center gap-1">
                    <AlertTriangle className="h-5 w-5" />
                    <span>Report</span>
                </div>
            </button>

        </>
    )
}

export default CompletedAction