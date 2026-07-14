'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useModalStore } from '@/lib/store/useModalStore';

const categories = ['All', 'Portrait', 'Fashion', 'Cultural', 'Lifestyle', 'Landscape'];

const allProducts = [
  { id: 1, category: 'Portrait', src: '/owners_product/portrait-1.jpg', alt: 'Portrait Art' },
  { id: 2, category: 'Fashion', src: '/owners_product/fashion-1.jpg', alt: 'Fashion Photography' },
  { id: 3, category: 'Cultural', src: '/owners_product/cultural-1.jpg', alt: 'Cultural Art' },
  { id: 4, category: 'Lifestyle', src: '/owners_product/lifestyle-1.jpg', alt: 'Lifestyle Moment' },
  { id: 5, category: 'Portrait', src: '/owners_product/portrait-2.jpg', alt: 'Portrait Art' },
  { id: 6, category: 'Landscape', src: '/owners_product/landscape-1.jpg', alt: 'Landscape Photography' },
  { id: 7, category: 'Fashion', src: '/owners_product/fashion-2.jpg', alt: 'Fashion Photography' },
  { id: 8, category: 'Cultural', src: '/owners_product/cultural-2.jpg', alt: 'Cultural Art' },
  { id: 9, category: 'Portrait', src: '/owners_product/portrait-3.jpg', alt: 'Portrait Art' },
  { id: 10, category: 'Lifestyle', src: '/owners_product/lifestyle-2.jpg', alt: 'Lifestyle Moment' },
  { id: 11, category: 'Fashion', src: '/owners_product/fashion-3.jpg', alt: 'Fashion Photography' },
  { id: 12, category: 'Portrait', src: '/owners_product/portrait-4.jpg', alt: 'Portrait Art' },
  { id: 13, category: 'Cultural', src: '/owners_product/cultural-3.jpg', alt: 'Cultural Art' },
  { id: 14, category: 'Portrait', src: '/owners_product/portrait-5.jpg', alt: 'Portrait Art' },
  { id: 15, category: 'Fashion', src: '/owners_product/fashion-4.jpg', alt: 'Fashion Photography' },
  { id: 16, category: 'Lifestyle', src: '/owners_product/lifestyle-3.jpg', alt: 'Lifestyle Moment' },
  { id: 17, category: 'Portrait', src: '/owners_product/portrait-6.jpg', alt: 'Portrait Art' },
  { id: 18, category: 'Cultural', src: '/owners_product/cultural-4.jpg', alt: 'Cultural Art' },
];

export default function ProductSection() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = activeCategory === 'All'
    ? allProducts
    : allProducts.filter(p => p.category === activeCategory);

  return (
    <section id="products" className="relative w-full py-16 lg:py-24 px-4 sm:px-6 lg:px-12 bg-brand-black">
      <div className="max-w-[1400px] mx-auto flex flex-col items-center">

        {/* Header section */}
        <div className="text-center mb-12">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-accent">
            ONLY THE BEST ART
          </span>
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-heading font-extrabold leading-tight tracking-tight text-white mt-4 mb-6">
            Our Art Collection
          </h2>
          <p className="text-[15px] leading-[1.8] text-white/70 max-w-[600px] mx-auto">
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
                  ? 'bg-brand-accent text-white shadow-lg scale-105'
                  : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white border border-white/10'
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
                className="relative w-full break-inside-avoid rounded-2xl overflow-hidden group cursor-pointer bg-white/5 shadow-sm hover:shadow-xl mb-3 sm:mb-4 lg:mb-6"
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
            className="flex items-center gap-2 px-8 py-4 bg-brand-accent text-white text-[13px] font-bold rounded-full hover:bg-brand-accent/90 transition-all shadow-md group border border-brand-accent"
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
