'use client';

import * as React from 'react';
import { Calendar as ShadcnCalendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const calendarVariants = cva('rounded-xl border shadow-sm bg-white p-3 text-gray-900', {
  variants: {
    variant: {
      blue: 'bg-white border border-gray-200 shadow-md',
    },
  },
  defaultVariants: {
    variant: 'blue',
  },
});

const dayVariants = cva(
  'h-9 w-9 p-0 font-normal rounded-lg transition-colors aria-selected:opacity-100 flex items-center justify-center',
  {
    variants: {
      variant: {
        blue: `
          text-gray-900 
          hover:bg-blue-100 
          data-[state=selected]:bg-blue-500 
          data-[state=selected]:text-white
        `,
      },
    },
    defaultVariants: {
      variant: 'blue',
    },
  }
);

type ShadcnCalendarProps = React.ComponentProps<typeof ShadcnCalendar>;

export interface CustomCalendarProps
  extends Omit<ShadcnCalendarProps, 'classNames' | 'month' | 'onMonthChange' | 'onSelect'>,
    VariantProps<typeof calendarVariants> {
  className?: string;
  selected?: Date | undefined;
  onSelect?: (date: Date | undefined) => void;
}

export function CustomCalendar({
  className,
  variant,
  selected,
  onSelect,
  ...props
}: CustomCalendarProps) {
  const [month, setMonth] = React.useState<Date>(selected ?? new Date());

  // Remove incompatible props that might conflict with mode="single"
  const { mode: _mode, ...restProps } = props;

  return (
    <ShadcnCalendar
      mode="single"
      showOutsideDays
      selected={selected}
      month={month}
      onMonthChange={setMonth}
      onSelect={(day: Date | undefined) => {
        onSelect?.(day);

        if (day && day.getMonth() !== month.getMonth()) {
          setMonth(new Date(day.getFullYear(), day.getMonth(), 1));
        }
      }}
      className={cn(calendarVariants({ variant }), className)}
      classNames={{
        day: cn(dayVariants({ variant }), 'rounded-md'),
        outside: 'text-gray-400 opacity-50',
        today: 'border border-blue-500 text-blue-500 font-medium rounded-md',
        selected: 'bg-blue-500 text-white hover:bg-blue-500 hover:text-white rounded-md',
        day_selected: 'bg-blue-500 text-white rounded-full',
      }}
      {...restProps}
    />
  );
}
