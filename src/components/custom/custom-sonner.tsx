'use client';

import { toast } from 'sonner';
import { Terminal, Lightbulb, CheckCircle, XCircle } from 'lucide-react';
import React from 'react';

// Variant type
type CustomAlertVariant = 'default' | 'info' | 'success' | 'destructive';

interface CustomSonnerProps {
  title: string;
  description: string;
  variant?: CustomAlertVariant;
  duration?: number;
}

// Map variant
const variantMap = {
  default: {
    icon: <Terminal className="h-4 w-4" />,
    color: 'text-gray-600 dark:text-gray-300',
  },
  info: {
    icon: <Lightbulb className="h-4 w-4 text-blue-500" />,
    color: 'text-blue-500',
  },
  success: {
    icon: <CheckCircle className="h-4 w-4 text-green-500" />,
    color: 'text-green-500',
  },
  destructive: {
    icon: <XCircle className="h-4 w-4 text-red-500" />,
    color: 'text-red-500',
  },
};

/**
 * Custom sonner toast function
 */
export const customSonner = ({
  title,
  description,
  variant = 'default',
  duration = 3000,
}: CustomSonnerProps) => {
  const { icon, color } = variantMap[variant];

  toast.custom(
    (t) => (
      <div className="flex items-center mx-28 gap-3 py-2.5 px-4 bg-white/95 backdrop-blur-md dark:bg-neutral-900/95 rounded-2xl 
      shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] border border-neutral-200 dark:border-neutral-800 w-fit max-w-[320px] transition-all duration-300 select-none">
        <div className="flex-shrink-0">{icon}</div>

        <div className={`overflow-hidden ${color} flex flex-col`}>
          <p className="font-bold text-[14px] leading-tight tracking-tight">{title}</p>
          <p className="text-[12px] leading-snug mt-0.5 text-neutral-500 dark:text-neutral-400 font-medium">{description}</p>
        </div>
      </div>
    ),
    {
      duration,
      position: 'top-center',
    }
  );
};
