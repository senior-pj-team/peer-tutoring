"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

import { FaStarHalfAlt, FaRegStar, FaStar } from "react-icons/fa";

export default function Filter() {
	const categories = [
		"Science",
		"Technology",
		"Libral Arts",
		"Business",
		"Engineering",
		"Elective Courses",
	];
	const [showAllCategories, setShowAllCategories] = useState(false);
	return (
		<div className="w-full px-4 overflow-y-auto ">
			<Accordion type="multiple" defaultValue={["ratings"]}>
				<CustomAccordionItem trigger="Tutor Ratings" value="ratings">
					<Ratings />
				</CustomAccordionItem>
				<CustomAccordionItem trigger="Price" value="price">
					<Price />
				</CustomAccordionItem>
				<CustomAccordionItem trigger="Category" value="categories">
					<div className="relative mt-2 space-y-3">
						{(showAllCategories ? categories : categories.slice(0, 3)).map(
							(cat, idx) => (
								<label key={idx} className="flex items-center space-x-2">
									<Checkbox
										id={cat}
										className="data-[state=checked]:bg-orange-400 data-[state=checked]:border-none hover:ring-1 data-[state=checked]:ring-2 data-[state=checked]:ring-orange-200 hover:ring-orange-200"
									/>
									<label
										htmlFor={cat}
										className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
										{cat}
									</label>
								</label>
							),
						)}

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
		</div>
	);
}

function CustomAccordionItem({
	trigger,
	value,
	children,
}: {
	trigger: string;
	value: string;
	children: React.ReactNode;
}) {
	return (
		<AccordionItem value={value} className="w-full ">
			<AccordionTrigger className="font-semibold no-underline flex text-lg">
				{trigger}
			</AccordionTrigger>
			<AccordionContent>{children}</AccordionContent>
		</AccordionItem>
	);
}

function Ratings() {
	const ratings = [4.5, 4.0, 3.5, 3.0];
	const getStarType = (rating: number, index: number) => {
		if (index + 1 <= Math.floor(rating)) return "full";
		if (rating - index >= 0.5) return "half";
		return "empty";
	};
	return (
		<RadioGroup>
			{ratings.map((r, index) => (
				<div
					key={index}
					className="flex items-center space-x-3 cursor-pointer mb-2">
					<RadioGroupItem value={r.toString()} id={`r${r}`} />

					<Label htmlFor={`r${r}`} className="flex items-center space-x-2">
						<div className="flex text-yellow-400">
							{Array.from({ length: 5 }).map((_, i2) => {
								const starType = getStarType(r, i2);
								if (starType === "full") return <FaStar key={i2} size={16} />;
								if (starType === "half")
									return <FaStarHalfAlt key={i2} size={16} fill="#FACC15" />;
								return <FaRegStar key={i2} size={16} fill="#FACC15" />;
							})}
						</div>
						<span className="font-light">{r.toFixed(1)} & up</span>
					</Label>
				</div>
			))}
		</RadioGroup>
	);
}

function Price() {
	const [priceRange, setPriceRange] = useState<number[]>([100, 1000]);
	return (
		<div className="mt-6">
			<div className="mb-4 flex items-center justify-around">
				<span className="font-bold text-green-800">Min</span>
				<Slider
					onValueChange={(value) => {
						setPriceRange(value);
					}}
					value={priceRange}
					min={100}
					defaultValue={[100, 1000]}
					max={1000}
					step={50}
					className=" text-orange-400 w-[80%] mx-2"
				/>
				<span className="font-bold text-orange-800">Max</span>
			</div>
			<div className="flex items-center space-x-5">
				<div className="flex items-center space-x-2">
					<label
						htmlFor="free"
						className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
						Free
					</label>
					<Checkbox
						id="free"
						className="data-[state=checked]:bg-green-600 data-[state=checked]:border-none hover:ring-1 data-[state=checked]:ring-2 data-[state=checked]:ring-green-200 hover:ring-green-200"
					/>
				</div>
				<div className="flex items-center space-x-2">
					<label
						htmlFor="paid"
						className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
						Paid
					</label>
					<Checkbox
						id="paid"
						className="data-[state=checked]:bg-orange-400 data-[state=checked]:border-none hover:ring-1 data-[state=checked]:ring-2 data-[state=checked]:ring-orange-200 hover:ring-orange-200"
					/>
				</div>
			</div>
		</div>
	);
}
