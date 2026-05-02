"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { useRecentUsers } from "@/hooks/use-dashboard";
import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function RecentUserTable() {
  const { t } = useTranslation(["dashboard"]);
  const { data: users, isLoading } = useRecentUsers();

  // Format date and time
  const formatDateTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return {
        time: format(date, "HH:mm"),
        date: format(date, "dd/MM/yyyy"),
      };
    } catch {
      return { time: "-", date: "-" };
    }
  };

  if (isLoading) {
    return (
      <div className="w-full space-y-4">
        {[...Array(5)].map((_, index) => (
          <Skeleton key={index} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className="w-full py-12 text-center">
        <p className="text-gray-500">
          {t("dashboard:common.noData") || "No recent users found"}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-auto">
      <Table className="min-w-full table-fixed">
        <TableHeader>
          <TableRow className="border-b border-gray-100 hover:bg-transparent">
            {/* 1. STT */}
            <TableHead className="w-[80px] font-bold text-gray-400 text-xs text-center uppercase tracking-wider">
              {t("dashboard:table.stt")}
            </TableHead>
            {/* 2. User */}
            <TableHead className="w-1/4 font-bold text-gray-400 text-xs text-center uppercase tracking-wider">
              {t("dashboard:table.user")}
            </TableHead>
            {/* 3. Email */}
            <TableHead className="w-1/4 font-bold text-gray-400 text-xs text-center uppercase tracking-wider">
              {t("dashboard:table.email")}
            </TableHead>
            {/* 4. Phone */}
            <TableHead className="w-1/6 font-bold text-gray-400 text-xs text-center uppercase tracking-wider">
              {t("dashboard:table.phone")}
            </TableHead>
            {/* 5. Joined At */}
            <TableHead className="w-1/6 font-bold text-gray-400 text-xs text-center uppercase tracking-wider">
              {t("dashboard:table.joinedAt")}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => {
            const { time, date } = formatDateTime(user.createdAt);

            return (
              <TableRow
                key={user.id}
                className="border-b border-gray-50 hover:bg-gray-50/50 h-16"
              >
                {/* 1. STT */}
                <TableCell className="text-center font-medium text-slate-600 text-xs">
                  {index + 1}
                </TableCell>
                {/* 2. User */}
                <TableCell className="text-left px-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.fullName} />
                      <AvatarFallback>
                        {user.fullName.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-slate-700 text-xs font-semibold">
                      {user.fullName}
                    </span>
                  </div>
                </TableCell>
                {/* 3. Email */}
                <TableCell className="text-center text-slate-500 text-xs">
                  {user.email}
                </TableCell>
                {/* 4. Phone */}
                <TableCell className="text-center text-slate-500 text-xs">
                  {user.phoneNumber || "-"}
                </TableCell>
                {/* 5. Joined At */}
                <TableCell className="text-center text-slate-500 text-xs">
                  {date} - {time}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
