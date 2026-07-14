'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Frame, Printer, Image as ImageIcon, Layers, Palette } from 'lucide-react';
import type { FrameStyle } from './HeroSection';
import { useModalStore } from '@/lib/store/useModalStore';

const brands = [
  { Icon: Frame,     label: 'Framed Art', id: 'framed-art' },
  { Icon: ImageIcon, label: 'Picture Widget', id: 'picture-widget' },
  { Icon: Palette,   label: 'Fine Art',    id: 'fine-art' },
  { Icon: Printer,   label: 'Order Print', id: 'print' },
  { Icon: Layers,    label: 'Finishes', id: 'finishes' },
];

const frameOptions: { style: FrameStyle; label: string; background: string }[] = [
  { style: 'none', label: 'No Frame', background: '#f5f5f0' },
  { style: 'gallery', label: 'Gallery', background: '#ffffff' },
  { style: 'vintage-gold', label: 'Gold', background: 'linear-gradient(135deg, #fceca2, #c5a059)' },
  { style: 'acrylic', label: 'Acrylic', background: 'rgba(255, 255, 255, 0.5)' },
  { style: 'wooden', label: 'Wood', background: 'repeating-linear-gradient(45deg, #5c3a21, #5c3a21 4px, #8b5a2b 4px, #8b5a2b 8px)' },
  { style: 'matted-black', label: 'Matted', background: '#ffffff' },
];

const imageOptions = [
  { src: '/owners_product/portrait-1.jpg', label: 'Portrait' },
  { src: '/owners_product/fashion-1.jpg', label: 'Fashion' },
  { src: '/owners_product/cultural-1.jpg', label: 'Cultural' },
  { src: '/owners_product/lifestyle-1.jpg', label: 'Lifestyle' },
  { src: '/owners_product/landscape-1.jpg', label: 'Landscape' },
  { src: '/owners_product/portrait-2.jpg', label: 'Portrait 2' },
];

const colorOptions = [
  { color: '#f5f5f0', label: 'Off White' },
  { color: '#e8e0d5', label: 'Linen' },
  { color: '#1c1c1c', label: 'Charcoal' },
  { color: '#4a5d4e', label: 'Forest' },
  { color: '#7b8b9a', label: 'Slate' },
  { color: '#8c7a6b', label: 'Mocha' },
  { color: '#8c2b2b', label: 'Burgundy' },
  { color: '#d4a373', label: 'Ochre' },
];

const materialOptions = [
  { id: 'canvas', label: 'Canvas' },
  { id: 'matt', label: 'Matt' },
  { id: 'photo', label: 'Photo paper' },
  { id: 'gloss', label: 'Gloss photopaper' },
];

interface BrandBarProps {
  activeFrame: FrameStyle;
  onSelectFrame: (style: FrameStyle) => void;
  activeImage: string;
  onSelectImage: (src: string) => void;
  activeBgColor: string;
  onSelectBgColor: (color: string) => void;
  activeMaterial: string;
  onSelectMaterial: (m: any) => void;
}

