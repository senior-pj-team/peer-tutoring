"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [hasTypedPassword, setHasTypedPassword] = useState(false);
  const [hasTypedConfirm, setHasTypedConfirm] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible((prevState) => !prevState);
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    switch (strength) {
      case 0:
      case 1:
        return "Weak";
      case 2:
        return "Moderate";
      case 3:
      case 4:
        return "Strong";
      default:
        return "";
    }
  };

  const passwordsMatch = confirmPassword === password;

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      {/* Heading */}
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-bold">Create an Account</h1>
        <div className="mt-4">
          <h2 className="text-base font-semibold">Teach. Learn. Grow.</h2>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Full Name */}
        <div className="grid gap-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" type="text" placeholder="John Doe" required />
        </div>

        {/* Email */}
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>

        {/* Password */}
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={passwordVisible ? "text" : "password"}
              value={password}
              onChange={(e) => {
                const val = e.target.value;
                setPassword(val);
                setHasTypedPassword(true);
                setPasswordStrength(getPasswordStrength(val));
              }}
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
          {hasTypedPassword && (
            <p
              className={cn("text-sm", {
                "text-red-500": passwordStrength === "Weak",
                "text-yellow-500": passwordStrength === "Moderate",
                "text-green-600": passwordStrength === "Strong",
              })}
            >
              Strength: {passwordStrength}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={confirmPasswordVisible ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => {
                const val = e.target.value;
                setConfirmPassword(val);
                setHasTypedConfirm(true);
              }}
              required
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {hasTypedConfirm && !passwordsMatch && (
            <p className="text-sm text-red-500">Passwords do not match.</p>
          )}
        </div>

        {/* Register Button */}
        <Button type="submit" className="w-full">
          Register
        </Button>

        {/* Divider */}
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>

        {/* Google Button */}
        <Button variant="outline" className="w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-5 h-5 mr-2"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.52-4.48-10-10-10zM12 17.2c-2.64 0-4.8-2.16-4.8-4.8s2.16-4.8 4.8-4.8 4.8 2.16 4.8 4.8-2.16 4.8-4.8 4.8zM12 4.4c-2.64 0-4.8 2.16-4.8 4.8 0 .88.16 1.72.44 2.48L12 12l2.88-4.32c.28-.76.44-1.6.44-2.48 0-2.64-2.16-4.8-4.8-4.8z"
              fill="currentColor"
            />
          </svg>
          Register with Google
        </Button>
      </div>

      {/* Footer */}
      <div className="text-center text-sm mt-4">
        Already have an account?{" "}
        <Link href="/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </form>
  );
}
