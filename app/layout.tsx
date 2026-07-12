import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Print Shop Lagos",
  description: "Premium artwork printing platform",
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
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
