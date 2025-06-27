"use client";

import { sessionSchema, SessionSchemaT } from "@/schema/session-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Pencil } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import TipTap from "../tip-tap";
import { Button } from "@/components/ui/button";
import DatePicker from "../date-picker";
import { addDays, formatDate, parseISO } from "date-fns";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useRef, useState, useTransition } from "react";
import clsx from "clsx";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { createSession } from "@/actions/create-session";
import { editSession } from "@/actions/edit-session";
import { cancelSession } from "@/actions/cancel-session";
import { useRouter } from "next/navigation";
import { formatTimeFromTimestamp } from "@/utils/app/get-formatted-time";

export default function SessionForm({
  data = {
    school: "",
    major: "",
    course_code: "",
    course_name: "",
    description: "",
    requirement: "",
    start_time: "",
    end_time: "",
    max_students: 5,
    price: 0,
    image: "",
    session_name: "",
    location: "",
    category_id: 1,
    id: NaN,
    created_at: "",
    payment_evidence: null,
    refunded_amount: 0,
    service_fee: 0,
    status: "open",
    tutor_id: "",
    transferred_amount: 0
  },
  isEdit = false,
  toCancel = false,
}: {
  data?: TSessionsResult;
  isEdit?: boolean;
  toCancel?: boolean;
}) {
  const {
    school,
    major,
    course_code,
    course_name,
    description,
    requirement,
    start_time,
    end_time,
    max_students,
    price,
    image: imageString,
    session_name,
    location,
    category_id,
    id: sessionId,
    status
  } = data;

  let image: File | null = null;
  const router = useRouter();

  const form = useForm<SessionSchemaT>({
    resolver: zodResolver(sessionSchema),
    defaultValues: {
      school: school ?? "",
      major: major ?? "",
      courseCode: course_code ?? "",
      courseName: course_name ?? "",
      description,
      requirements: requirement ?? "",
      date: isEdit ? new Date(start_time) : addDays(new Date(), 2),
      startTime: start_time ? formatTimeFromTimestamp(start_time) : "",
      endTime: end_time ? formatTimeFromTimestamp(end_time) : "",
      maxStudents: max_students ?? "",
      paid: !!price,
      amount: price,
      sessionName: session_name,
      location: location,
      category: category_id.toString(),
      image,
    },
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(imageString);
  const [isDisable, setDisable] = useState(isEdit);
  const [isDialogOpen, setisDialogOpen] = useState(false);
  const [formValues, setFormValues] = useState<SessionSchemaT>();
  const [confirmAction, setConfirmAction] = useState<"submit" | "cancel" | null>(null);
  const [isPending, startTransition] = useTransition();
  const imageInputRef = useRef<HTMLInputElement | null>(null)

  const handleDisableToggle = () => setDisable((prev) => !prev);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      console.log("to set preview", objectUrl);
      setPreviewUrl(objectUrl);
    }
  };

  const handleSubmit = (values: SessionSchemaT) => {
    setFormValues(values);
    setConfirmAction("submit");
    setisDialogOpen(true);
  };

  const handleConfirm = async () => {
    startTransition(async () => {
      if (confirmAction === "cancel") {
        const response = await cancelSession(sessionId);
        if (response.success) {
          toast.success("Session is cancelled", {
            description: (
              <div className="text-muted-foreground text-sm">
                {`Session was cancelled on ${formatDate(Date.now(), "yyy MMMM dd")}`}
              </div>
            ),
          });
          router.push("/tutor-dashboard/sessions/upcoming-sessions");
        } else {
          toast.error("Something went wrong", {
            description: `We couldn't complete your request. ${response.error.message}`,
          });
        }
        setisDialogOpen(false);
        return;
      }

      if (!formValues) return;
      try {
        let response;
        if (isEdit) {
          response = await editSession(sessionId, formValues, imageString, previewUrl);
        } else {
          response = await createSession(formValues);
        }
        const actionType = isEdit ? "updated" : "created";
        if (response.success) {
          toast.success(`Session ${actionType} successfully`, {
            description: (
              <div className="text-muted-foreground text-sm">
                {`Session was ${actionType}. It will start on ${formatDate(
                  parseISO(formValues.date.toISOString()),
                  "yyyy MMMM dd"
                )}`}
              </div>
            ),
          });
          if (isEdit) {
            router.refresh();
          } else {
            router.push("/tutor-dashboard/sessions/upcoming-sessions");
          }
        } else {
          toast.error("Something went wrong", {
            description: `We couldn't complete your request. ${response.error.message}`,
          });
        }
        setisDialogOpen(false);
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong", {
          description: "We couldn't complete your request. Please try again.",
        });
      }
    });
  };

  return (
    <div className="relative px-4 lg:px-6">
      {isEdit && (
        <div className="flex items-center justify-between bg-muted p-3 rounded-md mb-4">
          <div className="text-sm font-medium text-muted-foreground">
            <span className="inline-block bg-slate-200 text-slate-700 px-3 py-1 rounded-full capitalize">
              Status: {status}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDisableToggle}
            className={clsx(
              "hover:bg-orange-100 border border-orange-300 transition",
              isDisable ? "bg-white" : "bg-orange-200"
            )}
            title={isDisable ? "Enable editing" : "Disable editing"}
          >
            <Pencil className="w-5 h-5 text-orange-500" />
          </Button>
        </div>
      )}


      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-y-8"
        >
          <div className="flex flex-col gap-y-6">
            <div className="font-bold xl:text-xl text-lg ">
              Course Information{" "}
              <span className="text-gray-400 font-bold text-sm">
                (optional information. required only for university courses)
              </span>
            </div>
            <div className="grid lg:grid-cols-2 gap-x-10 gap-y-5 mb-5">
              {[
                {
                  name: "courseName",
                  label: "Course Name",
                  placeholder: "Enter course name",
                },
                {
                  name: "school",
                  label: "School",
                  placeholder: "Enter school name",
                },
                {
                  name: "major",
                  label: "Major",
                  placeholder: "Enter major",
                },
                {
                  name: "courseCode",
                  label: "Course Code",
                  placeholder: "E.g. CS101",
                },
              ].map(({ name, label, placeholder }) => (
                <FormField
                  key={name}
                  control={form.control}
                  name={name as keyof SessionSchemaT}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[1rem]">{label}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={placeholder}
                          {...field}
                          value={field.value?.toString() || ""}
                          className="bg-slate-50"
                          disabled={isDisable}
                        />
                      </FormControl>
                      <FormMessage className="text-sm" />
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-y-6">
            <div className="font-bold xl:text-xl text-lg ">
              Session Information
            </div>
            <div>
              <div className="grid w-full items-center gap-y-8">
                <div>
                  <Label className="mb-1 block text-[1rem]">Image</Label>
                  <div className="lg:w-[30%] h-60 border border-dashed border-gray-400 rounded-md overflow-hidden flex items-center justify-center bg-gray-50 relative">
                    {previewUrl ? (
                      <>
                        <Image
                          src={previewUrl}
                          alt="Profile Preview"
                          width={120}
                          height={120}
                          priority
                          className="object-cover w-full h-full"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setPreviewUrl(null);
                            form.setValue('image', null);
                            if (imageInputRef.current) {
                              imageInputRef.current.value = "";
                            }
                          }}
                          className="absolute top-2 right-2 text-white bg-black/50 hover:bg-black/70 text-xs px-2 py-1 rounded"
                        >
                          Remove
                        </button>
                      </>
                    ) : (
                      <span className="text-sm text-gray-400">No image selected</span>
                    )}
                  </div>

                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel></FormLabel>
                        <FormControl>
                          <Input
                            id="picture"
                            type="file"
                            className="text-[0.6rem] md:text-sm lg:w-[30%]"
                            onChange={(e) => {
                              handleImageChange(e);
                              field.onChange(e.target.files?.[0] || null);
                            }}
                            disabled={isDisable}
                            ref={imageInputRef}
                          />
                        </FormControl>
                        <FormMessage className="text-sm" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <FormField
              control={form.control}
              name="sessionName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[1rem]">Session Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter session name"
                      {...field}
                      className="bg-slate-50"
                      disabled={isDisable}
                    />
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[1rem]">
                    Session Category
                  </FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      disabled={isDisable}
                      defaultValue={field.value}
                      value={field.value.toString() || ""}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a session category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Categories</SelectLabel>
                          <SelectItem value="1">Science</SelectItem>
                          <SelectItem value="2">Technology</SelectItem>
                          <SelectItem value="3">Libral Arts</SelectItem>
                          <SelectItem value="4">Business</SelectItem>
                          <SelectItem value="5">Engineering</SelectItem>
                          <SelectItem value="6">Elective Courses</SelectItem>
                          <SelectItem value="7">Health Science</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[1rem]">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Course description"
                      {...field}
                      className="h-[8rem] w-full whitespace-normal overflow-y-auto bg-slate-50"
                      disabled={isDisable}
                    />
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />{" "}
            <Controller
              name="requirements"
              control={form.control}
              render={({ field, fieldState }) => (
                <TipTap
                  value={field.value}
                  onChange={field.onChange}
                  fieldState={fieldState}
                  disable={isDisable}
                />
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <div className="grid items-start md:grid-cols-3 w-full gap-y-6 gap-x-10">
                  <DatePicker field={field} disable={isDisable} />
                  <FormField
                    control={form.control}
                    name="startTime"
                    render={({ field }) => {
                      console.log("field startTime: ", field.value);
                      return <div className="min-h-[4.5rem] ">
                        <FormItem className="">
                          <FormLabel className="text-[1rem]">
                            Start Time
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="time"
                              id="time-picker"
                              step="60"
                              className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none  w-[8rem]"
                              {...field}
                              disabled={isDisable}
                            />
                          </FormControl>
                          <FormMessage className="text-sm" />
                        </FormItem>
                      </div>
                    }}
                  />

                  {/* End time */}
                  <FormField
                    control={form.control}
                    name="endTime"
                    render={({ field }) => (
                      <div className="min-h-[4.5rem]">
                        <FormItem className="w-full ">
                          <FormLabel className="text-[1rem]">
                            End Time
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="time"
                              id="time-picker"
                              step="60"
                              className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none w-[8rem]"
                              {...field}
                              disabled={isDisable}
                            />
                          </FormControl>
                          <FormMessage className="text-sm" />
                        </FormItem>
                      </div>
                    )}
                  />
                </div>
              )}
            />

            <div className="w-full flex items-center gap-2">
              <Button
                type="submit"
                size="lg"
                className="md:w-[20%] ml-auto cursor-pointer"
              >
                {isEdit ? <span>Save Changes</span> : <span>Submit</span>}
              </Button>

              {toCancel && (
                <Button
                  type="button"
                  size="lg"
                  variant="outline"
                  className="md:w-[20%] border-red-600 text-red-600 hover:bg-red-50 cursor-pointer"
                  onClick={() => {
                    setConfirmAction("cancel");
                    setisDialogOpen(true);
                  }}
                >
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </form>
      </Form>

      <Dialog open={isDialogOpen} onOpenChange={setisDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-800">
              {confirmAction === "cancel"
                ? "Cancel this Session?"
                : isEdit
                  ? "Save Changes?"
                  : "Create New Session?"}
            </DialogTitle>
            <DialogDescription className="text-gray-600 mt-2">
              {confirmAction === "cancel"
                ? "Are you sure you want to cancel? You won't be able to recover"
                : isEdit
                  ? "You are about to save changes to this session. Please confirm to proceed."
                  : "You are about to create a new session. Are you sure everything is correct?"}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={() => setisDialogOpen(false)}
              className="w-24"
            >
              Back
            </Button>
            <Button
              type="button"
              onClick={handleConfirm}
              disabled={isPending}
              className="w-24 bg-orange-500 hover:bg-orange-600 text-white"
            >
              {isPending ? (
                <div className="flex items-center gap-1">
                  <span>Loading</span>
                  <div className="flex items-center gap-0.5">
                    <div className="h-1 w-1 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="h-1 w-1 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="h-1 w-1 bg-white rounded-full animate-bounce" />
                  </div>
                </div>
              ) : confirmAction === "cancel" ? (
                "Continue"
              ) : isEdit ? (
                "Save"
              ) : (
                "Create"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
