"use client";

import React, { useMemo, useRef, useState } from "react";
import Webcam from "react-webcam";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";

export default function Step1() {
  const webcamRef = useRef<Webcam>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const form = useFormContext();

  const handleCapture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    form.resetField("studentIdPhoto");
  };

  const handleConfirm = () => {
    if (capturedImage) {
      form.setValue("studentIdPhoto", capturedImage, { shouldValidate: true });
    }
  };

  const fields = useMemo(
    () => [
      {
        name: "school",
        label: "School",
        placeholder: "Enter your faculty",
      },
      {
        name: "major",
        label: "Major",
        placeholder: "Enter your major",
      },
      {
        name: "year",
        label: "Year",
        placeholder: "Enter your year",
      },
      {
        name: "phone_number",
        label: "Phone number",
        placeholder: "Enter your phone number",
      },
    ],
    []
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4">
        {fields.map(({ name, label, placeholder }) => (
          <FormField
            key={name}
            control={form.control}
            name={name as any}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[1rem]">{label}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={placeholder}
                    {...field}
                    value={field.value?.toString() || ""}
                    className="bg-slate-50"
                  />
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
        ))}
      </div>

      <div className="mt-1">
        <p className="text-sm mb-2 font-medium">
          Take a photo holding your Student ID clearly.
        </p>

        <div>
          <FormField
            name="studentIdPhoto"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  {capturedImage || form.getValues("studentIdPhoto") ? (
                    <div>
                      <Image
                        src={capturedImage?? form.getValues("studentIdPhoto")}
                        alt="Captured"
                        width={300}
                        height={300}
                        className="rounded-md object-cover"
                      />
                      <div className="flex gap-2 mt-3">
                        <Button variant="outline" onClick={handleRetake}>
                          Retake
                        </Button>
                        <Button
                          onClick={handleConfirm}
                          disabled={field.value}
                        >
                          {field.value ? "Photo Saved ✅" : "Use Photo"}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width={300}
                        height={300}
                        videoConstraints={{
                          width: 300,
                          height: 300,
                          facingMode: "user",
                        }}
                        className="rounded-md"
                      />
                      <Button onClick={handleCapture} className="mt-2">
                        Capture Photo
                      </Button>
                    </div>
                  )}
                </FormControl>
                <FormMessage className="text-sm text-red-600" />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
