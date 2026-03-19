'use client';

import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const loadingVariant = cva(
  "flex items-center justify-center transition-all duration-300",
  {
    variants: {
      variant: {
        fullscreen: 'fixed inset-0 z-[100001] bg-transparent w-full h-full',
        inline: 'absolute inset-0 z-[100001] rounded-md bg-transparent',
      },
    },
    defaultVariants: {
      variant: 'fullscreen',
    },
  }
);

export interface PropsLoading extends VariantProps<typeof loadingVariant> {
  loading: boolean;
  className?: string;
}

const Loading: React.FC<PropsLoading> = ({ loading, variant, className }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!loading) return null;

  const content = (
    <div className={cn(loadingVariant({ variant }), className)}>
      <div className="flex space-x-2">
        {/* Dot 1 */}
        <span className="w-3 h-3 rounded-full bg-[#5bbbe0] animate-[scaleDot_1.5s_linear_infinite]" />
        {/* Dot 2 */}
        <span className="w-3 h-3 rounded-full bg-[#0074a0] animate-[scaleDot_1.5s_linear_infinite_0.2s]" />
        {/* Dot 3 */}
        <span className="w-3 h-3 rounded-full bg-[#ff3d3d] animate-[scaleDot_1.5s_linear_infinite_0.4s]" />
      </div>

      {/* Custom keyframes animation */}
      <style jsx>{`
        @keyframes scaleDot {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          40% {
            transform: scale(2.5);
            opacity: 0.3;
          }
          60% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );

  if ((variant === 'fullscreen' || !variant) && mounted) {
    return createPortal(content, document.body);
  }

  return content;
};

export default Loading;

