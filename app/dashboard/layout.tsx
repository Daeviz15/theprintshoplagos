import React from 'react';
import DashboardHeader from '@/components/features/Dashboard/DashboardHeader';
import FloatingMenu from '@/components/features/Dashboard/FloatingMenu';
import OrdersLayout from '@/components/features/Dashboard/OrdersLayout';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-brand-black text-brand-white flex flex-col font-sans selection:bg-brand-accent/20">

      {/* Smart Header — inlines nav pill on orders page */}
      <DashboardHeader />

      {/* Main Content Area — OrdersLayout handles compact layout on orders page */}
      <OrdersLayout>
        {children}
      </OrdersLayout>

      {/* Floating Action Menu — hidden on desktop orders page (pill is in header) */}
      <FloatingMenu />

    </div>
  );
}
