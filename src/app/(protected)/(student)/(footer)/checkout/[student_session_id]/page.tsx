import CheckoutForm from "@/components/app/features/checkout/checkout-form";
import GeneralError from "@/components/app/shared/error";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { getStudentSessionJoin } from "@/data/queries/student-session/get-student-session-join";

import { createClient } from "@/utils/supabase/server";
import { Book } from "lucide-react";

type Params = Promise<{
	student_session_id: number;
}>;
export default async function page({ params }: { params: Params }) {
	const { student_session_id } = await params;
	const supabase = await createClient();

	const result = await getStudentSessionJoin(supabase, {
		student_session_id,
		status: ["pending_enroll", "pending_payment"],
	});

	if (!result || result.length < 1) {
		return (
			<>
				<GeneralError />
			</>
		);
	}
	const student_session_data = result[0];

	return (
		<div className="pb-20 w-full">
			<div className="flex justify-center pt-15">
				<div className="w-[50rem]  shadow-lg rounded-lg p-5">
					<span className="text-xl font-bold">Checkout</span>
					<div className="mb-3 text-sm text-red-500 mt-3">
						Please do not close this tab before payment
					</div>
					<Separator className="my-4" />
					<div className="grid md:grid-cols-2  gap-2">
						<div className="flex flex-col px-2">
							<span className="font-extrabold text-xl"> Detail </span>
							<div className="flex gap-x-11 mt-5">
								<div className="flex flex-col gap-y-4 text-[0.85rem] font-medium text-gray-600">
									<span>Item:</span>
									<span>Quantity:</span>
									<span>Price:</span>
								</div>

								{/* values */}
								<div className="flex flex-col gap-y-4 text-[0.85rem] font-bold text-gray-700 flex-1">
									<div className="max-w-[200px] truncate">
										{student_session_data.sessions?.session_name}
									</div>
									<span>1</span>
									<span>{student_session_data.amount_from_student} ฿</span>
								</div>
							</div>
							<Separator className="bg-gray-500 my-4" />
							<div className="flex gap-x-10 text-[0.85rem] font-medium text-gray-600">
								<span>Sub Total:</span>
								<div className="font-bold text-gray-700">
									{student_session_data.amount_from_student} ฿
								</div>
							</div>
							<Separator className="bg-gray-500 my-4" />
							<div className="flex gap-x-17 text-[0.85rem] font-medium text-gray-600 mb-5">
								<span>Total:</span>
								<div className="font-bold text-gray-700">
									{student_session_data.amount_from_student} ฿
								</div>
							</div>
						</div>
						<div className="mt-4 md:mt-0">
							<span className="font-extrabold text-x">
								{" "}
								Choose payment methods{" "}
							</span>
							<CheckoutForm
								student_session_id={student_session_data.id}
								clientSecret={student_session_data.stripe_client_secrete}
							/>
							<div className="flex flex-col mt-3 space-y-3 items-start w-full">
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
														Students can cancel and request a refund only before
														the session close time.
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
														Students can rate, report, or request a refund
														within 7 days after the session has been taught.
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
			</div>
		</div>
	);
}
