import GeneralError from "@/components/app/shared/error";
import { stripe } from "@/utils/stripe/stripe";
import { redirect } from "next/navigation";

export default async function page({
	searchParams,
}: {
	searchParams: Promise<{ payment_intent: string }>;
}) {
	const { payment_intent } = await searchParams;
	let paymentIntent;
	try {
		paymentIntent = await stripe.paymentIntents.retrieve(payment_intent);
	} catch (error) {
		console.log(error);
		return (
			<>
				<GeneralError />
			</>
		);
	}
	if (paymentIntent.status === "succeeded") {
		redirect("/checkout/success");
	} else {
		redirect("/checkout/fail");
	}
}
