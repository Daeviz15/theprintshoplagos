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

      {/* Profile Header */}
      <div className="flex items-center gap-5">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={fullName}
            className="w-16 h-16 rounded-full object-cover ring-2 ring-black/5"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-brand-black text-white flex items-center justify-center text-xl font-medium">
            {initials}
          </div>
        )}
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-brand-black">{fullName || 'Your Account'}</h2>
          <p className="text-sm text-brand-muted mt-0.5">{email}</p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-black/[0.04]" />

      {/* Profile Section */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-medium text-brand-muted uppercase tracking-widest">Profile</h3>
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <label className="block text-xs font-medium text-brand-muted mb-2 uppercase tracking-wider">Full Name</label>
            <input 
              type="text" 
              defaultValue={fullName} 
              placeholder="Enter your full name"
              className="w-full px-5 py-3.5 rounded-2xl border border-black/[0.06] bg-white focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent/30 transition-all text-sm font-medium text-brand-black placeholder:text-brand-muted/40"
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-brand-muted mb-2 uppercase tracking-wider">Email</label>
            <input 
              type="email" 
              disabled
              defaultValue={email} 
              className="w-full px-5 py-3.5 rounded-2xl border border-black/[0.04] bg-brand-offwhite text-brand-muted cursor-not-allowed focus:outline-none text-sm font-medium"
            />
            <p className="text-[11px] text-brand-muted/60 mt-2 leading-relaxed">
              Managed by your Google account. Cannot be changed here.
            </p>
          </div>

          <div>
            <label className="block text-xs font-medium text-brand-muted mb-2 uppercase tracking-wider">Phone Number</label>
            <input 
              type="tel" 
              placeholder="+234 800 000 0000"
              className="w-full px-5 py-3.5 rounded-2xl border border-black/[0.06] bg-white focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent/30 transition-all text-sm font-medium text-brand-black placeholder:text-brand-muted/40"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-brand-muted mb-2 uppercase tracking-wider">Delivery Address</label>
            <textarea
              rows={3}
              placeholder="Enter your default delivery address"
              className="w-full px-5 py-3.5 rounded-2xl border border-black/[0.06] bg-white focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent/30 transition-all text-sm font-medium text-brand-black placeholder:text-brand-muted/40 resize-none"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button className="bg-brand-black text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-brand-black/90 active:scale-[0.98] transition-all">
              Save Changes
            </button>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-black/[0.04]" />

      {/* Notifications Section */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-medium text-brand-muted uppercase tracking-widest">Notifications</h3>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between py-4 border-b border-black/[0.03]">
            <div>
              <span className="text-sm font-medium text-brand-black block">Order Updates</span>
              <span className="text-xs text-brand-muted mt-0.5 block">Get notified when your order status changes</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-black/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-black" />
            </label>
          </div>

          <div className="flex items-center justify-between py-4 border-b border-black/[0.03]">
            <div>
              <span className="text-sm font-medium text-brand-black block">Promotions</span>
              <span className="text-xs text-brand-muted mt-0.5 block">Receive special offers and discounts</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-black/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-black" />
            </label>
          </div>

          <div className="flex items-center justify-between py-4">
            <div>
              <span className="text-sm font-medium text-brand-black block">WhatsApp Notifications</span>
              <span className="text-xs text-brand-muted mt-0.5 block">Receive order updates via WhatsApp</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-black/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-black" />
            </label>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-black/[0.04]" />

      {/* Danger Zone */}
      <section className="pb-8">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-medium text-red-400 uppercase tracking-widest">Danger Zone</h3>
        </div>

        <div className="flex items-center justify-between bg-red-50/50 rounded-2xl p-5 border border-red-100">
          <div>
            <span className="text-sm font-medium text-brand-black block">Delete Account</span>
            <span className="text-xs text-brand-muted mt-0.5 block">Permanently remove your account and all data</span>
          </div>
          <button className="text-red-500 text-sm font-medium px-5 py-2.5 rounded-full border border-red-200 hover:bg-red-50 active:scale-[0.98] transition-all">
            Delete
          </button>
        </div>
      </section>
    </div>
  );
}
