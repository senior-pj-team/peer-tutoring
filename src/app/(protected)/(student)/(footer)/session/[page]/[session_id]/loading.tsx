export default function Loading() {
	return (
		<div className="w-full flex items-center justify-center h-screen">
			<div className="flex gap-3 items-center">
				<div className="h-5 w-5 bg-orange-400 rounded-full animate-bounce [animation-delay:-0.35s]"></div>
				<div className="h-5 w-5 bg-orange-400 rounded-full animate-bounce [animation-delay:-0.25s]"></div>
				<div className="h-5 w-5 bg-orange-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
				<div className="h-5 w-5 bg-orange-400 rounded-full animate-bounce"></div>
			</div>
		</div>
	);
}
