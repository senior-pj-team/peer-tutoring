"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { DebounceSearchBar } from "../../shared/debounce-search-bar";
import { useSessionsMatviewQuery } from "@/hooks/use-sessions";
import { Skeleton } from "@/components/ui/skeleton";
import Rating from "../../features/rating-review/rating";
import Link from "next/link";

export default function SearchBar() {
	const [search, setSearch] = useState<string>("");
	const router = useRouter();

	const [showSuggestions, setShowSuggestions] = useState(false);

	const containerRef = useRef<HTMLDivElement>(null);

	const { data, isLoading, isError, refetch } = useSessionsMatviewQuery(
		search,
		false,
	);

	const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			setShowSuggestions(false);
			const trimmed = search.trim();
			router.push(`/home/sessions?search=${encodeURIComponent(trimmed)}`);
		}
	};

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
					onKeyDown={onKeyDown}
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
				<div className="absolute z-100 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-md max-h-600 overflow-y-auto">
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
				<div className="absolute z-100 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-md max-h-30 overflow-y-auto">
					<p className="text-sm text-red-500 p-2 font-bold">
						Something Went Wrong!
					</p>
				</div>
			)}

			{showSuggestions && data?.rows && (
				<div className="absolute z-100 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-md max-200 overflow-y-auto">
					{data.rows.length > 0 ? (
						<div className="flex flex-col gap-x-2 pb-3">
							{data.rows.map((suggestion, index) => (
								<div
									key={index}
									className="flex items-center gap-3 p-4 text-sm cursor-pointer hover:bg-orange-50 hover:text-orange-400"
									onClick={() => {
										router.push(
											`/session/browse/${suggestion.session_id}/content`,
										);
										setShowSuggestions(false);
									}}>
									{suggestion.image ? (
										<Image
											src={suggestion.image}
											width={70}
											height={50}
											alt="Session Pic"
											className="object-cover w-[70] h-[50] rounded-md"
										/>
									) : (
										<div className="w-[70] h-[50] rounded-md bg-blue-100 flex justify-center items-center">
											<Image
												src="/no-image.png"
												width={30}
												height={30}
												alt="Session Pic"
												className="object-cover w-[40] h-[40] rounded-md"
											/>
										</div>
									)}

									<div className="flex flex-col gap-y-1.5">
										<span className="text-[1rem] font-bold">
											{suggestion.session_name}
										</span>
										<div className="flex items-center gap-x-2">
											<span className="text-xs">{suggestion.tutor?.name} </span>
											<Rating
												searchBar={true}
												color="text-orange-400"
												className="ms-0"
												rating={
													suggestion.tutor?.tutor_rating?.toFixed(
														1,
													) as unknown as number
												}
											/>
										</div>
									</div>
								</div>
							))}

							<Link
								href={`/home/sessions?search=${search}&page=1`}
								onClick={() => setShowSuggestions(false)}
								className="self-center p-3 hover:bg-orange-50 hover:text-primary font-bold text-sm rounded-md">
								View More
							</Link>
						</div>
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
