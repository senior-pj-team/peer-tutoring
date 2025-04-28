import { RegisterForm } from "@/components/custom/forms/auth-forms/register-form"; // Assuming you have a RegisterForm component
import Image from "next/image";

export default function RegisterPage() {
	return (
		<div className="grid min-h-screen lg:grid-cols-2">
			{/* Left section */}
			<div className="flex flex-col gap-6 p-6 md:p-10">
				{/* Logo */}
				<div className="flex justify-center gap-2 md:justify-start">
					<a href="#" className="flex items-center gap-2 font-medium">
						<div className="font-bold text-3xl cursor-pointer">Orion</div>
					</a>
				</div>

				{/* Register Form */}
				<div className="flex flex-1 items-center justify-center">
					<div className="w-full max-w-xs">
						<RegisterForm />
					</div>
				</div>
			</div>

			{/* Right image section */}
			<div className="relative hidden bg-white lg:block">
				<Image
					src="/login-fig.svg" // Image path
					alt="Registration Figure"
					width={40}
					height={40}
					className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale lg:object-contain md:object-cover" // Ensure it's responsive
				/>
			</div>
		</div>
	);
}
