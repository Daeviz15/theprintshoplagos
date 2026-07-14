import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import OrdersCarousel from '@/components/features/Dashboard/OrdersCarousel';

export default async function OrdersPage() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/auth/login');
  }

  // Dummy data — will be replaced with real Supabase queries
  const orders = [
    {
      id: '133-026',
      status: 'In Production',
      date: 'Oct 24, 2026',
      imageSrc: '/art_2.png',
      artworkTitle: 'Dichotomy - Canvas Print',
      price: '₦ 45,200.00',
      frame: 'Gallery Black',
      material: 'Canvas',
      size: '24 × 36 in',
      description: 'A striking visual contrast exploring the duality of human nature, printed on museum-grade canvas with archival inks for vibrant, long-lasting color.',
    },
    {
      id: '133-025',
      status: 'Shipped',
      date: 'Oct 12, 2026',
      imageSrc: '/products/art-gallery-1.jpg',
      artworkTitle: 'Sacred Art of the Ori',
      price: '₦ 120,500.00',
      frame: 'Vintage Gold',
      material: 'Matte Paper',
      size: '30 × 40 in',
      trackingNumber: 'NG-TRK-9827341',
      description: 'A deeply spiritual piece celebrating Yoruba heritage, rendered in rich earth tones with premium matte finish for a timeless gallery feel.',
    },
    {
      id: '133-024',
      status: 'Delivered',
      date: 'Sep 05, 2026',
      imageSrc: '/img_5.png',
      artworkTitle: 'Abstract Thoughts',
      price: '₦ 85,000.00',
      frame: 'Acrylic Float',
      material: 'Acrylic Glass',
      size: '20 × 28 in',
      description: 'A mesmerizing abstract composition that invites deep contemplation, printed on crystal-clear acrylic for a modern, gallery-worthy presentation.',
    },
    {
      id: '133-023',
      status: 'Delivered',
      date: 'Aug 18, 2026',
      imageSrc: '/products/art-gallery-9.jpg',
      artworkTitle: 'Golden Hour Lagos',
      price: '₦ 62,000.00',
      frame: 'Wooden Oak',
      material: 'Canvas',
      size: '18 × 24 in',
      description: 'A warm, golden capture of Lagos at dusk, printed on heavyweight canvas and stretched over solid wood bars for a premium wall display.',
    },
    {
      id: '133-022',
      status: 'Delivered',
      date: 'Jul 02, 2026',
      imageSrc: '/products/art-gallery-6.jpg',
      artworkTitle: 'Serene Horizons',
      price: '₦ 38,500.00',
      frame: 'None',
      material: 'Glossy Paper',
      size: '16 × 20 in',
      description: 'A peaceful landscape that brings calm to any room, printed with a high-gloss finish for vivid, punchy colors.',
    },
  ];

  return (
    <div className="w-full h-full flex flex-col">
      <OrdersCarousel orders={orders} />
    </div>
  );
}
