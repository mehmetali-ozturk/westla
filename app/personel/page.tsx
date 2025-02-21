'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Personnel {
  id: number;
  name: string;
  rank: string;
  bureau: string;
  img_src: string;
}

export default function Personnel() {
  const [showVideo, setShowVideo] = useState(false);
  const [personnel, setPersonnel] = useState<Personnel[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPersonnel();
  }, []);

  const fetchPersonnel = async () => {
    try {
      const response = await fetch('/api/personnel');
      if (!response.ok) {
        throw new Error('Veri çekme hatası');
      }
      const data = await response.json();
      setPersonnel(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
      console.error('Error fetching personnel:', err);
    }
  };
  useEffect(() => {
    const video = document.getElementById("bragovich-video") as HTMLVideoElement;
    if (showVideo && video) {
      video.currentTime = 0; // Videoyu başa sar
      video.play().catch(err => console.error("Video oynatma hatası:", err));
      
      // Video bittiğinde state'i sıfırla
      video.onended = () => {
        setShowVideo(false);
      };
    }
  }, [showVideo]);

  const playVideo = () => {
    setShowVideo(true);
  };

  const normalizeRank = (rank: string) => {
    if (rank.startsWith("Officer")) {
      return "Officers";
    }
    return rank;
  };

  const groupedPersonnel = personnel.reduce<Record<string, typeof personnel>>((acc, person) => {
    const normalizedRank = normalizeRank(person.rank);
    if (!acc[normalizedRank]) {
      acc[normalizedRank] = [];
    }
    acc[normalizedRank].push(person);
    return acc;
  }, {});

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="min-w-full text-center mb-8 bg-lapd-accent-light/50 py-10">
        <h1 className="text-4xl font-bold text-lapd-primary mb-4">Personel</h1>
        <p className="text-lapd-primary-dark">Şehrimizin güvenliği için çalışan personellerimiz.</p>
      </div>
      {Object.keys(groupedPersonnel).map((rank, index) => (
        <div key={index} className="w-full max-w-4xl mb-8 flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-lapd-primary mb-4 text-center">
            {rank}
          </h2>
          <div className="flex flex-wrap justify-center gap-4 mb-5">
            {groupedPersonnel[rank].map((person, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center bg-white p-4 rounded-lg w-64 h-max"
                onClick={() => person.name === "BragOvich" ? playVideo() : null}
              >
                {person.name === "BragOvich" && showVideo ? (
                  <div className="w-full h-[220px] relative">
                    <video
                      id="bragovich-video"
                      src="/bragovich.mp4"
                      className="w-full h-full object-cover"
                      playsInline
                      controls={false}
                    />
                  </div>
                ) : (
                  <div className="relative w-full h-[220px] mb-4">
                    <Image
                      src={person.img_src}
                      alt={person.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 256px) 100vw, 256px"
                    />
                  </div>
                )}
                <h3 className="text-xl font-semibold text-lapd-primary text-center">{person.name}</h3>
                <p className="text-gray-700 text-center">{person.rank}</p>
                <p className="text-gray-500 text-center">{person.bureau}</p>
              </div>
            ))}
          </div>
          {index < Object.keys(groupedPersonnel).length - 1 && <hr className="w-full border-t border-gray-300 my-8" />}
        </div>
      ))}
    </div>
  );
}