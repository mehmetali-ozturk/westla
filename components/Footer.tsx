'use client';

import Image from 'next/image';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/footer-bg.png" // Add your background image to public folder
          alt="Footer Background"
          fill
          className="object-cover "
        />
      </div>

      {/* Content */}
      <div className="relative z-10 bg-lapd-primary/80">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 md:pl-24 text-center md:text-left">
            {/* Logo Section */}
            <div className="flex flex-col items-center">
              <Image
                src="/logo.png"
                alt="LAPD Logo"
                width={150}
                height={150}
                className="mb-4"
              />
            </div>

            {/* Navigation Links */}
            <div className="grid grid-cols-2 gap-8 text-lapd-accent-light/70">
              <div className="space-y-4">
                <Link href="/" className="block hover:text-gray-500 duration-300  transition-colors">
                  Ana Sayfa
                </Link>
                <Link href="/basvuru" className="block hover:text-gray-500 duration-300  transition-colors">
                  Başvuru
                </Link>
                <Link href="/ride-along" className="block hover:text-gray-500 duration-300 transition-colors">
                  Ride Along
                </Link>
              </div>
              <div className="space-y-4">
                <Link href="/personel" className="block hover:text-gray-500 duration-300  transition-colors">
                  Personel
                </Link>
                <Link href="/organizasyon" className="block hover:text-gray-500 duration-300  transition-colors">
                  Organizasyon
                </Link>
                <Link href="/kariyer" className="block hover:text-gray-500 duration-300  transition-colors">
                  Kariyer Basamakları
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-white/10 pt-8">
                <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-white/70 text-sm">
                    <p>© 2023 WestLA. Tüm hakları saklıdır.</p>
                    <Link href="/sorumluluk-reddi" className="hover:text-lapd-secondary transition-colors">
                    Sorumluluk Reddi
                    </Link>
                    <Link href="/gizlilik-politikasi" className="hover:text-lapd-secondary transition-colors">
                    Gizlilik Politikası
                    </Link>
                    <div className='flex flex-row gap-5'>
                        <Link href="https://www.youtube.com/@westla0102" target='_blank' className="hover:text-lapd-secondary transition-colors">
                        <Image src="/youtube.png" width={24} height={24} alt="YouTube" />
                        </Link>
                        <Link href="https://www.tiktok.com/@westlapd" target='_blank' className="hover:text-lapd-secondary transition-colors">
                        <Image src="/tiktok.png" width={24} height={24} alt="TikTok" />
                        </Link>
                        <Link href="https://discord.gg/westla" target='_blank' className="hover:text-lapd-secondary transition-colors">
                        <Image src="/discord.png" width={24} height={24} alt="Discord" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;