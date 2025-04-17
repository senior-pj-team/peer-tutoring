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
import ReportForm from './report-form'
import { AlertTriangle } from 'lucide-react'

const ReportBtn = () => {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 text-sm cursor-pointer rounded">
                    <div className="flex items-center gap-1">
                        <AlertTriangle className="h-5 w-5" />
                        <span>Report</span>
                    </div>
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Submit your report</DialogTitle>
                    <DialogDescription>
                        Choose one of the violation below or choose other to write your reason.
                    </DialogDescription>
                </DialogHeader>
                <ReportForm />
            </DialogContent>
        </Dialog>
    )
}

export default ReportBtn