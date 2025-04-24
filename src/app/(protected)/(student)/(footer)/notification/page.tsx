import NotificationList from '@/components/custom/notification/noti-list'
import React from 'react'
const mockNotifications = [
    {
        id: "1",
        message: "Your tutor, Emily, has accepted your session request for Calculus.",
        createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 minutes ago
    },
    {
        id: "2",
        message: "You have a scheduled session tomorrow at 10:00 AM with James (Physics).",
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    },
    {
        id: "3",
        message: "Reminder: Please upload your assignment draft before the session with Rachel.",
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    },
    {
        id: "4",
        message: "Your session summary for 'Linear Algebra - Basics' is available now.",
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    },
    {
        id: "5",
        message: "New tutor available: Michael (Biology, Chemistry). Book a session now!",
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    },
];
const page = () => {
    return (
        <div className='mt-10'>
            <NotificationList initialNotifications={mockNotifications}/>
        </div>
    )
}

export default page