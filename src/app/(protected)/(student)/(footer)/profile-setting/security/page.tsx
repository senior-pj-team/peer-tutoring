import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function SecurityPage() {
	return (
		<div className="xl:p-2 xl:w-[75%]">
			<div className="flex flex-col space-y-1.5">
				<span className="font-semibold  md:text-[1.15rem] text-[0.85rem]">
					Account Security
				</span>
				<span className="font-extralight text-gray-500 md:text-[0.8rem] text-[0.55rem]">
					You can change your password here
				</span>
			</div>
			<Separator className="my-5 font-extrabold" />
			<div className="grid w-full items-center gap-y-8">
				<div className="grid w-full items-center gap-y-2">
					<Label htmlFor="email" className="text-xs md:text-sm">
						Email
					</Label>
					<Input
						type="email"
						id="email"
						placeholder="Orion@example.com"
						className="disabled:border-gray-400 text-[0.6rem] md:text-sm"
						disabled
					/>
					<span className="font-extralight text-gray-500  md:text-[0.8rem] text-[0.65rem]">
						You cannot change your email in current release yet
					</span>
				</div>
				<div className="grid w-full items-center gap-y-2">
					<Label htmlFor="password" className="text-xs md:text-sm">
						Password
					</Label>
					<Input
						type="password"
						id="password"
						placeholder="Enter new password"
						className="text-[0.6rem] md:text-sm"
					/>
				</div>
				<div className="grid w-full items-center gap-y-2">
					<Label htmlFor="confirm-password" className="text-xs md:text-sm">
						Confirm Password
					</Label>
					<Input
						type="password"
						id="confirm-password"
						placeholder="Re-enter new password"
						className="text-[0.6rem] md:text-sm"
					/>
				</div>
				<Button
					size="lg"
					className="md:w-[10rem] w-[7.5rem] cursor-pointer md:text-[1rem] text-[0.7rem]">
					Update Password
				</Button>
			</div>
		</div>
	);
}
