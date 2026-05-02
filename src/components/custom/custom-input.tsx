import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

// 1. Import Input gốc của Shadcn và đổi tên
import { Input as ShadcnInput } from '@/components/ui/input';

const customInputVariants = cva(
  'flex h-10 w-full rounded-md border bg-[#F1F5F9] px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-input focus-visible:ring-[#238C98B2] text-[#1A5F6A]',
        destructive:
          'border-destructive text-destructive placeholder:text-destructive/60 focus-visible:ring-destructive',
        success: 'border-green-600 focus-visible:ring-green-600',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: VariantProps<typeof customInputVariants>['variant'] | 'secondary';
}

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ className, variant = 'default', type, ...props }, ref) => {
    if (variant === 'secondary') {
      return <ShadcnInput type={type} className={className} ref={ref} {...props} />;
    }

    const cvaVariant = variant as VariantProps<typeof customInputVariants>['variant'];

    return (
      <input
        type={type}
        className={cn(customInputVariants({ variant: cvaVariant }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
CustomInput.displayName = 'CustomInput';

export { CustomInput };
