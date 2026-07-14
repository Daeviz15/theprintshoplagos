'use client';

import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeaderTitle() {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      {pathname === '/dashboard/orders' && (
        <motion.div
          key="orders-title"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-end text-right"
        >
          <h1 className="text-2xl md:text-[2rem] font-heading font-extrabold tracking-tight text-white leading-none">
            My Orders<span className="text-brand-accent">.</span>
          </h1>
          <p className="hidden md:block text-sm font-medium text-brand-muted mt-1.5">
            Browse your print collection
          </p>
        </motion.div>
      )}
      
      {pathname === '/dashboard' && (
        <motion.div
          key="dashboard-title"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-end text-right"
        >
          <h1 className="text-2xl md:text-[2rem] font-heading font-extrabold tracking-tight text-white leading-none">
            Overview<span className="text-brand-accent">.</span>
          </h1>
        </motion.div>
      )}

      {pathname === '/dashboard/settings' && (
        <motion.div
          key="settings-title"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-end text-right"
        >
          <h1 className="text-2xl md:text-[2rem] font-heading font-extrabold tracking-tight text-white leading-none">
            Settings<span className="text-brand-accent">.</span>
          </h1>
        </motion.div>
      )}

      {pathname === '/dashboard/configurator' && (
        <motion.div
          key="configurator-title"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="hidden md:flex flex-col items-end text-right"
        >
          <h1 className="text-2xl md:text-[2rem] font-heading font-extrabold tracking-tight text-white leading-none">
            New Print Job<span className="text-brand-accent">.</span>
          </h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
