'use client';

import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface StatCardProps {
    title: string;
    value: string | number;
    change: number;
    icon: LucideIcon;
    iconClassName?: string;
    bgClassName?: string;
    isLoading?: boolean;
    upFromYesterdayText?: string;
    downFromYesterdayText?: string;
    className?: string;
}

export const StatCard = ({
    title,
    value,
    change,
    icon: Icon,
    iconClassName,
    bgClassName,
    isLoading,
    upFromYesterdayText = 'Up from yesterday',
    downFromYesterdayText = 'Down from yesterday',
    className
}: StatCardProps) => {
    const isPositive = change >= 0;

    if (isLoading) {
        return (
            <Card className={cn("shadow-sm border-none rounded-3xl", className)}>
                <CardContent className="p-6">
                    <div className="flex flex-col space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-10 w-32" />
                            </div>
                            <Skeleton className="h-14 w-14 rounded-2xl" />
                        </div>
                        <Skeleton className="h-4 w-40" />
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className={cn("shadow-sm border-none rounded-3xl overflow-hidden bg-white", className)}>
            <CardContent className="p-7">
                <div className="flex items-start justify-between">
                    <div className="space-y-3">
                        <p className="text-[17px] font-medium text-gray-400 font-serif">{title}</p>
                        <h3 className="text-4xl font-bold text-slate-600 tracking-tight font-serif">
                            {typeof value === 'number' ? value.toLocaleString() : value}
                        </h3>
                    </div>
                    <div className={cn("p-4 rounded-[28%] flex items-center justify-center", bgClassName)}>
                        <Icon className={cn("h-8 w-8", iconClassName)} />
                    </div>
                </div>
                <div className="mt-8 flex items-center gap-2">
                    <div className="flex items-center gap-1">
                        {isPositive ? (
                            <TrendingUp className="h-5 w-5 text-[#05CD99]" />
                        ) : (
                            <TrendingDown className="h-5 w-5 text-red-500" />
                        )}
                        <span className={cn("text-base font-bold", isPositive ? "text-[#05CD99]" : "text-red-500")}>
                            {Math.abs(change)}%
                        </span>
                    </div>
                    <span className="text-base text-slate-500 font-medium font-serif">
                        {isPositive ? upFromYesterdayText : downFromYesterdayText}
                    </span>
                </div>
            </CardContent>
        </Card>
    );
};
