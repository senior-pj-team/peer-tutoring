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
import { getEnrollmentCount } from "@/data/queries/student-session/get-enrollment-count";
import { updateStudentSession } from "@/data/mutations/student-session/update-student-session";
import { useRouter } from "next/navigation";
import { getStudentSessionView } from "@/data/queries/student-session/get-student-session-view";
import { LoadingDots } from "../../shared/loading-dots";

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
	let paid_count = 0;

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!stripe || !elements) {
			return;
		}
		setMessage("");
		setIsLoading(true);

		const student_session_data_result = await getStudentSessionView(supabase, {
			columns:
				"student_session_status, student_session_id, session_id, student_id",
			student_session_id,
		});
		if (!student_session_data_result) {
			setIsLoading(false);
			setMessage("Something went wrong. Please try again!");
			return;
		}

		if (student_session_data_result.length >= 0) {
			const student_session_data = student_session_data_result[0];

			if (student_session_data.student_session_status === "expired_payment") {
				setIsLoading(false);
				setMessage("The payment session is expired. Please enroll again!");
				return;
			}

			const has_enrolled_ss = await getEnrollmentCount(supabase, {
				student_session_id: student_session_data.student_session_id ?? 0,
				ss_status: [
					"enrolled",
					"expired_payment",
					"completed",
					"refunded",
					"failed_payment",
					"paid",
				],
			});

			if (!has_enrolled_ss && has_enrolled_ss !== 0) {
				setIsLoading(false);
				setMessage("Something went wrong. Please try again!");
				return;
			}
			if (has_enrolled_ss > 0) {
				setIsLoading(false);
				setMessage("You have already checked out");
				return;
			}
			const has_pay_now = await getEnrollmentCount(supabase, {
				session_id: student_session_data.session_id ?? 0,
				student_id: student_session_data.student_id ?? "",
				ss_status: ["pending_payment"],
			});

			if (!has_pay_now && has_pay_now !== 0) {
				setIsLoading(false);
				setMessage("Something went wrong. Please try again!");
				return;
			}

			if (has_pay_now > 0) {
				paid_count = -1;
			}

			const enrollment_count = await getEnrollmentCount(supabase, {
				session_id: student_session_data.session_id ?? 0,
				ss_status: ["completed", "enrolled", "paid", "pending_payment"],
			});

			if (!enrollment_count && enrollment_count !== 0) {
				setIsLoading(false);
				setMessage("Something went wrong. Please try again!");
				return;
			}

			if (enrollment_count + paid_count >= student_session_data.max_students!) {
				setIsLoading(false);
				setMessage("Sry, no avalible seats left for this session!");
				return;
			}

			const updateResult = await updateStudentSession(
				supabase,
				[student_session_id],
				{
					status: "pending_payment",
				},
			);
			if (!updateResult) {
				setIsLoading(false);
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
		} else {
			setIsLoading(false);
			setMessage("The payment session is expired. Please enroll again!");
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
							<LoadingDots />
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
