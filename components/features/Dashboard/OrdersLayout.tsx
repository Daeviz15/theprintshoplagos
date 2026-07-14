'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const ORDERS_PATH      = '/dashboard/orders';
const CONFIGURATOR_PATH = '/dashboard/configurator';

export default function OrdersLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isOrdersPage   = pathname === ORDERS_PATH;
  const isConfigurator = pathname === CONFIGURATOR_PATH;
  const isCompact      = isOrdersPage || isConfigurator;

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={isCompact ? 'compact' : 'default'}
        initial={false}
        className={
          isConfigurator
            // Configurator: zero padding, full bleed on mobile.
            ? 'flex-1 w-full max-w-[1200px] mx-auto px-0 md:px-6 py-0 md:pt-8 md:pb-8'
            : isOrdersPage
            // Orders page: minimal top padding on desktop — nav pill is in header so no gap needed
            ? 'flex-1 w-full max-w-[1200px] mx-auto px-4 md:px-6 py-4 pb-32 md:pt-4 md:pb-8'
            // All other pages: normal padding accounting for the fixed floating pill
            : 'flex-1 w-full max-w-[1200px] mx-auto px-4 md:px-6 py-6 pb-32 md:pt-32 md:pb-24'
        }
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
