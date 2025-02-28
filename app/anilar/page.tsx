'use client';

import { useState, useEffect } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { createClient } from '@supabase/supabase-js';

// Supabase bağlantısı
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl as string, supabaseKey as string);

// Tip tanımlamaları
type Memory = {
  id: number;
  url: string;
  approved: boolean;
  created_at?: string;
};

export default function Anilar() {
    const [photos, setPhotos] = useState<Memory[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    
    // Supabase'den fotoğrafları çekme
    useEffect(() => {
        fetchPhotos();
    }, []);

    const fetchPhotos = async () => {
        try {
            setIsLoading(true);
            const { data, error } = await supabase
                .from('memories')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                throw error;
            }

            if (data) {
                setPhotos(data);
            }
        } catch (error) {
            console.error('Fotoğraflar yüklenirken hata oluştu:', error);
            alert('Fotoğraflar yüklenirken bir hata oluştu.');
        } finally {
            setIsLoading(false);
        }
    };

    const approvedPhotos = photos.filter(photo => photo.approved);

    return (
        <div className="md:p-20 p-2 pt-5 w-full mx-auto bg-lapd-primary-light">
            {isLoading ? (
                <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
                    <p className="mt-2 text-white">Fotoğraflar yükleniyor...</p>
                </div>
            ) : (
                <>

                
                    {/* 📸 Onaylanmış Fotoğraflar */}
                    <h2 className="text-2xl font-bold mb-2 text-center text-white">Anılar</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {approvedPhotos.map(photo => (
                            <div key={photo.id} className="relative">
                                <img 
                                    src={photo.url} 
                                    className="w-full h-60 object-cover rounded-lg cursor-pointer" 
                                    alt="Memory" 
                                    onClick={() => setSelectedImage(photo.url)} 
                                />
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* 🖼️ Tam Ekran Açılan Görüntü */}
            {selectedImage && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex items-center justify-center z-50">
                    <button 
                        className="absolute top-4 right-4 text-white text-2xl font-bold" 
                        onClick={() => setSelectedImage(null)}
                    >
                        ✖
                    </button>
                    <img src={selectedImage} className="max-w-full max-h-full rounded-lg" alt="Full View" />
                </div>
            )}
        </div>
    );
}
