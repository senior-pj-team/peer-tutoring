import React from 'react'

const Conversation = ({ personId }: { personId: number }) => {
    return (
        <div className="p-4">
            <h2 className="text-lg font-bold mb-2">Chat with {personId}</h2>
            <div className="text-sm text-gray-600">[Chat messages go here...]</div>
        </div>
    )
}

export default Conversation