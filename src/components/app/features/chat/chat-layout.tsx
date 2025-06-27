import { Suspense } from "react";
import { ChatListServer } from "./chat-list-server";
import ConversationServer from "./conversation-server";
import SelectConversation from "./select-convo";
import ConversationLoading from "../../shared/conversation-loading";
import ChatListLoading from "../../shared/chat-list-loading";

export default function ChatLayout({ chatId }: { chatId: string | null }) {
    return (
        <>
            {/* Mobile */}
            <div className="lg:hidden h-screen mt-20">
                {chatId ? (
                    <ConversationServer chatId={chatId}/>
                ) : (
                    <ChatListServer selectedChatId={chatId}/>
                )}
            </div>

            {/* Desktop */}
            <div className="hidden lg:grid grid-cols-4 mt-20">
                <Suspense fallback={<ChatListLoading/>}>
                    <ChatListServer selectedChatId={chatId}/>
                </Suspense>
                <div className="col-span-3">
                    {chatId ? (
                        <Suspense fallback={<ConversationLoading/>}>
                            <ConversationServer chatId={chatId}/>
                        </Suspense>
                    ) : (
                        <SelectConversation/>
                    )}
                </div>
            </div>
        </>
    );
}
