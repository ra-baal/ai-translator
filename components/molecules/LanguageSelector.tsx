import { cn } from "@/lib/utils";
import { Label } from "../atoms/shadcn/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../atoms/shadcn/select";

interface LanguageSelectorProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: { label: string; value: string }[];
  className?: string;
}

export const LanguageSelector = ({
  label,
  value,
  onChange,
  options,
  className = "",
}: LanguageSelectorProps) => {
  return (
    <div className={cn("flex flex-col gap-1 w-full", className)}>
      <Label className="text-sm md:text-base">{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full p-2 border rounded-md text-sm md:text-base">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
