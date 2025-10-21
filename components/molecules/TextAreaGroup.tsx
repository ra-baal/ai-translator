import { Label } from "../atoms/shadcn/label";
import { Textarea } from "../atoms/shadcn/textarea";

interface TextAreaGroupProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  readOnly?: boolean;
}

export const TextAreaGroup = ({
  label,
  value,
  onChange,
  placeholder = "",
  readOnly = false,
}: TextAreaGroupProps) => {
  return (
    <div className="flex flex-col gap-1">
      <Label>{label}</Label>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        className="resize-none p-2 border rounded-md"
      />
    </div>
  );
};
