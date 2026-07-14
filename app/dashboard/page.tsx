import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import RecentOrderCard from '@/components/features/Dashboard/RecentOrderCard';
import Link from 'next/link';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/auth/login');
  }

  const userFirstName = user.user_metadata?.full_name?.split(' ')[0] || 'Guest';

  // Dummy data for visual development
  const recentOrders = [
    {
      id: '133-026',
      status: 'In Production',
      date: 'Oct 24, 2026',
      imageSrc: '/art_2.png',
      artworkTitle: 'Dichotomy - Canvas Print',
      price: '₦ 45,200.00'
    },
    {
      id: '133-025',
      status: 'Shipped',
      date: 'Oct 12, 2026',
      imageSrc: '/products/art-gallery-1.jpg',
      artworkTitle: 'Sacred Art of the Ori',
      price: '₦ 120,500.00'
    }
  ];

  return (
    <div className="w-full flex flex-col gap-10">
      {/* Header */}
      <div>
        <h1 className="text-[2.5rem] md:text-[3.5rem] font-heading font-extrabold tracking-tight leading-tight text-white">
          Welcome back, <br className="md:hidden" />
          <span className="font-heading font-extrabold text-white/60">{userFirstName}.</span>
        </h1>
        <p className="mt-4 text-base text-white/80 max-w-lg leading-relaxed">
          Here is an overview of your print jobs. We are currently processing your latest order with the utmost care.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

        {/* Main Content Area (Recent Orders) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-2xl font-heading font-extrabold tracking-tight text-white">Recent Orders</h2>
            <Link href="/dashboard/orders" className="text-sm font-medium text-brand-accent hover:text-white transition-colors">
              View All ↗
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            {recentOrders.map(order => (
              <RecentOrderCard
                key={order.id}
                orderId={order.id}
                status={order.status}
                date={order.date}
                imageSrc={order.imageSrc}
                artworkTitle={order.artworkTitle}
                price={order.price}
              />
            ))}
          </div>
        </div>

        {/* Right Sidebar Area (Quick Actions / Stats) */}
        <div className="flex flex-col gap-6">
          <div className="bg-brand-black text-white rounded-[2.5rem] shadow-2xl flex flex-col justify-end overflow-hidden relative min-h-[280px]">
            {/* Background Image */}
            <img
              src="/art_1.png"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

            <div className="relative z-10 p-8">
              <h3 className="text-2xl font-heading font-extrabold tracking-tight mb-2">New Print Job</h3>
              <p className="text-sm text-white/70 mb-6 leading-relaxed font-normal">
                Ready to bring your next masterpiece to life? Start a new configuration.
              </p>

              <Link
                href="/dashboard/configurator"
                className="inline-flex items-center justify-center w-full bg-white font-semibold text-sm py-4 rounded-full hover:bg-brand-offwhite transition-colors"
                style={{ color: '#1a1a1a' }}
              >
                Configure Now
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/[0.02]">
             <div className="flex items-center justify-between mb-6">
               <h3 className="text-lg font-semibold tracking-tight text-brand-black">Quick Stats</h3>
               <span className="text-[10px] font-medium text-brand-muted uppercase tracking-widest">This Month</span>
             </div>
             
             <div className="grid grid-cols-3 gap-3">
               <div className="flex flex-col items-center justify-center bg-brand-offwhite rounded-2xl p-5 border border-black/[0.02]">
                 <span className="text-3xl font-light text-brand-black tracking-tight leading-none mb-2">12</span>
                 <span className="text-[10px] font-medium text-brand-muted uppercase tracking-wider">Prints</span>
               </div>
               <div className="flex flex-col items-center justify-center bg-brand-accent/5 rounded-2xl p-5 border border-brand-accent/10">
                 <span className="text-3xl font-light text-brand-accent tracking-tight leading-none mb-2">1</span>
                 <span className="text-[10px] font-medium text-brand-muted uppercase tracking-wider">Active</span>
               </div>
               <div className="flex flex-col items-center justify-center bg-brand-offwhite rounded-2xl p-5 border border-black/[0.02]">
                 <span className="text-3xl font-light text-brand-black tracking-tight leading-none mb-2">2</span>
                 <span className="text-[10px] font-medium text-brand-muted uppercase tracking-wider">Addresses</span>
               </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
