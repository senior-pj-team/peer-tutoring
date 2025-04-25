import StudentList from '@/components/custom/tutor-dashboard/session-view/student-list'
import React from 'react'
import { Roboto_Mono } from "next/font/google";
import clsx from 'clsx';
const roboto_mono = Roboto_Mono({
  weight: ["700"],
  subsets: ["latin"],
});

const page = () => {
  return (
          <div className="min-w-full">
            <h2 className={clsx("text-3xl font-semibold my-10", roboto_mono.className)}>Notifications</h2>
            <StudentList />
          </div>
  )
}

export default page