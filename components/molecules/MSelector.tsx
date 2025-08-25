// src/components/molecules/CustomSelect.tsx
import React from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/atoms/shadcn/select";

export interface Option {
    label: string;
    value: string;
}

export interface CustomSelectProps {
    label?: string;               // group label
    options: Option[];            // list of items
    defaultValue?: string;
    onChange?: (value: string) => void;
    width?: string;               // optional width
}

const MSelector: React.FC<CustomSelectProps> = ({
    label,
    options,
    defaultValue,
    onChange,
    width = "w-40",
}) => {
    return (
        <Select
            defaultValue={defaultValue}
            onValueChange={(value) => onChange?.(value)}
        >
            <SelectTrigger className={`${width} cursor-pointer`}>
                <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {label && <SelectLabel>{label}</SelectLabel>}
                    {options.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default MSelector;
