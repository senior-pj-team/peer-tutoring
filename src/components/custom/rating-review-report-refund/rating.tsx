import React from 'react'
import { Star } from "lucide-react"
import clsx from 'clsx'

const Rating = ({className, rating}: {className?: string, rating: number}) => {
    return (
        <div className={"flex items-center text-sm "+className}>
            {
                [1,2,3,4,5].map((star)=><Star key={star} className={clsx("w-3 h-3", rating>=star ? "text-yellow-300": "text-gray-300" )} fill="currentColor" />)
            }
            <p className="ms-1 text-xs font-medium text-gray-500 dark:text-gray-400">{rating}</p>
            <p className="ms-1 text-xs font-medium text-gray-500 dark:text-gray-400">out of</p>
            <p className="ms-1 text-xs font-medium text-gray-500 dark:text-gray-400">5</p>
        </div>

    )
}

export default Rating