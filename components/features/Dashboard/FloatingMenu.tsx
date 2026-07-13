'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Package, Settings, LogOut, Plus } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function FloatingMenu() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/auth/login');
  };

  const menuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'My Orders', href: '/dashboard/orders', icon: Package },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
    { name: 'New Print', href: '/', icon: Plus },
  ];

  return (
    <div className="fixed bottom-6 md:bottom-auto md:top-24 left-1/2 -translate-x-1/2 z-50 flex flex-row items-center gap-2 md:gap-4 p-2 md:p-3 rounded-full bg-white/80 backdrop-blur-xl shadow-[0_8px_40px_rgb(0,0,0,0.08)] border border-white max-w-[90vw] overflow-x-auto no-scrollbar">
      {menuItems.map((item) => {
        const Icon = item.icon;
        // Exact match for dashboard, prefix match for others to keep them highlighted in sub-routes
        const isActive = item.href === '/dashboard'
          ? pathname === item.href
          : pathname.startsWith(item.href) && item.href !== '/';

        return (
          <Link
            key={item.name}
            href={item.href}
            title={item.name}
            className={`relative p-3 md:p-4 rounded-full transition-all duration-300 flex-shrink-0 ${isActive
              ? 'bg-brand-black text-white shadow-lg scale-100'
              : 'text-brand-muted hover:text-brand-black hover:bg-black/5 scale-95 hover:scale-100'
              }`}
          >
            <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
          </Link>
        );
      })}

      <div className="w-[1px] h-8 bg-black/10 mx-1 md:mx-2 flex-shrink-0" />

      <button
        onClick={handleLogout}
        title="Logout"
        className="p-3 md:p-4 rounded-full text-brand-muted hover:text-red-500 hover:bg-red-50 transition-all duration-300 flex-shrink-0 scale-95 hover:scale-100"
      >
        <LogOut size={22} strokeWidth={2} />
      </button>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
