'use client';

import { ReactNode, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18nInstance from '@/locale/i18n';
import { usePathname } from 'next/navigation';

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const pathname = usePathname();

  useEffect(() => {
    const pathParts = pathname.split('/');
    const langCode =
      pathParts.length > 1 && ['en', 'vi'].includes(pathParts[1]) ? pathParts[1] : 'vi';

    if (i18nInstance.language !== langCode) {
      i18nInstance.changeLanguage(langCode);
    }
  }, [pathname]);

  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>;
}
