"use client";

import { sessionSchema, SessionSchemaT } from "@/schema/sessionSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Pencil } from "lucide-react";

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
import TipTap from "../tip-tap";
import { Button } from "@/components/ui/button";
import DatePicker from "../date-picker";
import { addDays, set } from "date-fns";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { createSession, editSession } from "@/actions/sessionActions";

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
	imageString?: string;
	isEdit?: boolean;
	sessionName?: string;
	location?: string;
	category?: string;
	sessionId?: number;
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
	imageString = "",
	sessionName = "",
	location = "",
	category = "",
	isEdit = false,
	sessionId = 0,
}: SessionFormProps) {
	let image: File | null = null;
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
			sessionName,
			location,
			category,
			image,
		},
	});

	const isPaid = form.watch("paid");
	const [previewUrl, setPreviewUrl] = useState<string | null>(imageString);
	const [isDisable, setDisable] = useState(isEdit);
	const [isDialogOpen, setisDialogOpen] = useState(false);
	const [formValues, setFormValues] = useState<SessionSchemaT>();

	const handleDisableToggle = () => setDisable((prev) => !prev);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const objectUrl = URL.createObjectURL(file);
			setPreviewUrl(objectUrl);
		}
	};

	const handleSubmit = (values: SessionSchemaT) => {
		setFormValues(values);
		setisDialogOpen(true);
	};

	const handleConfirm = async () => {
		if (!formValues) return;
		try {
			let response;

			if (isEdit) {
				response = await editSession(sessionId, formValues, imageString);
			} else {
				console.log("Calling createSession");
				response = await createSession(formValues);
			}

			const actionType = isEdit ? "updated" : "created";

			response.success
				? toast.success(`Session ${actionType} successfully`, {
						description: (
							<div className="text-muted-foreground text-sm">
								{`Session was ${actionType}. Session will start on ${formValues.date}`}
							</div>
						),
						// action: {
						// 	label: "Undo",
						// 	onClick: () => {
						// 		console.log("Undo action clicked");
						// 	},
						// },
				  })
				: toast.error("Something went wrong", {
						description: `We couldn't complete your request. ${response.error.message}`,
				  });
			setisDialogOpen(false);
		} catch (error) {
			console.error(error);
			toast.error("Something went wrong", {
				description: "We couldn't complete your request. Please try again.",
			});
		}
	};
	return (
		<div className="px-4 lg:px-6">
			{isEdit && (
				<div className="text-end">
					<Button
						variant="ghost"
						size="icon"
						onClick={handleDisableToggle}
						className={clsx(
							"hover:bg-orange-200 cursor-pointer",
							isDisable ? "bg-white" : "bg-orange-200",
						)}>
						<Pencil className="w-5 h-5" />
					</Button>
				</div>
			)}
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleSubmit)}
					className="flex flex-col gap-y-8">
					<div className="flex flex-col gap-y-6">
						<div className="font-bold xl:text-xl text-lg ">
							Course Information{" "}
							<span className="text-gray-400 font-bold text-sm">
								(optional information. required only for university courses)
							</span>
						</div>
						<div className="grid lg:grid-cols-2 gap-x-10 gap-y-5 mb-5">
							{[
								{
									name: "courseName",
									label: "Course Name",
									placeholder: "Enter course name",
								},
								{
									name: "school",
									label: "School",
									placeholder: "Enter school name",
								},
								{
									name: "major",
									label: "Major",
									placeholder: "Enter major",
								},
								{
									name: "courseCode",
									label: "Course Code",
									placeholder: "E.g. CS101",
								},
							].map(({ name, label, placeholder }) => (
								<FormField
									key={name}
									control={form.control}
									name={name as keyof SessionSchemaT}
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-[1rem]">{label}</FormLabel>
											<FormControl>
												<Input
													placeholder={placeholder}
													{...field}
													value={field.value?.toString() || ""}
													className="bg-slate-50"
													disabled={isDisable}
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
									<Label className="mb-1 block text-[1rem]">Image</Label>
									<div className="lg:w-[30%] h-60 border border-dashed border-gray-400 rounded-md overflow-hidden flex items-center justify-center bg-gray-50 relative">
										{previewUrl ? (
											<Image
												src={previewUrl}
												alt="Profile Preview"
												width={120}
												height={120}
												priority
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
												<FormLabel></FormLabel>
												<FormControl>
													<Input
														id="picture"
														type="file"
														className="text-[0.6rem] md:text-sm lg:w-[30%]"
														onChange={(e) => {
															handleImageChange(e);
															field.onChange(e.target.files?.[0] || null);
														}}
														disabled={isDisable}
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
							name="sessionName"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-[1rem]">Session Name</FormLabel>
									<FormControl>
										<Input
											placeholder="Enter session name"
											{...field}
											className="bg-slate-50"
											disabled={isDisable}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="category"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-[1rem]">
										Session Category
									</FormLabel>
									<FormControl>
										<Select
											{...field}
											disabled={isDisable}
											defaultValue={field.value}
											value={field.value.toString() || ""}
											onValueChange={field.onChange}>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select a session category" />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectLabel>Categories</SelectLabel>
													<SelectItem value="2">Technology</SelectItem>
													<SelectItem value="3">Libral Arts</SelectItem>
													<SelectItem value="4">Business</SelectItem>
													<SelectItem value="5">Engineering</SelectItem>
													<SelectItem value="7">Health Science</SelectItem>
													<SelectItem value="6">Elective Courses</SelectItem>
												</SelectGroup>
											</SelectContent>
											{}
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
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
											disabled={isDisable}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>{" "}
						<Controller
							name="requirements"
							control={form.control}
							render={({ field, fieldState }) => (
								<TipTap
									value={field.value}
									onChange={field.onChange}
									fieldState={fieldState}
									disable={isDisable}
								/>
							)}
						/>
						<FormField
							control={form.control}
							name="date"
							render={({ field }) => (
								<div className="grid items-start md:grid-cols-3 w-full gap-y-6 gap-x-10">
									<DatePicker field={field} disable={isDisable} />
									<FormField
										control={form.control}
										name="startTime"
										render={({ field }) => (
											<div className="min-h-[4.5rem] ">
												<FormItem className="">
													<FormLabel className="text-[1rem]">
														Start Time
													</FormLabel>
													<FormControl>
														<Input
															type="time"
															step={60}
															className="w-[8rem] "
															{...field}
															disabled={isDisable}
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
															className="w-[8rem]"
															{...field}
															disabled={isDisable}
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
											disabled={isDisable}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="location"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-[1rem]">Location</FormLabel>
									<FormControl>
										<Input type="string" {...field} disabled={isDisable} />
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
											disabled={isDisable || !isPaid}
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
						{isEdit ? <span>Save Changes</span> : <span>Submit</span>}
					</Button>
				</form>
			</Form>
			<Dialog open={isDialogOpen} onOpenChange={setisDialogOpen}>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle className="text-xl font-semibold text-gray-800">
							{isEdit ? "Save Changes?" : "Create New Session?"}
						</DialogTitle>
						<DialogDescription className="text-gray-600 mt-2">
							{isEdit
								? "You are about to save changes to this session. Please confirm to proceed."
								: "You are about to create a new session. Are you sure everything is correct?"}
						</DialogDescription>
					</DialogHeader>

					<div className="mt-6 flex justify-end gap-4">
						<Button
							variant="outline"
							onClick={() => setisDialogOpen(false)}
							className="w-24">
							Cancel
						</Button>
						<Button
							type="button"
							onClick={handleConfirm}
							className="w-24 bg-orange-500 hover:bg-orange-600 text-white">
							{isEdit ? "Save" : "Create"}
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}
