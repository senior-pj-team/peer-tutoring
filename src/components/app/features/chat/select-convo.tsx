import { MessageSquare } from "lucide-react";

const SelectConversation = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-gray-500">
      <MessageSquare size={48} className="mb-4 text-orange-500" />
      <p className="text-lg font-semibold">Select a Conversation</p>
      <p className="text-sm mt-1">Pick a conversation to start chatting.</p>
    </div>
  );
};

export default SelectConversation;
