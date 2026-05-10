"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Check,
  X,
  Eye,
  ChevronLeft,
  ChevronRight,
  Pill,
  ShieldCheck,
  ShieldAlert,
  Edit,
  Trash2,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export interface Medicine {
  id: string;
  name: string;
  genericName?: string;
  form?: string;
  dosage?: string;
  manufacturer?: string;
  isVerified: boolean;
  createdAt: string;
}

export function MedicineTable() {
  const { t } = useTranslation(["dashboard", "common"]);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [activeTab, setActiveTab] = useState<"all" | "verified" | "unverified">(
    "all",
  );

  // Mock data for medicines
  const mockMedicines: Medicine[] = [
    {
      id: "1",
      name: "Paracetamol",
      genericName: "Acetaminophen",
      form: "Tablet",
      dosage: "500mg",
      manufacturer: "GSK",
      isVerified: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Amoxicillin",
      genericName: "Amoxicillin",
      form: "Capsule",
      dosage: "250mg",
      manufacturer: "Abbott",
      isVerified: false,
      createdAt: new Date().toISOString(),
    },
  ];

  const isLoading = false;
  const isError = false;

  const filteredMedicines = mockMedicines.filter((m) => {
    if (activeTab === "all") return true;
    if (activeTab === "verified") return m.isVerified;
    if (activeTab === "unverified") return !m.isVerified;
    return true;
  });

  const totalPages = Math.ceil(filteredMedicines.length / limit);
  const paginatedMedicines = filteredMedicines.slice(
    (page - 1) * limit,
    page * limit,
  );

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 pb-4">
      <div className="p-6 pb-0">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800">Quản lý thuốc</h2>
          <Button className="bg-[#4318FF] hover:bg-[#3311cc] text-white rounded-xl px-6 font-bold shadow-md shadow-blue-200 transition-all">
            + Thêm thuốc mới
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 mb-4 border-b border-gray-50 pb-2 overflow-x-auto">
          {(["all", "verified", "unverified"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setPage(1);
              }}
              className={cn(
                "text-sm font-bold pb-2 transition-colors relative capitalize whitespace-nowrap",
                activeTab === tab ? "text-[#4318FF]" : "text-gray-300",
              )}
            >
              {tab === "all"
                ? "Tất cả"
                : tab === "verified"
                  ? "Đã xác minh"
                  : "Chưa xác minh"}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#4318FF] rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto px-2">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow className="border-0 hover:bg-transparent h-14">
              <TableHead className="font-bold text-slate-400 text-[11px] uppercase tracking-wider text-center w-[60px]">
                STT
              </TableHead>
              <TableHead className="font-bold text-slate-400 text-[11px] uppercase tracking-wider">
                Tên thuốc
              </TableHead>
              <TableHead className="font-bold text-slate-400 text-[11px] uppercase tracking-wider text-center">
                Dạng/Liều lượng
              </TableHead>
              <TableHead className="font-bold text-slate-400 text-[11px] uppercase tracking-wider text-center">
                Nhà sản xuất
              </TableHead>
              <TableHead className="font-bold text-slate-400 text-[11px] uppercase tracking-wider text-center">
                Xác minh
              </TableHead>
              <TableHead className="font-bold text-slate-400 text-[11px] uppercase tracking-wider text-center w-[150px]">
                Thao tác
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              [...Array(5)].map((_, index) => (
                <TableRow key={index} className="h-20 border-0">
                  <TableCell colSpan={6} className="text-center py-4">
                    <Skeleton className="h-4 w-full mx-auto" />
                  </TableCell>
                </TableRow>
              ))
            ) : paginatedMedicines.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-12 text-slate-400 italic"
                >
                  {t("dashboard:common.noData")}
                </TableCell>
              </TableRow>
            ) : (
              paginatedMedicines.map((medicine, index) => (
                <TableRow
                  key={medicine.id}
                  className="border-0 hover:bg-slate-50/50 transition-colors h-20"
                >
                  <TableCell className="text-center text-[13px] text-slate-600 font-bold">
                    {(page - 1) * limit + index + 1}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                        <Pill size={20} />
                      </div>
                      <div>
                        <p className="text-[14px] font-bold text-slate-700">
                          {medicine.name}
                        </p>
                        <p className="text-[12px] text-slate-400 italic">
                          {medicine.genericName}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <p className="text-[13px] font-bold text-slate-600">
                      {medicine.form}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {medicine.dosage}
                    </p>
                  </TableCell>
                  <TableCell className="text-center text-[13px] text-slate-600 font-medium">
                    {medicine.manufacturer}
                  </TableCell>
                  <TableCell className="text-center">
                    <div
                      className={cn(
                        "inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold text-white shadow-sm",
                        medicine.isVerified ? "bg-green-500" : "bg-amber-400",
                      )}
                    >
                      {medicine.isVerified ? (
                        <ShieldCheck size={12} />
                      ) : (
                        <ShieldAlert size={12} />
                      )}
                      {medicine.isVerified ? "Đã duyệt" : "Chờ duyệt"}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-blue-500 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                      >
                        <Edit size={18} />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 flex items-center justify-between mt-2">
        <p className="text-xs text-slate-400">
          Trang <span className="text-slate-700 font-bold ml-1">{page}</span>{" "}
          trong tổng số {totalPages || 1}
        </p>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-lg text-gray-400 hover:text-[#4318FF] hover:bg-[#4318FF]/10 disabled:opacity-50"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button className="h-8 w-8 rounded-lg bg-[#4318FF] text-white text-xs font-bold shadow-md shadow-blue-200 cursor-default transition-all">
            {page}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-lg text-gray-400 hover:text-[#4318FF] hover:bg-[#4318FF]/10 disabled:opacity-50"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
