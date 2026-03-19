import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import React from 'react';

// Định nghĩa các loại variant
type CustomTableVariant = 'default' | 'striped' | 'compact';

interface UserRow {
  id: number;
  name: string;
  email: string;
}

interface CustomTableProps {
  headers: string[];
  data: UserRow[];
  variant?: CustomTableVariant;
}

export function CustomTable({ headers, data, variant = 'default' }: CustomTableProps) {
  const tableClassName = `w-full ${
    variant === 'striped' ? '[&>tbody>tr:nth-child(odd)]:bg-gray-50' : ''
  } ${variant === 'compact' ? 'text-sm' : 'text-base'}`;

  return (
    <Table className={tableClassName}>
      <TableHeader>
        <TableRow>
          {headers.map((header, index) => (
            <TableHead key={index} className="text-left font-bold text-gray-700">
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow key={rowIndex} className="border-b border-gray-200 hover:bg-gray-100">
            {Object.values(row).map((cellValue: string | number, cellIndex) => (
              <TableCell key={cellIndex} className="py-2">
                {cellValue}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
