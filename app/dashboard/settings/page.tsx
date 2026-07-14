import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/auth/login');
  }

  const fullName = user.user_metadata?.full_name || '';
  const email = user.email || '';
  const avatarUrl = user.user_metadata?.avatar_url || '';
  const initials = fullName
    ? fullName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    : email[0]?.toUpperCase() || '?';

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-8">

      {/* Profile Header Card */}
      <div className="flex items-center gap-5 p-6 rounded-3xl bg-white/5 border border-white/10">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={fullName}
            className="w-16 h-16 rounded-full object-cover ring-2 ring-brand-accent/50"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-brand-accent/20 border border-brand-accent/30 text-brand-accent flex items-center justify-center text-xl font-heading font-extrabold">
            {initials}
          </div>
        )}
        <div>
          <h2 className="text-xl font-heading font-extrabold tracking-tight text-white">{fullName || 'Your Account'}</h2>
          <p className="text-sm text-white/50 mt-0.5">{email}</p>
        </div>
      </div>

      {/* Profile Section */}
      <section className="rounded-3xl bg-white/5 border border-white/10 p-6 md:p-8 flex flex-col gap-6">
        <div className="flex items-center gap-3 pb-4 border-b border-white/10">
          <div className="w-1 h-5 rounded-full bg-brand-accent" />
          <h3 className="text-xs font-bold text-white/60 uppercase tracking-widest">Profile</h3>
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <label className="block text-[11px] font-semibold text-white/50 mb-2 uppercase tracking-widest">Full Name</label>
            <input
              type="text"
              defaultValue={fullName}
              placeholder="Enter your full name"
              className="w-full px-5 py-4 rounded-2xl border border-white/10 bg-white/5 focus:outline-none focus:ring-2 focus:ring-brand-accent/40 focus:border-brand-accent/50 transition-all text-sm font-medium text-white placeholder:text-white/20"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-white/50 mb-2 uppercase tracking-widest">Email</label>
            <input
              type="email"
              disabled
              defaultValue={email}
              className="w-full px-5 py-4 rounded-2xl border border-white/5 bg-white/[0.03] text-white/30 cursor-not-allowed focus:outline-none text-sm font-medium"
            />
            <p className="text-[11px] text-white/30 mt-2 leading-relaxed">
              Managed by your Google account. Cannot be changed here.
            </p>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-white/50 mb-2 uppercase tracking-widest">Phone Number</label>
            <input
              type="tel"
              placeholder="+234 800 000 0000"
              className="w-full px-5 py-4 rounded-2xl border border-white/10 bg-white/5 focus:outline-none focus:ring-2 focus:ring-brand-accent/40 focus:border-brand-accent/50 transition-all text-sm font-medium text-white placeholder:text-white/20"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-white/50 mb-2 uppercase tracking-widest">Delivery Address</label>
            <textarea
              rows={3}
              placeholder="Enter your default delivery address"
              className="w-full px-5 py-4 rounded-2xl border border-white/10 bg-white/5 focus:outline-none focus:ring-2 focus:ring-brand-accent/40 focus:border-brand-accent/50 transition-all text-sm font-medium text-white placeholder:text-white/20 resize-none"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button className="bg-brand-accent text-white px-8 py-3.5 rounded-full text-sm font-bold hover:bg-brand-accent/90 active:scale-[0.98] transition-all shadow-lg shadow-brand-accent/20">
              Save Changes
            </button>
          </div>
        </div>
      </section>

      {/* Notifications Section */}
      <section className="rounded-3xl bg-white/5 border border-white/10 p-6 md:p-8 flex flex-col gap-1">
        <div className="flex items-center gap-3 pb-4 border-b border-white/10 mb-2">
          <div className="w-1 h-5 rounded-full bg-brand-accent" />
          <h3 className="text-xs font-bold text-white/60 uppercase tracking-widest">Notifications</h3>
        </div>

        {[
          { label: 'Order Updates', desc: 'Get notified when your order status changes', defaultChecked: true },
          { label: 'Promotions', desc: 'Receive special offers and discounts', defaultChecked: false },
          { label: 'WhatsApp Notifications', desc: 'Receive order updates via WhatsApp', defaultChecked: true },
        ].map((item, i, arr) => (
          <div key={item.label} className={`flex items-center justify-between py-5 ${i < arr.length - 1 ? 'border-b border-white/[0.06]' : ''}`}>
            <div>
              <span className="text-sm font-semibold text-white block">{item.label}</span>
              <span className="text-xs text-white/40 mt-0.5 block">{item.desc}</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer flex-shrink-0 ml-4">
              <input type="checkbox" defaultChecked={item.defaultChecked} className="sr-only peer" />
              <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-accent" />
            </label>
          </div>
        ))}
      </section>

      {/* Danger Zone */}
      <section className="rounded-3xl border border-red-500/20 bg-red-500/5 p-6 md:p-8 pb-8">
        <div className="flex items-center gap-3 pb-4 border-b border-red-500/10 mb-6">
          <div className="w-1 h-5 rounded-full bg-red-500" />
          <h3 className="text-xs font-bold text-red-400/80 uppercase tracking-widest">Danger Zone</h3>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm font-semibold text-white block">Delete Account</span>
            <span className="text-xs text-white/40 mt-0.5 block">Permanently remove your account and all data</span>
          </div>
          <button className="text-red-400 text-sm font-semibold px-5 py-2.5 rounded-full border border-red-500/30 hover:bg-red-500/10 active:scale-[0.98] transition-all flex-shrink-0 ml-4">
            Delete
          </button>
        </div>
      </section>
    </div>
  );
}
