import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star } from 'lucide-react'
import { Pencil } from 'lucide-react'

const TutorOverallStats = () => {
  return (
    <>
      <div className="text-l mb-3">
        <Link href={""} className='font-semibold underline'>John Doe</Link>
        <p className='text-sm'>This is the headline of the tutor</p>
      </div>
      <div className="flex items-center">
        <div className="relative w-30 h-30 rounded-full overflow-hidden me-3">
          <Image
            src="/profile.jpg"
            alt="Tutor avatar"
            fill
          />
        </div>
        <div>
          <ul>
            <li>
              <div className='flex items-center justify-between'>
                <Star className='w-3 h-3 text-black' fill="currentColor"/>
                <span className='text-xs'>4.7 tutor rating</span>
              </div>
              <div className='flex items-center justify-between'>
                <Pencil className='w-3 h-3 text-black' fill="currentColor"/>
                <span className='text-xs'>4.7 tutor rating</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default TutorOverallStats