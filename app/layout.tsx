import type { Metadata } from "next";
import "./globals.css";
import ContactModal from '@/components/ui/ContactModal';
import PrintSignUpModal from '@/components/ui/PrintSignUpModal';
import FloatingWhatsApp from '@/components/ui/FloatingWhatsApp';

export const metadata: Metadata = {
  title: "The Print Shop Lagos",
  description: "Premium artwork printing platform",
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
  },
};

import SmoothScroll from '@/components/layout/SmoothScroll';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ContactModal />
        <PrintSignUpModal />
        <FloatingWhatsApp />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