export default function BrandBar({ activeFrame, onSelectFrame, activeImage, onSelectImage, activeBgColor, onSelectBgColor, activeMaterial, onSelectMaterial }: BrandBarProps) {
  const [showFramesMenu, setShowFramesMenu] = useState(false);
  const [showImagesMenu, setShowImagesMenu] = useState(false);
  const [showColorsMenu, setShowColorsMenu] = useState(false);
  const [showPrintMenu, setShowPrintMenu] = useState(false);
  const [showMaterialsMenu, setShowMaterialsMenu] = useState(false);
  const [activeBrand, setActiveBrand] = useState('fine-art');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        closeAll();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const closeAll = () => {
    setShowFramesMenu(false);
    setShowImagesMenu(false);
    setShowColorsMenu(false);
    setShowPrintMenu(false);
    setShowMaterialsMenu(false);
  };

  const handleBrandClick = (id: string) => {
    setActiveBrand(id);
    if (id === 'framed-art') { closeAll(); setShowFramesMenu((p) => !p); }
    else if (id === 'picture-widget') { closeAll(); setShowImagesMenu((p) => !p); }
    else if (id === 'fine-art') { closeAll(); setShowColorsMenu((p) => !p); }
    else if (id === 'print') { closeAll(); setShowPrintMenu((p) => !p); }
    else if (id === 'finishes') { closeAll(); setShowMaterialsMenu((p) => !p); }
    else { closeAll(); onSelectFrame('none'); }
  };

  /* Shared popover wrapper — compact */
  const popoverClass = (show: boolean) =>
    `absolute bottom-full mb-3 bg-[#1a1a1a] rounded-xl shadow-lg border border-white/10 z-30 transition-all duration-200 ease-out origin-bottom ${
      show ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 translate-y-3 pointer-events-none'
    }`;

  return (
    <div ref={containerRef} className="relative py-3 sm:py-5 px-4 flex flex-col items-center justify-center pointer-events-auto">

      {/* ── Frame Selection ── */}
      <div className={`${popoverClass(showFramesMenu)} p-2 flex gap-1`}>
        {frameOptions.map((opt) => (
          <button
            key={opt.style}
            onClick={() => onSelectFrame(opt.style)}
            className={`relative z-10 flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors ${activeFrame === opt.style ? 'bg-white/10' : 'hover:bg-white/5'}`}
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-brand-border shadow-sm" style={{ background: opt.background }} />
            <span className="text-[8px] sm:text-[9px] font-semibold text-white/70 uppercase tracking-wider whitespace-nowrap">{opt.label}</span>
          </button>
        ))}
      </div>

      {/* ── Image Selection ── */}
      <div className={`${popoverClass(showImagesMenu)} p-2 grid grid-cols-3 gap-1.5`}>
        {imageOptions.map((opt) => (
          <button
            key={opt.src}
            onClick={() => onSelectImage(opt.src)}
            className={`relative z-10 p-1 rounded-lg transition-colors ${activeImage === opt.src ? 'bg-white/10 ring-2 ring-brand-accent' : 'hover:bg-white/5'}`}
          >
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-md overflow-hidden border border-white/10">
              <Image src={opt.src} alt={opt.label} fill className="object-cover object-center" sizes="48px" />
            </div>
          </button>
        ))}
      </div>

      {/* ── Color Selection ── */}
      <div className={`${popoverClass(showColorsMenu)} p-2 grid grid-cols-4 gap-1.5`}>
        {colorOptions.map((opt) => (
          <button
            key={opt.color}
            onClick={() => onSelectBgColor(opt.color)}
            className={`relative z-10 flex flex-col items-center gap-1 p-1.5 rounded-lg transition-colors ${activeBgColor === opt.color ? 'bg-white/10 ring-2 ring-brand-accent' : 'hover:bg-white/5'}`}
          >
            <div
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border shadow-sm ${opt.color === '#1c1c1c' ? 'border-white/20' : 'border-brand-border'}`}
              style={{ backgroundColor: opt.color }}
            />
            <span className="text-[7px] sm:text-[8px] font-semibold text-white/70 uppercase tracking-wider whitespace-nowrap">{opt.label}</span>
          </button>
        ))}
      </div>

      {/* ── Print Widget ── */}
      <div className={`${popoverClass(showPrintMenu)} w-64 sm:w-72 p-4`}>
        <div className="flex flex-col gap-3 relative z-10">
          <div>
            <h3 className="text-base font-black text-white tracking-tight">Ready to print?</h3>
            <p className="text-[11px] sm:text-[12px] text-white/60 mt-1 leading-relaxed">
              Gallery-quality printing with premium framing options.
            </p>
          </div>
          <ul className="space-y-2">
            {['Museum-grade materials', 'Custom sizes', 'Fast Lagos delivery'].map((item) => (
              <li key={item} className="flex items-center gap-2 text-[11px] sm:text-[12px] font-medium text-white/80">
                <div className="w-4 h-4 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent flex-shrink-0">
                  <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                {item}
              </li>
            ))}
          </ul>
          <button
            onClick={() => useModalStore.getState().setSignUpModalOpen(true)}
            className="w-full py-2.5 px-3 bg-brand-accent hover:bg-brand-accent/90 text-white rounded-lg font-semibold text-[12px] transition-all shadow-md flex items-center justify-center gap-2 group"
          >
            Get a Print
            <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </button>
        </div>
      </div>

      {/* ── Materials ── */}
      <div className={`${popoverClass(showMaterialsMenu)} p-2 flex gap-1.5`}>
        {materialOptions.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onSelectMaterial(opt.id)}
            className={`relative z-10 flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg transition-all text-[10px] sm:text-[11px] font-bold uppercase tracking-wider whitespace-nowrap ${
              activeMaterial === opt.id ? 'bg-brand-accent text-white shadow-md' : 'bg-white/10 hover:bg-white/20 text-white/70'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* ── Main Icon Bar ── */}
      <div className="flex items-center justify-center gap-3 sm:gap-6">
        {brands.map(({ Icon, label, id }) => {
          const isActive = activeBrand === id;
          return (
            <button
              key={id}
              title={label}
              aria-label={label}
              onClick={() => handleBrandClick(id)}
              className={`
                w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0
                ${isActive
                  ? 'bg-white text-brand-black ring-2 ring-brand-accent ring-offset-2 ring-offset-brand-black scale-110 shadow-lg'
                  : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white hover:scale-105'
                }
              `}
            >
              <Icon className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px]" strokeWidth={1.5} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
