"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";

type Step2Props = {
  bankData: TBankInfoResult | null;
};

export default function Step2({ bankData }: Step2Props) {
  const form = useFormContext();
  const [useExisting, setUseExisting] = useState(false);

  const useExistingBankInfo = () => {
    if (bankData) {
      form.setValue("bankName", bankData.bank_name ?? "");
      form.setValue("accountNumber", bankData.account_number ?? "");
      form.setValue("accountName", bankData.account_name ?? "");
    }
  };

  const handleSwitchChange = (checked: boolean) => {
    setUseExisting(checked);
    if (checked) {
      useExistingBankInfo();
    } else {
      form.resetField("bankName");
      form.resetField("accountNumber");
      form.resetField("accountName");
    }
  };

  return (
    <div className="space-y-6">
      {/* Toggle */}
      {bankData && (
        <div className="flex items-center justify-between">
          <Label htmlFor="use-existing">Use existing student bank info?</Label>
          <Switch
            id="use-existing"
            checked={useExisting}
            onCheckedChange={handleSwitchChange}
          />
        </div>
      )}

      {/* Form Fields */}
      <div className="grid gap-4">
        {/* Bank Name */}
        <FormField
          control={form.control}
          name="bankName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bank Name</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={useExisting}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your bank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bangkok Bank">Bangkok Bank</SelectItem>
                    <SelectItem value="Siam Commercial Bank">
                      Siam Commercial Bank
                    </SelectItem>
                    <SelectItem value="Kasikorn Bank">Kasikorn Bank</SelectItem>
                    <SelectItem value="Krungthai Bank">
                      Krungthai Bank
                    </SelectItem>
                    <SelectItem value="Thai Military Bank">
                      Thai Military Bank
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Account Name */}
        <FormField
          control={form.control}
          name="accountName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bank Account Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Account Name"
                  {...field}
                  disabled={useExisting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Account Number */}
        <FormField
          control={form.control}
          name="accountNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="1234567890"
                  {...field}
                  onChange={(e) => {
                    let formatted = e.target.value.replace(/[^\d]/g, "");
                    if (formatted.length > 10)
                      formatted = formatted.slice(0, 10);
                    field.onChange(formatted);
                  }}
                  maxLength={10}
                  disabled={useExisting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
