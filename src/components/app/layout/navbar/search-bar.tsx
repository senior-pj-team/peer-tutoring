"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { DebounceSearchBar } from "../../shared/debounce-search-bar";
import { useSessionsMatviewQuery } from "@/hooks/use-sessions";
import { Skeleton } from "@/components/ui/skeleton";

export default function SearchBar() {
	const [search, setSearch] = useState<string>("");
	const router = useRouter();

	const [showSuggestions, setShowSuggestions] = useState(false);

	const containerRef = useRef<HTMLDivElement>(null);

	const {
		data: suggestions,
		isLoading,
		isError,
		refetch,
	} = useSessionsMatviewQuery(search, false);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setShowSuggestions(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	useEffect(() => {
		refetch();
	}, [search, refetch]);

	return (
		<div className="relative w-full" ref={containerRef}>
			<div className="relative">
				<DebounceSearchBar
					query={search}
					setQuery={(value) => {
						setSearch(value);
						if (value) {
							setShowSuggestions(true);
						}
					}}
					placeholder="Search anything..."
					className="w-full px-4 py-5 pr-10 border border-gray-300 rounded-full focus:outline-orange-400  focus:ring-orange-400 overflow-clip"
				/>
				<Search
					className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none md:block hidden z-20"
					size={18}
				/>
			</div>
			{showSuggestions && isLoading && (
				<div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-md max-h-600 overflow-y-auto">
					{Array.from({ length: 3 }).map((_, index) => {
						return (
							<div className="flex items-center gap-3 p-4 my-1 " key={index}>
								<Skeleton className="w-[50px] h-[50px] rounded-md" />
								<div className="space-y-2">
									<Skeleton className="w-[200px] h-[20px] rounded-md" />
									<Skeleton className="w-[100px] h-[20px] rounded-md" />
								</div>
							</div>
						);
					})}
				</div>
			)}

			{showSuggestions && isError && (
				<div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-md max-h-30 overflow-y-auto">
					<p className="text-sm text-red-500 p-2 font-bold">
						Something Went Wrong!
					</p>
				</div>
			)}

			{showSuggestions && suggestions && (
				<div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-md max-200 overflow-y-auto">
					{suggestions.length > 0 ? (
						suggestions.map((suggestion, index) => (
							<div
								key={index}
								className="flex items-center gap-3 p-4 text-sm cursor-pointer hover:bg-orange-50 hover:text-orange-400"
								onClick={() => {
									router.push(
										`/session/browse/${suggestion.session_id}/content`,
									);
									setShowSuggestions(false);
								}}>
								<Image
									src={suggestion.image ?? "/no_image.png"}
									width={50}
									height={50}
									alt="Session Pic"
									className="object-contain w-[50] h-[50]"
								/>
								<div className="space-y-2">
									<span>{suggestion.session_name}</span>
									<div className="flex items-center gap-x-2">
										<span>{suggestion.tutor!.name}</span>
									</div>
								</div>
							</div>
						))
					) : (
						<div className="px-4 py-2 text-sm text-gray-400">
							No results found
						</div>
					)}
				</div>
			)}
		</div>
	);
}
