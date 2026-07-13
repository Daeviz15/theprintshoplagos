'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Package, Settings, LogOut, Plus, Menu, X } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingMenu() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      {/* Mobile Hamburger Button (Fixed in Header area) */}
      <button 
        onClick={() => setIsMobileMenuOpen(true)}
        className="md:hidden fixed top-5 left-5 z-[45] p-2 bg-white rounded-full shadow-md text-brand-black transition-transform active:scale-95"
        aria-label="Open menu"
      >
        <Menu size={24} />
      </button>

      {/* Desktop Floating Pill Menu */}
      <div className="hidden md:flex fixed top-24 left-1/2 -translate-x-1/2 z-50 flex-row items-center gap-4 p-3 rounded-full bg-white/80 backdrop-blur-xl shadow-[0_8px_40px_rgb(0,0,0,0.08)] border border-white max-w-[90vw]">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.href === '/dashboard'
            ? pathname === item.href
            : pathname.startsWith(item.href) && item.href !== '/';

          return (
            <Link
              key={item.name}
              href={item.href}
              title={item.name}
              className={`relative p-4 rounded-full transition-all duration-300 flex-shrink-0 ${isActive
                ? 'bg-brand-black text-white shadow-lg scale-100'
                : 'text-brand-muted hover:text-brand-black hover:bg-black/5 scale-95 hover:scale-100'
                }`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            </Link>
          );
        })}

        <div className="w-[1px] h-8 bg-black/10 mx-2 flex-shrink-0" />

        <button
          onClick={handleLogout}
          title="Logout"
          className="p-4 rounded-full text-brand-muted hover:text-red-500 hover:bg-red-50 transition-all duration-300 flex-shrink-0 scale-95 hover:scale-100"
        >
          <LogOut size={22} strokeWidth={2} />
        </button>
      </div>

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
              className="md:hidden fixed top-0 left-0 bottom-0 w-[80vw] max-w-sm bg-brand-offwhite z-[70] shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-black/5">
                <span className="text-xl font-black tracking-tight">The Print Shop<span className="text-brand-accent">.</span></span>
                <button 
                  onClick={closeMobileMenu}
                  className="p-2 text-brand-muted hover:text-brand-black transition-colors rounded-full bg-white shadow-sm"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col p-6 gap-2 flex-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = item.href === '/dashboard'
                    ? pathname === item.href
                    : pathname.startsWith(item.href) && item.href !== '/';

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={closeMobileMenu}
                      className={`flex items-center gap-4 p-4 rounded-2xl transition-all font-semibold ${isActive
                        ? 'bg-brand-black text-white shadow-md'
                        : 'text-brand-muted hover:bg-white hover:text-brand-black'
                        }`}
                      style={isActive ? { color: 'white' } : {}}
                    >
                      <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                      {item.name}
                    </Link>
                  );
                })}
              </div>

              <div className="p-6 border-t border-black/5">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl text-red-500 font-semibold hover:bg-red-50 transition-colors"
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
