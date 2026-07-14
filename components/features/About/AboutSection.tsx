'use client';

import { section } from 'framer-motion/client';
import Image from 'next/image';

export default function AboutSection() {
  return (
    <section id="about" className="relative w-full py-20 lg:py-28 px-6 md:px-8 lg:px-16 overflow-hidden bg-white">
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center gap-8 sm:gap-10 md:gap-28 lg:gap-24">

        {/* ── Left: Overlapping Framed Art ── */}
        <div className="relative w-full lg:w-[50%] flex-shrink-0 h-[280px] sm:h-[340px] lg:min-h-[500px]">
          {/* Back artwork — tilted left */}
          <div
            className="absolute left-0 top-6 w-[50%] sm:w-[55%] z-10"
            style={{ transform: 'rotate(-6deg)' }}
          >
            <div className="rounded-xl overflow-hidden border-[5px] sm:border-[6px] border-black/5 shadow-2xl">
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src="/owners_product/portrait-6.jpg"
                  alt="Fine art print — landscape"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 45vw, 320px"
                />
              </div>
            </div>
          </div>

          {/* Front artwork — tilted right, overlapping */}
          <div
            className="absolute left-[30%] top-0 w-[55%] sm:w-[60%] z-20"
            style={{ transform: 'rotate(4deg)' }}
          >
            <div className="rounded-xl overflow-hidden border-[5px] sm:border-[6px] border-black/5 shadow-2xl">
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src="/owners_product/portrait-15.jpg"
                  alt="Fine art print — portrait"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 55vw, (max-width: 1024px) 50vw, 360px"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: Copy ── */}
        <div className="flex flex-col gap-5 lg:w-[50%] w-full">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-accent">
            Our Story
          </span>

          <h2 className="text-[clamp(2rem,5vw,3.2rem)] font-heading font-extrabold leading-[1.05] tracking-tight text-brand-black">
            Where Art Meets{' '}
            <br className="hidden lg:block" />
            Precision Craft
          </h2>

          <p className="text-[14px] sm:text-[15px] leading-[1.8] text-brand-muted max-w-[460px]">
            The Print Shop Lagos was born from a simple conviction: every piece
            of art deserves to be experienced beyond a screen. We combine
            museum-grade materials with meticulous craftsmanship to transform
            your favourite artworks into gallery-worthy prints — framed,
            finished, and delivered to your doorstep in Lagos.
          </p>

          <p className="text-[14px] sm:text-[15px] leading-[1.8] text-brand-muted max-w-[460px]">
            From archival-quality giclée paper to hand-finished wooden and
            acrylic frames, every detail is curated for collectors, creatives,
            and anyone who believes their walls should tell a story.
          </p>

          <div className="flex items-center gap-4 mt-3">
            <a
              href="/about"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-accent text-white text-sm font-semibold rounded-full hover:bg-brand-accent/90 transition-all shadow-lg hover:shadow-xl group"
            >
              Learn More
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}