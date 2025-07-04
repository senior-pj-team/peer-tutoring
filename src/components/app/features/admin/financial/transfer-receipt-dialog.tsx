import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

export function TransferReceiptDialog({ receipt }: { receipt: string | null }) {
	return (
		<Dialog>
			<DialogTrigger className="hover:underline text-sm text-gray-500 cursor-pointer">
				View Receipt
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Transfer Receipt Screenshot</DialogTitle>
					<DialogDescription>
						<div className="rounded p-2 bg-white overflow-auto ">
							{receipt ? (
								<Image
									src={receipt}
									alt="Refund receipt"
									width={300}
									height={300}
									sizes="50vw"
									className="w-full max-h-[300px] object-cover"
								/>
							) : (
								<span className="text-sm text-gray-500">
									No receipt to show
								</span>
							)}
						</div>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
