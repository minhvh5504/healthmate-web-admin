"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2 } from "lucide-react";
import { MedicineIcon } from "@/components/icons/medicine-icon";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "react-i18next";
import { Medication } from "@/services/medication-service";

interface MedicineTableContentProps {
  medications: Medication[];
  isLoading: boolean;
  isError: boolean;
  onView: (medication: Medication) => void;
  onEdit: (medication: Medication) => void;
  onDelete: (medication: Medication) => void;
  startIndex: number;
}

export function MedicineTableContent({
  medications,
  isLoading,
  isError,
  onView,
  onEdit,
  onDelete,
  startIndex,
}: MedicineTableContentProps) {
  const { t } = useTranslation(["medicine", "common"]);
  return (
    <div className="overflow-x-auto px-2">
      <Table className="min-w-full">
        <TableHeader>
          <TableRow className="border-0 hover:bg-transparent h-14">
            <TableHead className="font-bold text-slate-400 text-[11px] uppercase tracking-wider text-center w-[60px]">
              {t("medicine:stt")}
            </TableHead>
            <TableHead className="font-bold text-slate-400 text-[11px] uppercase tracking-wider">
              {t("medicine:name")}
            </TableHead>
            <TableHead className="font-bold text-slate-400 text-[11px] uppercase tracking-wider text-center">
              {t("medicine:form")}
            </TableHead>
            <TableHead className="font-bold text-slate-400 text-[11px] uppercase tracking-wider text-center">
              {t("medicine:dosage")}
            </TableHead>
            <TableHead className="font-bold text-slate-400 text-[11px] uppercase tracking-wider text-center">
              {t("medicine:manufacturer")}
            </TableHead>
            <TableHead className="font-bold text-slate-400 text-[11px] uppercase tracking-wider text-center w-[140px]">
              {t("medicine:actions")}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            [...Array(5)].map((_, index) => (
              <TableRow key={index} className="h-[64px] border-0">
                <TableCell colSpan={6} className="text-center py-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-xl" />
                    <div className="space-y-2 text-left">
                      <Skeleton className="h-4 w-[200px]" />
                      <Skeleton className="h-3 w-[150px]" />
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : isError ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-20 text-red-500 italic"
              >
                Error loading data
              </TableCell>
            </TableRow>
          ) : medications.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-12 text-slate-400 italic"
              >
                {t("common:noData")}
              </TableCell>
            </TableRow>
          ) : (
            medications.map((medicine, index) => (
              <TableRow
                key={medicine.id}
                className="border-0 hover:bg-slate-50/50 transition-colors h-[64px]"
              >
                <TableCell className="text-center text-[14px] text-slate-600 font-bold">
                  {startIndex + index + 1}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 flex-shrink-0">
                      <MedicineIcon size={18} />
                    </div>
                    <div>
                      <p className="text-[14px] font-bold text-slate-700 leading-tight">
                        {medicine.name}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <p className="text-[14px] font-bold text-slate-600">
                    {medicine.form
                      ? t(`medicine:forms.${medicine.form.toLowerCase()}`, {
                          defaultValue: medicine.form,
                        })
                      : "N/A"}
                  </p>
                </TableCell>
                <TableCell className="text-center">
                  <p className="text-[14px] font-medium text-slate-500">
                    {medicine.dosage || "N/A"}
                  </p>
                </TableCell>
                <TableCell className="text-center text-[14px] text-slate-600 font-medium">
                  {medicine.manufacturer || "N/A"}
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-blue-500 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                      onClick={() => onView(medicine)}
                    >
                      <Eye size={18} />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-slate-400 hover:text-amber-500 hover:bg-amber-50 transition-colors"
                      onClick={() => onEdit(medicine)}
                    >
                      <Edit size={18} />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                      onClick={() => onDelete(medicine)}
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
  );
}
