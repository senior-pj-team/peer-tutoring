export function LoadingDots() {
	return (
		<div className="flex items-center gap-0.5">
			<div className="h-1 w-1 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
			<div className="h-1 w-1 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
			<div className="h-1 w-1 bg-white rounded-full animate-bounce"></div>
		</div>
	);
}
