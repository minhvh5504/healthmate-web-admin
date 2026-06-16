"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LayoutDashboard, Pill, Power, Users } from "lucide-react";
import type { ElementType } from "react";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { useTranslation } from "react-i18next";

type Item = {
  title: string;
  href: string;
  icon: ElementType<{ className?: string }>;
};

const normalizePath = (path: string) => {
  const parts = path.split("/").filter(Boolean);
  if (parts.length > 0 && parts[0].length === 2) {
    parts.shift();
  }
  return "/" + parts.join("/");
};

const matchPath = (pathname: string | null, href: string) => {
  if (!pathname) return false;
  const normalized = normalizePath(pathname);
  return normalized === href || normalized.startsWith(href + "/");
};

export default function AppSidebar() {
  const { t } = useTranslation(["auth", "dashboard"]);
  const pathname = usePathname();
  const router = useRouter();

  const items: Item[] = [
    {
      title: t("dashboard:sidebar.dashboard"),
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: t("dashboard:sidebar.manageUsers", {
        defaultValue: "Manage User",
      }),
      href: "/manage-users",
      icon: Users,
    },
    {
      title: t("dashboard:sidebar.manageMedicines", {
        defaultValue: "Manage Medicine",
      }),
      href: "/manage-medicines",
      icon: Pill,
    },
  ];

  const [pendingHref, setPendingHref] = useState<string | null>(null);

  useEffect(() => {
    setPendingHref(null);
  }, [pathname]);

  const handleNavigate = useCallback(
    (href: string) => {
      setPendingHref(href);
      router.push(href);
    },
    [router],
  );

  return (
    <Sidebar
      className="border-0 group-data-[collapsible=icon]:border-r group-data-[collapsible=icon]:border-slate-100/80 group-data-[collapsible=icon]:shadow-[8px_0_24px_rgba(15,23,42,0.04)]"
      collapsible="icon"
    >
      <SidebarHeader className="flex items-center justify-center py-4 group-data-[collapsible=icon]:h-16 group-data-[collapsible=icon]:px-2">
        <Link
          href="/dashboard"
          className="group flex items-center justify-center gap-3 rounded-lg px-2 group-data-[collapsible=icon]:size-11 group-data-[collapsible=icon]:rounded-xl group-data-[collapsible=icon]:bg-[#007BFF]/10 group-data-[collapsible=icon]:px-0"
          aria-label="HealthMate Dashboard"
        >
          <span className="font-serif text-3xl font-bold text-[#007BFFB2] group-data-[collapsible=icon]:hidden">
            HealthMate
          </span>
          <span className="hidden font-serif text-lg font-bold text-[#007BFF] group-data-[collapsible=icon]:block">
            HM
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="group-data-[collapsible=icon]:items-center">
        <SidebarGroup className="group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:py-1">
          <SidebarGroupContent>
            <SidebarMenu className="px-3 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:px-2">
              {items.map((item) => {
                const isActive = pendingHref
                  ? matchPath(pendingHref, item.href)
                  : matchPath(pathname, item.href);

                return (
                  <SidebarMenuItem
                    key={item.href}
                    className="mb-2 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center"
                  >
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      className={cn(
                        "group rounded-2xl py-6 text-[15px] font-medium transition-all duration-200 group-data-[collapsible=icon]:size-11! group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0!",
                        isActive
                          ? "bg-[#007BFF] text-white hover:bg-[#007BFF] hover:text-white"
                          : "text-slate-500 hover:bg-slate-50 hover:text-[#007BFF]",
                      )}
                    >
                      <Link
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavigate(item.href);
                        }}
                        className="flex items-center gap-3 px-3 group-data-[collapsible=icon]:h-full group-data-[collapsible=icon]:w-full group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
                      >
                        <div
                          className={cn(
                            "flex size-5 items-center justify-center transition-colors",
                            isActive
                              ? "text-white"
                              : "text-slate-400 group-hover:text-[#434B94]",
                          )}
                        >
                          <item.icon className="h-5 w-5 shrink-0" />
                        </div>
                        <span className="truncate font-semibold group-data-[collapsible=icon]:hidden">
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="relative p-2 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:pb-4 group-data-[collapsible=icon]:pt-2">
        <div className="mt-auto border-t border-gray-300 p-4 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:w-full group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:border-gray-200 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:pb-0 group-data-[collapsible=icon]:pt-3">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900 group-data-[collapsible=icon]:size-10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:rounded-xl group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:hover:bg-[#007BFF]/10 group-data-[collapsible=icon]:hover:text-[#007BFF]"
                aria-label="Logout"
              >
                <Power className="h-5 w-5 shrink-0" />
                <span className="group-data-[collapsible=icon]:hidden">
                  {t("dashboard:sidebar.logout")}
                </span>
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t("logout.title")}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t("logout.description")}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t("logout.cancel")}</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="bg-red-600 hover:bg-red-700"
                >
                  {t("logout.confirm")}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
