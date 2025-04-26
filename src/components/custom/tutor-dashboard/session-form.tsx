"use client";

import { sessionSchema, SessionSchemaT } from "@/schema/sessionSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import TipTap from "@/components/custom/tip-tap";
import { Button } from "@/components/ui/button";
import DatePicker from "@/components/custom/date-picker";
import { addDays } from "date-fns";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState } from "react";

type SessionFormProps = {
	school?: string;
	major?: string;
	courseCode?: string;
	courseName?: string;
	description?: string;
	requirements?: string;
	date?: Date;
	startTime?: string;
	endTime?: string;
	maxStudents?: number;
	paid?: boolean;
	amount?: number;
};
export default function SessionForm({
	school = "",
	major = "",
	courseCode = "",
	courseName = "",
	description = "",
	requirements = "",
	date = addDays(new Date(), 2),
	startTime = "",
	endTime = "",
	maxStudents = 1,
	paid = true,
	amount = 0,
}: SessionFormProps) {
	const form = useForm<SessionSchemaT>({
		resolver: zodResolver(sessionSchema),
		defaultValues: {
			school,
			major,
			courseCode,
			courseName,
			description,
			requirements,
			date,
			startTime,
			endTime,
			maxStudents,
			paid,
			amount,
		},
	});

	const isPaid = form.watch("paid");
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const objectUrl = URL.createObjectURL(file);
			setPreviewUrl(objectUrl);
		}
	};

	function onSubmit(values: SessionSchemaT) {
		console.log(values);
	}
	return (
		<div className="px-4 lg:px-6">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-y-8">
					<div className="flex flex-col gap-y-6">
						<div className="font-bold xl:text-xl text-lg ">
							Course Information
						</div>
						<div className="grid lg:grid-cols-2 gap-x-10 gap-y-5 mb-5">
							{[
								{
									name: "school",
									label: "School",
									placeholder: "Enter school name",
								},
								{ name: "major", label: "Major", placeholder: "Enter major" },
								{
									name: "courseCode",
									label: "Course Code",
									placeholder: "E.g. CS101",
								},
								{
									name: "courseName",
									label: "Course Name",
									placeholder: "Enter course name",
								},
							].map(({ name, label, placeholder }) => (
								<FormField
									key={name}
									control={form.control}
									name={name as any}
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-[1rem]">{label}</FormLabel>
											<FormControl>
												<Input
													placeholder={placeholder}
													{...field}
													className="bg-slate-50"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							))}
						</div>
					</div>
					<div className="flex flex-col gap-y-6">
						<div className="font-bold xl:text-xl text-lg ">
							Session Information
						</div>
						<div>
							<div className="grid w-full items-center gap-y-8">
								<div>
									<Label className="mb-1 block text-[1rem] ">Image</Label>
									<div className="lg:w-[30%] h-60 border border-dashed border-gray-400 rounded-md overflow-hidden flex items-center justify-center bg-gray-50">
										{previewUrl ? (
											<Image
												src={previewUrl}
												alt="Profile Preview"
												width={120}
												height={120}
												className="object-cover w-full h-full"
											/>
										) : (
											<span className="text-sm text-gray-400">
												No image selected
											</span>
										)}
									</div>
									<FormField
										control={form.control}
										name="image"
										render={({ field }) => (
											<FormItem>
												<FormLabel className=""></FormLabel>
												<FormControl>
													<Input
														id="picture"
														type="file"
														className="text-[0.6rem] md:text-sm lg:w-[30%]"
														onChange={handleImageChange}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>
						</div>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-[1rem]">Description</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Course description"
											{...field}
											className="h-[8rem] w-full whitespace-normal overflow-y-auto bg-slate-50"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>{" "}
						<Controller
							name="requirements"
							control={form.control}
							render={({ fieldState }) => (
								<TipTap setValue={form.setValue} fieldState={fieldState} />
							)}
						/>
						<FormField
							control={form.control}
							name="date"
							render={({ field }) => (
								<div className="grid items-start md:grid-cols-3 w-full gap-y-6 gap-x-10">
									<DatePicker field={field} />
									<FormField
										control={form.control}
										name="startTime"
										render={({ field }) => (
											<div className="min-h-[4.5rem] ">
												<FormItem className="md:w-[8rem] ">
													<FormLabel className="text-[1rem]">
														Start Time
													</FormLabel>
													<FormControl>
														<Input
															type="time"
															step={60}
															className="w-[10rem] "
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											</div>
										)}
									/>

									{/* End time */}
									<FormField
										control={form.control}
										name="endTime"
										render={({ field }) => (
											<div className="min-h-[4.5rem]">
												<FormItem className="w-full ">
													<FormLabel className="text-[1rem]">
														End Time
													</FormLabel>
													<FormControl>
														<Input
															type="time"
															step={60}
															className="w-[10rem] "
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											</div>
										)}
									/>
								</div>
							)}
						/>
						<FormField
							control={form.control}
							name="maxStudents"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-[1rem]">
										Maximum Students allowed
									</FormLabel>
									<FormControl>
										<Input
											type="number"
											min={1}
											{...field}
											className="w-[10%]"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* Paid toggle and amount */}
						<FormField
							control={form.control}
							name="amount"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-[1rem]">Price</FormLabel>
									<FormControl>
										<Input
											type="number"
											step="0.01"
											min={1}
											disabled={!isPaid}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="paid"
							render={({ field }) => (
								<FormItem className="flex items-center gap-3 mb-3">
									<FormLabel>Free</FormLabel>
									<FormControl>
										<Switch
											className="w-[2rem]"
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<FormLabel>Paid</FormLabel>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<Button type="submit" size="lg" className="md:w-[30%] mx-auto">
						Submit
					</Button>
				</form>
			</Form>
		</div>
	);
}
