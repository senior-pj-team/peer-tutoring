"use client";

import React, { useMemo, useRef, useState } from "react";
import Webcam from "react-webcam";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { PhoneInput } from "@/components/ui/phone-input";

export default function Step1() {
	const webcamRef = useRef<Webcam>(null);
	const [capturedImage, setCapturedImage] = useState<string | null>(null);
	const form = useFormContext();

	const handleCapture = () => {
		if (webcamRef.current) {
			const imageSrc = webcamRef.current.getScreenshot();
			setCapturedImage(imageSrc);
		}
	};

	const handleRetake = () => {
		setCapturedImage(null);
		form.resetField("studentIdPhoto");
	};

	const handleConfirm = () => {
		if (capturedImage) {
			form.setValue("studentIdPhoto", capturedImage, { shouldValidate: true });
		}
	};

	const fields = useMemo(
		() => [
			{
				name: "school",
				label: "School",
				placeholder: "Enter your faculty",
			},
			{
				name: "major",
				label: "Major",
				placeholder: "Enter your major",
			},
			{
				name: "year",
				label: "Year",
				placeholder: "Enter your year",
			},
			{
				name: "phone_number",
				label: "Phone number",
				placeholder: "Enter your phone number",
			},
		],
		[],
	);

	return (
		<div className="flex flex-col gap-6">
			<div className="grid gap-4">
				<FormField
					control={form.control}
					name="school"
					render={({ field }) => (
						<FormItem className="grid w-full items-center gap-y-2">
							<FormLabel className="text-xs md:text-sm">School</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder="Enter your school"
									value={field.value?.toString() || ""}
									className="text-[0.6rem] md:text-sm"
									disabled={false}
								/>
							</FormControl>
							<FormMessage className="md:text-[0.75rem] text-[0.55rem]" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="major"
					render={({ field }) => (
						<FormItem className="grid w-full items-center gap-y-2">
							<FormLabel className="text-xs md:text-sm">Major</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder="Enter your major"
									value={field.value?.toString() || ""}
									className="text-[0.6rem] md:text-sm"
									disabled={false}
								/>
							</FormControl>
							<FormMessage className="md:text-[0.75rem] text-[0.55rem]" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="year"
					render={({ field }) => (
						<FormItem className="grid w-full items-center gap-y-2">
							<FormLabel className="text-xs md:text-sm">Year</FormLabel>
							<FormControl>
								<Select
									{...field}
									disabled={false}
									value={field.value ? field.value?.toString() : undefined}
									onValueChange={(val) => field.onChange(Number(val))}>
									<SelectTrigger className="text-[0.6rem] md:text-sm w-[95%]">
										<SelectValue placeholder="Select year" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>Year</SelectLabel>
											<SelectItem value="1">1</SelectItem>
											<SelectItem value="2">2</SelectItem>
											<SelectItem value="3">3</SelectItem>
											<SelectItem value="4">4</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage className="md:text-[0.75rem] text-[0.55rem]" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="phone_number"
					render={({ field }) => (
						<FormItem className="grid w-full items-center gap-y-2">
							<FormLabel className="text-xs md:text-sm">Phone Number</FormLabel>
							<FormControl className="w-full text-[0.6rem] md:text-sm">
								<PhoneInput
									defaultCountry="TH"
									{...field}
									placeholder="Enter phone number"
									value={field.value?.toString() || ""}
									disabled={false}
								/>
							</FormControl>
							<FormMessage className="md:text-[0.75rem] text-[0.55rem]" />
						</FormItem>
					)}
				/>
			</div>

			<div className="mt-1">
				<p className="text-sm mb-2 font-medium">
					Take a photo holding your Student ID clearly.
				</p>

				<div>
					<FormField
						name="studentIdPhoto"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									{capturedImage || form.getValues("studentIdPhoto") ? (
										<div>
											<Image
												src={capturedImage ?? form.getValues("studentIdPhoto")}
												alt="Captured"
												width={300}
												height={300}
												className="rounded-md object-cover"
											/>
											<div className="flex gap-2 mt-3">
												<Button variant="outline" onClick={handleRetake}>
													Retake
												</Button>
												<Button onClick={handleConfirm} disabled={field.value}>
													{field.value ? "Photo Saved ✅" : "Use Photo"}
												</Button>
											</div>
										</div>
									) : (
										<div>
											<Webcam
												audio={false}
												ref={webcamRef}
												screenshotFormat="image/jpeg"
												width={300}
												height={300}
												videoConstraints={{
													width: 300,
													height: 300,
													facingMode: "user",
												}}
												className="rounded-md"
											/>
											<Button onClick={handleCapture} className="mt-2">
												Capture Photo
											</Button>
										</div>
									)}
								</FormControl>
								<FormMessage className="text-sm text-red-600" />
							</FormItem>
						)}
					/>
				</div>
			</div>
		</div>
	);
}
