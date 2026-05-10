"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User as UserIcon,
  Mail,
  Calendar,
  Shield,
  Activity,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { userProfileService } from "@/services/user-service";
import { userQueryKeys, User } from "@/hooks/use-users";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface UserDetailModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

export function UserDetailModal({
  user,
  isOpen,
  onClose,
}: UserDetailModalProps) {
  // 1. Fetch deep detail when modal opens
  const { data: userDetail, isLoading } = useQuery({
    queryKey: userQueryKeys.detail(user?.id || ""),
    queryFn: () => userProfileService.getUserDetail(user?.id || ""),
    enabled: !!user?.id && isOpen,
  });

  if (!user && !isOpen) return null;

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
        <div className="relative h-32 bg-gradient-to-r from-[#4318FF] to-[#868CFF]">
          <div className="absolute -bottom-12 left-8">
            <div className="relative">
              <Avatar className="h-24 w-24 border-4 border-white shadow-xl">
                <AvatarImage
                  src={user?.avatarUrl}
                  alt={user?.fullName}
                  className="object-cover"
                />
                <AvatarFallback className="bg-slate-100 text-[#4318FF] text-2xl font-bold">
                  {user?.fullName?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div
                className={cn(
                  "absolute bottom-1 right-1 h-5 w-5 rounded-full border-2 border-white shadow-sm",
                  user?.isActive ? "bg-green-500" : "bg-red-500",
                )}
              />
            </div>
          </div>
        </div>

        <div className="pt-14 pb-8 px-8">
          <DialogHeader className="flex flex-row items-center justify-between space-y-0">
            <div className="space-y-1">
              <DialogTitle className="text-2xl font-black text-slate-800">
                {user?.fullName}
              </DialogTitle>
              <div className="flex items-center gap-2 text-slate-400 font-medium text-sm">
                <Shield
                  size={14}
                  className={
                    user?.role === "admin" ? "text-purple-500" : "text-blue-500"
                  }
                />
                <span className="capitalize">{user?.role}</span>
                <span>•</span>
                <span className="text-xs uppercase tracking-wider font-bold">
                  ID: {user?.id.slice(-8)}
                </span>
              </div>
            </div>
            <Badge
              variant={user?.isActive ? "default" : "destructive"}
              className={cn(
                "px-3 py-1 rounded-full font-bold shadow-sm",
                user?.isActive
                  ? "bg-green-100 text-green-600 hover:bg-green-100"
                  : "bg-red-100 text-red-600 hover:bg-red-100",
              )}
            >
              {user?.isActive ? (
                <div className="flex items-center gap-1">
                  <CheckCircle2 size={12} />
                  <span>Hoạt động</span>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <XCircle size={12} />
                  <span>Đã khóa</span>
                </div>
              )}
            </Badge>
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
              {/* Personal Information */}
              <section>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <UserIcon size={14} />
                  Thông tin cá nhân
                </h3>
                <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                  <InfoItem
                    icon={<Mail size={16} />}
                    label="Email"
                    value={user?.email}
                  />
                  <InfoItem
                    icon={<Phone size={16} />}
                    label="Số điện thoại"
                    value={userDetail?.profile?.phoneNumber || "Chưa cập nhật"}
                  />
                  <InfoItem
                    icon={<MapPin size={16} />}
                    label="Địa chỉ"
                    value={userDetail?.profile?.address || "Chưa cập nhật"}
                    className="col-span-2"
                  />
                </div>
              </section>

              {/* Account Activity */}
              <section>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Activity size={14} />
                  Hoạt động hệ thống
                </h3>
                <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                  <InfoItem
                    icon={<Calendar size={16} />}
                    label="Ngày tham gia"
                    value={formatDate(user?.createdAt)}
                  />
                  <InfoItem
                    icon={<Clock size={16} />}
                    label="Cập nhật gần nhất"
                    value={formatDate(userDetail?.updatedAt || user?.createdAt)}
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
