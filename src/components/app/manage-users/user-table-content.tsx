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
import { Eye, Ban, LockOpen, Trash2, UserCircle, Shield } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { User } from "@/hooks/use-users";
import { useTranslation } from "react-i18next";

interface UserTableContentProps {
  users: User[];
  isLoading: boolean;
  isError: boolean;
  noDataText: string;
  onView: (user: User) => void;
  onToggleStatus: (user: User) => void;
  onDelete: (user: User) => void;
  startIndex: number;
}

export function UserTableContent({
  users,
  isLoading,
  isError,
  noDataText,
  onView,
  onToggleStatus,
  onDelete,
  startIndex,
}: UserTableContentProps) {
  const { t, i18n } = useTranslation("user");
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
      i18n.language === "vi" ? "vi-VN" : "en-US",
    );
  };

  const getStatusColor = (user: User) => {
    if (!user.isActive) return "bg-red-400";
    return "bg-green-500";
  };

  return (
    <div className="overflow-x-auto px-2">
      <Table className="min-w-full">
        <TableHeader>
          <TableRow className="border-0 hover:bg-transparent h-14">
            <TableHead className="font-bold text-slate-400 text-[11px] uppercase tracking-wider text-center w-[60px]">
              {t("table.stt")}
            </TableHead>
            <TableHead className="font-bold text-slate-400 text-[11px] uppercase tracking-wider">
              {t("table.user")}
            </TableHead>
            <TableHead className="font-bold text-slate-400 text-[11px] uppercase tracking-wider text-center">
              {t("table.role")}
            </TableHead>
            <TableHead className="font-bold text-slate-400 text-[11px] uppercase tracking-wider text-center">
              {t("table.createdAt")}
            </TableHead>
            <TableHead className="font-bold text-slate-400 text-[11px] uppercase tracking-wider text-center">
              {t("table.status")}
            </TableHead>
            <TableHead className="font-bold text-slate-400 text-[11px] uppercase tracking-wider text-center w-[150px]">
              {t("table.actions")}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            [...Array(5)].map((_, index) => (
              <TableRow key={index} className="h-[64px] border-0">
                <TableCell colSpan={6} className="text-center py-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[150px]" />
                      <Skeleton className="h-3 w-[100px]" />
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
                {t("table.errorLoading")}
              </TableCell>
            </TableRow>
          ) : users.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-12 text-slate-400 italic"
              >
                {noDataText}
              </TableCell>
            </TableRow>
          ) : (
            users.map((user, index) => (
              <TableRow
                key={user.id}
                className="border-0 hover:bg-slate-50/50 transition-colors h-[64px]"
              >
                <TableCell className="text-center text-[14px] text-slate-600 font-bold">
                  {startIndex + index + 1}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
                      {user.avatarUrl ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={user.avatarUrl}
                            alt={user.fullName}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <UserCircle className="text-slate-400" size={24} />
                      )}
                    </div>
                    <div>
                      <p className="text-[14px] font-bold text-slate-700">
                        {user.fullName}
                      </p>
                      <p className="text-[12px] text-slate-400">{user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div
                    className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-bold",
                      user.role === "admin"
                        ? "bg-purple-100 text-purple-600"
                        : "bg-blue-100 text-blue-600",
                    )}
                  >
                    {user.role === "admin" ? <Shield size={12} /> : null}
                    {user.role.toUpperCase()}
                  </div>
                </TableCell>
                <TableCell className="text-center text-[14px] text-slate-600 font-medium">
                  {formatDate(user.createdAt)}
                </TableCell>
                <TableCell className="text-center">
                  <span
                    className={cn(
                      "inline-flex items-center justify-center rounded-full px-4 py-1.5 text-xs font-bold text-white shadow-sm",
                      getStatusColor(user),
                    )}
                  >
                    {user.isActive ? t("table.active") : t("table.inactive")}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-blue-500 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                      onClick={() => onView(user)}
                    >
                      <Eye size={18} />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className={cn(
                        "h-8 w-8 transition-colors",
                        user.isActive
                          ? "text-amber-500 hover:text-amber-700 hover:bg-amber-50"
                          : "text-green-500 hover:text-green-700 hover:bg-green-50",
                      )}
                      onClick={() => onToggleStatus(user)}
                    >
                      {user.isActive ? <Ban size={18} /> : <LockOpen size={18} />}
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                      onClick={() => onDelete(user)}
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
