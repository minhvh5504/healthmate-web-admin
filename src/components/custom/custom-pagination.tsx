'use client';

import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils'; // Sử dụng hàm cn để gộp class Tailwind

// Định nghĩa các loại variant
type CustomPaginationVariant = 'default' | 'flat' | 'rounded';

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  variant?: CustomPaginationVariant;
}

export const CustomPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  variant = 'default',
}: CustomPaginationProps) => {
  const generatePageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const getPageItemClassName = (page: number) => {
    const baseClass = 'font-semibold text-sm';
    const activeClass =
      variant === 'flat'
        ? 'bg-blue-100 text-blue-600'
        : variant === 'rounded'
          ? 'bg-blue-600 text-white rounded-full'
          : 'bg-blue-600 text-white';

    const inactiveClass =
      variant === 'rounded'
        ? 'bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-full'
        : 'hover:bg-gray-200 text-gray-700';

    return cn(baseClass, currentPage === page ? activeClass : inactiveClass);
  };

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => onPageChange(currentPage - 1)}
            aria-disabled={currentPage === 1}
            className={cn('text-gray-500', currentPage === 1 && 'pointer-events-none opacity-50')}
          />
        </PaginationItem>

        {/* Page Numbers */}
        {generatePageNumbers().map(page => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              onClick={() => onPageChange(page)}
              className={getPageItemClassName(page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Ellipsis */}
        {totalPages > 5 && currentPage < totalPages - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() => onPageChange(currentPage + 1)}
            aria-disabled={currentPage === totalPages}
            className={cn(
              'text-gray-500',
              currentPage === totalPages && 'pointer-events-none opacity-50'
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
