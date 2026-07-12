'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useModalStore } from '@/lib/store/useModalStore';

const categories = ['All', 'Artists', 'Typography', 'Quotes', 'Abstract'];

const allProducts = [
  { id: 1, category: 'Artists', src: '/products/artist-wizkid.jfif', alt: 'Wizkid Portrait' },
  { id: 6, category: 'Abstract', src: '/products/art-gallery-1.jfif', alt: 'Gallery Art 1' },
  { id: 3, category: 'Typography', src: '/products/art-typography.jfif', alt: 'Typography Art' },
  { id: 7, category: 'Abstract', src: '/products/art-gallery-2.jfif', alt: 'Gallery Art 2' },
  { id: 2, category: 'Artists', src: '/products/artist-burnaboy.jfif', alt: 'Burna Boy Art' },
  { id: 4, category: 'Quotes', src: '/products/quote-dice.jfif', alt: 'Quote Dice' },
  { id: 5, category: 'Abstract', src: '/products/art-graphic.jfif', alt: 'Graphic Art' },
  { id: 8, category: 'Abstract', src: '/products/art-gallery-3.jfif', alt: 'Gallery Art 3' },
  { id: 9, category: 'Abstract', src: '/products/art-gallery-4.jfif', alt: 'Gallery Art 4' },
  { id: 10, category: 'Abstract', src: '/products/art-gallery-5.jfif', alt: 'Gallery Art 5' },
  { id: 11, category: 'Abstract', src: '/products/art-gallery-6.jfif', alt: 'Gallery Art 6' },
  { id: 12, category: 'Abstract', src: '/products/art-gallery-7.jfif', alt: 'Gallery Art 7' },
  { id: 13, category: 'Abstract', src: '/products/art-gallery-8.jfif', alt: 'Gallery Art 8' },
  { id: 14, category: 'Abstract', src: '/products/art-gallery-9.jfif', alt: 'Gallery Art 9' },
];

export default function ProductSection() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = activeCategory === 'All'
    ? allProducts
    : allProducts.filter(p => p.category === activeCategory);

  return (
    <section id="products" className="relative w-full bg-brand-offwhite py-16 lg:py-24 px-4 sm:px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto flex flex-col items-center">

        {/* Header section */}
        <div className="text-center mb-12">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-muted">
            ONLY THE BEST ART
          </span>
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-black leading-tight tracking-tight text-brand-black mt-4 mb-6">
            Our Art Collection
          </h2>
          <p className="text-[15px] leading-[1.8] text-brand-muted max-w-[600px] mx-auto">
            We provide our customers with the most incredible viewing emotions.
            That's why we have only world-class art and premium prints in our collection.
          </p>
        </div>

        {/* Categories Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12 lg:mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                px-5 py-2 rounded-full text-[12px] sm:text-[13px] font-medium tracking-[0.05em] transition-all duration-300
                ${activeCategory === cat
                  ? 'bg-brand-black text-white shadow-lg scale-105'
                  : 'bg-white text-brand-muted hover:bg-brand-black/5 hover:text-brand-black border border-brand-border'
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>
        {/* Masonry Gallery */}
        <motion.div layout className="w-full columns-2 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 sm:gap-4 lg:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.85, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 30 }}
                transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
                key={product.id}
                className="relative w-full break-inside-avoid rounded-2xl overflow-hidden group cursor-pointer bg-white shadow-sm hover:shadow-xl mb-3 sm:mb-4 lg:mb-6"
              >
                <div className="relative w-full">
                  <Image
                    src={product.src}
                    alt={product.alt}
                    width={600}
                    height={800}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More Button */}
        <div className="mt-16">
          <button
            onClick={() => useModalStore.getState().setSignUpModalOpen(true)}
            className="flex items-center gap-2 px-8 py-4 bg-white text-brand-black text-[13px] font-bold rounded-full hover:bg-brand-black hover:text-white transition-all shadow-md group border border-brand-border hover:border-brand-black"
          >
            View More
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}
