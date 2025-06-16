import { Skeleton } from "@/components/ui/skeleton";

export const ReviewCardSkeleton = () => {
  return (
    <div className='space-y-2'>
      {Array.from({ length: 8 }).map((_, idx) => (
        <Skeleton
          key={idx}
          className="h-[150px] w-[200px] rounded-xl mt-3"
        />
      ))}
    </div>
  );
};
