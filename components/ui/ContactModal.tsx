'use client';

import { useModalStore } from '@/lib/store/useModalStore';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function ContactModal() {
  const { isContactModalOpen, setContactModalOpen } = useModalStore();

  if (!isContactModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setContactModalOpen(false)}
          className="absolute inset-0 bg-brand-black/40 backdrop-blur-sm cursor-pointer"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, type: "spring", bounce: 0.15 }}
          className="relative w-full max-w-6xl h-auto min-h-[600px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row z-10"
        >
          {/* Close button */}
          <button
            onClick={() => setContactModalOpen(false)}
            className="absolute top-6 right-6 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 1L1 13M1 1L13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Left Side - Info & Image */}
          <div className="w-full md:w-1/2 bg-brand-offwhite relative p-12 md:p-16 flex flex-col justify-between overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-[clamp(3rem,6vw,5rem)] font-black leading-[0.9] tracking-tight text-white mix-blend-difference">
                The <br /> Power
              </h2>
              <div className="mt-6 w-8 h-8 border-l-2 border-b-2 border-white mix-blend-difference rotate-[-45deg] opacity-60" />
              
              <div className="mt-16 sm:mt-32">
                <h3 className="text-2xl font-bold tracking-tight text-white mix-blend-difference">
                  Introducing Excellence
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-white mix-blend-difference max-w-[300px]">
                  A premium printing service that creates precise, gallery-worthy artworks. Get in touch to collaborate.
                </p>
                <button className="mt-8 px-8 py-3 bg-brand-accent text-white font-semibold text-sm rounded-none hover:bg-brand-black transition-colors shadow-lg">
                  Learn More
                </button>
              </div>
            </div>

            {/* Art Image (mimicking the hand from reference) */}
            <div className="absolute right-[-10%] bottom-[-5%] w-[80%] h-[110%] z-0 grayscale opacity-80 mix-blend-multiply pointer-events-none">
              <Image
                src="/art_1.png"
                alt="Art background"
                fill
                className="object-contain object-bottom drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full md:w-1/2 bg-brand-accent p-12 md:p-16 flex flex-col">
            <h2 className="text-4xl font-bold tracking-tight text-brand-black">
              Contact us
            </h2>
            <p className="mt-3 text-sm text-brand-black/80 font-medium">
              Interested in a custom print? Use the form below to get in touch.
            </p>

            <form className="mt-10 flex flex-col gap-6 flex-1" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-xs font-semibold text-brand-black">Name</label>
                  <input type="text" className="w-full bg-white h-12 px-4 rounded-none border-none outline-none focus:ring-2 focus:ring-brand-black/20" />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-xs font-semibold text-brand-black">Company</label>
                  <input type="text" className="w-full bg-white h-12 px-4 rounded-none border-none outline-none focus:ring-2 focus:ring-brand-black/20" />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-xs font-semibold text-brand-black">Email</label>
                  <input type="email" className="w-full bg-white h-12 px-4 rounded-none border-none outline-none focus:ring-2 focus:ring-brand-black/20" />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-xs font-semibold text-brand-black">Subject</label>
                  <input type="text" className="w-full bg-white h-12 px-4 rounded-none border-none outline-none focus:ring-2 focus:ring-brand-black/20" />
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-2">
                <label className="text-xs font-semibold text-brand-black">Message</label>
                <textarea className="w-full bg-white flex-1 p-4 rounded-none border-none outline-none resize-none focus:ring-2 focus:ring-brand-black/20" />
              </div>

              <div className="flex justify-end mt-4 relative group w-max self-end cursor-pointer">
                 {/* The submit button from the reference is a black rectangle, often with an icon floating nearby. */}
                 <button className="bg-brand-black text-white font-semibold text-sm px-12 py-4 rounded-none hover:bg-black transition-colors w-full sm:w-auto relative z-10">
                   Submit
                 </button>
                 {/* Decorative circular icon behind the button */}
                 <div className="absolute -right-4 -bottom-4 w-12 h-12 rounded-full border border-brand-black/30 flex items-center justify-center bg-transparent z-0 group-hover:scale-110 transition-transform">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-black">
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                      <circle cx="17" cy="7" r="4"></circle>
                    </svg>
                 </div>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
