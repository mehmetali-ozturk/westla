import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/home-bg.png" 
          alt="LAPD Background"
          className="brightness-50 relative bg-cover w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-50 flex flex-col min-h-screen text-white px-4 md:px-4 md:top-52 md:left-20 items-center justify-center md:justify-start w-full md:w-max">
        <div className="flex flex-col text-center md:text-left md:items-start items-center gap-4">
          {/* Hero Text Items */}
          <p className="md:text-l text-m md:tracking-[11px] tracking-[4px] font-semibold text-lapd-secondary-dark">AHMANSON RECRUIT TRAINING CENTER</p>
          <p className="md:text-7xl text-5xl font-semibold">WEST LAPD HIRING</p>
          <p className="md:text-5xl text-3xl text-lapd-secondary-dark font-serif">Seminer & Atölye</p>
          <p className="md:text-3xl text-2xl font-medium">HER GüN 18:00 - 23:00</p>
          <p className="md:text-3xl text-2xl font-medium text-lapd-secondary-dark">ALTTAKI DUGMEDEN KAYIT OL</p>

          {/* CTA Button */}
          <Link 
            href="/basvuru"
            className="mt-8 px-8 py-3 bg-lapd-button text-l rounded-lg hover:bg-lapd-button/90 transition-colors max-w-max"
          >
            Başvur
          </Link>
        </div>
      </div>
    </div>
  );
}