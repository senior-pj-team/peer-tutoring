import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


const ChatCard = ({ name }: { name: string }) => {
    return (
        <div className="grid grid-cols-[auto_1fr] gap-3 items-center mx-auto">
            <Avatar className="w-12 h-12">
                <AvatarImage src="/profile.jpg" className="w-full h-full" />
                <AvatarFallback>Profile</AvatarFallback>
            </Avatar>
            <div>
                <div className="text-base font-medium">{name}</div>
                <div className="text-sm text-gray-500">The last message..</div>
            </div>
        </div>
    )
}

export default ChatCard