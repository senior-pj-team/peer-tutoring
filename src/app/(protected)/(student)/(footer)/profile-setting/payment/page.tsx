import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function PaymentPage() {
	return (
		<div className="xl:p-2 xl:w-[75%]">
			<div className="flex flex-col space-y-1.5">
				<span className="font-semibold md:text-[1.15rem] text-[0.85rem]">
					Payment Setup
				</span>
				<span className="font-extralight text-gray-500 md:text-[0.8rem] text-[0.55rem]">
					Configure your preferred payment method.
				</span>
			</div>
			<Separator className="my-5" />
			<div className="grid w-full items-center gap-y-8">
				<div className="grid w-full items-center gap-y-2">
					<Label htmlFor="bank-name" className="text-xs md:text-sm">
						Bank Name
					</Label>
					<Input
						type="text"
						id="bank-name"
						placeholder="Enter Bangkok Bank"
						className="text-[0.6rem] md:text-sm"
					/>
				</div>
				<div className="grid w-full items-center gap-y-2">
					<Label htmlFor="bank-account-name" className="text-xs md:text-sm">
						Bank Account Name
					</Label>
					<Input
						type="text"
						id="bank-account-name"
						placeholder="Enter Bank Account Name"
						className="text-[0.6rem] md:text-sm"
					/>
				</div>

				<div className="grid w-full items-center gap-y-2">
					<Label htmlFor="bank-number" className="text-xs md:text-sm">
						Bank Number
					</Label>
					<Input
						type="text"
						id="bank-number"
						placeholder="Enter Bank Account Number"
						className="text-[0.6rem] md:text-sm"
					/>
				</div>
				<Button
					size="lg"
					className="md:w-[10rem] w-[7.5rem] cursor-pointer md:text-[1rem] text-[0.7rem]">
					Update Payment
				</Button>
			</div>
		</div>
	);
}
