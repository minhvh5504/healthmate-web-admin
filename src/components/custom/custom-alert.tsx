'use client';
import React, { useEffect, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, Lightbulb, CheckCircle, XCircle } from 'lucide-react'; // Đảm bảo đã cài đặt lucide-react

// Định nghĩa các loại variant
type CustomAlertVariant = 'default' | 'info' | 'success' | 'destructive';

interface CustomAlertProps {
  title: string;
  description: string;
  variant?: CustomAlertVariant;
  show: boolean;
  onClose: () => void;
  duration?: number;
}

const variantMap = {
  default: {
    icon: <Terminal className="h-4 w-4" />,
    color: 'text-gray-600 dark:text-gray-400',
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

export const CustomAlert = ({
  title,
  description,
  show,
  onClose,
  duration = 3000,
  variant = 'default',
}: CustomAlertProps) => {
  const { icon, color } = variantMap[variant];
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setVisible(true);
      if (duration) {
        const timer = setTimeout(() => {
          handleClose();
        }, duration);
        return () => clearTimeout(timer);
      }
    }
  }, [show, duration]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div
      className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
      }`}
    >
      <Alert className={`flex items-start ${color} max-w-[400px]`}>
        <div className="flex-shrink-0 mr-4 mt-1">{icon}</div>
        <div className="flex-grow">
          <AlertTitle className="font-bold">{title}</AlertTitle>
          <AlertDescription className="text-sm">{description}</AlertDescription>
        </div>
      </Alert>
    </div>
  );
};
