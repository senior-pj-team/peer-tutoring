import { LoginForm } from "@/components/app/features/auth/login-form";
import Image from "next/image";

export default function LoginPage() {
	return (
		<div className="grid min-h-screen lg:grid-cols-2">
			<div className="flex flex-col gap-6 p-6 md:p-10">
				<div className="flex justify-center gap-2 md:justify-start">
					<div className="font-bold text-3xl cursor-pointer">Peertube</div>
				</div>

				<div className="flex flex-1 items-center justify-center">
					<div className="w-full max-w-xs">
						<LoginForm />
					</div>
				</div>
			</div>
			<div className="relative hidden bg-white lg:block">
				<Image
					src="/login-fig.svg" // Image path
					alt="Login Figure"
					width={30}
					height={30}
					className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale lg:object-contain md:object-cover" // Ensure it's responsive
				/>
			</div>
		</div>
	);
}
