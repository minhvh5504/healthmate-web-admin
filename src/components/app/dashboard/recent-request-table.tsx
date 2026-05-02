'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { useRecentBookings } from '@/hooks/use-dashboard';
import { useTranslation } from 'react-i18next';

export function RecentRequestTable() {
  const { t } = useTranslation(['dashboard']);
  const { data: bookings, isLoading } = useRecentBookings();

  // Format date and time
  const formatDateTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return {
        time: format(date, 'HH:mm'),
        date: format(date, 'dd/MM/yyyy'),
      };
    } catch {
      return { time: '-', date: '-' };
    }
  };

  if (isLoading) {
    return (
      <div className="w-full space-y-4">
        {[...Array(5)].map((_, index) => (
          <Skeleton key={index} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <div className="w-full py-12 text-center">
        <p className="text-gray-500">{t('dashboard:table.noBookings')}</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-auto">
      <Table className="min-w-full table-fixed">
        <TableHeader>
          <TableRow className="border-b border-gray-100 hover:bg-transparent">
            {/* 1. STT */}
            <TableHead className="w-[80px] font-bold text-gray-400 text-xs text-center uppercase tracking-wider">
              {t('dashboard:table.stt')}
            </TableHead>
            {/* 2. Tên Hotel */}
            <TableHead className="w-1/4 font-bold text-gray-400 text-xs text-center uppercase tracking-wider">
              {t('dashboard:table.name')}
            </TableHead>
            {/* 3. Ngày đặt */}
            <TableHead className="w-1/6 font-bold text-gray-400 text-xs text-center uppercase tracking-wider">
              {t('dashboard:table.dateTime')}
            </TableHead>
            {/* 4. Địa chỉ hotel */}
            <TableHead className="w-1/3 font-bold text-gray-400 text-xs text-center uppercase tracking-wider">
              {t('dashboard:table.address')}
            </TableHead>
            {/* 5. Giá */}
            <TableHead className="w-1/6 font-bold text-gray-400 text-xs text-center uppercase tracking-wider">
              {t('dashboard:table.price')}
            </TableHead>
            {/* 6. Trạng thái */}
            <TableHead className="w-[150px] font-bold text-gray-400 text-xs text-center uppercase tracking-wider">
              {t('dashboard:table.status')}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking, index) => {
            const { time, date } = formatDateTime(booking.bookedAt);
            const hotelName = booking.hotel?.name || 'N/A';
            const hotelAddress = booking.hotel?.address || 'N/A';

            return (
              <TableRow key={booking.id} className="border-b border-gray-50 hover:bg-gray-50/50 h-16">
                {/* 1. STT */}
                <TableCell className="text-center font-medium text-slate-600 text-xs">
                  {index + 1}
                </TableCell>
                {/* 2. Tên Hotel */}
                <TableCell className="text-center text-slate-700 text-xs font-semibold">
                  {hotelName}
                </TableCell>
                {/* 3. Ngày đặt */}
                <TableCell className="text-center text-slate-500 text-xs">
                  {date} - {time}
                </TableCell>
                {/* 4. Địa chỉ hotel */}
                <TableCell className="text-center text-slate-500 px-4">
                  <span className="text-xs line-clamp-1">{hotelAddress}</span>
                </TableCell>
                {/* 5. Giá */}
                <TableCell className="text-center text-slate-700 text-xs font-bold">
                  {booking.totalPrice?.toLocaleString() || 0} VND
                </TableCell>
                {/* 6. Trạng thái */}
                <TableCell className="text-center">
                  <span className="inline-flex items-center justify-center rounded-full bg-[#05CD99] min-w-[100px] px-3 py-1.5 text-[10px] font-bold text-white uppercase shadow-sm">
                    {t(`dashboard:status.${booking.status.toLowerCase()}`, { defaultValue: booking.status })}
                  </span>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
