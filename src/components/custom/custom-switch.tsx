'use client';

import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

import { Switch as ShadcnSwitch } from '@/components/ui/switch';

const customSwitchVariants = cva(
  'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'data-[state=checked]:bg-[#007BFF] data-[state=unchecked]:bg-[#E2E8F0]',
        destructive: 'data-[state=checked]:bg-destructive data-[state=unchecked]:bg-input',
        success: 'data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-input',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface CustomSwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  variant?: VariantProps<typeof customSwitchVariants>['variant'] | 'secondary';
}

const CustomSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  CustomSwitchProps
>(({ className, variant = 'default', ...props }, ref) => {
  if (variant === 'secondary') {
    return <ShadcnSwitch ref={ref} className={className} {...props} />;
  }
  const cvaVariant = variant as VariantProps<typeof customSwitchVariants>['variant'];

  return (
    <SwitchPrimitives.Root
      className={cn(customSwitchVariants({ variant: cvaVariant }), className)}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          'pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0'
        )}
      />
    </SwitchPrimitives.Root>
  );
});
CustomSwitch.displayName = SwitchPrimitives.Root.displayName;

export { CustomSwitch };
