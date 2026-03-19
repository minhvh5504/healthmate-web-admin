'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
} from '@/components/ui/sidebar';
import Image from 'next/image';
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
import {
  LayoutDashboard,
  Power,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCallback, useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import { useTranslation } from 'react-i18next';

type Item = {
  title: string;
  href: string;
  icon: any;
};

const normalizePath = (path: string) => {
  const parts = path.split('/').filter(Boolean);
  if (parts.length > 0 && parts[0].length === 2) {
    parts.shift();
  }
  return '/' + parts.join('/');
};

const matchPath = (pathname: string, href: string) => {
  const normalized = normalizePath(pathname);
  return normalized === href || normalized.startsWith(href + '/');
};

export default function AppSidebar() {
  const { t } = useTranslation(['auth', 'dashboard']);
  const pathname = usePathname();

  const items: Item[] = [
    {
      title: t('dashboard:sidebar.dashboard'),
      href: '/dashboard',
      icon: LayoutDashboard,
    },
  ];

  const [pendingHref, setPendingHref] = useState<string | null>(null);

  useEffect(() => {
    setPendingHref(null);
  }, [pathname]);


  const handleNavigate = useCallback(
    (href: string) => {
      setPendingHref(href);
    },
    []
  );

  return (
    <Sidebar className="border-0" collapsible="icon">
      <SidebarHeader className="flex items-center justify-center py-4">
        <Link
          href="/dashboard"
          className="group flex items-center justify-center gap-3 rounded-lg px-2"
          aria-label="HealthMate Dashboard"
        >
          <Image
            src="/logo.svg"
            alt="HealthMate Logo"
            width={40}
            height={40}
            className="h-10 w-auto"
          />
          <span className="font-serif text-3xl font-bold text-[#238C98] group-data-[collapsible=icon]:hidden">
            HealthMate
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="px-3">
              {items.map((item) => {
                const isActive = pendingHref
                  ? matchPath(pendingHref, item.href)
                  : matchPath(pathname, item.href);

                return (
                  <SidebarMenuItem key={item.href} className="mb-2">
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      className={cn(
                        "group py-6 text-[15px] font-medium transition-all duration-200 rounded-2xl",
                        isActive
                          ? "bg-[#238C98] text-white hover:bg-[#1d7681] hover:text-white"
                          : "text-slate-500 hover:bg-slate-50 hover:text-[#238C98]"
                      )}
                    >
                      <Link
                        href={item.href}
                        onClick={() => handleNavigate(item.href)}
                        className="flex items-center gap-3 px-3"
                      >
                        {/* Directly rendering item.icon to ensure it's themed correctly */}
                        <div className={cn(
                          "transition-colors",
                          isActive ? "text-white" : "text-slate-400 group-hover:text-[#238C98]"
                        )}>
                          <item.icon className="h-5 w-5" />
                        </div>
                        <span className="truncate font-semibold">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-2 relative">
        <div className="mt-auto border-t border-gray-300 p-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                aria-label="Logout"
              >
                <Power className="h-5 w-5" />
                <span className="group-data-[collapsible=icon]:hidden">{t('dashboard:sidebar.logout')}</span>
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t('logout.title')}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t('logout.description')}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t('logout.cancel')}</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => signOut({ callbackUrl: '/login' })}
                  className="bg-red-600 hover:bg-red-700"
                >
                  {t('logout.confirm')}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
