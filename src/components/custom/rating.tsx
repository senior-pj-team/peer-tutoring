import React from 'react'
import { Star } from "lucide-react"

const Rating = ({className}: {className: string}) => {
    return (
        <div className={"flex items-center text-sm "+className}>
            <Star className="w-3 h-3 text-yellow-300" fill="currentColor" />
            <Star className="w-3 h-3 text-yellow-300" fill="currentColor" />
            <Star className="w-3 h-3 text-yellow-300" fill="currentColor" />
            <Star className="w-3 h-3 text-yellow-300" fill="currentColor" />
            <Star className="w-3 h-3 text-gray-300" fill="currentColor" />
            <p className="ms-1 text-xs font-medium text-gray-500 dark:text-gray-400">4.95</p>
            <p className="ms-1 text-xs font-medium text-gray-500 dark:text-gray-400">out of</p>
            <p className="ms-1 text-xs font-medium text-gray-500 dark:text-gray-400">5</p>
        </div>

    )
}

export default Rating