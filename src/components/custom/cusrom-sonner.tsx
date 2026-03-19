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

// Hàm gọi sonner tuỳ chỉnh
export const customSonner = ({
  title,
  description,
  variant = 'default',
  duration = 3000,
}: CustomSonnerProps) => {
  const { icon, color } = variantMap[variant];

  toast.custom(
    () => (
      <div className="flex items-start gap-3 p-3 bg-white dark:bg-neutral-900 rounded-md shadow-lg border border-neutral-200 dark:border-neutral-700 max-w-[380px]">
        <div className="mt-1">{icon}</div>

        <div className={`flex-1 ${color}`}>
          <p className="font-semibold">{title}</p>
          <p className="text-sm mt-0.5 text-neutral-600 dark:text-neutral-300">{description}</p>
        </div>
      </div>
    ),
    {
      duration,
      position: 'top-center',
    }
  );
};
