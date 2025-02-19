import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Suspense } from 'react';
import Loading from './loading';


const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: "West LA Police Department",
  description: "West Los Angeles Police Department Roleplay Community",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <Suspense fallback={<Loading />}>
          <Navbar />
          {children}
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}