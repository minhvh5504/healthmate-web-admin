'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSession } from 'next-auth/react';
import { RiArrowDownSFill } from 'react-icons/ri';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { PATH } from '@/constants/config';
import { useLanguage } from '@/hooks/use-language';
import { UserMenu } from './user-menu';
import icons from '@/constants/images/icons';
import { CustomButton } from './custom/custom-button';

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openLanguagese, setOpenLanguagese] = useState<boolean>(false);

  const dropdownRef = useRef(null);
  const dropdownContentRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();

  const { data, status } = useSession();
  const { currentLanguage, languages, changeLanguage } = useLanguage();
  const { t } = useTranslation('home');

  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!mobileOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // Nếu click vào menu hoặc nút mở menu → không đóng
      if (
        mobileMenuRef.current?.contains(target) ||
        mobileButtonRef.current?.contains(target) ||
        dropdownContentRef.current?.contains(target)
      ) {
        return;
      }

      setMobileOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileOpen]);

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-100/60 to-blue-50/60 backdrop-blur-md shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-3 sm:px-5 py-3 lg:px-8 relative">
        <Link
          href="/"
          className="flex items-center gap-2 z-10 transition-transform duration-300 hover:scale-105 active:scale-95"
        >
          <Image
            alt="Logo"
            src={icons.logoHeader}
            width={80}
            height={60}
            className="object-contain w-[50px] h-[32px] sm:w-[60px] sm:h-[40px] lg:w-[72px] lg:h-[44px]"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-8 absolute left-1/2 -translate-x-1/2">
          <CustomButton
            variant="ghost"
            onClick={() => router.push(PATH.Home)}
            className="text-sm xl:text-base hover:bg-white/50 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            {t('home')}
          </CustomButton>
        </div>

        {/* Right side items */}
        <div className="hidden md:flex items-center gap-1.5 lg:gap-4">
          <CustomButton
            variant={'ghost'}
            onClick={() => setOpenLanguagese(!openLanguagese)}
            className="relative hover:bg-white/50 transition-all duration-300 hover:scale-105 active:scale-95 p-2"
          >
            <Image
              src={currentLanguage?.icon || ''}
              alt="icon lang"
              width={20}
              height={16}
              className="rounded-sm"
            />
          </CustomButton>
          <div className="relative" ref={dropdownRef}>
            {openLanguagese && (
              <div className="absolute top-12 right-0 w-44 mt-2 bg-white shadow-lg rounded-lg border p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                {languages.map(lang => (
                  <div
                    key={lang.code}
                    onClick={() => {
                      changeLanguage(lang.code);
                      setOpenLanguagese(false);
                    }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm cursor-pointer transition-all duration-200 hover:bg-gray-100 active:scale-95 ${
                      currentLanguage?.code === lang.code
                        ? 'bg-gray-100 font-semibold text-blue-600'
                        : 'text-gray-700'
                    }`}
                  >
                    <Image
                      src={lang.icon}
                      alt="icon lang"
                      width={20}
                      height={16}
                      className="rounded-sm"
                    />
                    <p>{lang.title}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {status === 'loading' ? (
            <div className="flex items-center gap-4">
              <div className="h-10 w-20 bg-gray-200 rounded-md animate-pulse"></div>
              <div className="h-10 w-24 bg-gray-200 rounded-md animate-pulse"></div>
            </div>
          ) : data ? (
            <>
              {/* User menu */}
              <UserMenu />
            </>
          ) : (
            <>
              <CustomButton
                variant="default"
                onClick={() => router.push(PATH.Login)}
                className="text-xs sm:text-sm px-3 sm:px-4 transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-md"
              >
                {t('login')}
              </CustomButton>
              <CustomButton
                variant="outline"
                onClick={() => router.push(PATH.Register)}
                className="text-xs sm:text-sm px-3 sm:px-4 transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-md"
              >
                {t('register')}
              </CustomButton>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden z-10">
          <button
            ref={mobileButtonRef}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative inline-flex items-center justify-center rounded-md p-1.5 text-gray-600 hover:bg-white/50 hover:text-blue-800 focus:outline-none transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <span className="sr-only">Open main menu</span>
            {mobileOpen ? (
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 rotate-90"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden bg-gradient-to-r from-blue-300/95 to-blue-200/95 backdrop-blur-md border-t border-blue-400/70 animate-in slide-in-from-top duration-200 absolute inset-x-0"
        >
          <div className="flex flex-col space-y-1 px-3 pt-2 pb-3">
            <CustomButton
              variant="ghost"
              onClick={() => {
                router.push(PATH.Home);
                setMobileOpen(false);
              }}
              className="text-sm xl:text-base hover:bg-white/50 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              {t('home')}
            </CustomButton>

            {/* Language Selector - Mobile */}
            <div className="relative z-50 pt-1" ref={dropdownRef}>
              <div
                onClick={() => setOpenLanguagese(!openLanguagese)}
                className="flex items-center justify-between gap-2 cursor-pointer border border-blue-200 bg-white/50 px-3 py-2 rounded-md hover:bg-white/70 transition-all duration-200 active:scale-95"
              >
                <div className="flex items-center gap-2">
                  <Image
                    src={currentLanguage?.icon || ''}
                    alt="icon lang"
                    width={18}
                    height={14}
                    className="rounded-sm"
                  />
                  <p className="text-sm font-medium">{currentLanguage?.title}</p>
                </div>
                <i
                  className={`transition-transform duration-200 ${openLanguagese ? 'rotate-180' : ''}`}
                >
                  <RiArrowDownSFill size={18} />
                </i>
              </div>

              {openLanguagese && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white shadow-lg rounded-md border border-blue-200 p-1 animate-in fade-in slide-in-from-top-2 duration-150">
                  {languages.map(lang => (
                    <div
                      key={lang.code}
                      onClick={() => {
                        changeLanguage(lang.code);
                        setOpenLanguagese(false);
                      }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm cursor-pointer transition-all duration-150 active:scale-95 ${
                        currentLanguage?.code === lang.code
                          ? 'bg-blue-50 font-semibold text-blue-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Image
                        src={lang.icon}
                        alt="icon lang"
                        width={18}
                        height={14}
                        className="rounded-sm"
                      />
                      <p>{lang.title}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* User Section - Mobile */}
            <div className="pt-2 border-t border-blue-200/50 mt-2">
              {status === 'loading' ? (
                <div className="flex items-center gap-3 px-2">
                  <div className="h-8 w-16 bg-gray-200 rounded-md animate-pulse"></div>
                  <div className="h-8 w-20 bg-gray-200 rounded-md animate-pulse"></div>
                </div>
              ) : data ? (
                <div className="flex items-center justify-between gap-2 px-2 py-1">
                   <UserMenu />
                </div>
              ) : (
                <div className="flex items-center gap-2 px-2">
                  <CustomButton
                    variant="default"
                    onClick={() => {
                      router.push(PATH.Login);
                      setMobileOpen(false);
                    }}
                    className="flex-1 text-xs h-8 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md"
                  >
                    {t('login')}
                  </CustomButton>
                  <CustomButton
                    variant="outline"
                    onClick={() => {
                      router.push(PATH.Register);
                      setMobileOpen(false);
                    }}
                    className="flex-1 text-xs h-8 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md"
                  >
                    {t('register')}
                  </CustomButton>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
