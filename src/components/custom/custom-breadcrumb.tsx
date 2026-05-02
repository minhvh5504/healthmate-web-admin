'use client';
import React from 'react';
import Link from 'next/link';

// Định nghĩa kiểu dữ liệu cho từng mục trong breadcrumb
interface BreadcrumbItem {
  label: string;
  href: string;
}

// Định nghĩa các loại variant
type CustomBreadcrumbVariant = 'default' | 'simple';

interface CustomBreadcrumbProps {
  items: BreadcrumbItem[];
  variant?: CustomBreadcrumbVariant;
}

export const CustomBreadcrumb = ({ items, variant = 'default' }: CustomBreadcrumbProps) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-2 sm:space-x-3">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.label}>
              <div className="flex items-center">
                {index > 0 && (
                  <svg
                    className={`w-3 h-3 mx-1 ${variant === 'simple' ? 'hidden' : 'text-gray-400'}`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                )}
                {isLast ? (
                  <span
                    className={`text-sm font-medium ${variant === 'default' ? 'text-gray-500' : 'text-blue-500'}`}
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className={`text-sm font-medium ${variant === 'default' ? 'text-gray-700 hover:text-blue-600' : 'text-blue-500'}`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
