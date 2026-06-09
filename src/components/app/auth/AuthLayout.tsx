"use client";

import { useLanguage } from "@/hooks/use-language";
import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Loading from "@/components/custom/custom-loading";

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

  const handleToggleLanguage = () => {
    const nextLang = currentLanguage?.code === "vi" ? "en" : "vi";
    changeLanguage(nextLang);
  };

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

      {/* Language Header - Top Right */}
      <div
        onClick={handleToggleLanguage}
        className={`absolute top-8 right-8 z-20 flex items-center gap-1.5 text-slate-400 hover:text-slate-800 transition-all cursor-pointer group select-none ${initialLoading ? "invisible opacity-0" : "visible opacity-100"}`}
      >
        <Globe
          size={16}
          className="transition-transform duration-300 group-hover:rotate-12"
        />
        <span className="text-xs font-bold uppercase tracking-widest">
          {currentLanguage?.code || "VI"}
        </span>
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
