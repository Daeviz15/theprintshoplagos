'use client';

import Link from 'next/link';
import { useModalStore } from '@/lib/store/useModalStore';

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10">

      {/* CTA Banner — dark card like the reference */}
      <div className="mx-6 mt-6 mb-0 rounded-3xl bg-[#111111] overflow-hidden relative">
        {/* Subtle circular gradient texture */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute right-[-10%] top-[-20%] w-[600px] h-[600px] rounded-full bg-white/[0.03] blur-3xl" />
          <div className="absolute right-[20%] bottom-[-40%] w-[400px] h-[400px] rounded-full bg-brand-accent/5 blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center text-center px-8 py-20 sm:py-28">
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-heading font-extrabold tracking-tight text-white leading-tight max-w-2xl">
            Print Your Art with <br />
            <span className="text-brand-accent">The Print Shop Lagos</span>
          </h2>
          <p className="mt-5 text-sm text-white/50 max-w-md leading-relaxed">
            Get premium gallery-quality prints delivered to your door — that's exciting
          </p>
          <Link
            href="/auth/signup"
            className="mt-10 flex items-center gap-3 px-8 py-4 rounded-full bg-brand-accent text-white font-bold text-sm hover:bg-brand-accent/90 transition-all duration-300 shadow-xl"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
            </svg>
            Get Your Print
          </Link>
        </div>
      </div>

      {/* Footer Links Block */}
      <div className="px-8 sm:px-12 lg:px-20 pt-16 pb-8">
        <div className="flex flex-col md:flex-row justify-between gap-12">

          {/* Left — Brand + tagline */}
          <div className="md:w-1/3">
            <div className="text-sm font-black tracking-[0.15em] text-white uppercase leading-tight">
              THE PRINT SHOP
              <span className="block text-brand-accent">LAGOS</span>
            </div>
            <p className="mt-4 text-[13px] text-white/50 leading-relaxed max-w-xs">
              Premium art printing and custom framing, delivered across Lagos.
            </p>
          </div>

          {/* Center — Nav links (mirroring reference) */}
          <div className="flex flex-col gap-4">
            <Link href="#" className="text-[14px] text-white/50 hover:text-white transition-colors duration-200">About Us</Link>
            <Link href="#" className="text-[14px] text-white/50 hover:text-white transition-colors duration-200">Products</Link>
            <Link href="#contact" className="text-[14px] text-white/50 hover:text-white transition-colors duration-200">Contact Us</Link>
            <Link
              href="/auth/signup"
              className="text-left text-[14px] text-white/50 hover:text-white transition-colors duration-200"
            >
              Get a Print
            </Link>
          </div>

          {/* Right — Subscribe (from reference) */}
          <div className="md:w-1/3">
            <p className="text-[13px] font-bold text-white uppercase tracking-widest mb-4">
              Subscribe to News
            </p>
            <form
              className="flex items-center gap-0 border border-white/10 rounded-full overflow-hidden pr-1 bg-white/5"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Your e-mail"
                className="flex-1 bg-transparent px-5 py-3 text-[13px] text-white placeholder:text-white/40 outline-none"
              />
              <button
                type="submit"
                className="w-9 h-9 flex-shrink-0 rounded-full bg-brand-accent flex items-center justify-center hover:bg-brand-accent/80 transition-colors duration-300"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </form>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-8">
              {/* Instagram */}
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-colors duration-200">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              {/* Twitter/X */}
              <a href="#" aria-label="Twitter" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-colors duration-200">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              {/* WhatsApp */}
              <a href="#" aria-label="WhatsApp" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-colors duration-200">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link href="#" className="text-[12px] text-white/40 hover:text-white transition-colors">Terms</Link>
            <Link href="#" className="text-[12px] text-white/40 hover:text-white transition-colors">Privacy</Link>
          </div>
          {/* Brand mark */}
          <div className="w-8 h-8 rounded-full border-2 border-white/30 flex items-center justify-center">
            <span className="text-[10px] font-black text-white">TP</span>
          </div>
          <p className="text-[12px] text-white/40">
            © {new Date().getFullYear()} The Print Shop Lagos. All rights reserved.
          </p>
        </div>
      </div>

    </footer>
  );
}
