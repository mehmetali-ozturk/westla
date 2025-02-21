'use client'
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase URL or Key');
}

const supabase = createClient(supabaseUrl, supabaseKey);

interface Personnel {
  id: number;
  name: string;
  rank: string;
  bureau: string;
  img_src: string;
}

export default function Personel() {
  const [showVideo, setShowVideo] = useState(false);
  const [personnel, setPersonnel] = useState<Personnel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPersonnel();
  }, []);

  const fetchPersonnel = async () => {
    try {
      const { data, error } = await supabase
        .from('personnel')
        .select('*');
  
      if (error) {
        throw error;
      }
  
      if (data) {
        const rankOrder: Record<string, number> = {
          'Lieutenant': 1,
          'Sergeant II': 2,
          'Detective II': 3,
          'Sergeant I': 4,
          'Senior Lead Officer': 5,
          'Detective I': 6,
          'Officer II': 7
        };
  
        const sortedData = [...data].sort((a, b) => {
          const rankA = rankOrder[a.rank as keyof typeof rankOrder] || 999;
          const rankB = rankOrder[b.rank as keyof typeof rankOrder] || 999;
          return rankA - rankB;
        });
  
        setPersonnel(sortedData);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching personnel:', error);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (showVideo) {
      const video = document.getElementById("bragovich-video") as HTMLVideoElement;
      if (video) {
        video.play();
        video.onended = () => {
          setShowVideo(false);
        };
      }
    }
  }, [showVideo]);

  // Function to play the video
  const playVideo = () => {
    setShowVideo(true);
  };

  // Normalize rank names for grouping
  const normalizeRank = (rank: string) => {
    if (rank.startsWith("Officer")) {
      return "Officers";
    }
    return rank;
  };

  // Group personnel by normalized rank
  const groupedPersonnel = personnel.reduce<Record<string, typeof personnel>>((acc, person) => {
    const normalizedRank = normalizeRank(person.rank);
    if (!acc[normalizedRank]) {
      acc[normalizedRank] = [];
    }
    acc[normalizedRank].push(person);
    return acc;
  }, {});

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
                onClick={person.name === "BragOvich" ? playVideo : undefined}
              >
                {person.name === "BragOvich" && showVideo ? (
                  <video
                    id="bragovich-video"
                    src="bragovich.mp4"
                    className="w-full h-[220px] object-cover mb-4"
                  />
                ) : (
                  <img
                    src= {person.img_src}
                    alt={person.name}
                    className="w-full h-[220px] object-cover mb-4"
                  />
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