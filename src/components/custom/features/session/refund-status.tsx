import React from 'react';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

const statusMap = {
    "pending": {
        icon: <Clock className="text-yellow-500" size={20} />,
        text: 'Pending',
        color: 'text-yellow-500',
    },
    "approved": {
        icon: <CheckCircle className="text-green-500" size={20} />,
        text: 'Approved',
        color: 'text-green-500',
    },
    "rejected": {
        icon: <XCircle className="text-red-500" size={20} />,
        text: 'Rejected',
        color: 'text-red-500',
    },
};

const RefundStatus = ({ status = 'pending' }: { status: "pending" | "approved" | "rejected" }) => {
    const current = statusMap[status] || statusMap.pending;

    return (
        <>
            <div className="flex items-center space-x-2">
                {current.icon}
                <span className={`font-medium ${current.color}`}>{current.text}</span>
            </div>
            {
                status === 'pending' ? (
                    <p className="text-sm">Your refund request is under review.</p>
                ) : status === 'approved' ? (
                    <p className="text-sm">Your refund request has been approved.</p>
                ) : (
                    <p className="text-sm">Your refund request has been rejected.</p>
                )
            }
            <p className="text-sm">Reason: Session canceled by tutor</p>
            <p className="text-sm text-gray-500">Date: April 19, 2025</p>
        </>
    );
};

export default RefundStatus;
