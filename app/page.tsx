'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const faqs = [
    { question: "Sürecin ilk adımı nedir?", answer: "joinLAPD.com adresini ziyaret edin ve 'Şimdi Başvur' düğmesine tıklayın." },
    { question: "LAPD'ye katılmak için Los Angeles'ta mı yaşamam gerekiyor?", answer: "Hayır, ancak şehri tanımanız faydalıdır." },
    { question: "Uygun bir geçmişe sahip olmak ne anlama geliyor?", answer: "Yasalara uyum gösteren bireyler aranır." },
    { question: "PFQ'da 50'nin üzerinde bir puan alırsam, Akademi için hazır mıyım?", answer: "PFQ'da 70'in üzerinde puan almak başarı şansını artırır." },
    { question: "PAT'i aldıysam, PFQ'yu da almam gerekiyor mu?", answer: "PAT bir yıl geçerlidir." },
    { question: "Çok fazla trafik cezam varsa, polis memuru olmamda sorun yaşar mıyım?", answer: "Durum vaka bazında değerlendirilir." },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section with Background */}
      <div className="relative h-[500px] md:h-[650px]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/home-bg2.png"
            alt="LAPD Background"
            className="w-full h-full object-cover object-[10%_90%] brightness-50"
          />
        </div>
      
        <div className="relative z-10 flex flex-col pt-24 md:pt-72 pb-24 md:pb-30 text-white px-6 md:px-28 items-center md:items-start justify-center w-full">
          <div className="flex flex-col text-center md:text-left md:items-start items-center gap-2 md:gap-0">
            {/* Hero Text Items */}
            <p className="md:text-l text-m md:tracking-[11px] tracking-[4px] font-semibold text-lapd-secondary-dark">AHMANSON RECRUIT TRAINING CENTER</p>
            <p className="md:text-7xl text-5xl font-semibold">WEST LAPD HIRING</p>
            <p className="md:text-5xl text-3xl text-lapd-secondary-dark font-serif mb-2">Seminer & Atölye</p>
            <p className="md:text-3xl text-2xl font-medium">HER GÜN 18:00 - 23:00</p>

            {/* CTA Button */}
            <Link
              href="/basvuru"
              className="mt-4 px-8 py-3 bg-lapd-button text-l rounded-lg hover:bg-lapd-button/90 transition-colors max-w-max"
            >
              Başvur
            </Link>
          </div>
        </div>
      </div>
      
      {/* Grid Section */}
      <div className="relative z-20 flex flex-col items-center bg-lapd-primary justify-center py-10 w-full">
        <div className="max-w-6xl w-full px-6 md:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-white">LAPD Kariyer Seçenekleri</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Grid Item 1: Qualifications */}
            <Link href="/qualifications" className="border-white border-[1px] relative group overflow-hidden w-full max-w-4xl h-48">
              <div className="relative w-full h-full">
                <img
                  src="isealim0.png"
                  className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 group-hover:bg-opacity-70"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <div className="text-2xl font-semibold">NİTELİKLER</div>
                  <div className="mt-2">Yaş, Eğitim, Vatandaşlık & Arka Plan Standartları</div>
                </div>
              </div>
            </Link>
            {/* Grid Item 2: Hiring Process */}
            <Link href="/qualifications" className="border-white border-[1px] relative group overflow-hidden w-full max-w-4xl h-48">
              <div className="relative w-full h-full">
                <img
                  src="isealim1.png"
                  className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 group-hover:bg-opacity-70"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <div className="grid-title text-2xl font-semibold">İŞE ALIM SÜRECİ</div>
                  <div className="grid-text mt-2">İşe Alım Sürecinde Yedi Adım</div>
                </div>
              </div>
            </Link>
            {/* Grid Item 3: Diversity */}
            <Link href="/qualifications" className="border-white border-[1px] relative group overflow-hidden w-full max-w-8xl h-48">
              <div className="relative w-full h-full">
                <img
                  src="isealim2.png"
                  className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 group-hover:bg-opacity-70"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <div className="grid-title text-2xl font-semibold">ÇEŞİTLİLİK</div>
                  <div className="grid-text mt-2">LAPD Memurları Hizmet Ettikleri Toplulukları Temsil Eder</div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="relative z-20 flex flex-col items-center bg-white justify-center py-16 w-full">
        <div className="max-w-4xl w-full px-6 md:px-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-blue-900">LAPD Sıkça Sorulan Sorular</h2>
          <ul className="text-left space-y-4 w-full">
            {faqs.map((faq, index) => (
              <li key={index} className="border-b border-gray-300 py-3">
                <button
                  className="w-full text-left text-lapd-primary font-semibold flex justify-between items-center"
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                  <span>{openIndex === index ? "▲" : "▼"}</span>
                </button>
                {openIndex === index && (
                  <p className="mt-3 text-gray-600 pb-2">{faq.answer}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Assistance/Dislclaimer Section */}
      <div className="bg-lapd-primary py-8">
        <div className="max-w-6xl mx-auto px-6 md:px-8 flex items-center justify-center space-x-4">
          {/* Telefon İkonu */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.56853 24C1.86587 24 1.26212 23.7422 0.757274 23.2265C0.252425 22.711 0 22.0945 0 21.3769V2.62314C0 1.90555 0.252425 1.28896 0.757274 0.773377C1.26212 0.257792 1.86587 0 2.56853 0H16.4315C17.1341 0 17.7379 0.257792 18.2427 0.773377C18.7476 1.28896 19 1.90555 19 2.62314V21.3769C19 22.0945 18.7476 22.711 18.2427 23.2265C17.7379 23.7422 17.1341 24 16.4315 24H2.56853ZM2.56853 20.3835V21.3769H16.4315V20.3835H2.56853ZM2.56853 18.3968H16.4315V5.60327H2.56853V18.3968ZM2.56853 3.61652H16.4315V2.62314H2.56853V3.61652Z" fill="currentColor"/>
          </svg>
          {/* Metin */}
          <div className="text-white text-lg">
            If you need assistance text: <a href='https://discord.gg/westla' target='_blank' className="font-semibold">West LA Discord</a>
          </div>
        </div>
      </div>
    </div>
  );
}