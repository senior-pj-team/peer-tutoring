import React from 'react'
import Image from 'next/image'
import { Star, Pencil, Users, BookOpen } from 'lucide-react'

const TutorOverallStats = () => {
  return (
    <div className="flex items-center mt-5">
      <div className="relative w-30 h-30 rounded-full overflow-hidden me-3">
        <Image
          src="/profile.jpg"
          alt="Tutor avatar"
          fill
        />
      </div>
      <div>
        <ul className='space-y-2'>
          <li>
            <div className='flex items-center gap-7'>
              <Star className='w-3 h-3 text-black' fill="currentColor" />
              <span className='text-sm'>4.7 Tutor rating</span>
            </div>
          </li>
          <li>
            <div className='flex items-center gap-7'>
              <Pencil className='w-3 h-3 text-black' fill="currentColor" />
              <span className='text-sm'>34 Reviews</span>
            </div>
          </li>
          <li>
            <div className='flex items-center gap-7'>
              <Users className='w-3 h-3 text-black' fill="currentColor" />
              <span className='text-sm'>52 Students</span>
            </div>
          </li>
          <li>
            <div className='flex items-center gap-7'>
              <BookOpen className='w-3 h-3 text-black' fill="currentColor" />
              <span className='text-sm'>21 Sessions</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default TutorOverallStats