'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 px-8 lg:px-12 h-16 flex items-center justify-between">
      {/* Logo */}
      <Link href="/" className="flex flex-col leading-none gap-[1px]">
        <span className="text-[13px] font-medium tracking-[0.08em] uppercase text-brand-black">
          The Print Shop
        </span>
        <span className="text-[9px] font-normal tracking-[0.25em] uppercase text-brand-accent">
          Lagos
        </span>
      </Link>

      {/* Nav Links — center right, matching reference */}
      <nav className="hidden md:flex items-center gap-8">
        <Link href="#" className="text-[12px] font-normal tracking-[0.1em] uppercase text-brand-muted hover:text-brand-black transition-colors duration-200">
          About Us
        </Link>
        <Link href="#" className="text-[12px] font-normal tracking-[0.1em] uppercase text-brand-muted hover:text-brand-black transition-colors duration-200">
          Products
        </Link>
        <Link href="#" className="text-[12px] font-normal tracking-[0.1em] uppercase text-brand-muted hover:text-brand-black transition-colors duration-200">
          Services
        </Link>
        <Link href="#" className="text-[12px] font-normal tracking-[0.1em] uppercase text-brand-muted hover:text-brand-black transition-colors duration-200">
          Help
        </Link>
      </nav>

      {/* CTA Button — dark pill */}
      <Link
        href="#"
        className="hidden sm:inline-flex items-center px-5 py-2.5 bg-brand-accent text-brand-white text-[11px] font-medium tracking-[0.1em] uppercase rounded-full hover:bg-brand-accent/90 transition-colors duration-200"
      >
        Get your art
      </Link>
    </header>
  );
}
