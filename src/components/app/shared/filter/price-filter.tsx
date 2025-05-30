import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

export function PriceFilter({
	setPriceRange,
	priceRange,
	handlePriceTypeChange,
	priceType,
}: {
	setPriceRange: (priceRange: number[]) => void;
	priceRange: number[];
	handlePriceTypeChange: (field: "free" | "paid", checked: boolean) => void;
	priceType: { free: boolean; paid: boolean } | null;
}) {
	let onlyFree: boolean = false;
	if (priceType) onlyFree = priceType.free && !priceType.paid;
	console.log(priceType);
	return (
		<div className="mt-6">
			<div className="mb-4 flex items-center justify-around">
				<span className="font-bold text-green-600">Min</span>
				<Slider
					onValueChange={(value) => {
						setPriceRange(value);
					}}
					disabled={onlyFree}
					value={priceRange.length <= 0 ? [0, 1000] : priceRange}
					min={0}
					defaultValue={[0, 1000]}
					max={1000}
					step={50}
					className="text-orange-400 w-[80%] mx-2"
				/>
				<span className="font-bold text-red-600">Max</span>
			</div>
			<div className="flex items-center space-x-5">
				<div className="flex items-center space-x-2">
					<label
						htmlFor="free"
						className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
						Free
					</label>
					<Checkbox
						checked={priceType ? priceType.free : true}
						onCheckedChange={(checked) => {
							const isChecked = checked === true;
							handlePriceTypeChange("free", isChecked);
						}}
						id="free"
						className="data-[state=checked]:bg-orange-400 data-[state=checked]:border-none hover:ring-1 data-[state=checked]:ring-2 data-[state=checked]:ring-orange-200 hover:ring-orange-200"
					/>
				</div>
				<div className="flex items-center space-x-2">
					<label
						htmlFor="paid"
						className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
						Paid
					</label>
					<Checkbox
						checked={priceType ? priceType.paid : true}
						onCheckedChange={(checked) => {
							const isChecked = checked === true;
							handlePriceTypeChange("paid", isChecked);
						}}
						id="paid"
						className="data-[state=checked]:bg-orange-400 data-[state=checked]:border-none hover:ring-1 data-[state=checked]:ring-2 data-[state=checked]:ring-orange-200 hover:ring-orange-200"
					/>
				</div>
			</div>
		</div>
	);
}
