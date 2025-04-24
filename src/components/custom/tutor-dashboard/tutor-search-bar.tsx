import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function TutorDashboardSearchBar({
	query,
	setQuery,
}: {
	query: string;
	setQuery: (query: string) => void;
}) {
	return (
		<div className="mb-5  lg:w-[40%] md:w-[60%] w-full lg:flex-2">
			<div className="relative">
				<Input
					type="text"
					value={query}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setQuery(e.target.value)
					}
					placeholder="Search with session name..."
					className="p-4 pr-10 border border-gray-300 rounded-lg focus:outline-primary focus:ring-primary overflow-clip mr-auto"
				/>
				<Search
					className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none md:block hidden z-20"
					size={18}
				/>
			</div>
		</div>
	);
}
