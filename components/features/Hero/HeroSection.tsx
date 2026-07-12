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
  
  // Image Swap State
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

  return (
    <section className="relative w-full h-dvh min-h-[600px] bg-brand-offwhite overflow-hidden">
      <Navbar />

      {/* ── Content grid ── */}
      <div className="relative z-10 h-full flex items-center px-8 lg:px-12">
        {/* Left: Text */}
        <div className="flex flex-col justify-center max-w-[520px] pt-16">
          <h1 className="text-[clamp(2.8rem,5.5vw,5rem)] font-black leading-[0.95] tracking-tight text-brand-black">
            Premium{' '}
            <br />
            Art Printing{' '}
            <br />
            in Lagos
          </h1>

          <p className="mt-6 text-[15px] leading-relaxed text-brand-muted max-w-[360px]">
            Don&apos;t settle for ordinary prints. Experience gallery-quality
            artwork printing with precision framing, premium materials, and
            expert craftsmanship.
          </p>
        </div>

        {/* Right: Hero Image */}
        <div className="hidden md:flex absolute right-0 top-0 pt-24 pb-24 w-[55%] h-full items-center justify-center pointer-events-none z-10">
          {/* We apply the frame classes to this inner container, giving it a max size so the frame wraps nicely */}
          <div 
            onAnimationEnd={handleAnimationEnd}
            className={`relative w-full max-w-[540px] max-h-[78vh] aspect-[4/5] pointer-events-auto transition-colors duration-500 ${frameClasses[activeFrame]} ${animClass}`}
            style={{ backgroundColor: activeBgColor }}
          >
            <Image
              src={activeImage}
              alt="Premium artwork print preview"
              fill
              className="object-contain object-center drop-shadow-2xl mix-blend-darken"
              priority
              sizes="(max-width: 1024px) 50vw, 540px"
            />

            {/* Material Finish Overlays */}
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
                  backgroundImage: 'repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)',
                  backgroundSize: '4px 4px',
                  backgroundPosition: '0 0, 2px 2px'
                }} 
              />
            )}
          </div>
        </div>
      </div>

      {/* ── Bottom Brand Bar ── */}
      <div className="absolute bottom-0 left-0 w-full z-20">
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
