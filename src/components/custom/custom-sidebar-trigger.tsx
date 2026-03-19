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
      className={cn("size-8", className)}
      onClick={(e) => {
        onClick?.(e);
        toggleSidebar();
      }}
      {...props}
    >
      {children ?? ( <Bars3BottomLeftIcon className="size-6 text-gray-500" />)}
    </Button>
  );
}
