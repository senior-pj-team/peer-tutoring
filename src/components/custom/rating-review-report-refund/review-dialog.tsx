import { ScrollArea } from "@/components/ui/scroll-area"
import Rating from './rating'
import ReviewCard from './review-card'
import { Button } from '@/components/ui/button'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Star } from 'lucide-react'

const ratings = [
    { percent: '80%', rating: 5 },
    { percent: '10%', rating: 4 },
    { percent: '5%', rating: 3 },
    { percent: '4%', rating: 2 },
    { percent: '1%', rating: 1 },
]

const ReviewDialogContent = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-6 w-full max-w-4xl mx-auto items-start">
            <div className="grid grid-cols-2 gap-0 space-y-3">
                {ratings.map((item, index) => (
                    <React.Fragment key={index}>
                        <Rating rating={item.rating} showText={false} />
                        <span className="text-sm font-medium text-muted-foreground">{item.percent}</span>
                    </React.Fragment>
                ))}
            </div>


            <ScrollArea className="h-[85vh] w-full p-4 bg-white">
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
                <Button variant="outline" className='border border-orange-600 hover:bg-orange-200 text-orange-600 px-4 py-2 text-sm cursor-pointer rounded-none'>View all reviews</Button>
            </ScrollArea>
        </div>
    )
}

import React from 'react'

const MoreReviewBtn = () => {
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className='border border-orange-600 hover:bg-orange-200 text-orange-600 px-4 py-2 text-sm cursor-pointer rounded-none'>View all reviews</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] md:max-w-[60rem]">
                    <DialogHeader>
                        <DialogTitle>
                            <div className='flex gap-5 items-center text-lg font-bold'>
                                <div className='flex gap-2 items-center'>
                                    <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                                    <span>4.7 Overall rating</span>
                                </div>
                                |
                                <span>86 Ratings</span>
                            </div>
                        </DialogTitle>
                    </DialogHeader>
                    <ReviewDialogContent />
                </DialogContent>
            </Dialog>
        </>
    )
}

export default MoreReviewBtn
