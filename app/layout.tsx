import type { Metadata } from "next";
import { Montserrat, Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import ContactModal from '@/components/ui/ContactModal';
import PrintSignUpModal from '@/components/ui/PrintSignUpModal';
import FloatingWhatsApp from '@/components/ui/FloatingWhatsApp';

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["800"], // Extrabold
  variable: "--font-heading",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"], // Bold
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"], // Regular, Medium, SemiBold
  variable: "--font-sans",
});

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
    <html lang="en" className={`${montserrat.variable} ${plusJakartaSans.variable} ${inter.variable}`}>
      <body className="antialiased">
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
