'use client'
import React from 'react'
import { Textarea } from '@/components/ui/textarea'
import clsx from 'clsx'
import { useState } from 'react'
import { Star } from 'lucide-react'


const RatingReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  return (
    <div>
      <div className="flex items-center gap-1 my-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={clsx(
              "h-6 w-6 cursor-pointer",
              rating >= star ? "text-yellow-300" : "text-gray-300"
            )}
            onClick={() => setRating(star)}
            strokeWidth={1.5}
            fill={rating >= star ? "#FACC15" : "none"}
          />
        ))}
      </div>
      <Textarea
        placeholder="Write your review here..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
        className="min-h-[100px]"
      />
      <div className="mt-4">
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 text-sm cursor-pointer rounded">
          Submit
        </button>
      </div>
    </div>
  )
}

export default RatingReviewForm
