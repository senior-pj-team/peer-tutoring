export default function AmountCard({
	label,
	amount,
	textColor = "text-gray-800",
}: {
	label: string;
	amount: number;
	textColor?: string;
}) {
	return (
		<div className="bg-white shadow-md rounded-2xl p-4 w-auto inline-block min-w-[160px]">
			<div className="flex flex-col">
				<span className="text-sm text-gray-500">{label}</span>
				<span className={`text-2xl font-semibold ${textColor}`}>฿{amount}</span>
			</div>
		</div>
	);
}
