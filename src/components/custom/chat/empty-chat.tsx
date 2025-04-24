import { MessageCircleOff } from "lucide-react";

const EmptyChat = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-gray-400">
      <MessageCircleOff size={48} className="mb-4" />
      <p className="text-lg font-medium">No messages yet</p>
      <p className="text-sm mt-1">Say hi and start the conversation!</p>
    </div>
  );
};

export default EmptyChat;
