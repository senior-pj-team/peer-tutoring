"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

type Notification = {
    id: string;
    message: string;
    createdAt: string;
};

interface NotificationListProps {
    initialNotifications: Notification[];
}

const NotificationList = ({ initialNotifications }: NotificationListProps) => {
    const [notifications, setNotifications] = useState(initialNotifications);

    const handleDelete = (id: string) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    return (
        <div className="w-full max-w-md mx-auto p-4 space-y-4">
            <h2 className="text-xl font-semibold text-orange-700 mb-4">Notifications</h2>

            {notifications.length === 0 ? (
                <div className="text-center text-gray-400">No notifications</div>
            ) : (
                <ul className="space-y-3">
                    {notifications.map((noti) => (
                        <li
                            key={noti.id}
                            className="flex items-start justify-between bg-orange-50 border border-orange-200 p-4 rounded-lg shadow-sm"
                        >
                            <div className="flex flex-col">
                                <span className="text-gray-800">{noti.message}</span>
                                <span className="text-xs text-orange-500 mt-1">
                                    {<span className="text-xs text-gray-500">
                                        {timeAgo(noti.createdAt)}
                                    </span>
                                    }
                                </span>
                            </div>
                            <button
                                onClick={() => handleDelete(noti.id)}
                                className="ml-4 text-orange-400 hover:text-orange-600 transition"
                                title="Delete"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default NotificationList;


function timeAgo(date: string | Date) {
    const now = new Date();
    const past = new Date(date);
    const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    const intervals: [number, string][] = [
        [60, 'second'],
        [60 * 60, 'minute'],
        [60 * 60 * 24, 'hour'],
        [60 * 60 * 24 * 7, 'day'],
        [60 * 60 * 24 * 30, 'week'],
        [60 * 60 * 24 * 365, 'month'],
        [Infinity, 'year'],
    ];

    for (let i = 0; i < intervals.length; i++) {
        const [secondsPerUnit, label] = intervals[i];
        if (seconds < secondsPerUnit) {
            const value = Math.floor(seconds / (intervals[i - 1]?.[0] || 1)) || 0;
            return `${value} ${label}${value !== 1 ? 's' : ''} ago`;
        }
    }

    return 'just now';
}
