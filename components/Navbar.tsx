'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-lapd-primary text-white py-4 lg:px-20 px-2 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png" 
            alt="LAPD Logo"
            width={125}
            height={125}
            className="mr-2"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="hover:text-lapd-secondary transition-colors">
            Ana Sayfa
          </Link>
          <Link href="/basvuru" className="hover:text-lapd-secondary transition-colors">
            Başvuru
          </Link>
          <Link href="/ride-along" className="hover:text-lapd-secondary transition-colors">
            Ride Along
          </Link>
          <Link href="/personel" className="hover:text-lapd-secondary transition-colors">
            Personel
          </Link>
          <Link href="/organizasyon" className="hover:text-lapd-secondary transition-colors">
            Organizasyon
          </Link>
          <Link href="/kariyer" className="hover:text-lapd-secondary transition-colors">
            Kariyer Basamakları
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-lapd-primary">
          <Link 
            href="/" 
            className="block px-3 py-2 rounded-md hover:bg-lapd-primary-dark hover:text-lapd-secondary"
            onClick={() => setIsOpen(false)}
          >
            Ana Sayfa
          </Link>
          <Link 
            href="/basvuru" 
            className="block px-3 py-2 rounded-md hover:bg-lapd-primary-dark hover:text-lapd-secondary"
            onClick={() => setIsOpen(false)}
          >
            Başvuru
          </Link>
          <Link 
            href="/ride-along" 
            className="block px-3 py-2 rounded-md hover:bg-lapd-primary-dark hover:text-lapd-secondary"
            onClick={() => setIsOpen(false)}
          >
            Ride Along
          </Link>
          <Link 
            href="/personel" 
            className="block px-3 py-2 rounded-md hover:bg-lapd-primary-dark hover:text-lapd-secondary"
            onClick={() => setIsOpen(false)}
          >
            Personel
          </Link>
          <Link 
            href="/organizasyon" 
            className="block px-3 py-2 rounded-md hover:bg-lapd-primary-dark hover:text-lapd-secondary"
            onClick={() => setIsOpen(false)}
          >
            Organizasyon
          </Link>
          <Link 
            href="/kariyer" 
            className="block px-3 py-2 rounded-md hover:bg-lapd-primary-dark hover:text-lapd-secondary"
            onClick={() => setIsOpen(false)}
          >
            Kariyer Basamakları
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;