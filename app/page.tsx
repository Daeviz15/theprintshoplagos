import HeroSection from '@/components/features/Hero/HeroSection';
import AboutSection from '@/components/features/About/AboutSection';
import ContactSection from '@/components/features/Contact/ContactSection';
import ProductSection from '@/components/features/Products/ProductSection';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ProductSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
