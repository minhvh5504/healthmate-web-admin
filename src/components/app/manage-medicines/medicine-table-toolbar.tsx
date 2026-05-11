"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

interface MedicineTableToolbarProps {
  title: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onAddClick?: () => void;
}

export function MedicineTableToolbar({
  title,
  searchValue,
  onSearchChange,
  onAddClick,
}: MedicineTableToolbarProps) {
  const { t } = useTranslation(["medicine"]);
  return (
    <div className="p-4 px-6 border-b border-gray-50">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-lg font-bold text-slate-800">{title}</h2>
        <div className="flex items-center gap-3">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder={t("medicine:placeholders.search")}
              className="pl-10 h-10 bg-slate-50 border-0 rounded-xl text-sm focus-visible:ring-1 focus-visible:ring-blue-100"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <Button
            onClick={onAddClick}
            className="bg-[#4318FF] hover:bg-[#3311cc] text-white rounded-xl px-6 h-10 font-bold shadow-md shadow-blue-200 transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">{t("medicine:addMedicine")}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
