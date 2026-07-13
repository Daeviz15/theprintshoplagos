'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { Upload, Image as ImageIcon, Check, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock existing artworks for the "Choose Existing" tab
const DUMMY_ARTWORKS = [
  { id: 'art-1', src: '/art_1.png', title: 'Cosmic Perspective' },
  { id: 'art-2', src: '/art_2.png', title: 'Dichotomy' },
  { id: 'art-3', src: '/products/art-gallery-1.jpg', title: 'Sacred Art of the Ori' },
  { id: 'art-4', src: '/products/art-gallery-2.jpg', title: 'Golden Hour' },
];

const FRAME_OPTIONS = [
  { id: 'none', label: 'No Frame', price: 0 },
  { id: 'black', label: 'Gallery Black', price: 15000 },
  { id: 'wood', label: 'Natural Wood', price: 22000 },
  { id: 'white', label: 'Gallery White', price: 15000 },
];

const SIZE_OPTIONS = [
  { id: '18x24', label: '18" × 24"', price: 25000 },
  { id: '24x36', label: '24" × 36"', price: 45000 },
  { id: '30x40', label: '30" × 40"', price: 65000 },
];

const MATERIAL_OPTIONS = [
  { id: 'canvas', label: 'Canvas', price: 10000 },
  { id: 'matt', label: 'Matt', price: 5000 },
  { id: 'photo', label: 'Photo paper', price: 5000 },
  { id: 'gloss', label: 'Gloss photopaper', price: 8000 },
];

const URGENCY_OPTIONS = [
  { id: 'standard', label: 'Standard', desc: '5-7 business days', multiplier: 1 },
  { id: 'express', label: 'Express', desc: '2-3 business days', multiplier: 1.25 },
  { id: 'priority', label: 'Priority', desc: '24 hours', multiplier: 1.5 },
];

