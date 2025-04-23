import React from 'react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Star } from 'lucide-react'
import Rating from './rating'
import ReviewCard from './review-card'

const ratings = [
    { percent: '80%', rating: 5 },
    { percent: '10%', rating: 4 },
    { percent: '5%', rating: 3 },
    { percent: '4%', rating: 2 },
    { percent: '1%', rating: 1 },
]

const ReviewDialogContent = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-6 w-full max-w-6xl mx-auto items-start">

            <div className="grid grid-cols-2 gap-y-3">
                {ratings.map((item, index) => (
                    <React.Fragment key={index}>
                        <Rating rating={item.rating} showText={false} />
                        <span className="text-sm md:text-base font-medium text-muted-foreground">{item.percent}</span>
                    </React.Fragment>
                ))}
            </div>

            <ScrollArea className="h-[60vh] md:h-[75vh] w-full p-4 bg-white space-y-4">
                {[...Array(6)].map((_, idx) => (
                    <ReviewCard key={idx} />
                ))}
                <div className="flex justify-center pt-4">
                    <Button
                        variant="outline"
                        className="border border-orange-600 hover:bg-orange-200 text-orange-600 px-4 py-2 text-sm md:text-base cursor-pointer rounded-none"
                    >
                        Show morereviews
                    </Button>
                </div>
            </ScrollArea>
        </div>
    )
}

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
                            <span>86 Ratings</span>
                        </div>
                    </DialogTitle>
                </DialogHeader>
                <ReviewDialogContent />
            </DialogContent>
        </Dialog>
    )
}

export default MoreReviewBtn
