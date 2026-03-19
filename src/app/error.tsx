'use client';

import { useEffect } from 'react';
import ErrorPage from '@/components/error-page';

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorPage
      code=""
      title=""
      message="Our system is experiencing an issue. Please try again later."
      imgSrc="/500.svg"
    />
  );
}
