'use client';

import { useMemo } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Legend } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Skeleton } from '@/components/ui/skeleton';
import { useDashboardChartData } from '@/hooks/use-dashboard';
import { useTranslation } from 'react-i18next';

interface DashboardChartProps {
  period: 'week' | 'month' | 'year';
  date?: string;
}

const chartConfig = {
  users: {
    label: 'Users',
    color: '#05CD99',
  },
} satisfies ChartConfig;

export function DashboardChart({ period, date }: DashboardChartProps) {
  const { t } = useTranslation(['dashboard']);
  const { data: chartData, isLoading } = useDashboardChartData(period, date);

  // Calculate tick interval for X-axis based on data length
  const xAxisInterval = useMemo(() => {
    if (!chartData) return 0;
    const length = chartData.length;
    if (length <= 12) return 0; // Show all
    if (length <= 20) return 1; // Show every other
    return Math.floor(length / 7);
  }, [chartData]);

  if (isLoading) {
    return (
      <div className="h-[400px] w-full">
        <Skeleton className="h-full w-full" />
      </div>
    );
  }

  if (!chartData || chartData.length === 0) {
    return (
      <div className="h-[400px] w-full flex items-center justify-center">
        <div className="text-center text-gray-500">
          <p className="text-lg font-medium">{t('dashboard:chart.noData')}</p>
        </div>
      </div>
    );
  }

  return (
    <ChartContainer config={chartConfig} className="h-[400px] w-full">
      <AreaChart
        data={chartData}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="fillUsers" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-users)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="var(--color-users)" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#e5e7eb"
          vertical={false}
        />
        <XAxis
          dataKey="label"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          interval={xAxisInterval}
          className="text-xs text-muted-foreground"
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          className="text-xs text-muted-foreground"
          domain={[0, 'auto']}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent />}
        />
        <Legend verticalAlign="top" height={36} />
        <Area
          type="monotone"
          dataKey="users"
          stroke="var(--color-users)"
          strokeWidth={2}
          fill="url(#fillUsers)"
          name={t('dashboard:stats.totalUser')}
        />
      </AreaChart>
    </ChartContainer>
  );
}
