"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      {/* Login Heading and Motto */}
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-bold">Welcome Back</h1>
        <div className="mt-4">
          <h2 className="text-base font-semibold">Teach. Learn. Repeat.</h2>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid gap-6">
        {/* Email */}
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>

        {/* Password */}
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <a href="#" className="text-sm underline-offset-4 hover:underline">
              Forgot?
            </a>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={passwordVisible ? "text" : "password"}
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Login Button */}
        <Button type="submit" className="w-full">
          Login
        </Button>

        {/* Or Continue With */}
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>

        {/* Google Login */}
        <Button variant="outline" className="w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.52-4.48-10-10-10zM12 17.2c-2.64 0-4.8-2.16-4.8-4.8s2.16-4.8 4.8-4.8 4.8 2.16 4.8 4.8-2.16 4.8-4.8 4.8zM12 4.4c-2.64 0-4.8 2.16-4.8 4.8 0 .88.16 1.72.44 2.48L12 12l2.88-4.32c.28-.76.44-1.6.44-2.48 0-2.64-2.16-4.8-4.8-4.8z"
              fill="currentColor"
            />
          </svg>
          Login with Google
        </Button>
      </div>

      {/* Sign-up Link */}
      <div className="text-center text-sm mt-4">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
  );
}
