import { TrashIcon } from "lucide-react";
import React from "react";
import clsx from "clsx";

type LearningMaterialsProps = {
  fields: { name: string; url: string }[];
  remove?: (index: number | number[]) => void;
  isDisable: boolean;
};

const LearningMaterials: React.FC<LearningMaterialsProps> = ({
  fields,
  remove,
  isDisable,
}) => {
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {fields.map((field, index) => (
        <div
          key={index}
          className="flex items-center gap-2 bg-orange-50 px-3 py-1 rounded-full"
        >
          <a
            href={field.url}
            className={clsx(
              "text-sm",
              isDisable
                ? "text-orange-300 pointer-events-none"
                : "text-orange-600 hover:text-orange-700"
            )}
          >
            {field.name}
          </a>
          {remove && (
            <button
              type="button"
              onClick={() => remove(index)}
              className={clsx(
                "hover:text-orange-600",
                isDisable &&
                  "text-orange-300 cursor-not-allowed hover:text-orange-300"
              )}
              disabled={isDisable}
            >
              <TrashIcon size={16} />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default LearningMaterials;
