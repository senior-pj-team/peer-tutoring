import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FaStarHalfAlt, FaRegStar, FaStar } from "react-icons/fa";

export function RatingFilter({
	rating,
	setRating,
}: {
	rating: number | null;
	setRating: (rating: number) => void;
}) {
	const ratings = [4.5, 4.0, 3.5, 3.0];
	const getStarType = (rating: number, index: number) => {
		if (index + 1 <= Math.floor(rating)) return "full";
		if (rating - index >= 0.5) return "half";
		return "empty";
	};
	return (
		<RadioGroup onValueChange={(value) => setRating(parseFloat(value))}>
			{ratings.map((r, index) => (
				<div
					key={index}
					className="flex items-center space-x-3 cursor-pointer mb-2">
					<RadioGroupItem
						value={r.toString()}
						id={`r${r}`}
						checked={rating === r}
					/>

					<Label htmlFor={`r${r}`} className="flex items-center space-x-2">
						<div className="flex text-orange-400">
							{Array.from({ length: 5 }).map((_, i2) => {
								const starType = getStarType(r, i2);
								if (starType === "full") return <FaStar key={i2} size={16} />;
								if (starType === "half")
									return <FaStarHalfAlt key={i2} size={16} />;
								return <FaRegStar key={i2} size={16} />;
							})}
						</div>
						<span className="font-light">{r.toFixed(1)} & up</span>
					</Label>
				</div>
			))}
		</RadioGroup>
	);
}
