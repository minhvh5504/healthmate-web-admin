'use client';

import { X, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

type Tab = 'all' | 'hotel_requests' | 'hotel_schedule';

interface NotificationPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function NotificationPanel({ isOpen, onClose }: NotificationPanelProps) {
    const [activeTab, setActiveTab] = useState<Tab>('all');

    return (
        <div
            className={cn(
                "absolute -right-0 top-full mt-2 z-50 w-[400px] overflow-hidden rounded-xl border bg-white shadow-xl transition-all duration-300 ease-in-out origin-top-right",
                isOpen ? "opacity-100 translate-y-0 visible scale-100" : "opacity-0 -translate-y-2 invisible scale-95 pointer-events-none"
            )}
        >
            {/* Header */}
            <div className="flex items-center justify-between border-b p-4">
                <h2 className="text-lg font-semibold text-slate-900">Notification</h2>
                <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 text-slate-500 hover:text-slate-900">
                    <X className="h-4 w-4" />
                </Button>
            </div>

            {/* Tabs */}
            <div className="border-b px-4 py-3">
                <div className="flex items-center gap-2 rounded-lg bg-slate-100 p-1">
                    <button
                        onClick={() => setActiveTab('all')}
                        className={cn(
                            "flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-all",
                            activeTab === 'all'
                                ? "bg-white text-slate-900 shadow-sm"
                                : "text-slate-500 hover:text-slate-900"
                        )}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setActiveTab('hotel_requests')}
                        className={cn(
                            "flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-all",
                            activeTab === 'hotel_requests'
                                ? "bg-white text-slate-900 shadow-sm"
                                : "text-slate-500 hover:text-slate-900"
                        )}
                    >
                        Hotel requests
                    </button>
                    <button
                        onClick={() => setActiveTab('hotel_schedule')}
                        className={cn(
                            "flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-all",
                            activeTab === 'hotel_schedule'
                                ? "bg-white text-slate-900 shadow-sm"
                                : "text-slate-500 hover:text-slate-900"
                        )}
                    >
                        Hotel schedule
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex h-[400px] flex-col items-center justify-center p-8 text-center">
                <div className="mb-4 rounded-full bg-slate-100 p-4">
                    <Bell className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="mb-1 text-sm font-semibold text-slate-900">Empty notification</h3>
                <p className="text-xs text-slate-500">New notifications will appear here</p>
            </div>
        </div>
    );
}
