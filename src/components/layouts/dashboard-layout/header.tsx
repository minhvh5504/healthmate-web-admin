"use client";

import CustomSidebarTrigger from "@/components/custom/custom-sidebar-trigger";
import ProfileDropdownRow from "./profile-dropdown";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import NotificationPanel from "./notification-panel";
import { useState } from "react";

export default function PageHeader({ className = "" }: { className?: string }) {
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    return (
        <header
            className={
                "flex h-16 items-center justify-between bg-white px-4 shadow-sm " + className
            }
        >
            <div className="flex items-center gap-4">
                <CustomSidebarTrigger />
            </div>

            <div className="flex items-center gap-4">
                <div className="relative">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="relative h-10 w-10 text-gray-500 hover:text-gray-700"
                        onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                    >
                        <Bell className="h-6 w-6" />
                    </Button>
                    <NotificationPanel
                        isOpen={isNotificationOpen}
                        onClose={() => setIsNotificationOpen(false)}
                    />
                </div>

                {/* Vertical Divider */}
                <div className="h-8 w-px bg-gray-300" />

                <ProfileDropdownRow
                    className="hover:bg-transparent px-0 py-0 mr-4"
                    side="bottom"
                    align="end"
                />
            </div>
        </header>
    );
}
