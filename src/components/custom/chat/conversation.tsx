"use client";

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React, { useState } from 'react';
import MessageInput from './message-input';
import EmptyChat from './empty-chat';

type Message = {
    sender: string;
    receiver: string;
    message: string;
    sentAt: string;
};

const Conversation = ({ messages, chatName }: { messages: Message[], chatName: string }) => {
    const [msg, setMsg] = useState("");
    //userId needs to be fetched from login information   
    const userId = "1"
    const onSend = () => {

    }
    return (
        <div className='px-3 py-0'>
            <div className="flex items-center gap-4 px-6 py-4 border-b bg-white">
                <Avatar>
                    <AvatarImage src="/avatar-placeholder.png" alt={chatName} />
                    <AvatarFallback>{chatName.charAt(0)}</AvatarFallback>
                </Avatar>
                <h2 className="text-lg font-semibold text-orange-800">{chatName}</h2>
            </div>
            <div className="p-4 overflow-y-auto h-[75svh] flex flex-col-reverse">

                {
                    messages.length==0 && <EmptyChat/>
                }{
                    messages.map((msg, index) => {
                        const isSender = msg.sender === userId;

                        return (
                            <div
                                key={index}
                                className={`max-w-xs p-3 rounded-lg shadow text-sm ${isSender
                                    ? 'ml-auto bg-orange-500 text-white'
                                    : 'mr-auto bg-orange-100 text-gray-800'
                                    }`}
                            >
                                <div>{msg.message}</div>
                                <div className="text-xs text-right opacity-70 mt-1">
                                    {new Date(msg.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                        );
                    })}
            </div>
            <MessageInput msg={msg} setMsg={setMsg} onSend={onSend} />
        </div>
    );
};

export default Conversation;
