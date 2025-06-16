"use client";

import { FormEvent, useState } from "react";
import {
	PaymentElement,
	useStripe,
	useElements,
	Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";
import { useSupabase } from "@/hooks/use-supabase";
import { getStudentSessionJoin } from "@/data/queries/student-session/get-student-session-join";
import { getEnrollmentCount } from "@/data/queries/student-session/get-enrollment-count";
import { updateStudentSessionStatus } from "@/data/mutations/student-session/update-status";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

function PaymentForm({ student_session_id }: { student_session_id: number }) {
	const stripe = useStripe();
	const elements = useElements();
	const router = useRouter();

	const [message, setMessage] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const supabase = useSupabase();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!stripe || !elements) {
			return;
		}
		setIsLoading(true);

		const student_session_data_result = await getStudentSessionJoin(supabase, {
			student_session_id,
		});
		if (!student_session_data_result) {
			setMessage("Something went wrong. Please try again!");
			setIsLoading(false);
			return;
		}
		if (student_session_data_result.length <= 0) {
			if (!student_session_data_result) {
				setMessage("Something went wrong. Please try again!");
				setIsLoading(false);
				return;
			}

			const student_session_data = student_session_data_result[0];
			if (student_session_data.ss_status === "expired_payment") {
				setMessage("The payment session is expired. Please enroll again!");
				setIsLoading(false);
				return;
			}

			const enrollment_count = await getEnrollmentCount(supabase, {
				student_session_id,
				ss_status: [
					"completed",
					"enrolled",
					"paid",
					"pending_payment",
					"pending_refund",
				],
			});

			if (!enrollment_count && enrollment_count !== 0) {
				setMessage("Something went wrong. Please try again!");
				return;
			}

			if (enrollment_count >= student_session_data.sessions!.max_students!) {
				setMessage("Sry, no avalible seats left for this session!");
				return;
			}

			const updateResult = await updateStudentSessionStatus(supabase, {
				student_session_id,
				ss_status: "pending_payment",
			});
			if (!updateResult) {
				setMessage("Something went wrong. Please try again!");
				return;
			}

			const res = await stripe.confirmPayment({
				elements,
				confirmParams: {
					return_url: "https://localhost:3000/checkout/status",
				},
				redirect: "if_required",
			});
			console.log(res);

			if (res.error) {
				if (
					res.error.type === "card_error" ||
					res.error.type === "validation_error"
				) {
					setMessage(res.error.message!);
				} else {
					setMessage("An unexpected error occurred.");
				}
			} else {
				if (res.paymentIntent.status === "succeeded") {
					router.push("/checkout/success");
				} else if (res.paymentIntent.status === "requires_payment_method") {
					router.push("/checkout/fail");
				}
			}

			setIsLoading(false);
		}
	};

	const paymentElementOptions = {
		layout: "accordion" as const,
	};
	return (
		<form id="payment-form" onSubmit={handleSubmit} className="mt-5">
			<PaymentElement id="payment-element" options={paymentElementOptions} />
			<Button
				disabled={isLoading || !stripe || !elements}
				id="submit"
				className="w-full mt-2 font-bold cursor-pointer mb-2">
				<span id="button-text">
					{isLoading ? (
						<div className="flex items-center gap-1">
							<span>Loading</span>
							<div className="flex items-center gap-0.5">
								<div className="h-1 w-1 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
								<div className="h-1 w-1 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
								<div className="h-1 w-1 bg-white rounded-full animate-bounce"></div>
							</div>
						</div>
					) : (
						"Pay now"
					)}
				</span>
			</Button>
			{/* Show any error or success messages */}
			{message && (
				<div id="payment-message">
					<span className="text-red-500 text-sm">{message}</span>
				</div>
			)}
		</form>
	);
}

export default function CheckoutForm({
	clientSecret,
	student_session_id,
}: {
	clientSecret: string | null;
	student_session_id: number;
}) {
	const appearance = {
		theme: "flat" as "flat",
		variables: {
			fontSizeBase: "14px",
			spacingUnit: "4px",
			fontSmooth: "always",
			colorDanger: "#fb2c36",
			fontFamily: "Poppins, sans-serif",
		},
	};

	return (
		<Elements
			stripe={stripePromise}
			options={{ appearance, clientSecret: clientSecret ?? undefined }}>
			<PaymentForm student_session_id={student_session_id} />
		</Elements>
	);
}
