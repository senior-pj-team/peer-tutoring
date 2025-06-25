import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ChatListLoading = () => {
  return (
    <aside className="w-full h-full border-r bg-white flex flex-col shadow-sm px-4 py-6 space-y-6 overflow-y-auto mt-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full bg-gray-300" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px] bg-gray-300" />
            <Skeleton className="h-4 w-[150px] bg-gray-300" />
          </div>
        </div>
      ))}
    </aside>
  );
};

export default ChatListLoading;
