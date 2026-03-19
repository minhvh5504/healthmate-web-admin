'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Loading from './custom/custom-loading';

export default function NavigationLoading() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Always hide loading when route changes
    setLoading(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    // Listen to link clicks
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.href && !link.href.startsWith('#') && !link.target) {
        try {
          const url = new URL(link.href);
          const currentUrl = new URL(window.location.href);
          
          // Only show loading if navigating to a different page
          if (url.pathname !== currentUrl.pathname || url.search !== currentUrl.search) {
            setLoading(true);
            
            // Safety timeout: hide loading after 5 seconds if navigation didn't complete
            setTimeout(() => {
              setLoading(false);
            }, 5000);
          }
        } catch (error) {
          // Invalid URL, ignore
        }
      }
    };

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [pathname]); // Add pathname as dependency to get current route

  return <Loading loading={loading} variant="fullscreen" />;
}
