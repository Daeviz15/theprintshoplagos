'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Package, Settings, LogOut, Plus } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { motion } from 'framer-motion';

interface NavPillProps {
  /** When true, renders without fixed positioning (for inline header use) */
  inline?: boolean;
}

const menuItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'My Orders', href: '/dashboard/orders', icon: Package },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  { name: 'New Print', href: '/dashboard/configurator', icon: Plus },
];

export default function NavPill({ inline = false }: NavPillProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/auth/login');
  };

  const pill = (
    <motion.div
      layout
      layoutId="desktop-nav-pill"
      className={`flex flex-row items-center rounded-full bg-white/80 backdrop-blur-xl shadow-[0_8px_40px_rgb(0,0,0,0.08)] border border-white max-w-[90vw] ${
        inline ? 'gap-1 p-1.5' : 'gap-4 p-3'
      }`}
      transition={{ type: 'spring', stiffness: 300, damping: 35 }}
    >
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
            title={item.name}
            className={`relative rounded-full transition-all duration-300 flex-shrink-0 ${
            inline ? 'p-2.5' : 'p-4'
          } ${
            isActive
              ? 'bg-brand-black text-white shadow-lg scale-100'
              : 'text-brand-muted hover:text-brand-black hover:bg-black/5 scale-95 hover:scale-100'
          }`}
          >
            <Icon size={inline ? 16 : 22} strokeWidth={isActive ? 2.5 : 2} />
          </Link>
        );
      })}

      <div className={`w-[1px] bg-black/10 flex-shrink-0 ${inline ? 'h-5 mx-1' : 'h-8 mx-2'}`} />

      <button
        onClick={handleLogout}
        title="Logout"
        className={`rounded-full text-brand-muted hover:text-red-500 hover:bg-red-50 transition-all duration-300 flex-shrink-0 scale-95 hover:scale-100 ${
          inline ? 'p-2.5' : 'p-4'
        }`}
      >
        <LogOut size={inline ? 16 : 22} strokeWidth={2} />
      </button>
    </motion.div>
  );

  if (inline) {
    return pill;
  }

  return (
    <div className="hidden md:flex fixed top-24 left-1/2 -translate-x-1/2 z-50">
      {pill}
    </div>
  );
}
