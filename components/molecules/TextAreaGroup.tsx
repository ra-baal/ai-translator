import { cn } from "@/lib/utils";
import { Label } from "../atoms/shadcn/label";
import { Textarea } from "../atoms/shadcn/textarea";

interface TextAreaGroupProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
}

export const TextAreaGroup = ({
  label,
  value,
  onChange,
  placeholder = "",
  readOnly = false,
  className = "",
}: TextAreaGroupProps) => {
  return (
    <div className={cn("flex flex-col gap-1 w-full", className)}>
      <Label className="text-sm md:text-base">{label}</Label>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        className="w-full resize-none p-2 border rounded-md text-sm md:text-base"
      />
    </div>
  );
};
