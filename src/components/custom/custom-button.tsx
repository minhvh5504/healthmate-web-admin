import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const customButtonColorVariants = cva('', {
  variants: {
    variant: {
      default: 'bg-[#238C98] hover:bg-[#238C98B2] rounded-lg h-10',
      destructive: '',
      outline: 'hover:bg-[#F1F5F9] border-gray-300',
      secondary: 'bg-[#1A1A1A] text-white hover:bg-[#2a2a2a] rounded-lg',
      ghost: '',
      link: 'text-[#238C98] underline-offset-4 hover:underline',
    },
  },
});

export interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null;
  size?: "default" | "sm" | "lg" | "icon" | null;
}

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size }),
          customButtonColorVariants({ variant }),
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
CustomButton.displayName = 'CustomButton';

export { CustomButton };
