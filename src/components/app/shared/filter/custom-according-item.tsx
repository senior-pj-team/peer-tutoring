import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

export function CustomAccordionItem({
	trigger,
	value,
	children,
}: {
	trigger: string;
	value: string;
	children: React.ReactNode;
}) {
	return (
		<AccordionItem value={value} className="w-full ">
			<AccordionTrigger className="font-semibold no-underline flex text-lg">
				{trigger}
			</AccordionTrigger>
			<AccordionContent>{children}</AccordionContent>
		</AccordionItem>
	);
}
