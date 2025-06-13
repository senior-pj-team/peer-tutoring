import ChatLayout from "@/components/app/features/chat/chat-layout";

export default async function Page({ params }: { params: { chatId: string } }) {
  const { chatId } = await params;

  return <ChatLayout chatId={chatId} />;
}
