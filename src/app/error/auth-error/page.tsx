"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function AuthError() {
	const [errorInfo, setErrorInfo] = useState({
		error: "",
		errorCode: "",
		errorDescription: "",
	});

	useEffect(() => {
		const hash = window.location.hash.substring(1);
		const params = new URLSearchParams(hash);
		setErrorInfo({
			error: params.get("error") || "",
			errorCode: params.get("error_code") || "",
			errorDescription: params.get("error_description") || "",
		});
	}, []);
	return (
		<div className="h-screen w-full bg-white">
			<div className="flex h-full justify-center pt-15">
				<div className="w-[36rem] flex flex-col  items-center">
					<Image
						src={"/auth-error.png"}
						alt="Error Pic"
						width={300}
						height={200}
					/>
					<span className="text-4xl mb-5">Oh, No</span>
					<div className="mb-3 text-sm">
						{errorInfo.errorDescription === "Database error saving new user"
							? "Login failed. Please use your university mail to sign In"
							: "Authentication Error! Please login again"}
					</div>
					<Link href="/login">
						<Button size="lg">Back to Login</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
