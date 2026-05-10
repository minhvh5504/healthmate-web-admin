"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface UserTablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function UserTablePagination({
  currentPage,
  totalPages,
  onPageChange,
}: UserTablePaginationProps) {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      if (i > 0) pages.push(i);
    }
    return pages;
  };

  return (
    <div className="px-6 py-4 flex items-center justify-between mt-2">
      <p className="text-xs text-slate-400">
        Trang{" "}
        <span className="text-slate-700 font-bold ml-1">{currentPage}</span>{" "}
        trong tổng số {totalPages || 1}
      </p>
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-lg text-gray-400 hover:text-[#4318FF] hover:bg-[#4318FF]/10 disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {getPageNumbers().map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "ghost"}
            className={
              currentPage === page
                ? "h-8 w-8 rounded-lg bg-[#4318FF] text-white text-xs font-bold shadow-md shadow-blue-200"
                : "h-8 w-8 rounded-lg text-gray-400 hover:text-[#4318FF] hover:bg-[#4318FF]/10 text-xs font-bold"
            }
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        ))}

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-lg text-gray-400 hover:text-[#4318FF] hover:bg-[#4318FF]/10 disabled:opacity-50"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
