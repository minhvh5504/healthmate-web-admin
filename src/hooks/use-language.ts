import { useRouter, usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { Languageses } from '@/constants/config';

export function useLanguage() {
  const router = useRouter();
  const pathname = usePathname();
  const { i18n } = useTranslation();

  const currentLangCode = useMemo(() => {
    const pathParts = pathname.split('/');
    return pathParts.length > 1 && Languageses.some(lang => lang.code === pathParts[1])
      ? pathParts[1]
      : 'vi';
  }, [pathname]);

  const currentLanguage = useMemo(() => {
    return Languageses.find(lang => lang.code === currentLangCode) || Languageses[0];
  }, [currentLangCode]);

  const changeLanguage = (langCode: string) => {
    if (langCode === currentLangCode) return;

    i18n.changeLanguage(langCode);

    const newPathname = pathname.replace(/^\/[a-z]{2}/, `/${langCode}`);
    router.push(newPathname);

    document.cookie = `NEXT_LOCALE=${langCode}; path=/; max-age=31536000`;
  };

  return {
    currentLangCode,
    currentLanguage,
    languages: Languageses,
    changeLanguage,
  };
}
