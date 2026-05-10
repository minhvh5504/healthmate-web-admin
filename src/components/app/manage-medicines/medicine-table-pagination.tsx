"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MedicineTablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function MedicineTablePagination({
  currentPage,
  totalPages,
  onPageChange,
}: MedicineTablePaginationProps) {
  return (
    <div className="px-6 py-4 flex items-center justify-between mt-2">
      <p className="text-xs text-slate-400">
        Trang <span className="text-slate-700 font-bold ml-1">{currentPage}</span>{" "}
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
        <Button className="h-8 w-8 rounded-lg bg-[#4318FF] text-white text-xs font-bold shadow-md shadow-blue-200 cursor-default transition-all">
          {currentPage}
        </Button>
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
