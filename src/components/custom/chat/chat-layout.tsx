import ChatList from "./chat-list";
import Conversation from "./conversation";
import SelectConversation from "./select-convo";

export default function ChatLayout({ userId }: { userId: string | null }) {
	const chats = [
		{
			chatId: "1",
			chatName: "Alice",
			messages: [
				{
					sender: "1",
					receiver: "2",
					message: "Hey Bob, how are you?",
					sentAt: "2025-04-23T10:15:00Z",
				},
				{
					sender: "2",
					receiver: "1",
					message: "I'm good, Alice! You?",
					sentAt: "2025-04-23T10:16:00Z",
				},
				{
					sender: "1",
					receiver: "2",
					message: "Doing great! Want to catch up later?",
					sentAt: "2025-04-23T10:17:00Z",
				},
				{
					sender: "2",
					receiver: "1",
					message: "Sure, coffee at 5?",
					sentAt: "2025-04-23T10:18:30Z",
				},
			],
		},
		{
			chatId: "2",
			chatName: "Charlie",
			messages: [
				{
					sender: "3",
					receiver: "1",
					message: "Hey Alice, are you coming to the meeting?",
					sentAt: "2025-04-23T10:18:00Z",
				},
				{
					sender: "1",
					receiver: "3",
					message: "Yes, I'll be there in 5 minutes!",
					sentAt: "2025-04-23T10:19:00Z",
				},
				{
					sender: "3",
					receiver: "1",
					message: "Great! Bring the design draft too.",
					sentAt: "2025-04-23T10:20:00Z",
				},
			],
		},
		{
			chatId: "3",
			chatName: "Bob",
			messages: [
				{
					sender: "4",
					receiver: "1",
					message: "Hey Charlie, have you finished the report?",
					sentAt: "2025-04-23T09:00:00Z",
				},
				{
					sender: "1",
					receiver: "4",
					message: "Almost done! Sending it soon.",
					sentAt: "2025-04-23T09:05:00Z",
				},
				{
					sender: "4",
					receiver: "1",
					message: "Thanks, deadline is 10AM!",
					sentAt: "2025-04-23T09:06:00Z",
				},
			],
		},
		{
			chatId: "4",
			chatName: "Diana",
			messages: [
				{
					sender: "1",
					receiver: "5",
					message: "Happy Birthday, Diana! 🎉",
					sentAt: "2025-04-23T08:00:00Z",
				},
				{
					sender: "5",
					receiver: "1",
					message: "Aww thank you! That means a lot ❤️",
					sentAt: "2025-04-23T08:02:00Z",
				},
				{
					sender: "1",
					receiver: "5",
					message: "Hope you have an amazing day!",
					sentAt: "2025-04-23T08:05:00Z",
				},
			],
		},
		{
			chatId: "5",
			chatName: "Ella",
			messages: [
				{
					sender: "6",
					receiver: "1",
					message: "Did you watch the episode last night?",
					sentAt: "2025-04-22T22:00:00Z",
				},
				{
					sender: "1",
					receiver: "6",
					message: "Yes!! That plot twist was insane 😱",
					sentAt: "2025-04-22T22:01:30Z",
				},
				{
					sender: "6",
					receiver: "1",
					message: "Right?! I did NOT see that coming.",
					sentAt: "2025-04-22T22:03:00Z",
				},
				{
					sender: "1",
					receiver: "6",
					message: "Let's talk more tomorrow after class.",
					sentAt: "2025-04-22T22:05:00Z",
				},
			],
		},
		{
			chatId: "6",
			chatName: "Monica",
			messages: [
				{
					sender: "7",
					receiver: "group",
					message: "Team, status update on the launch?",
					sentAt: "2025-04-23T07:00:00Z",
				},
				{
					sender: "8",
					receiver: "group",
					message: "Prototype is ready. Testing phase starts at noon.",
					sentAt: "2025-04-23T07:05:00Z",
				},
				{
					sender: "1",
					receiver: "group",
					message:
						"I'll join remotely. Let me know if you need debugging help.",
					sentAt: "2025-04-23T07:10:00Z",
				},
				{
					sender: "9",
					receiver: "group",
					message: "Coffee break first? 😅",
					sentAt: "2025-04-23T07:11:00Z",
				},
			],
		},
		{
			chatId: "7",
			chatName: "Sophie",
			messages: [
				{
					sender: "1",
					receiver: "10",
					message: "Morning, Sophie! Did you sleep well?",
					sentAt: "2025-04-23T06:45:00Z",
				},
				{
					sender: "10",
					receiver: "1",
					message: "Morning! Yeah, pretty good. You?",
					sentAt: "2025-04-23T06:46:15Z",
				},
				{
					sender: "1",
					receiver: "10",
					message: "Same here. Wanna go for a walk later?",
					sentAt: "2025-04-23T06:47:30Z",
				},
				{
					sender: "10",
					receiver: "1",
					message: "Sure! 6 PM works?",
					sentAt: "2025-04-23T06:48:45Z",
				},
				{
					sender: "1",
					receiver: "10",
					message: "Perfect. I'll bring coffee 😊",
					sentAt: "2025-04-23T06:49:50Z",
				},
			],
		},
		{
			chatId: "8",
			chatName: "Team Project Group",
			messages: [
				{
					sender: "1",
					receiver: "group",
					message: "Don't forget the submission is due by Friday!",
					sentAt: "2025-04-22T20:00:00Z",
				},
				{
					sender: "11",
					receiver: "group",
					message: "Got it. I’ll finalize the UI part tomorrow.",
					sentAt: "2025-04-22T20:05:00Z",
				},
				{
					sender: "12",
					receiver: "group",
					message: "Backend is 80% done, might need help with auth flow.",
					sentAt: "2025-04-22T20:07:00Z",
				},
				{
					sender: "1",
					receiver: "group",
					message: "I can help. Push your code by tonight.",
					sentAt: "2025-04-22T20:10:00Z",
				},
				{
					sender: "13",
					receiver: "group",
					message: "I'll take care of documentation!",
					sentAt: "2025-04-22T20:11:00Z",
				},
				{
					sender: "1",
					receiver: "group",
					message: "Awesome team. Let’s get it done!",
					sentAt: "2025-04-22T20:12:00Z",
				},
			],
		},
		{
			chatId: "9",
			chatName: "Liam",
			messages: [],
		},
		{
			chatId: "10",
			chatName: "Grandma",
			messages: [
				{
					sender: "1",
					receiver: "15",
					message: "Hi Grandma ❤️ Just checking in!",
					sentAt: "2025-04-20T09:00:00Z",
				},
				{
					sender: "15",
					receiver: "1",
					message: "Oh hello dear! I just baked cookies 😋",
					sentAt: "2025-04-20T09:01:30Z",
				},
				{
					sender: "1",
					receiver: "15",
					message: "Wish I was there to taste them!",
					sentAt: "2025-04-20T09:03:00Z",
				},
				{
					sender: "15",
					receiver: "1",
					message: "I'll save you some. Come visit soon!",
					sentAt: "2025-04-20T09:05:00Z",
				},
				{
					sender: "1",
					receiver: "15",
					message: "Definitely this weekend ❤️",
					sentAt: "2025-04-20T09:06:00Z",
				},
				{
					sender: "1",
					receiver: "15",
					message: "Definitely this weekend ❤️",
					sentAt: "2025-04-20T09:06:00Z",
				},
				{
					sender: "1",
					receiver: "15",
					message: "Definitely this weekend ❤️",
					sentAt: "2025-04-20T09:06:00Z",
				},
				{
					sender: "1",
					receiver: "15",
					message: "Definitely this weekend ❤️",
					sentAt: "2025-04-20T09:06:00Z",
				},
				{
					sender: "1",
					receiver: "15",
					message: "Definitely this weekend ❤️",
					sentAt: "2025-04-20T09:06:00Z",
				},
				{
					sender: "1",
					receiver: "15",
					message: "Definitely this weekend ❤️",
					sentAt: "2025-04-20T09:06:00Z",
				},
				{
					sender: "1",
					receiver: "15",
					message: "Definitely this weekend ❤️",
					sentAt: "2025-04-20T09:06:00Z",
				},
				{
					sender: "1",
					receiver: "15",
					message: "Definitely this weekend ❤️",
					sentAt: "2025-04-20T09:06:00Z",
				},
			],
		},
	];

	const chatnames = chats.map(({ chatId, chatName }) => ({
		id: chatId,
		chatName,
	}));
	const selectedChat = chats.find((chat) => chat.chatId === userId);
	const messages = selectedChat?.messages || [];

	return (
		<>
			{/* Mobile */}
			<div className="md:hidden h-screen">
				{userId ? (
					<Conversation
						chatName={selectedChat?.chatName || "example"}
						messages={messages}
					/>
				) : (
					<ChatList userId={userId} chats={chatnames} />
				)}
			</div>

			{/* Desktop */}
			<div className="hidden md:grid grid-cols-4">
				<ChatList userId={userId} chats={chatnames} />
				<div className="col-span-3">
					{userId ? (
						<Conversation
							chatName={selectedChat?.chatName || "example"}
							messages={messages}
						/>
					) : (
						<SelectConversation />
					)}
				</div>
			</div>
		</>
	);
}
