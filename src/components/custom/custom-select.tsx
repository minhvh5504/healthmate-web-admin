'use client';

import * as React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cva, VariantProps } from 'class-variance-authority';

interface Option {
  value: string;
  label: string;
}

// Định nghĩa các style variant
const customSelectVariants = cva(
  'flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 transition-colors',
  {
    variants: {
      variant: {
        blue: 'bg-[#EAF3FF] border-[#D0E4FF] text-[#1B3C74] focus-visible:ring-[#007BFFB2]',
        white: 'bg-[#F1F5F9] border-gray-300 text-gray-700 focus-visible:ring-[#1B3C74]',
      },
    },
    defaultVariants: {
      variant: 'blue',
    },
  }
);

export interface CustomSelectProps extends VariantProps<typeof customSelectVariants> {
  options: Option[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function CustomSelect({
  options,
  value,
  onChange,
  placeholder = 'Chọn option',
  variant,
}: CustomSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={customSelectVariants({ variant })}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map(opt => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
