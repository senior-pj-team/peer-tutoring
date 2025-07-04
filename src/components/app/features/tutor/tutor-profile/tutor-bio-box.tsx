"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BookText, Pencil } from "lucide-react";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";

const TutorBioBox = () => {
	const { control } = useFormContext();
	const [disable, setDisable] = useState(true);

	return (
		<Card className="mt-8">
			<CardHeader className="flex items-center justify-between">
				<h2 className="text-lg font-semibold flex items-center">
					<BookText className="w-5 h-5 mr-2 text-muted-foreground" />
					Bio
				</h2>
				<Button
					variant="ghost"
					size="icon"
					onClick={(e) => {
						e.preventDefault();
						setDisable((prev) => !prev);
					}}
					className="hover:bg-orange-200 cursor-pointer">
					<Pencil className="w-4 h-4" />
				</Button>
			</CardHeader>
			<CardContent>
				<FormField
					control={control}
					name="biography"
					render={({ field }) => (
						<FormItem className="grid w-full items-center gap-y-2">
							<FormLabel className="text-xs md:text-sm">Biography</FormLabel>
							<FormControl>
								<Textarea
									{...field}
									placeholder="Tell students more about your experience and teaching style"
									value={field.value?.toString() || ""}
									className="text-[0.6rem] md:text-sm min-h-28"
									disabled={disable}
								/>
							</FormControl>

							<FormMessage className="md:text-[0.75rem] text-[0.55rem]" />
						</FormItem>
					)}
				/>
			</CardContent>
		</Card>
	);
};

export default TutorBioBox;
