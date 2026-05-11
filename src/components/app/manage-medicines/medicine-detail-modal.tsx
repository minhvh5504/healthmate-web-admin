"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Pill,
  Factory,
  FileText,
  Calendar,
  Clock,
  FlaskConical,
  Activity,
  Info,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { medicationService, Medication } from "@/services/medication-service";
import { medicationQueryKeys } from "@/hooks/use-medications";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface MedicineDetailModalProps {
  medicine: Medication | null;
  isOpen: boolean;
  onClose: () => void;
}

export function MedicineDetailModal({
  medicine,
  isOpen,
  onClose,
}: MedicineDetailModalProps) {
  // 1. Fetch deep detail when modal opens
  const { data: medicineDetail, isLoading } = useQuery({
    queryKey: medicationQueryKeys.detail(medicine?.id || ""),
    queryFn: () => medicationService.getMedicationDetail(medicine?.id || ""),
    enabled: !!medicine?.id && isOpen,
  });

  if (!medicine && !isOpen) return null;

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden border-none shadow-2xl rounded-3xl">
        {/* Header with Background Gradient */}
        <div className="relative h-40 bg-gradient-to-r from-blue-600 to-indigo-700">
          <div className="absolute -bottom-16 left-8 flex items-end gap-6">
            <div className="relative">
              <div className="h-32 w-32 rounded-3xl bg-white border-4 border-white shadow-2xl flex items-center justify-center overflow-hidden">
                <Pill size={64} className="text-blue-500/20" />
              </div>
            </div>
            <div className="pb-4">
              <DialogTitle className="text-2xl font-black text-white drop-shadow-sm">
                {medicine?.name}
              </DialogTitle>
            </div>
          </div>
        </div>

        <div className="pt-20 pb-8 px-8">
          <DialogHeader className="flex flex-row items-center justify-between space-y-0">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-slate-400 font-medium text-sm">
                <FlaskConical size={14} className="text-blue-500" />
                <span className="italic">{medicine?.genericName || "N/A"}</span>
                <span>•</span>
                <span className="text-xs uppercase tracking-wider font-bold">
                  ID: {medicine?.id.slice(-8)}
                </span>
              </div>
            </div>
          </DialogHeader>

          <Separator className="my-6 bg-slate-100" />

          {isLoading ? (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-6 w-full" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Basic Information */}
              <section>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Info size={14} />
                  Thông tin cơ bản
                </h3>
                <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                  <InfoItem
                    icon={<Pill size={16} />}
                    label="Dạng bào chế"
                    value={medicineDetail?.form || medicine?.form}
                  />
                  <InfoItem
                    icon={<Activity size={16} />}
                    label="Liều lượng"
                    value={medicineDetail?.dosage || medicine?.dosage}
                  />
                  <InfoItem
                    icon={<Factory size={16} />}
                    label="Nhà sản xuất"
                    value={
                      medicineDetail?.manufacturer || medicine?.manufacturer
                    }
                    className="col-span-2"
                  />
                </div>
              </section>

              {/* Description */}
              <section>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <FileText size={14} />
                  Mô tả & Chỉ định
                </h3>
                <div className="bg-slate-50 rounded-2xl p-4 text-sm text-slate-600 leading-relaxed min-h-[80px]">
                  {medicineDetail?.description || "Không có mô tả chi tiết."}
                </div>
              </section>

              {/* Activity */}
              <section>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Calendar size={14} />
                  Dữ liệu hệ thống
                </h3>
                <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                  <InfoItem
                    icon={<Calendar size={16} />}
                    label="Ngày thêm"
                    value={formatDate(medicine?.createdAt)}
                  />
                  <InfoItem
                    icon={<Clock size={16} />}
                    label="Cập nhật cuối"
                    value={formatDate(
                      medicineDetail?.updatedAt || medicine?.createdAt,
                    )}
                  />
                </div>
              </section>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function InfoItem({
  icon,
  label,
  value,
  className,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
  className?: string;
}) {
  return (
    <div className={cn("space-y-1.5 group", className)}>
      <div className="flex items-center gap-2 text-slate-400 group-hover:text-blue-600 transition-colors">
        {icon}
        <span className="text-[11px] font-bold uppercase tracking-wider">
          {label}
        </span>
      </div>
      <p className="text-[14px] font-semibold text-slate-700 break-all pl-6">
        {value || "—"}
      </p>
    </div>
  );
}
