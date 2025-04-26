import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	FormControl,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { addDays, format } from "date-fns";
import { cn } from "@/lib/utils";
import { ControllerRenderProps } from "react-hook-form";

export default function DatePicker({
	field, disable= false
}: {
	field: ControllerRenderProps<any, string>; disable: boolean
}) {
	return (
		<FormItem className="flex flex-col ">
			<FormLabel className="text-[1rem]">Schedule Date</FormLabel>
			<Popover>
				<PopoverTrigger asChild>
					<FormControl>
						<Button
							variant={"outline"}
							className={cn(
								"xl:w-[18rem] md:w-[12rem] w-[18rem] text-left font-normal",
								!field.value && "text-muted-foreground"
							)}
							disabled={disable}>
							{field.value ? (
								format(field.value, "PPP")
							) : (
								<span>Pick a date</span>
							)}
							<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
						</Button>
					</FormControl>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					<Calendar
						mode="single"
						selected={field.value ? new Date(field.value) : undefined}
						onSelect={field.onChange}
						disabled={(date) => {
							const twoDaysFromNow = addDays(new Date(), 2);
							return date < twoDaysFromNow;
						}}
					/>
				</PopoverContent>
			</Popover>
			<FormMessage />
		</FormItem>
	);
}
