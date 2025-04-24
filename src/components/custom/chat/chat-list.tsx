"use client";

import { useState } from "react";
import Link from "next/link";
import ChatCard from "./chat-card";
import { Search } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

type Chat = {
  id: string;
  chatName: string;
};

interface ChatListProps {
  userId: string | null;
  chats: Chat[];
}

const ChatList = ({ userId, chats }: ChatListProps) => {
  const [search, setSearch] = useState("");
  const [activeChatId, setActiveChatId] = useState<string | null>(userId);

  const filteredChats = chats.filter((chat) =>
    chat.chatName.toLowerCase().includes(search.toLowerCase())
  );

  const handleChatClick = (id: string) => {
    setActiveChatId(id);
    setSearch("");
  };

  return (
    <aside className="w-[360px] h-full border-r bg-white px-4 py-6">
      <div className="space-y-5">
        {/* Header */}
        <h2 className="text-2xl font-semibold text-orange-700 px-1">Chats</h2>

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search chats..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-full border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-orange-50 text-gray-800 placeholder:text-orange-300 transition shadow-sm"
          />
        </div>

        {/* Scrollable Chat List */}
        <ScrollArea className="h-[70vh] pr-3">
          <div className="space-y-2">
            {filteredChats.length > 0 ? (
              filteredChats.map((chat) => (
                <Link
                  key={chat.id}
                  href={`/chat/${chat.id}`}
                  onClick={() => handleChatClick(chat.id)}
                  className={` block transition px-4 py-3 text-sm font-medium ${
                    activeChatId === chat.id
                      ? "bg-orange-300 text-orange-900"
                      : "bg-white hover:bg-orange-100 text-gray-700"
                  }`}
                >
                  <ChatCard name={chat.chatName} />
                </Link>
              ))
            ) : (
              <div className="mt-20 flex flex-col items-center justify-center text-center text-gray-400">
                <svg
                  className="h-16 w-16 text-orange-200 mb-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.833L3 20l.994-4.438A7.963 7.963 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <p className="text-sm">No chats found</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </aside>
  );
};

export default ChatList;
