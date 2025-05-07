import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Book } from "lucide-react";
import Image from "next/image";

export default function Payment() {
	return (
		<div className="pb-20 w-full">
			<div className="flex justify-center pt-15">
				<div className="w-[28rem] h-[12rem]flex flex-col shadow-lg rounded-lg p-5">
					<span className="text-xl font-bold">Scan QR Code</span>
					<div className="mb-3 text-sm text-red-500 mt-3">
						Please do not close this tab before payment
					</div>
					<Separator className="my-4" />
					<div className="flex flex-col items-center">
						<Image
							src={"/qr-image.png"}
							alt="Payment Pic"
							width={180}
							height={180}
						/>
						<span className="text-lg mb-5 text-gray-500">Amount: 500 THB</span>
					</div>
					<div className="flex flex-col space-y-3 items-start">
						<div className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
							You accept the terms and conditions by paying the fee.
						</div>
						<Dialog>
							<DialogTrigger className="items-start text-xs font-medium leading-none hover:underline cursor-pointer flex">
								<Book className="mr-1" size={15} />
								Read terms and condiition
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle className="mb-3 text-bold text-xl">
										Terms and Condition
									</DialogTitle>
									<DialogDescription asChild>
										<ul className="list-disc list-inside space-y-4 text-sm text-gray-600">
											<li>
												Students can cancel and request a refund only before the
												session close time.
											</li>
											<li>
												The session closes 24 hours before the session start
												time.
											</li>
											<li>
												Refunds will be processed within 7 days, subject to
												admin team approval.
											</li>
											<li>
												Students can rate, report, or request a refund within 7
												days after the session has been taught.
											</li>
											<li>For more information, contact the admin team.</li>
										</ul>
									</DialogDescription>
								</DialogHeader>
							</DialogContent>
						</Dialog>
					</div>
				</div>
			</div>
		</div>
	);
}
