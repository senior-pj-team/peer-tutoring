import React, { useRef, useState } from 'react'
const options = [
    "Inappropriate Behavior",
    "Harassment or Discriminationmakes",
    "Unreliable or No-Show",
    "Inaccurate or Misleading Information",
    "Unethical Practices",
    "other"
];
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


const RefundForm = () => {
    const [position, setPosition] = useState("Select a reason ▼")
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
            if (textRef.current)  textRef.current.style.boxShadow = ""
        }
    };
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">{position}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel className='text-xs'>Reasons to refund</DropdownMenuLabel>
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
                placeholder="Write your review here..."
                value={report}
                onChange={(e) => setReview(e.target.value)}
                className="min-h-[50px] mt-5"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <div className="mt-4">
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 text-sm cursor-pointer rounded" onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </div>
    )
}

export default RefundForm