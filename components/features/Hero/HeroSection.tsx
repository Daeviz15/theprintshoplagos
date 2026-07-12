'use client';

import { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import BrandBar from './BrandBar';

export type FrameStyle = 'none' | 'vintage-gold' | 'acrylic' | 'gallery' | 'wooden';
export type MaterialStyle = 'matte' | 'glossy' | 'acrylic-glass' | 'canvas';

const frameClasses: Record<FrameStyle, string> = {
  none: 'frame-base',
  'vintage-gold': 'frame-base frame-vintage-gold',
  'acrylic': 'frame-base frame-acrylic',
  'gallery': 'frame-base frame-gallery',
  'wooden': 'frame-base frame-wooden',
};

export default function HeroSection() {
  const [activeFrame, setActiveFrame] = useState<FrameStyle>('none');
  const [activeBgColor, setActiveBgColor] = useState('#f5f5f0');
  const [activeMaterial, setActiveMaterial] = useState<MaterialStyle>('matte');

  const [activeImage, setActiveImage] = useState('/hero_image.png');
  const [nextImage, setNextImage] = useState<string | null>(null);
  const [animState, setAnimState] = useState<'idle' | 'taking-off' | 'putting-on'>('idle');

  const handleSelectImage = (imgSrc: string) => {
    if (imgSrc === activeImage || animState !== 'idle') return;
    setNextImage(imgSrc);
    setAnimState('taking-off');
  };

  const handleAnimationEnd = () => {
    if (animState === 'taking-off' && nextImage) {
      setActiveImage(nextImage);
      setAnimState('putting-on');
    } else if (animState === 'putting-on') {
      setAnimState('idle');
      setNextImage(null);
    }
  };

  let animClass = '';
  if (animState === 'taking-off') animClass = 'animate-take-off';
  if (animState === 'putting-on') animClass = 'animate-put-on';

  /* Shared image element with material overlays */
  const renderImage = () => (
    <>
      <Image
        src={activeImage}
        alt="Premium artwork print preview"
        fill
        className="object-contain object-center drop-shadow-2xl mix-blend-darken"
        priority
        sizes="(max-width: 768px) 55vw, (max-width: 1024px) 50vw, 540px"
      />
      {activeMaterial === 'glossy' && (
        <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-tr from-transparent via-white/20 to-transparent mix-blend-overlay transition-opacity duration-500" />
      )}
      {activeMaterial === 'acrylic-glass' && (
        <>
          <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-tr from-transparent via-white/30 to-transparent mix-blend-soft-light transition-opacity duration-500" />
          <div
            className="absolute inset-0 z-30 pointer-events-none bg-white/20 transition-opacity duration-500"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 20%, 0 50%)' }}
          />
        </>
      )}
      {activeMaterial === 'canvas' && (
        <div
          className="absolute inset-0 z-20 pointer-events-none opacity-[0.04] mix-blend-multiply transition-opacity duration-500"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)',
            backgroundSize: '4px 4px',
            backgroundPosition: '0 0, 2px 2px',
          }}
        />
      )}
    </>
  );

  return (
    <section className="relative w-full min-h-dvh bg-brand-offwhite flex flex-col">
      <Navbar />

      {/* ── DESKTOP layout (md+) ── */}
      <div className="hidden md:flex flex-1 items-center px-8 lg:px-12">
        {/* Left: Text */}
        <div className="flex flex-col justify-center max-w-[540px] pt-8">
          <h1 className="text-[clamp(2.8rem,5.5vw,5rem)] font-black leading-[0.95] tracking-tight text-brand-black">
            Premium <br /> Art Printing <br /> in Lagos
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed text-brand-muted max-w-[360px]">
            Don&apos;t settle for ordinary prints. Experience gallery-quality
            artwork printing with precision framing, premium materials, and
            expert craftsmanship.
          </p>
        </div>

        {/* Right: Hero Image */}
        <div className="flex-1 flex items-center justify-center h-full pt-16 pb-8 lg:pt-20 lg:pb-10 pointer-events-none">
          <div
            onAnimationEnd={handleAnimationEnd}
            className={`relative w-full max-w-[500px] max-h-[74vh] aspect-[4/5] pointer-events-auto transition-colors duration-500 ${frameClasses[activeFrame]} ${animClass}`}
            style={{ backgroundColor: activeBgColor }}
          >
            {renderImage()}
          </div>
        </div>
      </div>

      {/* ── MOBILE layout (<md) ── */}
      <div className="flex md:hidden flex-1 flex-col items-center pt-20 px-6 overflow-hidden">
        {/* Text */}
        <div className="w-full mb-4">
          <h1 className="text-[clamp(2rem,9vw,3rem)] font-black leading-[0.95] tracking-tight text-brand-black">
            Premium <br /> Art Printing <br /> in Lagos
          </h1>
          <p className="mt-3 text-[13px] leading-relaxed text-brand-muted max-w-[300px]">
            Don&apos;t settle for ordinary prints. Experience gallery-quality
            artwork printing with precision framing, premium materials, and
            expert craftsmanship.
          </p>
        </div>

        {/* Centered Image */}
        <div className="flex-1 w-full flex items-center justify-center pb-2">
          <div
            onAnimationEnd={handleAnimationEnd}
            className={`relative w-[60%] max-w-[280px] aspect-[4/5] transition-colors duration-500 ${frameClasses[activeFrame]} ${animClass}`}
            style={{ backgroundColor: activeBgColor }}
          >
            {renderImage()}
          </div>
        </div>
      </div>

      {/* ── Bottom Brand Bar — always at the bottom, centered ── */}
      {/* ── Bottom Brand Bar — always at the bottom, centered ── */}
      <div className="w-full z-20 flex-shrink-0 pb-2 lg:pb-4">
        <BrandBar
          activeFrame={activeFrame}
          onSelectFrame={setActiveFrame}
          activeImage={activeImage}
          onSelectImage={handleSelectImage}
          activeBgColor={activeBgColor}
          onSelectBgColor={setActiveBgColor}
          activeMaterial={activeMaterial}
          onSelectMaterial={setActiveMaterial}
        />
      </div>
    </section>
  );
}
