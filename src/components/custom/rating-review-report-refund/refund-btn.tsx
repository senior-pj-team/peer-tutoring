'use client'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { AlertTriangle } from 'lucide-react'
import RefundForm from './refund-form'

const RefundBtn = () => {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="border border-orange-600 hover:bg-orange-200 text-orange-600 px-4 py-2 text-sm cursor-pointer w-full">
                    Request refund
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Reason to refund</DialogTitle>
                    <DialogDescription>
                        Choose one of the reasons to refund
                    </DialogDescription>
                </DialogHeader>
                <RefundForm />
            </DialogContent>
        </Dialog>
    )
}

export default RefundBtn