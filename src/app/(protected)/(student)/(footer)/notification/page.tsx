import NotificationList from '@/components/custom/notification/noti-list'
import React from 'react'
const mockNotifications = [
    {
        id: "1",
        message: "Your report is ready to download.",
        createdAt: new Date(Date.now() - 600000).toISOString(),
    },
    {
        id: "2",
        message: "New comment on your post.",
        createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
];

const page = () => {
    return (
        <NotificationList initialNotifications={mockNotifications}/>
    )
}

export default page