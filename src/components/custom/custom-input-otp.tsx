// src/components/ui/custom-input-otp.tsx

'use client';

import * as React from 'react';
import { OTPInputContext } from 'input-otp';
import { cva } from 'class-variance-authority';
import { Dot } from 'lucide-react';

import { cn } from '@/lib/utils';

import {
  InputOTP as ShadcnInputOTP,
  InputOTPGroup as ShadcnInputOTPGroup,
  InputOTPSlot as ShadcnInputOTPSlot,
} from '@/components/ui/input-otp';

type CustomOTPContextType = {
  variant: 'default' | 'destructive';
};
const CustomOTPContext = React.createContext<CustomOTPContextType>({
  variant: 'default',
});

const customInputOTPSlotVariants = cva(
  'relative flex h-10 w-10 items-center justify-center border text-sm transition-colors first:rounded-l-md first:border-l last:rounded-r-md',
  {
    variants: {
      variant: {
        default: 'border-input',
        destructive: 'border-destructive text-destructive',
      },
      isActive: {
        true: 'z-10',
      },
    },
    compoundVariants: [
      {
        variant: 'default',
        isActive: true,
        className: 'border-primary', // Chỉ đổi màu border
      },
      {
        variant: 'destructive',
        isActive: true,
        className: 'border-destructive', // Giữ màu border khi active
      },
    ],
    defaultVariants: {
      variant: 'default',
    },
  }
);

const CustomInputOTP = React.forwardRef<
  React.ElementRef<typeof ShadcnInputOTP>,
  React.ComponentPropsWithoutRef<typeof ShadcnInputOTP> & {
    variant?: 'default' | 'destructive';
  }
>(({ variant = 'default', ...props }, ref) => (
  <CustomOTPContext.Provider value={{ variant }}>
    <ShadcnInputOTP ref={ref} {...props} />
  </CustomOTPContext.Provider>
));
CustomInputOTP.displayName = 'CustomInputOTP';

const CustomInputOTPGroup = React.forwardRef<
  React.ElementRef<typeof ShadcnInputOTPGroup>,
  React.ComponentPropsWithoutRef<typeof ShadcnInputOTPGroup>
>((props, ref) => <ShadcnInputOTPGroup ref={ref} {...props} />);
CustomInputOTPGroup.displayName = 'CustomInputOTPGroup';

const CustomInputOTPSlot = React.forwardRef<
  React.ElementRef<typeof ShadcnInputOTPSlot>,
  React.ComponentPropsWithoutRef<typeof ShadcnInputOTPSlot>
>(({ className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { isActive } = inputOTPContext.slots[props.index];
  const { variant } = React.useContext(CustomOTPContext);

  return (
    <ShadcnInputOTPSlot
      ref={ref}
      className={cn(customInputOTPSlotVariants({ variant, isActive }), className)}
      {...props}
    />
  );
});
CustomInputOTPSlot.displayName = 'CustomInputOTPSlot';

const CustomInputOTPSeparator = React.forwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'>
>((props, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Dot />
  </div>
));
CustomInputOTPSeparator.displayName = 'InputOTPSeparator';

export { CustomInputOTP, CustomInputOTPGroup, CustomInputOTPSlot, CustomInputOTPSeparator };
