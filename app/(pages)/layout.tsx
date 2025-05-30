import React from "react";
import { HeroHeader } from "@/components/home/header";
import FooterSection from "@/components/home/footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeroHeader />
      <main className="min-h-screen px-4 sm:px-6 md:px-8 pt-32 pb-16 max-w-7xl mx-auto">
        {children}
      </main>
      <FooterSection />
    </>
  );
}
