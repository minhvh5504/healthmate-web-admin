"use client";

import * as React from "react";
import { useLanguage } from "@/hooks/use-language";
import { Globe } from "lucide-react";

type AuthLayoutProps = {
  children: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  imageSide?: "left" | "right";
  imagePriority?: boolean;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  const { currentLanguage, changeLanguage } = useLanguage();

  const handleToggleLanguage = () => {
    const nextLang = currentLanguage?.code === 'vi' ? 'en' : 'vi';
    changeLanguage(nextLang);
  };

  return (
    <main className="relative min-h-svh w-full grid place-items-center p-4 overflow-hidden bg-white">
      {/* Background container to isolate decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary Linear Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFFFFF] to-[#DDE0F7]" />

        {/* Background Gradients - Subtle enhancements */}
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#eef2ff]/50 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-[#f5f3ff]/40 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] bg-[#fff1f2]/30 rounded-full blur-[110px]" />
      </div>

      {/* Language Header - Top Right */}
      <div
        onClick={handleToggleLanguage}
        className="absolute top-8 right-8 z-20 flex items-center gap-1.5 text-slate-400 hover:text-slate-800 transition-colors cursor-pointer group select-none"
      >
        <Globe size={16} className="transition-transform duration-300 group-hover:rotate-12" />
        <span className="text-xs font-bold uppercase tracking-widest">{currentLanguage?.code || 'VI'}</span>
      </div>

      {/* Main Card Container - Centered and Premium */}
      <div className="relative z-10 w-full max-w-[460px] animate-in fade-in zoom-in duration-500">
        <div className="bg-white/90 backdrop-blur-xl rounded-[48px] shadow-[0_32px_64px_-16px_rgba(31,38,135,0.08)] border border-white/50 p-10 sm:p-14">
          {children}
        </div>
      </div>

      {/* Footer - Positioned at bottom center */}
      <footer className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-[#7C8BA1] text-[14px] font-medium tracking-tight whitespace-nowrap">
        © 2026 Healthmate. All rights reserved.
      </footer>
    </main>
  );
}
