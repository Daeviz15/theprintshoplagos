'use client';

import dynamic from 'next/dynamic';
import animationData from '../../public/loading_animation.json';

// Dynamically import Lottie to completely remove its heavy engine from the initial JS bundle
// ssr: false ensures it only runs in the browser, preventing hydration mismatches and server-side canvas errors.
const Lottie = dynamic(() => import('lottie-react'), { 
  ssr: false, 
});

interface GlobalLoaderProps {
  /** Size of the loader. 'sm' is ideal for inside buttons. 'md' for components. 'lg' for full page. */
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function GlobalLoader({ size = 'md', className = '' }: GlobalLoaderProps) {
  let dimensions = 'w-10 h-10';
  if (size === 'sm') dimensions = 'w-5 h-5';
  if (size === 'lg') dimensions = 'w-24 h-24';

  return (
    <div className={`flex items-center justify-center ${dimensions} ${className}`}>
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
}
