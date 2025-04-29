import ChatLayout from "@/components/custom/features/chat/chat-layout";

type Params = Promise<{ userId: string }>

export default async function ChatPage({ params }: { params: Params }) {
  const { userId } = await params

  return <ChatLayout userId={userId} />;
}
