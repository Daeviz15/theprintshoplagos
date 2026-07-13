import React from 'react';
import Link from 'next/link';
import FloatingMenu from '@/components/features/Dashboard/FloatingMenu';
import HeaderTitle from '@/components/features/Dashboard/HeaderTitle';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-brand-offwhite text-brand-black flex flex-col font-sans selection:bg-brand-accent/20">
      
      {/* Minimalist Top Header */}
      <header className="sticky top-0 z-40 w-full bg-brand-offwhite/80 backdrop-blur-xl border-b border-black/5">
        <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/dashboard" className="text-xl font-black tracking-tight">
            The Print Shop <span className="text-brand-accent">.</span>
          </Link>
          
          <HeaderTitle />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 md:px-6 py-6 pb-32 md:pt-32 md:pb-24">
        {children}
      </main>

      {/* Desktop Floating Action Menu */}
      <FloatingMenu />
      
    </div>
  );
}
