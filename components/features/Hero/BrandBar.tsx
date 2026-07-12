'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Frame, Printer, Image as ImageIcon, Layers, Palette } from 'lucide-react';
import type { FrameStyle } from './HeroSection';

const brands = [
  { Icon: Frame,     label: 'Framed Art', id: 'framed-art' },
  { Icon: ImageIcon, label: 'Picture Widget', id: 'picture-widget' },
  { Icon: Palette,   label: 'Fine Art',    id: 'fine-art' },
  { Icon: Printer,   label: 'Order Print', id: 'print' },
  { Icon: Layers,    label: 'Finishes', id: 'finishes' },
];

const frameOptions: { style: FrameStyle; label: string; background: string }[] = [
  { style: 'none', label: 'No Frame', background: '#f5f5f0' },
  { style: 'gallery', label: 'Gallery Matte', background: '#ffffff' },
  { style: 'vintage-gold', label: 'Vintage Gold', background: 'linear-gradient(135deg, #fceca2, #c5a059)' },
  { style: 'acrylic', label: 'Acrylic Float', background: 'rgba(255, 255, 255, 0.5)' },
  { style: 'wooden', label: 'Striped Wood', background: 'repeating-linear-gradient(45deg, #5c3a21, #5c3a21 4px, #8b5a2b 4px, #8b5a2b 8px)' },
];

const imageOptions = [
  { src: '/hero_image.png', label: 'Artwork 1' },
  { src: '/img_1.png', label: 'Artwork 2' },
  { src: '/img_2.png', label: 'Artwork 3' },
  { src: '/imag_3.png', label: 'Artwork 4' },
  { src: '/imag_4.png', label: 'Artwork 5' },
  { src: '/img_5.png', label: 'Artwork 6' },
];

const colorOptions = [
  { color: '#f5f5f0', label: 'Off White' },
  { color: '#e8e0d5', label: 'Warm Linen' },
  { color: '#1c1c1c', label: 'Charcoal' },
  { color: '#4a5d4e', label: 'Forest' },
  { color: '#7b8b9a', label: 'Slate' },
  { color: '#8c7a6b', label: 'Mocha' },
  { color: '#8c2b2b', label: 'Burgundy' },
  { color: '#d4a373', label: 'Ochre' },
];

