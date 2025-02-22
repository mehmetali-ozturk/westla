'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { LogIn } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFormsOpen, setIsFormsOpen] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    setIsFormsOpen(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsFormsOpen(false);
    }, 100); // 300ms gecikme
    setCloseTimeout(timeout);
  };

  const toggleMobileForms = () => {
    setIsFormsOpen(!isFormsOpen);
  };

  return (
    <nav className="bg-lapd-primary text-white py-4 lg:px-20 px-2 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/westla-logo.png" 
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
          {/* <Link href="/basvuru" className="hover:text-lapd-secondary transition-colors">
            Başvuru
          </Link> */}

          {/* Formlar Dropdown */}
          <div 
            className="relative z-50 group" 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
          >
            <button 
              className="hover:text-lapd-secondary transition-colors flex items-center"
            >
              Formlar
              <svg 
                className={`w-3.5 h-3.5 ml-1 transition-transform ${isFormsOpen ? 'transform rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            {isFormsOpen && (
              <div 
                className="absolute left-0 mt-2 w-48 bg-lapd-primary-dark text-white shadow-lg z-50 border border-white"
              >
                <Link 
                  href="/basvuru" 
                  onClick={() => setIsFormsOpen(false)}  
                  className="block px-4 py-2 hover:bg-lapd-primary-dark hover:text-lapd-secondary"
                >
                  Başvuru 
                </Link>
                <Link 
                  href="/ride-along"
                  onClick={() => setIsFormsOpen(false)}  
                  className="block px-4 py-2 hover:bg-lapd-primary-dark hover:text-lapd-secondary"
                >
                  Ride Along
                </Link>
                <Link 
                  href="/ovgu-sikayet" 
                  onClick={() => setIsFormsOpen(false)}  
                  className="block px-4 py-2 hover:bg-lapd-primary-dark hover:text-lapd-secondary"
                >
                  Övgü Şikayet 
                </Link>
              </div>
            )}
          </div>

          <Link href="/personel" className="hover:text-lapd-secondary transition-colors">
            Personeller
          </Link>
          <Link href="/organizasyon" className="hover:text-lapd-secondary transition-colors">
            Organizasyon
          </Link>
          <Link href="/kariyer" className="hover:text-lapd-secondary transition-colors">
            Kariyer Basamakları
          </Link>
          <Link href="/login" className="hover:text-lapd-secondary transition-colors">
            <LogIn size={24} />
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
          <div>
            <button 
              onClick={toggleMobileForms} 
              className="block px-3 py-2 rounded-md hover:bg-lapd-primary-dark hover:text-lapd-secondary"
            >
              Formlar
            </button>
            {isFormsOpen && (
              <div className="space-y-1 bg-lapd-primary-dark">
                <Link 
                  href="/ride-along" 
                  className="block px-3 py-2 rounded-md hover:bg-lapd-primary-dark hover:text-lapd-secondary"
                  onClick={() => setIsOpen(false)}
                >
                  Ride Along
                </Link>
                <Link 
                  href="/ovgu-sikayet" 
                  className="block px-3 py-2 rounded-md hover:bg-lapd-primary-dark hover:text-lapd-secondary"
                  onClick={() => setIsOpen(false)}
                >
                  Övgü Şikayet
                </Link>
              </div>
            )}
          </div>
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