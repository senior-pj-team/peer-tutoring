import React from 'react'
import NotificationList from '@/components/custom/notification/noti-list'
const mockNotifications = [
    {
        id: "1",
        message: "Warning: You missed your scheduled session with student Clara at 2:00 PM.",
        createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    },
    {
        id: "2",
        message: "Reminder: Repeated lateness has been observed. Please be punctual for your sessions.",
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: "3",
        message: "Action Required: Incomplete session summary for last week’s class with Kevin.",
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: "4",
        message: "Notice: A complaint was filed by a student regarding inappropriate language. Please review guidelines.",
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), 
    },
    {
        id: "5",
        message: "Final Warning: Failure to update your availability calendar may affect your visibility to students.",
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
];

const page = () => {
  return (
    <div className='mt-10'>
            <NotificationList initialNotifications={mockNotifications} isWarning={true}/>
        </div>
  )
}

export default page