const materialOptions = [
  { id: 'matte', label: 'Matte Paper' },
  { id: 'glossy', label: 'Glossy Photo' },
  { id: 'canvas', label: 'Canvas Mesh' },
  { id: 'acrylic-glass', label: 'Acrylic Glass' },
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
  const [showCategoriesMenu, setShowCategoriesMenu] = useState(false);
  const [activeBrand, setActiveBrand] = useState('fine-art');
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowFramesMenu(false);
        setShowImagesMenu(false);
        setShowColorsMenu(false);
        setShowPrintMenu(false);
        setShowMaterialsMenu(false);
        setShowCategoriesMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleBrandClick = (id: string) => {
    setActiveBrand(id);
    
    if (id === 'framed-art') {
      setShowFramesMenu((prev) => !prev);
      setShowImagesMenu(false);
      setShowColorsMenu(false);
      setShowPrintMenu(false);
      setShowMaterialsMenu(false);
      setShowCategoriesMenu(false);
    } else if (id === 'picture-widget') {
      setShowImagesMenu((prev) => !prev);
      setShowFramesMenu(false);
      setShowColorsMenu(false);
      setShowPrintMenu(false);
      setShowMaterialsMenu(false);
      setShowCategoriesMenu(false);
    } else if (id === 'fine-art') {
      setShowColorsMenu((prev) => !prev);
      setShowFramesMenu(false);
      setShowImagesMenu(false);
      setShowPrintMenu(false);
      setShowMaterialsMenu(false);
      setShowCategoriesMenu(false);
    } else if (id === 'print') {
      setShowPrintMenu((prev) => !prev);
      setShowFramesMenu(false);
      setShowImagesMenu(false);
      setShowColorsMenu(false);
      setShowMaterialsMenu(false);
      setShowCategoriesMenu(false);
    } else if (id === 'finishes') {
      setShowMaterialsMenu((prev) => !prev);
      setShowFramesMenu(false);
      setShowImagesMenu(false);
      setShowColorsMenu(false);
      setShowPrintMenu(false);
      setShowCategoriesMenu(false);
    } else if (id === 'categories') {
      setShowCategoriesMenu((prev) => !prev);
      setShowMaterialsMenu(false);
      setShowFramesMenu(false);
      setShowImagesMenu(false);
      setShowColorsMenu(false);
      setShowPrintMenu(false);
    } else {
      setShowFramesMenu(false);
      setShowImagesMenu(false);
      setShowColorsMenu(false);
      setShowPrintMenu(false);
      setShowMaterialsMenu(false);
      setShowCategoriesMenu(false);
      onSelectFrame('none');
    }
  };

  return (
    <div ref={containerRef} className="relative py-6 px-8 flex flex-col items-center justify-center pointer-events-auto">
      
      {/* Frame Selection Popover */}
      <div 
        className={`absolute bottom-full mb-4 bg-white rounded-2xl shadow-xl border border-brand-border p-4 flex gap-6 z-30 transition-all duration-300 ease-out origin-bottom ${
          showFramesMenu ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="absolute -bottom-2 left-[15%] w-4 h-4 bg-white border-b border-r border-brand-border rotate-45" />
        
          {frameOptions.map((opt) => (
            <button
              key={opt.style}
              onClick={() => onSelectFrame(opt.style)}
              className={`relative z-10 flex flex-col items-center gap-3 group p-3 rounded-xl transition-colors ${activeFrame === opt.style ? 'bg-brand-offwhite' : 'hover:bg-brand-black/5'}`}
            >
              <div 
                className="w-10 h-10 rounded-full border-2 border-brand-border shadow-sm group-hover:scale-110 transition-transform duration-300" 
                style={{ background: opt.background }} 
              />
              <span className="text-[10px] font-semibold text-brand-black uppercase tracking-wider whitespace-nowrap">
                {opt.label}
              </span>
            </button>
          ))}
      </div>

      {/* Image Selection Popover */}
      <div 
        className={`absolute bottom-full mb-4 bg-white rounded-2xl shadow-xl border border-brand-border p-4 grid grid-cols-3 gap-3 z-30 transition-all duration-300 ease-out origin-bottom ${
          showImagesMenu ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="absolute -bottom-2 left-[32%] w-4 h-4 bg-white border-b border-r border-brand-border rotate-45" />
        
          {imageOptions.map((opt) => (
            <button
              key={opt.src}
              onClick={() => onSelectImage(opt.src)}
              className={`relative z-10 flex flex-col items-center gap-2 group p-2 rounded-xl transition-colors ${activeImage === opt.src ? 'bg-brand-offwhite ring-2 ring-brand-accent ring-inset' : 'hover:bg-brand-black/5'}`}
            >
              <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-brand-border shadow-sm group-hover:scale-105 transition-transform duration-300">
                <Image src={opt.src} alt={opt.label} fill className="object-cover object-center" sizes="64px" />
              </div>
            </button>
          ))}
      </div>

      {/* Color Selection Popover */}
      <div 
        className={`absolute bottom-full mb-4 bg-white rounded-2xl shadow-xl border border-brand-border p-4 grid grid-cols-4 gap-4 z-30 transition-all duration-300 ease-out origin-bottom ${
          showColorsMenu ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b border-r border-brand-border rotate-45" />
        
          {colorOptions.map((opt) => (
            <button
              key={opt.color}
              onClick={() => onSelectBgColor(opt.color)}
              className={`relative z-10 flex flex-col items-center gap-2 group p-2 rounded-xl transition-colors ${activeBgColor === opt.color ? 'bg-brand-offwhite ring-2 ring-brand-accent ring-inset' : 'hover:bg-brand-black/5'}`}
            >
              <div 
                className={`w-12 h-12 rounded-full border shadow-sm group-hover:scale-110 transition-transform duration-300 ${opt.color === '#1c1c1c' ? 'border-white/20' : 'border-brand-border'}`}
                style={{ backgroundColor: opt.color }} 
              />
              <span className="text-[10px] font-semibold text-brand-black uppercase tracking-wider whitespace-nowrap">
                {opt.label}
              </span>
            </button>
          ))}
      </div>

      {/* Print Widget Popover */}
      <div 
        className={`absolute bottom-full mb-4 bg-white rounded-2xl shadow-2xl border border-brand-border w-80 p-6 z-30 transition-all duration-300 ease-out origin-bottom ${
          showPrintMenu ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="absolute -bottom-2 left-[67%] -translate-x-1/2 w-4 h-4 bg-white border-b border-r border-brand-border rotate-45" />
        
        <div className="flex flex-col gap-5 relative z-10">
          <div>
            <h3 className="text-xl font-black text-brand-black tracking-tight">Ready to print?</h3>
            <p className="text-[13px] text-brand-muted mt-1 leading-relaxed">
              Bring your masterpiece to life with our gallery-quality printing and premium framing options.
            </p>
          </div>
          
          <ul className="space-y-3 mb-1">
            <li className="flex items-center gap-3 text-[13px] font-medium text-brand-black">
              <div className="w-6 h-6 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>
              Museum-grade paper & canvas
            </li>
            <li className="flex items-center gap-3 text-[13px] font-medium text-brand-black">
              <div className="w-6 h-6 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>
              Custom sizes available
            </li>
            <li className="flex items-center gap-3 text-[13px] font-medium text-brand-black">
              <div className="w-6 h-6 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>
              Fast delivery in Lagos
            </li>
          </ul>

          <Link href="/signup" className="w-full mt-2">
            <button className="w-full py-3.5 px-4 bg-brand-black hover:bg-brand-black/90 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group">
              Get a Print
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </button>
          </Link>
        </div>
      </div>

      {/* Materials Widget Popover */}
      <div 
        className={`absolute bottom-full mb-4 bg-white rounded-2xl shadow-xl border border-brand-border p-3 flex gap-3 z-30 transition-all duration-300 ease-out origin-bottom ${
          showMaterialsMenu ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="absolute -bottom-2 left-[83%] -translate-x-1/2 w-4 h-4 bg-white border-b border-r border-brand-border rotate-45" />
        
          {materialOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => onSelectMaterial(opt.id)}
              className={`relative z-10 flex flex-col items-center justify-center gap-2 group p-4 rounded-xl transition-all ${activeMaterial === opt.id ? 'bg-brand-black text-white shadow-md scale-105' : 'bg-brand-black/5 hover:bg-brand-black/10 text-brand-black'}`}
              style={{ width: '90px', height: '90px' }}
            >
              <span className="text-[11px] font-bold uppercase tracking-wider text-center leading-tight">
                {opt.label.split(' ')[0]}<br/>{opt.label.split(' ')[1]}
              </span>
            </button>
          ))}
      </div>

      {/* Categories Widget Popover */}
      <div 
        className={`absolute bottom-full mb-4 bg-white rounded-2xl shadow-xl border border-brand-border w-52 p-2 flex flex-col z-30 transition-all duration-300 ease-out origin-bottom right-6 ${
          showCategoriesMenu ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="absolute -bottom-2 right-[20px] w-4 h-4 bg-white border-b border-r border-brand-border rotate-45" />
        
        <div className="relative z-10 flex flex-col gap-1">
          <button className="text-left px-4 py-2.5 text-sm font-medium text-brand-black rounded-xl hover:bg-brand-black/5 transition-colors">Abstract Art</button>
          <button className="text-left px-4 py-2.5 text-sm font-medium text-brand-black rounded-xl hover:bg-brand-black/5 transition-colors">Minimalist</button>
          <button className="text-left px-4 py-2.5 text-sm font-medium text-brand-black rounded-xl hover:bg-brand-black/5 transition-colors">Photography</button>
          <button className="text-left px-4 py-2.5 text-sm font-medium text-brand-black rounded-xl hover:bg-brand-black/5 transition-colors">Classical</button>
          <div className="h-px bg-brand-border my-1 mx-2" />
          <Link href="/collections" className="text-left px-4 py-2.5 text-sm font-bold text-brand-accent rounded-xl hover:bg-brand-black/5 transition-colors">
            All Collections →
          </Link>
        </div>
      </div>

      {/* Main Bar */}
      <div className="flex items-center justify-center gap-6">
        {brands.map(({ Icon, label, id }) => {
          const isActive = activeBrand === id;
          return (
            <button
              key={id}
              title={label}
              aria-label={label}
              onClick={() => handleBrandClick(id)}
              className={`
                w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
                ${isActive
                  ? 'bg-brand-black text-brand-white ring-2 ring-brand-accent ring-offset-2 ring-offset-brand-offwhite scale-110 shadow-lg'
                  : 'bg-brand-black/5 text-brand-muted hover:bg-brand-black/10 hover:text-brand-black hover:scale-105'
                }
              `}
            >
              <Icon size={18} strokeWidth={1.5} />
            </button>
          );
        })}

        {/* Arrow — hint at scrolling */}
        <button
          aria-label="See more"
          onClick={() => handleBrandClick('categories')}
          className={`
            w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ml-2 relative z-10
            ${activeBrand === 'categories'
              ? 'bg-brand-black text-brand-white ring-2 ring-brand-accent ring-offset-2 ring-offset-brand-offwhite scale-110 shadow-lg'
              : 'bg-brand-black/5 text-brand-muted hover:bg-brand-black/10 hover:text-brand-black hover:scale-105'
            }
          `}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
