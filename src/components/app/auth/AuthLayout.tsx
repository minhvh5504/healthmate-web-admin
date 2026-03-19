"use client";

import Image from "next/image";
import * as React from "react";

type AuthLayoutProps = {
  children: React.ReactNode;
  imageSrc: string;
  imageAlt?: string;
  imageSide?: "left" | "right";
  imagePriority?: boolean;
};

export default function AuthLayout({
  children,
  imageSrc,
  imageAlt = "Auth illustration",
  imageSide = "right",
  imagePriority = false,
}: AuthLayoutProps) {
  return (
    <main className="min-h-svh w-full bg-background">
      <div
        className={[
          "mx-auto grid min-h-svh w-full",
          "px-4 sm:px-6 lg:px-0",
          "lg:grid-cols-2 lg:gap-8",
          imageSide === "left" ? "lg:[&>aside]:order-1 lg:[&>section]:order-2" : "",
        ].join(" ")}
      >
        {/* Form column */}
        <section className="flex items-center justify-center">
          <div className="w-full max-w-md">{children}</div>
        </section>

        {/* Image column */}
        <aside className="relative hidden lg:flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, #238C98 0%, #238C9850 100%)",
            }}
          />
          <div className="relative w-full max-w-xl aspect-[4/3]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(min-width:1024px) 50vw, 0px"
              priority={imagePriority}
              className="object-contain relative z-10"
            />
          </div>
        </aside>
      </div>
    </main>
  );
}
