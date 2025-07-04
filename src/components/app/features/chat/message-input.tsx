import { Send } from "lucide-react";
import { FormEvent } from "react";

function MessageInput({
	msg,
	setMsg,
	onSend,
}: {
	msg: string;
	setMsg: React.Dispatch<React.SetStateAction<string>>;
	onSend: () => void;
}) {
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (msg.trim() !== "") {
			onSend();
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="w-full bg-white px-4 py-2 flex items-center gap-2">
			<input
				type="text"
				placeholder="Type a message..."
				value={msg}
				onChange={(e) => setMsg(e.target.value)}
				className="flex-1 rounded-full border border-gray-300 bg-gray-50 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
			/>
			<button
				type="submit"
				className="p-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full transition flex items-center justify-center">
				<Send className="w-5 h-5" />
			</button>
		</form>
	);
}

export default MessageInput;
