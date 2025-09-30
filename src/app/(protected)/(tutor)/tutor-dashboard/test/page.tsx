import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { TrashIcon } from "lucide-react";

export function LearningMaterialsForm() {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "learning_materials", // this field must exist in your schema
  });

  return (
    <div className="grid w-full items-center gap-y-2">
      <FormLabel className="text-xs md:text-sm">Learning Materials</FormLabel>
      <span className="font-extralight text-gray-500 md:text-[0.75rem] text-[0.55rem]">
        Add links to study materials, slides, or resources. Provide a short name for each.
      </span>

      {fields.map((field, index) => (
        <div key={field.id} className="flex flex-col gap-2 mb-3">
          {/* Material Name */}
          <FormField
            control={control}
            name={`learning_materials.${index}.name`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Material name (e.g., Lecture 1 Slides)"
                    className="text-[0.6rem] md:text-sm"
                  />
                </FormControl>
                <FormMessage className="md:text-[0.75rem] text-[0.55rem]" />
              </FormItem>
            )}
          />

          {/* Material URL */}
          <FormField
            control={control}
            name={`learning_materials.${index}.url`}
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-1">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="https://example.com/resource.pdf"
                      className="text-[0.6rem] md:text-sm"
                    />
                  </FormControl>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="hover:bg-red-100 cursor-pointer"
                    onClick={() => remove(index)}
                  >
                    <TrashIcon color="red" />
                  </Button>
                </div>
                <FormMessage className="md:text-[0.75rem] text-[0.55rem]" />
              </FormItem>
            )}
          />
        </div>
      ))}

      <Button
        type="button"
        onClick={() => append({ name: "", url: "" })}
        variant="outline"
        size="sm"
        className="mt-2 w-fit text-[0.5rem] md:text-[0.75rem]"
      >
        + Add Material
      </Button>
    </div>
  );
}
