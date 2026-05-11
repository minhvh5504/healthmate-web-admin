"use client";

import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation(["medicine", "common"]);
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
        <div className="relative bg-gradient-to-r from-[#4318FF] to-[#868CFF] px-8 pt-12 pb-16">
          <div className="flex items-end gap-6">
            <div className="relative">
              <div className="h-32 w-32 rounded-3xl bg-white border-4 border-white shadow-2xl flex items-center justify-center overflow-hidden">
                <Pill size={64} className="text-[#4318FF]/20" />
              </div>
            </div>
            <div className="pb-2 flex-1">
              <DialogTitle className="text-2xl font-black text-white drop-shadow-sm mb-2">
                {medicine?.name}
              </DialogTitle>
              <div className="flex items-center gap-2 text-blue-50 font-medium text-sm">
                <FlaskConical size={14} className="text-blue-200" />
                <span className="italic">{medicine?.genericName || "N/A"}</span>
                <span className="opacity-40">•</span>
                <span className="text-[10px] uppercase tracking-widest font-bold opacity-80">
                  ID: {medicine?.id.slice(-8)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="pb-8 px-8">
          <Separator className="mb-8 bg-slate-100" />

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
                  {t("medicine:info")}
                </h3>
                <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                  <InfoItem
                    icon={<Pill size={16} />}
                    label={t("medicine:form")}
                    value={(() => {
                      const val = medicineDetail?.form || medicine?.form;
                      return val
                        ? t(`medicine:forms.${val.toLowerCase()}`, {
                            defaultValue: val,
                          })
                        : undefined;
                    })()}
                  />
                  <InfoItem
                    icon={<Activity size={16} />}
                    label={t("medicine:dosage")}
                    value={medicineDetail?.dosage || medicine?.dosage}
                  />
                  <InfoItem
                    icon={<Factory size={16} />}
                    label={t("medicine:manufacturer")}
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
                  {t("medicine:description")}
                </h3>
                <div className="bg-slate-50 rounded-2xl p-4 text-sm text-slate-600 leading-relaxed min-h-[80px]">
                  {medicineDetail?.description ||
                    t("medicine:messages.noDescription")}
                </div>
              </section>

              {/* Activity */}
              <section>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Calendar size={14} />
                  {t("medicine:systemData")}
                </h3>
                <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                  <InfoItem
                    icon={<Calendar size={16} />}
                    label={t("medicine:createdAt")}
                    value={formatDate(medicine?.createdAt)}
                  />
                  <InfoItem
                    icon={<Clock size={16} />}
                    label={t("medicine:updatedAt")}
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
      <div className="flex items-center gap-2 text-slate-400 group-hover:text-[#4318FF] transition-colors">
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
