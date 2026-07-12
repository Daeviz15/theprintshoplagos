'use client';

import { useModalStore } from '@/lib/store/useModalStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function PrintSignUpModal() {
  const { isSignUpModalOpen, setSignUpModalOpen } = useModalStore();

  if (!isSignUpModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSignUpModalOpen(false)}
          className="absolute inset-0 bg-brand-black/40 backdrop-blur-sm cursor-pointer"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, type: "spring", bounce: 0 }}
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 z-10 flex flex-col items-center text-center"
        >
          {/* Close button */}
          <button
            onClick={() => setSignUpModalOpen(false)}
            className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 1L1 13M1 1L13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className="w-16 h-16 rounded-full bg-brand-accent/20 flex items-center justify-center mb-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-accent">
              <path d="M4 19a2 2 0 1 0 4 0a2 2 0 0 0-4 0"></path>
              <path d="M4 15a2 2 0 1 0 4 0a2 2 0 0 0-4 0"></path>
              <path d="M4 11a2 2 0 1 0 4 0a2 2 0 0 0-4 0"></path>
              <path d="M4 7a2 2 0 1 0 4 0a2 2 0 0 0-4 0"></path>
              <path d="M20 19v-6a2 2 0 0 0-2-2h-3"></path>
              <path d="M11 11V7a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v4"></path>
            </svg>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-brand-black">
            Get Your Print
          </h2>
          <p className="mt-2 text-sm text-brand-muted max-w-[280px]">
            Sign up to our platform to process your artwork printing and frame customization.
          </p>

          <div className="w-full mt-8 flex flex-col gap-3">
            <button className="w-full py-3.5 bg-brand-black text-white font-semibold text-sm rounded-xl hover:bg-black/90 transition-all shadow-md">
              Create an Account
            </button>
            <button className="w-full py-3.5 bg-brand-offwhite text-brand-black font-semibold text-sm rounded-xl hover:bg-brand-black/5 transition-all">
              Log in
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
