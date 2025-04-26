import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function TutorDashboardSearchBar({
	query: initialValue,
	setQuery,
	debounce = 500,
	type,
	...props
}: {
	query: string;
	setQuery: (query: string) => void;
	debounce?: number;
	type: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
	const [value, setValue] = useState(initialValue);

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setQuery(value);
		}, debounce);

		return () => clearTimeout(timeout);
	}, [value]);

	return (
		<div className="mb-5 lg:w-[40%] md:w-[60%] w-full lg:flex-2">
			<div className="relative">
				<Input
					type="text"
					value={value}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setValue(e.target.value)
					}
					placeholder={cn(
						"Search with session",
						type === "data-table" && "or student ",
						"...",
					)}
					className="p-4 pr-10 border border-gray-300 rounded-lg focus:outline-primary focus:ring-primary overflow-clip mr-auto"
					{...props}
				/>
				<Search
					className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none md:block hidden z-20"
					size={18}
				/>
			</div>
		</div>
	);
}
