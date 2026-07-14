'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Package, Settings, LogOut, Plus, Menu, X } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import NavPill from './NavPill';

const ORDERS_PATH = '/dashboard/orders';

export default function FloatingMenu() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isOrdersPage = pathname === ORDERS_PATH;

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/auth/login');
  };

  const menuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'My Orders', href: '/dashboard/orders', icon: Package },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
    { name: 'New Print', href: '/dashboard/configurator', icon: Plus },
  ];

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      {/* Mobile Hamburger Button — smaller on configurator page */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="md:hidden fixed top-4 left-4 z-[45] p-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full shadow-md text-white transition-transform active:scale-95"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {/* Desktop Floating Pill — hidden on orders page (pill lives in header there) */}
      <AnimatePresence>
        {!isOrdersPage && (
          <motion.div
            key="floating-pill"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="hidden md:flex fixed top-24 left-1/2 -translate-x-1/2 z-50"
          >
            <NavPill inline />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMobileMenu}
              className="md:hidden fixed inset-0 bg-brand-black/40 backdrop-blur-sm z-[60]"
            />

            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="md:hidden fixed top-0 left-0 bottom-0 w-[80vw] max-w-sm bg-brand-black border-r border-white/10 z-[70] shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <span className="text-xl font-heading font-extrabold tracking-tight text-white">
                  The Print Shop<span className="text-brand-accent">.</span>
                </span>
                <button
                  onClick={closeMobileMenu}
                  className="p-2 text-white/60 hover:text-white transition-colors rounded-full bg-white/10"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col p-6 gap-2 flex-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    item.href === '/dashboard'
                      ? pathname === item.href
                      : pathname.startsWith(item.href) && item.href !== '/';

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={closeMobileMenu}
                      className={`flex items-center gap-4 p-4 rounded-2xl transition-all font-semibold ${
                        isActive
                          ? 'bg-brand-accent text-white shadow-lg'
                          : 'text-white/60 hover:bg-white/8 hover:text-white'
                      }`}
                      style={isActive ? { color: 'white' } : {}}
                    >
                      <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                      {item.name}
                    </Link>
                  );
                })}
              </div>

              <div className="p-6 border-t border-white/10">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl text-red-400 font-semibold hover:bg-red-500/10 border border-red-500/20 hover:border-red-500/40 transition-colors"
                >
                  <LogOut size={20} strokeWidth={2.5} />
                  Logout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
