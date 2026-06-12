"use client";

import CustomSidebarTrigger from "@/components/custom/custom-sidebar-trigger";
import ProfileDropdownRow from "./profile-dropdown";
import { useLanguage } from "@/hooks/use-language";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IMAGE_URLS } from "@/constants/urls";
import { Check, ChevronDown } from "lucide-react";
import Image from "next/image";

const LANGUAGES = [
  { code: "vi", label: "Tiếng Việt", flag: IMAGE_URLS.FLAGS.VI },
  { code: "en", label: "English",    flag: IMAGE_URLS.FLAGS.EN },
];

export default function PageHeader({ className = "" }: { className?: string }) {
  const { currentLanguage, changeLanguage } = useLanguage();
  const currentCode = currentLanguage?.code || "vi";

  return (
    <header
      className={
        "flex h-16 items-center justify-between bg-white px-4 shadow-sm " + className
      }
    >
      <div className="flex items-center gap-4">
        <CustomSidebarTrigger />
      </div>

      <div className="flex items-center gap-3">
        {/* Language Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="group flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-900 select-none cursor-pointer outline-none"
              aria-label="Select language"
            >
              <Image
                src={LANGUAGES.find((l) => l.code === currentCode)?.flag ?? IMAGE_URLS.FLAGS.VI}
                alt={currentCode}
                width={22}
                height={16}
                className="rounded-sm object-cover shadow-sm"
              />
              <span className="text-xs font-bold uppercase tracking-widest">
                {currentCode}
              </span>
              <ChevronDown
                size={13}
                className="text-slate-400 transition-transform duration-200 group-data-[state=open]:rotate-180"
              />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-44 p-1.5 rounded-xl shadow-lg">
            {LANGUAGES.map((lang) => {
              const isActive = lang.code === currentCode;
              return (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 cursor-pointer transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Image
                    src={lang.flag}
                    alt={lang.label}
                    width={22}
                    height={16}
                    className="rounded-sm object-cover shadow-sm flex-shrink-0"
                  />
                  <span className="text-sm flex-1">{lang.label}</span>
                  {isActive && <Check size={14} className="text-blue-500" />}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Vertical Divider */}
        <div className="h-8 w-px bg-gray-300" />

        <ProfileDropdownRow className="hover:bg-transparent px-0 py-0 mr-4" />
      </div>
    </header>
  );
}

