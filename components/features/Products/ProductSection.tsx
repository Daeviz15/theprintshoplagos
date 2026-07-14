'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useModalStore } from '@/lib/store/useModalStore';
import Link from 'next/link';

const categories = ['All', 'Art', 'Portrait', 'Fashion', 'Cultural', 'Lifestyle', 'Landscape'];

const allProducts = [
  {
    "id": 18,
    "category": "Fashion",
    "src": "/owners_product/fashion-1.jpg",
    "alt": "Fashion Photography",
    "size": "small"
  },
  {
    "id": 14,
    "category": "Portrait",
    "src": "/owners_product/portrait-6.jpg",
    "alt": "Portrait Photography",
    "size": "large"
  },
  {
    "id": 29,
    "category": "Lifestyle",
    "src": "/owners_product/lifestyle-3.jpg",
    "alt": "Lifestyle Photography",
    "size": "small"
  },
  {
    "id": 31,
    "category": "Landscape",
    "src": "/owners_product/landscape-1.jpg",
    "alt": "Landscape Photography",
    "size": "wide"
  },
  {
    "id": 30,
    "category": "Lifestyle",
    "src": "/owners_product/lifestyle-4.jpg",
    "alt": "Lifestyle Photography",
    "size": "large"
  },
  {
    "id": 5,
    "category": "Art",
    "src": "/img_2.png",
    "alt": "Art Collection",
    "size": "large"
  },
  {
    "id": 15,
    "category": "Portrait",
    "src": "/owners_product/portrait-7.jpg",
    "alt": "Portrait Photography",
    "size": "wide"
  },
  {
    "id": 4,
    "category": "Art",
    "src": "/img_1.png",
    "alt": "Art Collection",
    "size": "wide"
  },
  {
    "id": 10,
    "category": "Portrait",
    "src": "/owners_product/portrait-2.jpg",
    "alt": "Portrait Photography",
    "size": "wide"
  },
  {
    "id": 16,
    "category": "Portrait",
    "src": "/owners_product/portrait-8.jpg",
    "alt": "Portrait Photography",
    "size": "small"
  },
  {
    "id": 22,
    "category": "Fashion",
    "src": "/owners_product/fashion-5.jpg",
    "alt": "Fashion Photography",
    "size": "small"
  },
  {
    "id": 27,
    "category": "Lifestyle",
    "src": "/owners_product/lifestyle-1.jpg",
    "alt": "Lifestyle Photography",
    "size": "small"
  },
  {
    "id": 11,
    "category": "Portrait",
    "src": "/owners_product/portrait-3.jpg",
    "alt": "Portrait Photography",
    "size": "small"
  },
  {
    "id": 13,
    "category": "Portrait",
    "src": "/owners_product/portrait-5.jpg",
    "alt": "Portrait Photography",
    "size": "small"
  },
  {
    "id": 21,
    "category": "Fashion",
    "src": "/owners_product/fashion-4.jpg",
    "alt": "Fashion Photography",
    "size": "large"
  },
  {
    "id": 17,
    "category": "Portrait",
    "src": "/owners_product/portrait-9.jpg",
    "alt": "Portrait Photography",
    "size": "tall"
  },
  {
    "id": 28,
    "category": "Lifestyle",
    "src": "/owners_product/lifestyle-2.jpg",
    "alt": "Lifestyle Photography",
    "size": "tall"
  },
  {
    "id": 19,
    "category": "Fashion",
    "src": "/owners_product/fashion-2.jpg",
    "alt": "Fashion Photography",
    "size": "small"
  },
  {
    "id": 9,
    "category": "Portrait",
    "src": "/owners_product/portrait-1.jpg",
    "alt": "Portrait Photography",
    "size": "small"
  },
  {
    "id": 3,
    "category": "Art",
    "src": "/hero_image.png",
    "alt": "Art Collection",
    "size": "small"
  },
  {
    "id": 6,
    "category": "Art",
    "src": "/img_5.png",
    "alt": "Art Collection",
    "size": "small"
  },
  {
    "id": 23,
    "category": "Cultural",
    "src": "/owners_product/cultural-1.jpg",
    "alt": "Cultural Photography",
    "size": "tall"
  },
  {
    "id": 24,
    "category": "Cultural",
    "src": "/owners_product/cultural-2.jpg",
    "alt": "Cultural Photography",
    "size": "small"
  },
  {
    "id": 7,
    "category": "Art",
    "src": "/imag_3.png",
    "alt": "Art Collection",
    "size": "tall"
  },
  {
    "id": 32,
    "category": "Landscape",
    "src": "/owners_product/landscape-2.jpg",
    "alt": "Landscape Photography",
    "size": "small"
  },
  {
    "id": 12,
    "category": "Portrait",
    "src": "/owners_product/portrait-4.jpg",
    "alt": "Portrait Photography",
    "size": "tall"
  },
  {
    "id": 20,
    "category": "Fashion",
    "src": "/owners_product/fashion-3.jpg",
    "alt": "Fashion Photography",
    "size": "wide"
  },
  {
    "id": 25,
    "category": "Cultural",
    "src": "/owners_product/cultural-3.jpg",
    "alt": "Cultural Photography",
    "size": "small"
  },
  {
    "id": 2,
    "category": "Art",
    "src": "/art_2.png",
    "alt": "Art Collection",
    "size": "small"
  },
  {
    "id": 1,
    "category": "Art",
    "src": "/art_1.png",
    "alt": "Art Collection",
    "size": "tall"
  },
  {
    "id": 8,
    "category": "Art",
    "src": "/imag_4.png",
    "alt": "Art Collection",
    "size": "small"
  },
  {
    "id": 26,
    "category": "Cultural",
    "src": "/owners_product/cultural-4.jpg",
    "alt": "Cultural Photography",
    "size": "wide"
  }
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
        {/* Gallery */}
        <motion.div 
          layout 
          className={
            activeCategory === 'All'
              ? "w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 auto-rows-[180px] sm:auto-rows-[250px] gap-3 sm:gap-4 lg:gap-6 grid-flow-dense"
              : "w-full flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6"
          }
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product: any) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.85, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 30 }}
                transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
                key={product.id}
                className={`relative overflow-hidden group cursor-pointer bg-white/5 shadow-sm hover:shadow-xl rounded-2xl ${
                  activeCategory === 'All'
                    ? (product.size === 'tall' ? 'row-span-2 col-span-1' 
                     : product.size === 'wide' ? 'col-span-2 row-span-1' 
                     : product.size === 'large' ? 'col-span-2 row-span-2' 
                     : 'col-span-1 row-span-1')
                    : 'w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)] aspect-[3/4]'
                }`}
              >
                <div className="relative w-full h-full min-h-[150px]">
                  <Image
                    src={product.src}
                    alt={product.alt}
                    fill
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 pointer-events-none" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More Button */}
        <div className="mt-16">
          <Link
            href="/auth/signup"
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
          </Link>
        </div>

      </div>
    </section>
  );
}
