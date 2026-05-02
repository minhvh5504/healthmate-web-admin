"use client";

import { Users, UserCheck, UserMinus, TrendingUp } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DashboardChart } from "@/components/app/dashboard/dashboard-chart";
import { RecentUserTable } from "@/components/app/dashboard/recent-user-table";
import { useDashboardStats } from "@/hooks/use-dashboard";
import { useTranslation } from "react-i18next";
import { StatCard } from "@/components/custom/stat-card";

export default function DashboardForm() {
  const { t } = useTranslation(["dashboard"]);
  const [chartPeriod, setChartPeriod] = useState<"week" | "month" | "year">(
    "year",
  );

  // Fetch statistics
  const { data: dashboardStats, isLoading } = useDashboardStats();

  // Stats configuration mapping backend data
  const stats = [
    {
      title: t("dashboard:stats.totalUser", { defaultValue: "Total Users" }),
      value: dashboardStats?.users?.total || 0,
      change: dashboardStats?.users?.change || 0,
      icon: Users,
      bgClassName: "bg-[#E9EDF7]",
      iconClassName: "text-[#4318FF]",
      isLoading,
    },
    {
      title: t("dashboard:stats.activeUsers", { defaultValue: "Active Users" }),
      value: dashboardStats?.users?.active || 0,
      change: 0,
      icon: UserCheck,
      bgClassName: "bg-[#E6FFFA]",
      iconClassName: "text-[#05CD99]",
      isLoading,
    },
    {
      title: t("dashboard:stats.inactiveUsers", {
        defaultValue: "Inactive Users",
      }),
      value:
        (dashboardStats?.users?.total || 0) -
        (dashboardStats?.users?.active || 0),
      change: 0,
      icon: UserMinus,
      bgClassName: "bg-[#FFF9EC]",
      iconClassName: "text-[#FFB547]",
      isLoading,
    },
    {
      title: t("dashboard:stats.growthRate", { defaultValue: "Growth Rate" }),
      value: `${dashboardStats?.users?.change || 0}%`,
      change: dashboardStats?.users?.change || 0,
      icon: TrendingUp,
      bgClassName: "bg-[#FFE2E5]",
      iconClassName: "text-[#F56565]",
      isLoading,
    },
  ];

  return (
    <div className="space-y-6 py-4 px-2">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            {...stat}
            upFromYesterdayText={t("dashboard:stats.upFromYesterday")}
            downFromYesterdayText={t("dashboard:stats.downFromYesterday")}
          />
        ))}
      </div>

      {/* User Statistics Chart */}
      <Card className="shadow-sm border-none">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-gray-800">
              {t("dashboard:sections.userStatistics", {
                defaultValue: "User Statistics",
              })}
            </CardTitle>
            <Select
              value={chartPeriod}
              onValueChange={(value) =>
                setChartPeriod(value as typeof chartPeriod)
              }
            >
              <SelectTrigger className="w-32 bg-white border-gray-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">
                  {t("dashboard:periods.weekly")}
                </SelectItem>
                <SelectItem value="month">
                  {t("dashboard:periods.monthly")}
                </SelectItem>
                <SelectItem value="year">
                  {t("dashboard:periods.yearly")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <DashboardChart period={chartPeriod} />
        </CardContent>
      </Card>

      {/* Recent Users Table */}
      <Card className="shadow-sm border-none">
        <CardHeader className="pb-0">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-gray-800">
              {t("dashboard:sections.recentUsers", {
                defaultValue: "Recent Users",
              })}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <RecentUserTable />
        </CardContent>
      </Card>
    </div>
  );
}
