"use client";

import CustomSidebarTrigger from "@/components/custom/custom-sidebar-trigger";
import ProfileDropdownRow from "./profile-dropdown";

export default function PageHeader({ className = "" }: { className?: string }) {
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
                {/* Vertical Divider */}
                <div className="h-8 w-px bg-gray-300" />

                <ProfileDropdownRow
                    className="hover:bg-transparent px-0 py-0 mr-4"
                />
            </div>
        </header>
    );
}
