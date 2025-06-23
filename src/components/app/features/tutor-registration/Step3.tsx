"use client";

import { CheckCircleIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

export default function Step3() {
  const form = useFormContext();

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <h2 className="text-lg font-semibold">Confirm your application</h2>

      <div className="border rounded-lg p-6 max-w-sm w-full bg-white shadow-sm">
        <p className="text-sm font-medium">Admins will validate the application</p>
        <p className="text-sm text-muted-foreground mt-1">
          This typically takes 1–2 working days. We'll notify you once your account is approved.
        </p>
      </div>

      <div className="flex items-center gap-2 mt-1">
        <CheckCircleIcon className="w-4 h-4 text-green-500" />
        <span className="text-xs text-muted-foreground">
          You'll receive an email notification when your application is processed
        </span>
      </div>

      <div className="mt-4 w-full max-w-sm text-left">
        <FormField
          control={form.control}
          name="isChecked"
          render={({ field }) => (
            <FormItem className="flex items-start space-x-2 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none text-sm">
                  I agree to the{" "}
                  <a
                    href="/terms"
                    target="_blank"
                    className="underline hover:text-orange-800"
                  >
                    Terms and Conditions
                  </a>
                <FormMessage className="mt-3"/>
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
