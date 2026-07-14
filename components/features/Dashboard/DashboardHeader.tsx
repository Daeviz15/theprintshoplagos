'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import HeaderTitle from './HeaderTitle';
import NavPill from './NavPill';

const ORDERS_PATH      = '/dashboard/orders';
const CONFIGURATOR_PATH = '/dashboard/configurator';

export default function DashboardHeader() {
  const pathname       = usePathname();
  const isOrdersPage   = pathname === ORDERS_PATH;
  const isConfigurator = pathname === CONFIGURATOR_PATH;

  return (
    <header className={`sticky top-0 z-40 w-full bg-brand-black/80 backdrop-blur-xl border-b border-white/10 transition-all duration-300 ${
      // On the configurator on mobile, collapse to zero height so the preview fills the screen.
      // The floating hamburger button in FloatingMenu still shows at top-5 left-5.
      isConfigurator ? 'h-0 overflow-hidden md:h-20 md:overflow-visible' : ''
    }`}>
      <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between gap-4">

        {/* Logo — desktop only */}
        <Link
          href="/dashboard"
          className="hidden md:block text-xl font-heading font-extrabold tracking-tight flex-shrink-0"
        >
          The Print Shop <span className="text-brand-accent">.</span>
        </Link>

        {/* Center slot: Nav Pill slides in here on orders page */}
        <div className="hidden md:flex flex-1 items-center justify-center">
          <AnimatePresence mode="wait">
            {isOrdersPage && (
              <motion.div
                key="inline-pill"
                initial={{ opacity: 0, y: -12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <NavPill inline />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Page Title — always on right */}
        <div className="ml-auto md:ml-0">
          <HeaderTitle />
        </div>
      </div>
    </header>
  );
}
