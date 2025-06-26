"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Form } from "@/components/ui/form";
import { tutorFormSchema, tutorFormSchemaT } from "@/schema/tutor-form-schema";
import { submitTutorRegistration } from "@/actions/submit-tutor-registration";
import { insertNotification } from "@/data/mutations/notification/insert-notification";
import { sendEmail } from "@/actions/send-email";
import { useSupabase } from "@/hooks/use-supabase";
import { getUserSession } from "@/utils/get-user-session";
import { useState, useTransition } from "react";
import { toast } from "sonner";

const steps = [
  "Academic Information",
  "Payment Setup",
  "Submit & Wait for Approval",
];

export default function HorizontalStepper({
  userData,
  bankData,
}: {
  userData: TUser | null;
  bankData: TBankInfoResult | null;
}) {
  const supabase = useSupabase();
  const [activeStep, setActiveStep] = useState(0);
  const [isPending, startTransition] = useTransition();

  const form = useForm<tutorFormSchemaT>({
    resolver: zodResolver(tutorFormSchema),
    defaultValues: {
      school: userData?.school ?? "",
      major: userData?.major ?? "",
      year: userData?.year ?? "",
      phone_number: userData?.phone_number ?? "",
      bankName: "",
      accountName: "",
      accountNumber: "",
      studentIdPhoto: "",
      type: "tutor_transfer",
      bankId: 0,
    },
  });

  const onSubmit = async (data: tutorFormSchemaT) => {
    startTransition(async () => {
      const response = await submitTutorRegistration(data);
      if (response.success) {
        await Promise.all([sendResponseEmail(), sendNotification()]);
        setActiveStep((prev) => prev + 1);
      } else {
        toast.error("Something went wrong", {
          description: `We couldn't complete your request. ${response.error.message}`,
        });
      }
    });
  };

  const validateStep = async () => {
    const stepFields: { [key: number]: (keyof tutorFormSchemaT)[] } = {
      0: ["school", "major", "year", "phone_number", "studentIdPhoto"],
      1: ["bankName", "accountName", "accountNumber", "type", "bankId"],
      2: ["isChecked"],
    };

    const isStepValid = await form.trigger(stepFields[activeStep]);
    if (isStepValid) {
      if (activeStep === steps.length - 1) {
        console.log(form.getValues());
        onSubmit(form.getValues());
      } else {
        setActiveStep((prev) => prev + 1);
      }
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <Step1 />;
      case 1:
        return <Step2 bankData={bankData} />;
      case 2:
        return <Step3 />;
      default:
        return <div className="text-sm">Unknown Step</div>;
    }
  };

  const sendResponseEmail = React.useCallback(async () => {
    const title = "Your tutor registration request is being processed.";
    const detail =
      "We will validate your request and notify you. This will take 2-3 working days";
    const preview = "Tutor registration sent";
    await sendEmail({
      preview,
      title,
      detail,
      to: "nwai39771@gmail.com",
    });
  }, []);

  const sendNotification = async () => {
    const user = await getUserSession();
    if (!user) return;
    const title = "Tutor registration submitted";
    const body = "Your request is being processed.";
    await insertNotification(supabase, title, body, user.user_id, "student");
  };

  return (
    <Form {...form}>
      <div className="max-w-2xl mx-auto mt-10 px-4">
        <h1 className="text-2xl font-bold text-center mb-6">Become a Tutor</h1>
        <div className="flex justify-between mb-6">
          {steps.map((label, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-xs w-full"
            >
              <div
                className={cn(
                  "rounded-full w-6 h-6 flex items-center justify-center font-semibold",
                  activeStep === index
                    ? "bg-orange-500 text-white"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {index + 1}
              </div>
              <p
                className={cn(
                  "text-center mt-2 text-[10px] leading-tight",
                  activeStep === index
                    ? "text-orange-500"
                    : "text-muted-foreground"
                )}
              >
                {label}
              </p>
            </div>
          ))}
        </div>

        <Card className="p-6 space-y-6">
          {activeStep === steps.length ? (
            <div className="text-center py-10">
              <p className="text-lg font-semibold mb-2 text-orange-600">
                Your application has been submitted 🎉
              </p>
              <p className="text-sm text-muted-foreground">
                You're now waiting for your profile to be reviewed.
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-base font-medium mb-0">
                Step {activeStep + 1}: {steps[activeStep]}
              </h2>
              <div className="mb-0">{renderStepContent(activeStep)}</div>
              <div className="flex justify-between pt-0 mt-0">
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  Back
                </Button>
                <Button onClick={validateStep} disabled={isPending}>
                  {isPending ? (
                    <div className="flex items-center gap-1">
                      <span>Loading</span>
                      <div className="flex items-center gap-0.5">
                        <div className="h-1 w-1 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
                        <div className="h-1 w-1 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
                        <div className="h-1 w-1 bg-white rounded-full animate-bounce" />
                      </div>
                    </div>
                  ) : activeStep === steps.length - 1 ? (
                    "Finish"
                  ) : (
                    "Next"
                  )}
                </Button>
              </div>
            </>
          )}
        </Card>
      </div>
    </Form>
  );
}
