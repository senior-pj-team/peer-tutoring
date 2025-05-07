"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export default function ProfilePage() {
	const [links, setLinks] = useState([""]);
	const [open, setOpen] = useState(false);
	const [position, setPosition] = useState("Select your year");

	const years = ["First Year", "Second Year", "Third Year", "Fourth Year"];

	const handleChange = (index: number, value: string) => {
		const newLinks = [...links];
		newLinks[index] = value;
		setLinks(newLinks);
	};

	const handleAddLink = () => {
		setLinks([...links, ""]);
	};
	return (
		<div className="xl:p-2 xl:w-[75%]">
			<div className="flex flex-col space-y-1.5">
				<span className="font-semibold md:text-[1.15rem] text-[0.85rem]">
					Profile page
				</span>
				<span className="font-extralight text-gray-500 md:text-[0.8rem] text-[0.55rem]">
					This is profile setting. You can edit here
				</span>
			</div>
			<Separator className="my-5 font-extrabold" />
			<div className="grid w-full items-center gap-y-8">
				<div className="grid w-full items-center gap-y-2">
					<Label htmlFor="username" className="text-xs md:text-sm">
						Username
					</Label>
					<Input
						type="text"
						id="username"
						placeholder="Orion"
						className="text-[0.6rem] md:text-sm"
					/>
					<span className="font-extralight text-gray-500 md:text-[0.75rem] text-[0.55rem]">
						This is your public display name. It can be your real name or a
						pseudonym.{" "}
					</span>
				</div>
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
					<Label htmlFor="school" className="text-xs md:text-sm">
						School
					</Label>
					<Input
						type="text"
						id="school"
						placeholder="Applied Digital Technology"
						className="text-[0.6rem] md:text-sm"
					/>
				</div>
				<div className="grid w-full items-center gap-y-2">
					<Label htmlFor="major" className="text-xs md:text-sm">
						Major
					</Label>
					<Input
						type="text"
						id="major"
						placeholder="Computer Engineering"
						className="text-[0.6rem] md:text-sm"
					/>
				</div>
				<div className="grid w-full items-center gap-y-2">
					<Label htmlFor="year" className="text-xs md:text-sm">
						Year
					</Label>
					<DropdownMenu onOpenChange={setOpen}>
						<DropdownMenuTrigger asChild className="w-full">
							<Button variant="outline" className="w-full">
								<div className="flex justify-between w-full">
									<div>{position}</div>
									<div>
										{" "}
										<ChevronDown
											size={10}
											className={`transition-transform duration-200 ${
												open ? "rotate-180" : "rotate-0"
											}`}
										/>{" "}
									</div>
								</div>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="xl:w-[50rem] lg:w-[45rem] md:w-[40rem] w-[20rem]">
							<DropdownMenuLabel className="text-xs w-full">
								Choose year
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuRadioGroup
								value={position}
								onValueChange={setPosition}
								className="text-xs w-full">
								{years.map((year, index) => (
									<DropdownMenuRadioItem key={index} value={year}>
										{year}
									</DropdownMenuRadioItem>
								))}
							</DropdownMenuRadioGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
				<div className="grid w-full items-center gap-y-2">
					<Label htmlFor="phone-number" className="text-xs md:text-sm">
						Phone Number
					</Label>
					<Input
						type="text"
						id="phone-number"
						placeholder="+65 1234 5678"
						className="text-[0.6rem] md:text-sm"
					/>
				</div>
				<div className="grid w-full items-center gap-y-2">
					<Label htmlFor="url" className="text-xs md:text-sm">
						Social URLs
					</Label>
					<span className="font-extralight text-gray-500 md:text-[0.75rem] text-[0.55rem] ">
						Add links to your website, blog, or social media profiles.
					</span>
					<div className="space-y-2">
						{links.map((link, index) => (
							<Input
								key={index}
								type="url"
								id={`url-${index}`}
								value={link}
								onChange={(e) => handleChange(index, e.target.value)}
								placeholder={`http://example.com/orion`}
								className="text-[0.6rem] md:text-sm"
							/>
						))}
					</div>

					<Button
						variant="outline"
						size="sm"
						onClick={handleAddLink}
						className="mt-2 w-fit text-[0.5rem] md:text-[0.75rem] ">
						+ Add Link
					</Button>
				</div>

				<Button
					size="lg"
					className="md:w-[9rem] w-[6.5rem] md:text-[1rem] text-[0.7rem] cursor-pointer">
					Update Profile
				</Button>
			</div>
		</div>
	);
}
