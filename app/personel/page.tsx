"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Loading from "../loading";

interface users {
  id: number;
  fullname: string;
  rank: string;
  bureau: string;
  profile_photo: string;
}

export default function Personnel() {
  const [showVideo, setShowVideo] = useState(false);
  const [personnel, setPersonnel] = useState<users[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // 3 saniyelik yükleme için state

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000); // 3 saniyelik gecikmeli yükleme

    fetchPersonnel();
  }, []);

  const fetchPersonnel = async () => {
    try {
      const response = await fetch("/api/personnel");
      if (!response.ok) {
        throw new Error("Veri çekme hatası");
      }
      const data = await response.json();
      setPersonnel(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu");
      console.error("Error fetching personnel:", err);
    }
  };

  useEffect(() => {
    const video = document.getElementById("bragovich-video") as HTMLVideoElement;
    if (showVideo && video) {
      video.currentTime = 0;
      video.play().catch((err) => console.error("Video oynatma hatası:", err));

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

  const groupedPersonnel = personnel.reduce<Record<string, typeof personnel>>(
    (acc, person) => {
      const normalizedRank = normalizeRank(person.rank);
      if (!acc[normalizedRank]) {
        acc[normalizedRank] = [];
      }
      acc[normalizedRank].push(person);
      return acc;
    },
    {}
  );

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="min-w-full text-center mb-8 bg-white py-10">
        <h1 className="text-4xl font-bold text-lapd-primary mb-4">Personel</h1>
        <p className="text-lapd-primary-dark">
          Şehrimizin güvenliği için çalışan personellerimiz.
        </p>
      </div>
      {Object.keys(groupedPersonnel).map((rank, index) => (
        <div
          key={index}
          className="w-full max-w-4xl mb-8 flex flex-col items-center"
        >
          <h2 className="text-2xl font-semibold text-lapd-primary mb-4 text-center">
            {rank}
          </h2>
          <div className="flex flex-wrap justify-center gap-4 mb-5">
            {groupedPersonnel[rank].map((person, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center bg-white p-4 rounded-lg w-64 h-max"
                onClick={() =>
                  person.fullname === "Jack Bragovich" ? playVideo() : null
                }
              >
                {person.fullname === "Jack Bragovich" && showVideo ? (
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
                  <div className="relative w-full h-[224px] mb-4">
                    <Image
                      src={person.profile_photo}
                      alt={person.fullname}
                      fill
                      className="object-cover"
                      sizes="(max-width: 256px) 100vw, 256px"
                    />
                  </div>
                )}
                <h3 className="text-xl font-semibold text-lapd-primary text-center">
                  {person.fullname}
                </h3>
                <p className="text-gray-700 text-center">{person.rank}</p>
                <p className="text-gray-500 text-center">{person.bureau}</p>
              </div>
            ))}
          </div>
          {index < Object.keys(groupedPersonnel).length - 1 && (
            <hr className="w-full border-t border-gray-300 my-8" />
          )}
        </div>
      ))}
    </div>
  );
}
