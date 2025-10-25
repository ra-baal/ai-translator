import { cn } from "@/lib/utils";
import { Label } from "../atoms/shadcn/label";
import { Textarea } from "../atoms/shadcn/textarea";
import { useState } from "react";

interface TextAreaGroupProps {
  label?: string;
  value: string;
  onChange: (val: string, lastKey: string | null) => void;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
  rows?: number;
  disabled?: boolean;
}

export const TextAreaGroup = ({
  label = undefined,
  value,
  onChange,
  placeholder = "",
  readOnly = false,
  className = "",
  rows = undefined,
  disabled = false,
}: TextAreaGroupProps) => {
  const [lastKey, setLastKey] = useState<string | null>(null);

  return (
    <div className={cn("flex flex-col gap-1 w-full", className)}>
      {label && <Label className="text-sm md:text-base">{label}</Label>}
      <Textarea
        value={value}
        onKeyDown={(e) => {
          setLastKey(e.key);
        }}
        onChange={(e) => {
          onChange(e.target.value, lastKey);
        }}
        placeholder={placeholder}
        readOnly={readOnly}
        className="w-full resize-none p-2 border rounded-md text-sm md:text-base"
        rows={rows}
        disabled={disabled}
      />
    </div>
  );
};
