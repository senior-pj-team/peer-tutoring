import React from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Star } from 'lucide-react'
import ReviewDialogContent from './review-dialog-content'

const MoreReviewBtn = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="border border-orange-600 hover:bg-orange-200 text-orange-600 px-4 py-2 text-sm md:text-base rounded-none"
                >
                    View all reviews
                </Button>
            </DialogTrigger>
            <DialogContent className="w-full sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        <div className="flex flex-wrap gap-3 items-center text-base md:text-lg font-bold">
                            <div className="flex gap-2 items-center">
                                <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                                <span>4.7 Overall rating</span>
                            </div>
                            <span className="hidden sm:inline">|</span>
                            <span>86 ratings and reviews</span>
                        </div>
                    </DialogTitle>
                </DialogHeader>
                <ReviewDialogContent />
            </DialogContent>
        </Dialog>
    )
}

export default MoreReviewBtn
