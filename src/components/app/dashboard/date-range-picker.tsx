'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import Image from 'next/image';

interface DateRangePickerProps {
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
  className?: string;
}

export function DateRangePicker({
  date,
  setDate,
  className,
}: DateRangePickerProps) {
  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              'justify-start text-left font-normal h-auto py-2 px-3',
              !date && 'text-muted-foreground'
            )}
          >
            <Image
              src="/icons/dashboard/calendar-range.svg"
              alt="calendar icon"
              width={24}
              height={24}
              className="h-5 w-5 mr-2"
            />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'MMM dd, yyyy')} -{' '}
                  {format(date.to, 'MMM dd, yyyy')}
                </>
              ) : (
                format(date.from, 'MMM dd, yyyy')
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
