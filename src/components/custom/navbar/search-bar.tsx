"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import sessionPicOne from "../../../../public/session-one.jpg";
import { Search } from "lucide-react";
export default function SearchBar() {
	const [query, setQuery] = useState<string>("");
	const items = [
		"Web Developement",
		"Math3 MidTerm Revision",
		"Math2 Calculus Revision",
		"Database Course",
		"Java Spring Boot for web Developement",
		"Data Analytics for Business Management",
		"Statsitics for Business",
	];
	const [showSuggestions, setShowSuggestions] = useState(false);

	const containerRef = useRef<HTMLDivElement>(null);

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
	const filtered = items.filter((item) =>
		item.toLowerCase().includes(query.toLowerCase()),
	);
	return (
		<div className="relative w-full" ref={containerRef}>
			<div className="relative">
				<input
					type="text"
					value={query}
					onChange={(e) => {
						setQuery(e.target.value);
						setShowSuggestions(true);
					}}
					placeholder="Search anything..."
					className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-full focus:outline-orange-400  focus:ring-orange-400 overflow-clip"
				/>
				<Search
					className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none md:block hidden z-20"
					size={18}
				/>
			</div>

			{showSuggestions && query.trim() !== "" && (
				<div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-md max-h-60 overflow-y-auto">
					{filtered.length > 0 ? (
						filtered.map((item, index) => (
							<div
								key={index}
								className="flex items-center gap-3 px-4 py-2 text-sm cursor-pointer hover:bg-orange-50 hover:text-orange-400"
								onClick={() => {
									setQuery(item);
									setShowSuggestions(false);
								}}>
								<Image
									src={sessionPicOne}
									alt="Session Pic"
									className="w-5 h-5 object-contain"
								/>
								<span>{item}</span>
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
