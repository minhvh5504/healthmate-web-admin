'use client';

import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

const loadingVariant = cva(
  "z-[100001] flex items-center justify-center bg-[rgba(53,53,53,0.3)] backdrop-blur-sm transition duration-300",
  {
    variants: {
      variant: {
        fullscreen: 'fixed min-h-screen inset-0',
        inline: 'absolute inset-0 rounded-md',
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
  if (!loading) return null;

  return (
    <div className={cn(loadingVariant({ variant }), className)}>
      <div className="flex space-x-2">
        {/* Dot 1 */}
        <span className="w-3 h-3 rounded-full bg-[#5bbbe0] animate-[scaleDot_1.5s_linear_infinite]" />
        {/* Dot 2 */}
        <span className="w-3 h-3 rounded-full bg-[#26afe4] animate-[scaleDot_1.5s_linear_infinite_0.2s]" />
        {/* Dot 3 */}
        <span className="w-3 h-3 rounded-full bg-[#0074a0] animate-[scaleDot_1.5s_linear_infinite_0.4s]" />
        {/* Dot 4 */}
        <span className="w-3 h-3 rounded-full bg-[#b90000] animate-[scaleDot_1.5s_linear_infinite_0.6s]" />
        {/* Dot 5 */}
        <span className="w-3 h-3 rounded-full bg-[#ff3d3d] animate-[scaleDot_1.5s_linear_infinite_0.8s]" />
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
};

export default Loading;
