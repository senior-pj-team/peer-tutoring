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
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className='w-full'>
                        <div className='flex justify-between w-full'>
                            <div>{position}</div>
                            <div>▼</div>
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