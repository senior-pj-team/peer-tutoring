import Rating from './rating'
import ReviewCard from './review-card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import React from 'react'

const ratings = [
    { percent: '80%', rating: 5 },
    { percent: '10%', rating: 4 },
    { percent: '5%', rating: 3 },
    { percent: '4%', rating: 2 },
    { percent: '1%', rating: 1 },
]

const ReviewDialogContent = () => {
    return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-6 w-full max-w-6xl mx-auto items-start min-h-[80vh] mt-7">
            <div>
                <div className='mt-4'>
                    {ratings.map((item, index) => (
                        <div key={index} className='flex items-center gap-10 mt-2'>
                            <Rating rating={item.rating} size={20} color='text-yellow-500' />
                            <span className="text-sm md:text-base font-medium text-muted-foreground">{item.percent}</span>
                        </div>
                    ))}
                </div>
                <div className='mt-3'>
                    <input
                        type="text"
                        placeholder="Search reviews..."
                        className="w-40 px-2 py-1 text-sm border border-orange-400 rounded-sm focus:border-orange-800 mt-3"
                    />
                    <Button className='rounded-sm ms-1'>Search</Button>
                </div>
            </div>

            <div>
                <ScrollArea className="h-[60vh] md:h-[75vh] w-full p-4 bg-white space-y-4">
                    {[...Array(6)].map((_, idx) => (
                        <ReviewCard key={idx} cutAt={500} />
                    ))}
                </ScrollArea>
                <div className="flex justify-center pt-4">
                    <Button
                        variant="outline"
                        className="border border-orange-600 hover:bg-orange-200 text-orange-600 px-4 py-2 text-sm md:text-base cursor-pointer rounded-none"
                    >
                        Show more reviews
                    </Button>
                </div>
            </div>
        </div>
    )
}
export default ReviewDialogContent;