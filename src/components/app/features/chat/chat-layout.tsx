import ChatList from "./chat-list";
import ConversationServer from "./conversation-server";
import SelectConversation from "./select-convo";

export default function ChatLayout({ chatId }: { chatId: string | null }) {
    return (
        <>
            {/* Mobile */}
            <div className="lg:hidden h-screen mt-20">
                {chatId ? (
                    <ConversationServer chatId={chatId}/>
                ) : (
                    <ChatList selectedChatId={chatId}/>
                )}
            </div>

            {/* Desktop */}
            <div className="hidden lg:grid grid-cols-4 mt-20">
                <ChatList selectedChatId={chatId}/>
                <div className="col-span-3">
                    {chatId ? (
                        <ConversationServer chatId={chatId}/>
                    ) : (
                        <SelectConversation/>
                    )}
                </div>
            </div>
        </>
    );
}
