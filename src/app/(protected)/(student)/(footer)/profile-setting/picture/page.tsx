"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useState } from "react";

export default function Page() {
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const objectUrl = URL.createObjectURL(file);
			setPreviewUrl(objectUrl);
		}
	};
	return (
		<div className="xl:p-2 xl:w-[75%] ">
			<div className="flex flex-col space-y-1.5">
				<span className="font-semibold md:text-[1.15rem] text-[0.85rem]">
					Photo
				</span>
				<span className="font-extralight text-gray-500 md:text-[0.8rem] text-[0.55rem]">
					Add a nice photo of yourself for your profile.
				</span>
			</div>
			<Separator className="my-5 font-extrabold" />

			<div className="grid w-full items-center gap-y-8">
				<div>
					<Label className="mb-1 block  text-gray-700 text-xs md:text-sm ">
						Image Preview
					</Label>
					<div className="lg:w-[75%] h-60 border border-dashed border-gray-400 rounded-md overflow-hidden flex items-center justify-center bg-gray-50">
						{previewUrl ? (
							<Image
								src={previewUrl}
								alt="Profile Preview"
								width={160}
								height={160}
								className="object-cover w-full h-full"
							/>
						) : (
							<span className="text-sm text-gray-400">No image selected</span>
						)}
					</div>
				</div>
				<div className="grid w-full items-center gap-2">
					<Label htmlFor="picture" className="text-xs md:text-sm">
						Picture
					</Label>
					<Input
						id="picture"
						type="file"
						className="text-[0.6rem] md:text-sm lg:w-[75%]"
						onChange={handleImageChange}
					/>
				</div>
				<Button
					size="lg"
					className="md:w-[9rem] w-[6.5rem] md:text-[1rem] text-[0.7rem] cursor-pointer">
					Update Picture
				</Button>
			</div>
		</div>
	);
}
