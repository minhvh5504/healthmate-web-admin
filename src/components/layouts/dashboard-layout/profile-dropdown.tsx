'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { LogOut } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useUserProfile } from '@/hooks/use-user';
import { useTranslation } from 'react-i18next';

type Props = {
  className?: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
};

export default function ProfileDropdownRow({
  className,
  side = 'bottom',
  align = 'start',
}: Props) {
  const { t } = useTranslation(['dashboard']);
  const router = useRouter();
  const { data: session } = useSession();
  const { data: userProfile, isLoading: isProfileLoading } = useUserProfile();

  // Loading state
  if (isProfileLoading && !session) {
    return (
      <div className={cn('flex w-full items-center gap-3 rounded-xl px-2 py-1.5', className)}>
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="min-w-0 flex-1 space-y-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    );
  }

  // Fallback if no user profile and no session
  if (!userProfile && !session?.user) {
    return null;
  }

  const displayName = userProfile?.full_name || session?.user?.name || 'User';
  const avatarSrc = userProfile?.picture || session?.user?.image || undefined;

  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-xl px-2 py-1.5',
        className
      )}
    >
      <Avatar className="h-10 w-10">
        <AvatarImage src={avatarSrc} alt={displayName} />
        <AvatarFallback>{getInitials(displayName)}</AvatarFallback>
      </Avatar>
      <div className="min-w-0 text-left">
        <p className="truncate text-[15px] font-semibold text-slate-900">
          {displayName}
        </p>
        <p className="truncate text-sm text-slate-500">{t('dashboard:common.admin')}</p>
      </div>
    </div>
  );
}

function getInitials(fullname: string) {
  return fullname
    .split(' ')
    .filter(Boolean)
    .map(s => s[0]!.toUpperCase())
    .slice(-2)
    .join('');
}
