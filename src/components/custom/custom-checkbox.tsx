'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Checkbox as ShadcnCheckbox } from '@/components/ui/checkbox';

const customCheckboxVariants = cva(
  'peer h-4 w-4 shrink-0 rounded-sm border ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        // 'default' bây giờ là phiên bản custom mặc định
        default:
          'data-[state=checked]:border-[#238C98] data-[state=checked]:bg-[#238C98] data-[state=checked]:text-white dark:data-[state=checked]:border-[#1A5F6A] dark:data-[state=checked]:bg-[#1A5F6A]',
        destructive:
          'border-destructive data-[state=checked]:bg-destructive data-[state=checked]:text-destructive-foreground focus-visible:ring-destructive',
        success:
          'border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white focus-visible:ring-green-600',
        warning:
          'border-yellow-500 data-[state=checked]:bg-yellow-500 data-[state=checked]:text-white focus-visible:ring-yellow-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface CustomCheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  variant?: VariantProps<typeof customCheckboxVariants>['variant'] | 'secondary';
}

// 3. Cập nhật logic component
const CustomCheckbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CustomCheckboxProps
>(({ className, variant = 'default', ...props }, ref) => {
  if (variant === 'secondary') {
    return <ShadcnCheckbox ref={ref} className={className} {...props} />;
  }

  const cvaVariant = variant as VariantProps<typeof customCheckboxVariants>['variant'];

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(customCheckboxVariants({ variant: cvaVariant }), className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator className={cn('flex items-center justify-center text-current')}>
        <Check className="h-4 w-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});
CustomCheckbox.displayName = 'CustomCheckbox';

export { CustomCheckbox };
