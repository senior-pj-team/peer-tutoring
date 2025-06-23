"use client";
import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { Star, CircleCheck, TriangleAlertIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { submitRatingReview } from "@/actions/sumbit-rating-review";
import { useActionState } from "react";
import GeneralError from "../../shared/error";
import { useSupabase } from "@/hooks/use-supabase";

const initialState: ActionResponseType<string> = {
  success: false,
  error: {
    message: "",
  },
};

const RatingReviewForm = ({
  ssId,
}: {
  ssId: number | null;
}) => {
  const supabase = useSupabase();
  if (!supabase) return <GeneralError />;

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [state, action, isPending] = useActionState(submitRatingReview, initialState);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [responseDialogOpen, setResponseDialogOpen] = useState(false);

  useEffect(() => {
    if (state.success || state.error.message) {
      setDialogOpen(false);
      setResponseDialogOpen(true);
      setRating(0);
      setReview("");
    }
  }, [state]);

  return (
    <div>
      <Dialog open={dialogOpen} onOpenChange={(open) => setDialogOpen(open)}>
        <DialogTrigger asChild>
          <div className="mt-4 text-right">
            <Button
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 text-sm cursor-pointer"
              onClick={() => setDialogOpen(true)}
            >
              Submit
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form
            action={action}
            onSubmit={(e) => {
              if (!rating || !review.trim()) {
                e.preventDefault();
                alert("Please provide a rating and a review.");
              }
            }}
          >
            <input type="hidden" name="ss_id" value={ssId ?? undefined} />
            <input type="hidden" name="rating" value={rating} />
            <input type="hidden" name="review" value={review} />

            <DialogHeader className="mb-4">
              <DialogTitle className="text-xl">Submit Review</DialogTitle>
              <DialogDescription className="text-sm">
                Please confirm your rating and review before submitting.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <div className="flex items-center gap-1">
                    <span>Submitting</span>
                    <div className="flex items-center gap-0.5">
                      <div className="h-1 w-1 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <div className="h-1 w-1 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <div className="h-1 w-1 bg-white rounded-full animate-bounce" />
                    </div>
                  </div>
                ) : (
                  "Submit"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Stars & Textarea */}
      <div className="flex items-center gap-1 my-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={clsx(
              "h-6 w-6 cursor-pointer",
              rating >= star ? "text-yellow-300" : "text-gray-300"
            )}
            onClick={() => setRating(star)}
            strokeWidth={1.5}
            fill={rating >= star ? "#FACC15" : "none"}
          />
        ))}
      </div>
      <Textarea
        placeholder="Write your review here..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
        className="h-[5rem] mt-2 w-full whitespace-normal"
        style={{ overflowWrap: "anywhere" }}
      />
      
      {/* Response Dialog */}
      <Dialog
        open={responseDialogOpen}
        onOpenChange={(open) => setResponseDialogOpen(open)}
      >
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader className="mb-2">
            <DialogTitle className="text-2xl">
              {!state.success && state.error ? (
                <div className="flex gap-1 items-center text-red-400">
                  <TriangleAlertIcon size={18} />
                  <span className="text-[1.25rem]">Error</span>
                </div>
              ) : (
                <div className="flex gap-1 items-center text-green-500">
                  <CircleCheck size={18} />
                  <span className="text-[1.25rem]">Review Submitted</span>
                </div>
              )}
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-sm text-gray-700">
            {state.success ? state.data : state.error.message}
          </DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RatingReviewForm;
