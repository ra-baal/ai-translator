import { cn } from "@/lib/utils";
import { Label } from "../atoms/shadcn/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../atoms/shadcn/select";

interface LanguageSelectorProps<TValue extends string> {
  label: string;
  value: TValue;
  onChange: (val: TValue) => void;
  options: { label: string; value: TValue }[];
  className?: string;
}

export const LanguageSelector = <TValue extends string>({
  label,
  value,
  onChange,
  options,
  className = "",
}: LanguageSelectorProps<TValue>) => {
  return (
    <div className={cn("flex flex-col gap-1 w-full", className)}>
      <Label className="text-sm md:text-base">{label}</Label>
      <Select value={value} onValueChange={(val) => onChange(val as TValue)}>
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
