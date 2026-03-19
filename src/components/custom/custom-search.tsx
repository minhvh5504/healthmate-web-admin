import { Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useRef, useState } from 'react';

interface SearchBarProps {
  placeholder?: string;
  keyName?: string;
  type?: string;
  data?: string;
  onSetData?: (e: unknown) => void;
}

const CustomSearch = ({
  placeholder = 'Nhập từ khoá tìm kiếm',
  keyName = '_q',
  type = 'text',
  data,
  onSetData,
}: SearchBarProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [isFocus, setIsFocus] = useState(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = (term: string) => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      const params = new URLSearchParams(Array.from(searchParams.entries()));

      if (term) {
        params.set(keyName, term);
      } else {
        params.delete(keyName);
      }
      replace(`${pathname}?${params.toString()}`);
    }, 700);
  };

  return (
    <div className="w-full mt-8 flex justify-center">
      <div className="w-full max-w-4xl">
        <div className="relative">
          <div className="absolute inset-y-0 left-4 flex items-center text-slate-400">
            <Search size={18} />
          </div>
          <input
            type={type}
            placeholder={placeholder}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={e => {
              if (onSetData) {
                onSetData(e.target.value);
              } else {
                handleSearch(e.target.value);
              }
            }}
            defaultValue={data || (searchParams.get(keyName) ?? '')}
            className="w-full rounded-full bg-white/95 py-4 pl-14 pr-6 text-slate-700 placeholder:text-slate-400 shadow-md focus:shadow-lg focus:outline-none transition"
          />
        </div>
      </div>
    </div>
  );
};

export default CustomSearch;
