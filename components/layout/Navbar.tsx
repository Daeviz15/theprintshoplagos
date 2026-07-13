'use client';

import { useState } from 'react';
import { useLenis } from 'lenis/react';
import { useModalStore } from '@/lib/store/useModalStore';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function Navbar() {
  const lenis = useLenis();
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el && lenis) {
        lenis.scrollTo(el, { offset: -64, duration: 1.4, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      } else if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, menuOpen ? 300 : 0); // wait for menu close animation
  };

  const navLinkClass =
    'text-[12px] font-normal tracking-[0.1em] uppercase text-brand-muted hover:text-brand-black transition-colors duration-200 cursor-pointer bg-transparent border-none p-0';

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 px-6 lg:px-12 h-16 flex items-center justify-between">
        {/* Frosted glass background */}
        <div className="absolute inset-0 bg-brand-offwhite/80 backdrop-blur-md border-b border-brand-border/60 -z-10" />

        {/* Logo */}
        <button
          onClick={() => { setMenuOpen(false); lenis?.scrollTo(0, { duration: 1.4 }); }}
          className="flex flex-col leading-none gap-[1px] bg-transparent border-none p-0 cursor-pointer"
        >
          <span className="text-[13px] font-medium tracking-[0.08em] uppercase text-brand-black">
            The Print Shop
          </span>
          <span className="text-[9px] font-normal tracking-[0.25em] uppercase text-brand-accent">
            Lagos
          </span>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollTo('about')} className={navLinkClass}>About Us</button>
          <button onClick={() => scrollTo('products')} className={navLinkClass}>Products</button>
          <button onClick={() => scrollTo('contact')} className={navLinkClass}>Contact Us</button>
        </nav>

        {/* Desktop CTA */}
        <Link
          href="/auth/signup"
          className="hidden md:inline-flex items-center px-5 py-2.5 bg-brand-accent text-white text-[11px] font-medium tracking-[0.1em] uppercase rounded-full hover:bg-brand-black transition-colors duration-300"
        >
          Get your art
        </Link>

        {/* Mobile: Hamburger */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px] z-10"
        >
          <span className={`block w-5 h-[1.5px] bg-brand-black transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
          <span className={`block w-5 h-[1.5px] bg-brand-black transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`block w-5 h-[1.5px] bg-brand-black transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed top-16 left-0 w-full z-40 bg-brand-offwhite/95 backdrop-blur-xl border-b border-brand-border shadow-2xl md:hidden"
          >
            <nav className="flex flex-col px-6 py-8 gap-2">
              {[
                { label: 'About Us', id: 'about' },
                { label: 'Products', id: 'products' },
                { label: 'Contact Us', id: 'contact' },
              ].map(({ label, id }, i) => (
                <motion.button
                  key={id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.25 }}
                  onClick={() => scrollTo(id)}
                  className="text-left py-4 text-xl font-bold text-brand-black border-b border-brand-border/40 hover:text-brand-accent transition-colors duration-200"
                >
                  {label}
                </motion.button>
              ))}
              <Link
                href="/auth/signup"
                onClick={() => setMenuOpen(false)}
                className="mt-6 w-full block text-center py-4 bg-brand-accent text-white font-bold text-sm rounded-full hover:bg-brand-black transition-colors duration-300 shadow-lg"
              >
                Get Your Art
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
