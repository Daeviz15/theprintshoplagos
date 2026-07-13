'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Truck, CheckCircle, Clock } from 'lucide-react';

interface Order {
  id: string;
  status: string;
  date: string;
  imageSrc: string;
  artworkTitle: string;
  price: string;
  description?: string;
  frame?: string;
  material?: string;
  size?: string;
  trackingNumber?: string;
}

interface OrdersCarouselProps {
  orders: Order[];
}

const statusConfig: Record<string, { icon: typeof Clock; color: string; bg: string }> = {
  'In Production': { icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200' },
  'Shipped': { icon: Truck, color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200' },
  'Delivered': { icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' },
};

export default function OrdersCarousel({ orders }: OrdersCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const count = orders.length;
  const angleStep = 360 / count;
  // Dynamic radius based on count — more items = wider circle
  const radius = Math.max(280, count * 60);

  const rotateY = -activeIndex * angleStep;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + count) % count);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % count);
  };

  return (
    <>
      {/* 3D Carousel Scene */}
      <div
        className="relative w-full flex items-center justify-center overflow-hidden"
        style={{ perspective: '1200px', height: '460px' }}
      >
        {/* Rotating ring */}
        <div
          className="absolute"
          style={{
            width: '260px',
            height: '360px',
            transformStyle: 'preserve-3d',
            transform: `rotateY(${rotateY}deg)`,
            transition: 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          {orders.map((order, index) => {
            const angle = index * angleStep;
            // Figure out which card is "in front"
            const normalizedDiff = ((index - activeIndex) % count + count) % count;
            const isFront = normalizedDiff === 0;

            return (
              <div
                key={order.id}
                onClick={() => isFront && setSelectedOrder(order)}
                className="absolute top-0 left-0 w-full h-full"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  backfaceVisibility: 'hidden',
                  cursor: isFront ? 'pointer' : 'default',
                }}
              >
                <div
                  className={`w-full h-full rounded-[2rem] overflow-hidden border transition-all duration-700 ${isFront
                      ? 'border-brand-accent/30 shadow-[0_20px_60px_rgba(0,0,0,0.15)] scale-100'
                      : 'border-black/5 shadow-md scale-[0.88] opacity-60'
                    }`}
                  style={{ background: '#fff' }}
                >
                  {/* Image */}
                  <div className="relative w-full h-[220px] overflow-hidden">
                    <Image
                      src={order.imageSrc}
                      alt={order.artworkTitle}
                      fill
                      className="object-cover"
                      sizes="260px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    {/* Status pill */}
                    {(() => {
                      const statusInfo = statusConfig[order.status] || statusConfig['In Production'];
                      const StatusIcon = statusInfo.icon;
                      return (
                        <div className={`absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full border text-[11px] font-light ${statusInfo.bg} ${statusInfo.color}`}>
                          <StatusIcon size={12} strokeWidth={2.5} />
                          {order.status}
                        </div>
                      );
                    })()}
                    <div className="absolute bottom-3 left-4">
                      <span className="text-white/70 text-[10px] font-bold tracking-widest uppercase">#{order.id}</span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <h3 className="text-base font-semibold text-brand-black leading-snug mb-1 truncate">
                      {order.artworkTitle}
                    </h3>
                    <p className="text-xs text-brand-muted mb-3">{order.date}</p>
                    <span className="text-lg font-light text-brand-black tracking-tight">{order.price}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reflection / floor gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-brand-offwhite via-brand-offwhite/80 to-transparent pointer-events-none z-10" />
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-center gap-6 mt-0">
        <button
          onClick={handlePrev}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-black text-white hover:bg-brand-black/80 active:scale-90 transition-all duration-200 shadow-lg"
          aria-label="Previous order"
        >
          <ChevronLeft size={22} strokeWidth={2.5} />
        </button>

        <div className="flex items-center gap-2">
          {orders.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`rounded-full transition-all duration-300 ${i === activeIndex
                  ? 'w-8 h-2.5 bg-brand-black'
                  : 'w-2.5 h-2.5 bg-brand-black/20 hover:bg-brand-black/40'
                }`}
              aria-label={`Go to order ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-black text-white hover:bg-brand-black/80 active:scale-90 transition-all duration-200 shadow-lg"
          aria-label="Next order"
        >
          <ChevronRight size={22} strokeWidth={2.5} />
        </button>
      </div>

      {/* Expanded Order Detail Modal */}
      <AnimatePresence>
        {selectedOrder && typeof document !== 'undefined' && createPortal(
          (() => {
            const statusInfo = statusConfig[selectedOrder.status] || statusConfig['In Production'];
            const StatusIcon = statusInfo.icon;

            return (
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 md:p-8"
                onClick={() => setSelectedOrder(null)}
              >
                <motion.div
                  key="modal"
                  initial={{ opacity: 0, scale: 0.92, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 30 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="relative bg-white rounded-3xl md:rounded-[2rem] w-full max-w-[1000px] h-[92vh] md:h-[650px] overflow-hidden shadow-2xl flex flex-col md:flex-row"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close Button - Floats over everything */}
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="absolute top-3 right-3 md:top-6 md:right-6 z-[1000] p-2.5 md:p-3 rounded-full bg-white/90 backdrop-blur-sm text-brand-black hover:bg-brand-offwhite transition-colors shadow-md"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
                  </button>

                  {/* Left side: Hero Image */}
                  <div className="relative w-full md:w-1/2 h-[220px] md:h-full flex-shrink-0 bg-brand-black overflow-hidden">
                    <Image
                      src={selectedOrder.imageSrc}
                      alt={selectedOrder.artworkTitle}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute bottom-5 md:bottom-10 left-5 md:left-10 right-5 text-white">
                      <span className="text-white/70 text-[10px] md:text-xs font-bold tracking-widest uppercase block mb-1 md:mb-2">Order #{selectedOrder.id}</span>
                      <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold leading-[1.1] text-white tracking-tight line-clamp-2">
                        {selectedOrder.artworkTitle}
                      </h2>
                    </div>
                  </div>

                  {/* Right side: Details Body (Scrollable) */}
                  <div className="w-full md:w-1/2 flex-1 p-5 sm:p-6 md:p-10 overflow-y-auto no-scrollbar bg-white flex flex-col min-h-0">
                    
                    {/* Status & Price Row */}
                    <div className="flex items-center justify-between gap-4 mb-6 md:mb-8 pb-6 md:pb-8 border-b border-black/5 shrink-0">
                      <div className={`flex items-center gap-1.5 md:gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full border text-xs md:text-sm font-medium whitespace-nowrap ${statusInfo.bg} ${statusInfo.color}`}>
                        <StatusIcon size={16} strokeWidth={2.5} className="w-4 h-4" />
                        {selectedOrder.status}
                      </div>
                      <div className="text-right flex flex-col items-end">
                        <span className="text-[10px] md:text-xs text-brand-muted block font-medium uppercase tracking-widest mb-0.5">Total</span>
                        <span className="text-xl sm:text-2xl md:text-3xl font-semibold text-brand-black tracking-tight leading-none whitespace-nowrap">{selectedOrder.price}</span>
                      </div>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-2 gap-3 md:gap-5 mb-6 md:mb-8 shrink-0">
                      <div className="bg-brand-offwhite rounded-2xl md:rounded-[1.25rem] p-4 md:p-5 border border-black/[0.03]">
                        <span className="text-[9px] md:text-[10px] font-medium text-brand-muted tracking-widest uppercase block mb-1">Date Ordered</span>
                        <span className="text-xs md:text-sm font-semibold text-brand-black">{selectedOrder.date}</span>
                      </div>
                      <div className="bg-brand-offwhite rounded-2xl md:rounded-[1.25rem] p-4 md:p-5 border border-black/[0.03]">
                        <span className="text-[9px] md:text-[10px] font-medium text-brand-muted tracking-widest uppercase block mb-1">Size</span>
                        <span className="text-xs md:text-sm font-semibold text-brand-black">{selectedOrder.size || '24 × 36 in'}</span>
                      </div>
                      <div className="bg-brand-offwhite rounded-2xl md:rounded-[1.25rem] p-4 md:p-5 border border-black/[0.03]">
                        <span className="text-[9px] md:text-[10px] font-medium text-brand-muted tracking-widest uppercase block mb-1">Frame</span>
                        <span className="text-xs md:text-sm font-semibold text-brand-black">{selectedOrder.frame || 'Gallery Black'}</span>
                      </div>
                      <div className="bg-brand-offwhite rounded-2xl md:rounded-[1.25rem] p-4 md:p-5 border border-black/[0.03]">
                        <span className="text-[9px] md:text-[10px] font-medium text-brand-muted tracking-widest uppercase block mb-1">Material</span>
                        <span className="text-xs md:text-sm font-semibold text-brand-black">{selectedOrder.material || 'Canvas'}</span>
                      </div>
                      {selectedOrder.trackingNumber && (
                        <div className="bg-brand-offwhite rounded-2xl md:rounded-[1.25rem] p-4 md:p-5 border border-black/[0.03] col-span-2 flex items-center justify-between">
                          <div>
                            <span className="text-[9px] md:text-[10px] font-medium text-brand-muted tracking-widest uppercase block mb-1">Tracking Number</span>
                            <span className="text-xs md:text-sm font-semibold text-brand-black">{selectedOrder.trackingNumber}</span>
                          </div>
                          <button className="text-brand-accent text-xs font-medium hover:underline">Track</button>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <div className="mb-8 md:mb-10 shrink-0">
                      <span className="text-[9px] md:text-[10px] font-medium text-brand-muted tracking-widest uppercase block mb-2 md:mb-3">Description</span>
                      <p className="text-xs md:text-sm text-brand-muted leading-relaxed font-medium">
                        {selectedOrder.description || 'A premium gallery-quality print crafted with expert precision. This art piece has been inspected for perfect color accuracy and mounted seamlessly into your selected frame.'}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-2.5 md:gap-3 mt-auto pt-4 md:pt-6 border-t border-black/5 shrink-0">
                      <button className="flex-1 min-w-0 bg-brand-black text-white text-xs md:text-sm font-medium py-3.5 md:py-4 rounded-full hover:bg-brand-black/90 active:scale-[0.98] transition-all">
                        Reorder Print
                      </button>
                      <button className="flex-1 min-w-0 bg-white text-brand-black text-xs md:text-sm font-medium py-3.5 md:py-4 rounded-full border border-black/10 hover:border-black/20 hover:bg-brand-offwhite active:scale-[0.98] transition-all">
                        Contact Support
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })(),
          document.body
        )}
      </AnimatePresence>
    </>
  );
}
