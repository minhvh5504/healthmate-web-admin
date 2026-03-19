'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

type ErrorPageProps = {
  code: string;
  title: string;
  message: string;
  imgSrc: string;
  showButton?: boolean;
};

export default function ErrorPage({
  code,
  title,
  message,
  imgSrc,
  showButton = true,
}: ErrorPageProps) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F1F5F9] p-6">
      <div className="text-center space-y-4 p-16">
        <div className="mx-auto w-full">
          <Image
            src={imgSrc}
            alt={title}
            width={500}
            height={400}
            sizes="(max-width: 640px) 70vw, (max-width: 1024px) 50vw, 400px"
            className="h-auto mx-auto"
          />
        </div>

        <h1 className="text-3xl font-bold">{code}</h1>
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-500 text-sm">{message}</p>

        {showButton && (
          <Link
            href="/"
            className="inline-block rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 transition"
          >
            <ArrowRight className="inline-block mr-2" size={16} />
            Go to homepage
          </Link>
        )}
      </div>
    </main>
  );
}