export default function ConfiguratorPage() {
  const [tab, setTab] = useState<'upload' | 'existing'>('existing');
  
  // State for selections
  const [selectedImage, setSelectedImage] = useState<string | null>(DUMMY_ARTWORKS[0].src);
  const [selectedFrame, setSelectedFrame] = useState(FRAME_OPTIONS[0]);
  const [selectedSize, setSelectedSize] = useState(SIZE_OPTIONS[0]);
  const [selectedMaterial, setSelectedMaterial] = useState(MATERIAL_OPTIONS[0]);
  const [selectedUrgency, setSelectedUrgency] = useState(URGENCY_OPTIONS[0]);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Cleanup object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (selectedImage && selectedImage.startsWith('blob:')) {
        URL.revokeObjectURL(selectedImage);
      }
    };
  }, [selectedImage]);

  // Handle file upload preview with validation
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    const file = e.target.files?.[0];
    
    if (file) {
      // Validate file size (50MB)
      if (file.size > 50 * 1024 * 1024) {
        setUploadError('File size exceeds the 50MB limit.');
        return;
      }
      
      // Validate file type
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        setUploadError('Invalid file type. Please upload a JPG, PNG, or WEBP image.');
        return;
      }

      const url = URL.createObjectURL(file);
      setSelectedImage(url);
    }
  };

  // Calculate final price dynamically
  const totalPrice = useMemo(() => {
    const base = selectedSize.price + selectedFrame.price + selectedMaterial.price;
    return base * selectedUrgency.multiplier;
  }, [selectedSize, selectedFrame, selectedMaterial, selectedUrgency]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 min-h-[calc(100vh-160px)]">
      
      {/* LEFT PANEL: Sticky Preview Stage */}
      <div className="w-full lg:w-1/2 flex-shrink-0 sticky top-20 lg:top-28 z-40 bg-brand-offwhite lg:bg-white rounded-b-[2rem] lg:rounded-[2rem] p-4 lg:p-10 shadow-xl lg:shadow-[0_8px_30px_rgb(0,0,0,0.04)] lg:border border-black/[0.02] h-[35vh] min-h-[300px] lg:min-h-0 lg:h-[calc(100vh-200px)] flex flex-col items-center justify-center overflow-hidden">
        
        {/* Dynamic Preview Logic */}
        <div className="relative w-full h-full max-h-[600px] flex items-center justify-center transition-all duration-500 ease-in-out">
          {selectedImage ? (
            <div 
              className="relative transition-all duration-500 shadow-2xl flex items-center justify-center"
              style={{
                width: selectedSize.id === '30x40' ? '90%' : selectedSize.id === '24x36' ? '75%' : '60%',
                aspectRatio: '2/3',
                padding: selectedFrame.id !== 'none' ? '12px' : '0',
                backgroundColor: selectedFrame.id === 'black' ? '#1a1a1a' : selectedFrame.id === 'white' ? '#f5f5f5' : selectedFrame.id === 'wood' ? '#d4b483' : 'transparent',
              }}
            >
              <div className="relative w-full h-full overflow-hidden bg-brand-offwhite">
                <Image 
                  src={selectedImage}
                  alt="Artwork Preview"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Overlay for matte finish simulation */}
                {selectedMaterial.id === 'matt' && <div className="absolute inset-0 bg-white/10 mix-blend-overlay" />}
                {/* Overlay for gloss finish simulation */}
                {selectedMaterial.id === 'gloss' && <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent mix-blend-overlay" />}
              </div>
            </div>
          ) : (
            <div className="text-brand-muted font-medium flex flex-col items-center gap-4">
              <ImageIcon size={48} strokeWidth={1} className="opacity-50" />
              <p>Select or upload an image to preview</p>
            </div>
          )}
        </div>
        
      </div>

      {/* RIGHT PANEL: Configuration Options (Scrollable) */}
      <div className="w-full lg:w-1/2 flex flex-col gap-10 pb-20">
        
        {/* Step 1: Image Source */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-semibold tracking-tight text-brand-black">1. Choose Artwork</h2>
          </div>
          
          {/* Tabs */}
          <div className="flex p-1 bg-black/5 rounded-full mb-6">
            <button 
              onClick={() => { setTab('existing'); setSelectedImage(DUMMY_ARTWORKS[0].src); }}
              className={`flex-1 py-3 text-sm font-semibold rounded-full transition-all ${tab === 'existing' ? 'bg-white text-brand-black shadow-sm' : 'text-brand-muted hover:text-brand-black'}`}
            >
              Gallery
            </button>
            <button 
              onClick={() => { setTab('upload'); setSelectedImage(null); }}
              className={`flex-1 py-3 text-sm font-semibold rounded-full transition-all ${tab === 'upload' ? 'bg-white text-brand-black shadow-sm' : 'text-brand-muted hover:text-brand-black'}`}
            >
              Upload Own
            </button>
          </div>

          {/* Tab Content */}
          <div className="min-h-[200px]">
            <AnimatePresence mode="wait">
              {tab === 'upload' ? (
                <motion.div 
                  key="upload"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="w-full border-2 border-dashed border-black/10 rounded-[2rem] p-10 flex flex-col items-center justify-center text-center bg-white hover:bg-brand-offwhite transition-colors cursor-pointer relative"
                >
                  <input 
                    type="file" 
                    accept="image/png, image/jpeg, image/webp" 
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                  />
                  <div className="w-16 h-16 rounded-full bg-brand-black text-white flex items-center justify-center mb-4">
                    <Upload size={24} />
                  </div>
                  <h3 className="text-base font-semibold text-brand-black mb-1">Drag & Drop or Click to Upload</h3>
                  <p className="text-sm text-brand-muted font-medium mb-2">Supports JPG, PNG, WEBP up to 50MB</p>
                  
                  {uploadError && (
                    <div className="flex items-center gap-2 text-red-500 text-sm font-medium bg-red-50 px-3 py-2 rounded-lg mt-2 relative z-10">
                      <AlertCircle size={16} />
                      {uploadError}
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div 
                  key="existing"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-2 gap-4"
                >
                  {DUMMY_ARTWORKS.map((art) => (
                    <button 
                      key={art.id}
                      onClick={() => setSelectedImage(art.src)}
                      className={`relative aspect-[3/4] rounded-2xl overflow-hidden border-2 transition-all group ${selectedImage === art.src ? 'border-brand-black shadow-lg scale-[0.98]' : 'border-transparent hover:scale-[1.02]'}`}
                    >
                      <Image src={art.src} alt={art.title} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
                      <div className={`absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors ${selectedImage === art.src ? 'bg-transparent' : ''}`} />
                      {selectedImage === art.src && (
                        <div className="absolute top-3 right-3 w-6 h-6 bg-brand-black text-white rounded-full flex items-center justify-center shadow-md">
                          <Check size={14} strokeWidth={3} />
                        </div>
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Step 2: Configuration */}
        <section className={!selectedImage ? 'opacity-50 pointer-events-none transition-opacity' : 'transition-opacity'}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold tracking-tight text-brand-black">2. Customize Print</h2>
          </div>
          
          <div className="flex flex-col gap-8 bg-white rounded-[2rem] p-6 lg:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/[0.02]">
            
            {/* Size */}
            <div>
              <label className="block text-[11px] font-semibold text-brand-muted uppercase tracking-widest mb-3">Size</label>
              <div className="grid grid-cols-3 gap-3">
                {SIZE_OPTIONS.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 px-2 rounded-xl text-sm font-semibold transition-all border ${selectedSize.id === size.id ? 'bg-brand-black text-white border-brand-black shadow-md' : 'bg-brand-offwhite text-brand-black border-black/5 hover:border-black/20'}`}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Material */}
            <div>
              <label className="block text-[11px] font-semibold text-brand-muted uppercase tracking-widest mb-3">Material</label>
              <div className="grid grid-cols-2 gap-3">
                {MATERIAL_OPTIONS.map((material) => (
                  <button
                    key={material.id}
                    onClick={() => setSelectedMaterial(material)}
                    className={`py-3 px-4 rounded-xl text-sm font-semibold transition-all border text-left flex justify-between items-center ${selectedMaterial.id === material.id ? 'bg-brand-black text-white border-brand-black shadow-md' : 'bg-white text-brand-black border-black/10 hover:border-black/30'}`}
                  >
                    {material.label}
                    {selectedMaterial.id === material.id && <Check size={16} strokeWidth={2.5} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Frame */}
            <div>
              <label className="block text-[11px] font-semibold text-brand-muted uppercase tracking-widest mb-3">Frame Style</label>
              <div className="grid grid-cols-2 gap-3">
                {FRAME_OPTIONS.map((frame) => (
                  <button
                    key={frame.id}
                    onClick={() => setSelectedFrame(frame)}
                    className={`py-3 px-4 rounded-xl text-sm font-semibold transition-all border text-left flex justify-between items-center ${selectedFrame.id === frame.id ? 'bg-brand-black text-white border-brand-black shadow-md' : 'bg-white text-brand-black border-black/10 hover:border-black/30'}`}
                  >
                    {frame.label}
                    {selectedFrame.id === frame.id && <Check size={16} strokeWidth={2.5} />}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Step 3: Urgency & Checkout */}
        <section className={!selectedImage ? 'opacity-50 pointer-events-none transition-opacity' : 'transition-opacity'}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold tracking-tight text-brand-black">3. Delivery & Checkout</h2>
          </div>
          
          <div className="flex flex-col gap-6">
            {/* Urgency */}
            <div className="flex flex-col gap-3">
              {URGENCY_OPTIONS.map((urgency) => (
                <button
                  key={urgency.id}
                  onClick={() => setSelectedUrgency(urgency)}
                  className={`flex items-center justify-between p-5 rounded-2xl border transition-all ${selectedUrgency.id === urgency.id ? 'bg-white border-brand-black shadow-[0_8px_30px_rgb(0,0,0,0.08)] ring-1 ring-brand-black' : 'bg-brand-offwhite border-black/5 hover:border-black/20'}`}
                >
                  <div className="text-left">
                    <span className="block text-sm font-semibold text-brand-black mb-1">{urgency.label}</span>
                    <span className="block text-xs font-medium text-brand-muted">{urgency.desc}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-brand-black">
                      {urgency.multiplier === 1 ? 'Standard' : `+${(urgency.multiplier - 1) * 100}%`}
                    </span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedUrgency.id === urgency.id ? 'border-brand-black' : 'border-black/20'}`}>
                      {selectedUrgency.id === urgency.id && <div className="w-2.5 h-2.5 rounded-full bg-brand-black" />}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Total & Action */}
            <div className="bg-brand-black text-white p-8 rounded-[2rem] mt-4 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/20 rounded-full blur-[40px] pointer-events-none" />
              
              <div className="relative z-10 text-center md:text-left">
                <span className="block text-xs font-semibold text-white/60 uppercase tracking-widest mb-1">Total Estimated Cost</span>
                <span className="block text-3xl md:text-4xl font-semibold tracking-tight">
                  ₦ {totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              
              <button className="relative z-10 w-full md:w-auto bg-white text-brand-black px-10 py-4 rounded-full font-semibold hover:bg-brand-offwhite active:scale-[0.98] transition-all shadow-[0_4px_14px_0_rgba(255,255,255,0.39)]">
                Submit Order
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
