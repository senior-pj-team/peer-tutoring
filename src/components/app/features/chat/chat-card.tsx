import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAvatarFallback } from "@/utils/app/get-avatar-fallback";

interface ChatCardProps {
  name: string;
  lastMessage?: string;
  lastSentAt?: string;
  chatProfileUrl?: string;
}

const ChatCard = ({
  name,
  lastMessage = "No messages yet",
  lastSentAt = "",
  chatProfileUrl = "/profile.jpg",
}: ChatCardProps) => {
  return (
    <div
      className="flex items-center space-x-4 p-4 rounded-lg transition-colors duration-200 ease-in-out hover:bg-orange-50 cursor-pointer"
    >
      {/* Avatar */}
      <Avatar>
        <AvatarImage
          src={chatProfileUrl}
          width={56}
          height={56}
          alt="User Avatar"
        />
        <AvatarFallback>
          {getAvatarFallback(name)}
        </AvatarFallback>
      </Avatar>

      {/* Chat Info */}
      <div className="flex-1 min-w-0">
        {/* Name */}
        <div className="text-base font-medium text-gray-900 truncate mb-0.5">
          {name}
        </div>

        {/* Last Message + Time */}
        <div className="flex items-center justify-between gap-1">
          <p className="text-sm text-gray-500 truncate">
            {lastMessage}
          </p>
          <span className="text-xs text-gray-400">
            {lastSentAt}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
