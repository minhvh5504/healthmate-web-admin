"use client";

import { useLanguage } from "@/hooks/use-language";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Loading from "@/components/custom/custom-loading";
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

type AuthLayoutProps = {
  children: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  imageSide?: "left" | "right";
  imagePriority?: boolean;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  const { currentLanguage, changeLanguage } = useLanguage();
  const { t } = useTranslation("auth");
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setInitialLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const currentCode = currentLanguage?.code || "vi";
  const currentFlag = LANGUAGES.find((l) => l.code === currentCode)?.flag ?? IMAGE_URLS.FLAGS.VI;

  return (
    <main className="relative min-h-svh w-full grid place-items-center p-4 overflow-hidden bg-white">
      {/* Initial page load — replaced the card fade-in animation */}
      <Loading loading={initialLoading} />

      {/* Background container to isolate decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary Background */}
        <div className="absolute inset-0 bg-[#F8FAFC]" />

        {/* Decorative Blobs */}
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[35%] h-[35%] bg-purple-500/10 rounded-full blur-[100px]" />
        <div className="absolute -bottom-[10%] left-[20%] w-[45%] h-[45%] bg-indigo-500/10 rounded-full blur-[110px]" />

        {/* Subtle Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(#434B94 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Language Dropdown - Top Right */}
      <div className={`absolute top-6 right-8 z-20 transition-all ${initialLoading ? "invisible opacity-0" : "visible opacity-100"}`}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="group flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-slate-500 bg-white/70 backdrop-blur-sm border border-white/60 shadow-sm transition-all hover:bg-white hover:text-slate-800 select-none cursor-pointer outline-none"
              aria-label="Select language"
            >
              <Image
                src={currentFlag}
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
      </div>

      {/* Main Card Container - hidden while loading to prevent icon flash */}
      <div className={`relative z-10 w-full max-w-[460px] transition-opacity duration-300 ${initialLoading ? "invisible opacity-0" : "visible opacity-100"}`}>
        <div className="bg-white/90 backdrop-blur-xl rounded-[48px] shadow-[0_32px_64px_-16px_rgba(31,38,135,0.08)] border border-white/50 p-10 sm:p-14">
          {children}
        </div>
      </div>

      {/* Footer - Positioned at bottom center */}
      <footer className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-[#7C8BA1] text-[14px] font-medium tracking-tight whitespace-nowrap">
        {t("copyright", {
          defaultValue: "© 2026 Healthmate. All rights reserved.",
        })}
      </footer>
    </main>
  );
}
