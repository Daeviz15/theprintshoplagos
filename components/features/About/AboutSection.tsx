'use client';

import Image from 'next/image';

export default function AboutSection() {
  return (
    <section className="relative w-full bg-white py-28 px-8 lg:px-16 overflow-hidden">
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

        {/* ── Left: Overlapping Framed Art ── */}
        <div className="relative w-full lg:w-[50%] flex-shrink-0 min-h-[500px]">
          {/* Back artwork — tilted left */}
          <div
            className="absolute left-0 top-8 w-[55%] z-10"
            style={{ transform: 'rotate(-6deg)' }}
          >
            <div className="rounded-xl overflow-hidden border-[6px] border-brand-black shadow-2xl">
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src="/art_1.png"
                  alt="Fine art print — abstract composition"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 55vw, 320px"
                />
              </div>
            </div>
          </div>

          {/* Front artwork — tilted right, overlapping */}
          <div
            className="relative left-[30%] top-0 w-[60%] z-20"
            style={{ transform: 'rotate(4deg)' }}
          >
            <div className="rounded-xl overflow-hidden border-[6px] border-brand-black shadow-2xl">
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src="/art_2.png"
                  alt="Fine art print — portrait study"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 60vw, 360px"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: Copy ── */}
        <div className="flex flex-col gap-6 lg:w-[50%]">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-accent">
            Our Story
          </span>

          <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-black leading-[1.05] tracking-tight text-brand-black">
            Where Art Meets{' '}
            <br className="hidden lg:block" />
            Precision Craft
          </h2>

          <p className="text-[15px] leading-[1.8] text-brand-muted max-w-[460px]">
            The Print Shop Lagos was born from a simple conviction: every piece 
            of art deserves to be experienced beyond a screen. We combine 
            museum-grade materials with meticulous craftsmanship to transform 
            your favourite artworks into gallery-worthy prints — framed, 
            finished, and delivered to your doorstep in Lagos.
          </p>

          <p className="text-[15px] leading-[1.8] text-brand-muted max-w-[460px]">
            From archival-quality giclée paper to hand-finished wooden and 
            acrylic frames, every detail is curated for collectors, creatives, 
            and anyone who believes their walls should tell a story.
          </p>

          <div className="flex items-center gap-4 mt-4">
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
