import Image from 'next/image';

interface ArtPanelProps {
  imageSrc: string;
}

export default function ArtPanel({ imageSrc }: ArtPanelProps) {
  return (
    <div className="relative w-full h-full bg-brand-black">
      {/* Art Image */}
      <Image
        src={imageSrc}
        alt="Featured Artwork"
        fill
        className="object-cover grayscale"
        priority
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
    </div>
  );
}
