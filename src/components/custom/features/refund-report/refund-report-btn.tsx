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
import RefundReportForm from './refund-report-form'
import { AlertTriangle } from 'lucide-react'

const RefundReportBtn = ({ isReport }: { isReport: boolean }) => {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {
                    isReport
                        ?
                        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 text-sm cursor-pointer rounded">
                            <div className="flex items-center gap-1">
                                <AlertTriangle className="h-5 w-5" />
                                <span>Report</span>
                            </div>
                        </button>
                        :
                        <button className="border border-orange-600 hover:bg-orange-200 text-orange-600 px-4 py-2 text-sm cursor-pointer w-full">
                            Request refund
                        </button>
                }
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{
                        isReport
                        ? <span>Submit your report</span>
                        : <span>Submit your refund</span>
                        }</DialogTitle>
                    <DialogDescription>
                        {
                            isReport
                            ? <span>Choose one of the violation below or choose other to write your reason.</span>
                            : <span>Choose one of reason to refund or choose other to write your reason</span>
                        }
                    </DialogDescription>
                </DialogHeader>
                <RefundReportForm isReport={isReport} />
            </DialogContent>
        </Dialog>
    )
}

export default RefundReportBtn