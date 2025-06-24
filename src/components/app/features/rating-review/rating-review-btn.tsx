"use client";
import React, { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import RatingReviewForm from "./rating-review-form";
import { Button } from "@/components/ui/button";

const RatingReviewBtn = ({ ssId }: { ssId: number | null }) => {
	const [open, setOpen] = useState(false);
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					className="hover:text-white border border-orange-600 hover:bg-orange-500 text-orange-600 px-4 py-2 text-sm cursor-pointer w-full"
					variant="outline">
					Give Rating and review
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Submit your review</DialogTitle>
					<DialogDescription>
						Tap on the stars and share your thoughts below.
					</DialogDescription>
					<RatingReviewForm ssId={ssId} setOpen={setOpen} />
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default RatingReviewBtn;
