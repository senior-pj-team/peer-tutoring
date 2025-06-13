export default function Loading() {
	return (
		<div className="w-full flex items-center justify-center h-screen">
			<div className="flex gap-2 items-center">
				<span className="text-xl font-extralight tracking-wide">Loading</span>

				<div className="h-5 w-5 bg-orange-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
				<div className="h-5 w-5 bg-orange-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
				<div className="h-5 w-5 bg-orange-400 rounded-full animate-bounce"></div>
			</div>
		</div>
	);
}
