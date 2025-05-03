"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { signIn } from "@/app/(auth)/actions";

export function LoginForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<"form">) {
	return (
		<form className={cn("flex flex-col gap-6", className)} {...props}>
			{/* Login Heading and Motto */}
			<div className="flex flex-col items-center gap-4 text-center">
				<h1 className="text-2xl font-bold">Welcome Back</h1>
				<div className="mt-4">
					<h2 className="text-base font-semibold">Teach. Learn. Repeat.</h2>
				</div>
			</div>

			{/* Google Login */}
			<Button
				variant="outline"
				className="w-full cursor-pointer"
				formAction={signIn}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path
						d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.52-4.48-10-10-10zM12 17.2c-2.64 0-4.8-2.16-4.8-4.8s2.16-4.8 4.8-4.8 4.8 2.16 4.8 4.8-2.16 4.8-4.8 4.8zM12 4.4c-2.64 0-4.8 2.16-4.8 4.8 0 .88.16 1.72.44 2.48L12 12l2.88-4.32c.28-.76.44-1.6.44-2.48 0-2.64-2.16-4.8-4.8-4.8z"
						fill="currentColor"
					/>
				</svg>
				Sign in with Google
			</Button>

			{/* Sign-up Link */}
			<div className="text-center text-sm mt-4 font-extrabold text-primary">
				Only your university mail is allowed for authetication.🔐
			</div>
		</form>
	);
}
