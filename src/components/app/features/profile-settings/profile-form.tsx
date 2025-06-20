"use client";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

import { useFieldArray, useForm } from "react-hook-form";
import { profileSchema, TProfileSchema } from "@/schema/profile-schema";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { TrashIcon } from "lucide-react";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import { updateUserProfile } from "@/actions/update-user-profile";
import { Label } from "@/components/ui/label";
import { getAvatarFallback } from "@/utils/app/get-avatar-fallback";

export function ProfileForm({
	userData: {
		profile_url,
		username,
		email,
		school,
		major,
		year,
		phone_number,
		social_links,
	},
}: {
	userData: TUserResult;
}) {
	const form = useForm<TProfileSchema>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			profile_url: null,
			username: username ?? "",
			email,
			school: school ?? "",
			major: major ?? "",
			year: Number(year) ?? "",
			phone_number: phone_number ?? "",
			social_links: (social_links as []) ?? [],
		},
	});

	const { fields, append, remove } = useFieldArray<TProfileSchema>({
		control: form.control,
		name: "social_links",
	});
	const [previewUrl, setPreviewUrl] = useState<string | null>(profile_url);
	const [isPending, startTransition] = useTransition();

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const objectUrl = URL.createObjectURL(file);
			setPreviewUrl(objectUrl);
		} else {
			setPreviewUrl(null);
		}
	};
	const handleSubmit = async (values: TProfileSchema) => {
		try {
			startTransition(async () => {
				const response = await updateUserProfile(values, profile_url);
				response.success
					? toast.success("Profile updated successfully")
					: toast.error(response.error.message);
			});
		} catch (err) {
			toast.error("Something went wrong", {
				description: "We couldn't complete your request. Please try again.",
			});
		}
	};
	return (
		<div>
			<Form {...form}>
				<form
					className="grid w-full items-center gap-y-8"
					onSubmit={form.handleSubmit(handleSubmit)}>
					<div className="grid w-full items-center gap-y-2 ">
						<Label className="text-xs md:text-sm ">Profile Picture</Label>
						<div className="w-40 h-40 rounded-full border-dashed border-1 border-gray-400 overflow-hidden flex items-center justify-center bg-gray-50 relative">
							{previewUrl ? (
								<Image
									src={previewUrl}
									alt="Profile Preview"
									width={40}
									height={40}
									priority
									className="object-cover w-full h-full rounded-full"
								/>
							) : (
								<span className="object-cover w-full h-full rounded-full text-6xl text-center font-light tracking-wider flex items-center justify-center">
									{getAvatarFallback(username ?? "")}
								</span>
							)}
						</div>

						<FormField
							control={form.control}
							name="profile_url"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											id="picture"
											type="file"
											className="text-[0.6rem] md:text-sm w-full"
											onChange={(e) => {
												handleImageChange(e);
												field.onChange(e.target.files?.[0] || null);
											}}
											disabled={false}
										/>
									</FormControl>
									<FormMessage className="md:text-[0.75rem] text-[0.55rem]" />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem className="grid w-full items-center gap-y-2">
								<FormLabel className="text-xs md:text-sm">Username</FormLabel>
								<Input
									{...field}
									placeholder="Enter your username"
									value={field.value?.toString() || ""}
									className="text-[0.6rem] md:text-sm"
									disabled={false}
								/>
								<span className="font-extralight text-gray-500 md:text-[0.75rem] text-[0.55rem]">
									This is your public display name. It can be your real name or
									a pseudonym.{" "}
								</span>
								<FormMessage className="md:text-[0.75rem] text-[0.55rem]" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem className="grid w-full items-center gap-y-2">
								<FormLabel className="text-xs md:text-sm">Email</FormLabel>
								<FormControl>
									<Input
										{...field}
										disabled
										value={field.value?.toString() || ""}
										className="disabled:border-gray-400 text-[0.6rem] md:text-sm"
									/>
								</FormControl>

								<span className="font-extralight text-gray-500  md:text-[0.8rem] text-[0.65rem]">
									You cannot change your email in current release yet
								</span>
								<FormMessage className="md:text-[0.75rem] text-[0.55rem]" />
							</FormItem>
						)}
					/>
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
								<FormLabel className="text-xs md:text-sm">
									Phone Number
								</FormLabel>
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
					<div className="grid w-full items-center gap-y-2">
						<FormLabel htmlFor="url" className="text-xs md:text-sm">
							Social URLs
						</FormLabel>
						<span className="font-extralight text-gray-500 md:text-[0.75rem] text-[0.55rem] ">
							Add links to your website, blog, or social media profiles.
						</span>
						{fields.map((field, index) => (
							<FormField
								key={field.id}
								control={form.control}
								name={`social_links.${index}.value`}
								render={({ field }) => (
									<FormItem className="flex flex-col gap-1 mb-2">
										<div className="flex items-center space-x-1 ">
											<FormControl>
												<Input
													{...field}
													placeholder={`https://example.com`}
													className="text-[0.6rem] md:text-sm"
												/>
											</FormControl>
											<Button
												variant="ghost"
												size="icon"
												type="button"
												className="hover:bg-red-100 cursor-pointer"
												onClick={() => remove(index)}>
												<TrashIcon color="red" />
											</Button>
										</div>
										<FormMessage className="md:text-[0.75rem] text-[0.55rem]" />
									</FormItem>
								)}
							/>
						))}
						<Button
							type="button"
							onClick={() => append({ value: "" })}
							variant="outline"
							size="sm"
							className="mt-2 w-fit text-[0.5rem] md:text-[0.75rem] ">
							+ Add Link
						</Button>
					</div>
					<Button
						disabled={isPending}
						size="lg"
						type="submit"
						className="md:w-[8.5rem] w-[6.5rem] md:text-[0.9rem] text-[0.7rem] cursor-pointer hover:ring-2 hover:ring-orange-300">
						{isPending ? (
							<div className="flex items-center gap-1">
								<span>Loading</span>
								<div className="flex items-center gap-0.5">
									<div className="h-1 w-1 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
									<div className="h-1 w-1 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
									<div className="h-1 w-1 bg-white rounded-full animate-bounce"></div>
								</div>
							</div>
						) : (
							"Save Profile"
						)}
					</Button>
				</form>
			</Form>
		</div>
	);
}
