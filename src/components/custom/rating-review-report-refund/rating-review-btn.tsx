'use client'
import React,{useState} from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import RatingReviewForm from './rating-review-form'

const RatingReviewBtn = () => {
  const [open, setOpen]= useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <button className="border border-orange-600 hover:bg-orange-200 text-orange-600 px-4 py-2 text-sm cursor-pointer w-full">
                        Rating and review
                    </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Submit your review</DialogTitle>
                        <DialogDescription>
                            Tap on the stars and share your thoughts below.
                        </DialogDescription>
                    </DialogHeader>
                    <RatingReviewForm/>
                </DialogContent>
            </Dialog>
  )
}

export default RatingReviewBtn