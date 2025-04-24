"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

export default function ProfilePage() {
	const [links, setLinks] = useState([""]);

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
