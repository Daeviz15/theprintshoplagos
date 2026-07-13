import Image from 'next/image';

interface RecentOrderCardProps {
  orderId: string;
  status: string;
  date: string;
  imageSrc: string;
  artworkTitle: string;
  price: string;
}

export default function RecentOrderCard({
  orderId,
  status,
  date,
  imageSrc,
  artworkTitle,
  price
}: RecentOrderCardProps) {
  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col sm:flex-row gap-6 border border-black/[0.02] hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] transition-shadow duration-300">
      {/* Image thumbnail */}
      <div className="relative w-full sm:w-[140px] h-[200px] sm:h-[140px] rounded-3xl overflow-hidden bg-brand-offwhite flex-shrink-0">
        <Image 
          src={imageSrc} 
          alt={artworkTitle} 
          fill 
          sizes="(max-width: 640px) 100vw, 140px"
          className="object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-brand-muted tracking-wider uppercase">
            Order {orderId}
          </span>
          <span className="text-xs font-medium bg-brand-offwhite border border-black/5 text-brand-black px-3 py-1 rounded-full">
            {status}
          </span>
        </div>
        
        <h3 className="text-xl font-semibold tracking-tight text-brand-black leading-tight mb-1">
          {artworkTitle}
        </h3>
        <p className="text-sm text-brand-muted mb-4">{date}</p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-black/5">
          <span className="text-[1.15rem] font-semibold tracking-tight text-brand-black">{price}</span>
          <button className="flex items-center gap-1 text-sm font-medium text-brand-black hover:text-brand-accent transition-colors bg-brand-offwhite px-4 py-2 rounded-full">
            View Details
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
