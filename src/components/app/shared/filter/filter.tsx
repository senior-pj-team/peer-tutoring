"use client";

import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { Check, XCircleIcon } from "lucide-react";
import { useMemo, useState } from "react";

import { CustomAccordionItem } from "./custom-according-item";
import { RatingFilter } from "./rating-filter";
import { PriceFilter } from "./price-filter";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Filter() {
	const [categories, setCategories] = useState<string[]>([]);
	const [priceRange, setPriceRange] = useState<number[]>([]);
	const [priceType, setPriceType] = useState<{
		free: boolean;
		paid: boolean;
	}>({ free: true, paid: true });
	const [rating, setRating] = useState<number | null>(null);

	const pathname = usePathname();
	const searchParams = useSearchParams();
	const search = searchParams.get("search");

	const categories_checkboxes = [
		"Science",
		"Technology",
		"Libral Arts",
		"Business",
		"Engineering",
		"Health Science",
		"Elective Courses",
	];
	const [showAllCategories, setShowAllCategories] = useState(false);

	const handlePriceTypeChange = (field: "free" | "paid", checked: boolean) => {
		setPriceType((prev) => {
			if (!prev) {
				return {
					free: field === "free" ? checked : true,
					paid: field === "paid" ? checked : true,
				};
			}
			return { ...prev, [field]: checked };
		});
	};

	const handleCategoryChange = (category: string, checked: boolean) => {
		setCategories((prev) => {
			if (checked) {
				return [...prev, category];
			} else {
				return prev.filter((cat) => cat !== category);
			}
		});
	};

	const applyFilters = useMemo(() => {
		const params = new URLSearchParams();

		if (search) params.set("search", search);
		console.log(search);
		if (categories.length > 0)
			categories.forEach((cat) => params.append("category", cat));

		if (priceType && priceRange.length > 0) {
			if (!(priceType.free && !priceType.paid)) {
				params.set("minPrice", priceRange[0].toString());
				params.set("maxPrice", priceRange[1].toString());
			}
		}

		if (rating) params.set("rating", rating.toString());

		params.set("free", priceType.free.toString());
		params.set("paid", priceType.paid.toString());

		params.set("page", "1");
		return `${pathname}?${params.toString()}`;
	}, [
		search,
		pathname,
		categories,
		priceType?.free,
		priceType?.paid,
		priceRange[0],
		priceRange[1],
		rating,
	]);

	const resetFilters = () => {
		setCategories([]);
		setPriceRange([]);
		setPriceType({ free: true, paid: true });
		setRating(null);
	};

	return (
		<div className="w-full px-4 overflow-y-auto pb-5">
			<Accordion type="multiple" defaultValue={["ratings"]}>
				<CustomAccordionItem trigger="Tutor Ratings" value="ratings">
					<RatingFilter rating={rating} setRating={setRating} />
				</CustomAccordionItem>
				<CustomAccordionItem trigger="Price" value="price">
					<PriceFilter
						setPriceRange={setPriceRange}
						priceRange={priceRange}
						handlePriceTypeChange={handlePriceTypeChange}
						priceType={priceType}
					/>
				</CustomAccordionItem>
				<CustomAccordionItem trigger="Category" value="categories">
					<div className="relative mt-2 space-y-3">
						{(showAllCategories
							? categories_checkboxes
							: categories_checkboxes.slice(0, 3)
						).map((cat, idx) => (
							<label key={idx} className="flex items-center space-x-2">
								<Checkbox
									value={cat}
									checked={categories.includes(cat)}
									onCheckedChange={(checked) => {
										const isChecked = checked === true;
										handleCategoryChange(cat, isChecked);
									}}
									id={cat}
									className="data-[state=checked]:bg-orange-400 data-[state=checked]:border-none hover:ring-1 data-[state=checked]:ring-2 data-[state=checked]:ring-orange-200 hover:ring-orange-200"
								/>
								<label
									htmlFor={cat}
									className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
									{cat}
								</label>
							</label>
						))}

						<div className="w-full pt-2 text-center">
							<button
								onClick={() => setShowAllCategories((prev) => !prev)}
								className="text-orange-400 font-medium hover:underline">
								{showAllCategories ? "Show less" : "Show more"}
							</button>
						</div>

						{/* Optional gradient effect only when not showing all */}
						{!showAllCategories && (
							<div className="absolute bottom-8 left-0 w-full h-10 bg-gradient-to-t from-white to-transparent pointer-events-none" />
						)}
					</div>
				</CustomAccordionItem>
			</Accordion>
			<div className="flex items-center gap-x-2">
				<Link href={applyFilters} replace>
					<Button className="flex items-center px-4 py-2 text-sm font-medium cursor-pointer hover:ring-2 hover:ring-orange-200">
						<Check className="h-5 w-5" />
						apply filters
					</Button>
				</Link>

				{/* Clear Filters Button */}
				<Button
					variant="outline"
					onClick={resetFilters}
					className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 cursor-pointer hover:ring-2 hover:ring-gray-200">
					<XCircleIcon className="h-5 w-5" />
					Clear Filters
				</Button>
			</div>
		</div>
	);
}
