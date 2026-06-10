"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

type Props = React.ComponentProps<typeof Button> & {
  children?: React.ReactNode;
};

export default function CustomSidebarTrigger({
  className,
  children,
  onClick,
  ...props
}: Props) {
  const { toggleSidebar, state } = useSidebar() as {
    toggleSidebar: () => void;
    state?: "expanded" | "collapsed" | string;
  };
  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={cn(
        state === "collapsed"
          ? "size-9 rounded-xl text-slate-500 transition-colors hover:bg-[#007BFF]/10 hover:text-[#007BFF]"
          : "size-8",
        className,
      )}
      onClick={(e) => {
        onClick?.(e);
        toggleSidebar();
      }}
      {...props}
    >
      {children ?? (
        <Bars3BottomLeftIcon
          className={cn(
            state === "collapsed"
              ? "size-5 rotate-180 transition-transform duration-200"
              : "size-6 text-gray-500",
          )}
        />
      )}
    </Button>
  );
}
