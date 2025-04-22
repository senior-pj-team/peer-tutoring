'use client'
import React, { useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Textarea } from '@/components/ui/textarea';
import { ChevronDown, ChevronUp } from 'lucide-react';


const RefundReportForm = ({ isReport }: { isReport: boolean }) => {
    const options =

        isReport ? [
            "Inappropriate Behavior",
            "Harassment or Discriminationmakes",
            "Unreliable or No-Show",
            "Inaccurate or Misleading Information",
            "Unethical Practices",
            "other"
        ]
            : [
                "Scheduling Conflict",
                "Emergency or Personal Issues",
                "Mistaken Booking",
                "Change of Plans",
                "other"
            ];
    const [position, setPosition] = useState("Select a reason")
    const [report, setReview] = useState("")
    const [error, setError] = useState("");
    const textRef = useRef<HTMLTextAreaElement>(null);
    const [check, setCheck] = useState(false);
    const [open, setOpen] = useState(false);
    const handleSubmit = () => {
        if (position === "other" && report.trim() === "") {
            textRef.current?.focus();
            if (textRef.current) textRef.current.style.boxShadow = "0 0 0 1px red"
            setError("Please enter your reason..")
        } else {
            setError("")
            if (textRef.current) textRef.current.style.boxShadow = ""
        }
    };
    const handleCheck= (e: React.ChangeEvent<HTMLInputElement>)=>{
        setCheck(e.target.checked)
    }
    return (
        <div>
            <DropdownMenu onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className='w-full'>
                        <div className='flex justify-between w-full'>
                            <div>{position}</div>
                            <div> <ChevronDown size={10} className={`transition-transform duration-200 ${open ? 'rotate-180' : 'rotate-0'}`}/> </div>
                        </div>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                    <DropdownMenuLabel className='text-xs'>
                        {
                            isReport
                                ? <span>Reason for Reporting</span>
                                : <span>Reason to refund</span>
                        }
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={position} onValueChange={setPosition} className='text-xs'>
                        {
                            options.map((option, index) => <DropdownMenuRadioItem key={index} value={option}>{option}</DropdownMenuRadioItem>)
                        }
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <Textarea
                ref={textRef}
                placeholder="Write your reason here..."
                value={report}
                onChange={(e) => setReview(e.target.value)}
                className="h-[5rem] mt-5 w-full whitespace-normal"
                style={{ overflowWrap: "anywhere" }}
            />
            {
                isReport &&
                <label className="flex items-center space-x-2 text-xs mt-3">
                    <input
                        type="checkbox"
                        checked={check}
                        onChange={handleCheck}
                        className="form-checkbox text-blue-600 pointer-cursor"
                    />
                    <span>Request refund for this session</span>
                </label>
            }
            {error && <p className="text-sm text-red-500">{error}</p>}
            <div className="mt-4 text-right">
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 text-sm cursor-pointer rounded" onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </div>
    )
}

export default RefundReportForm