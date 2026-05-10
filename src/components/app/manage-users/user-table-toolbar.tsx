'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { UserStatus } from '@/hooks/use-users';

interface UserTableToolbarProps {
    title: string;
    activeTab: UserStatus | 'all';
    onTabChange: (tab: UserStatus | 'all') => void;
}

export function UserTableToolbar({ title, activeTab, onTabChange }: UserTableToolbarProps) {
    return (
        <div className="p-4 px-6 pb-0">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-slate-800">
                    {title}
                </h2>
            </div>

            {/* Tabs - Holla Style */}
            <div className="flex gap-6 mb-4 border-b border-gray-50 pb-2 overflow-x-auto">
                {(['all', 'active', 'inactive'] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => onTabChange(tab)}
                        className={cn(
                            "text-sm font-bold pb-2 transition-colors relative capitalize whitespace-nowrap",
                            activeTab === tab ? "text-[#4318FF]" : "text-gray-300"
                        )}
                    >
                        {tab === 'all' ? 'Tất cả' : tab === 'active' ? 'Hoạt động' : 'Bị khóa'}
                        {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#4318FF] rounded-full" />}
                    </button>
                ))}
            </div>
        </div>
    );
}
