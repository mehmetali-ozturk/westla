'use client';

import { useState, useRef, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
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
  starred: boolean;
  approved: boolean;
  created_at?: string;
};

const Memories = () => {
    const [photos, setPhotos] = useState<Memory[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [inputUrl, setInputUrl] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    
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

    const starredPhotos = photos.filter(photo => photo.starred);
    const approvedPhotos = photos.filter(photo => photo.approved && !photo.starred);

    // Panoya erişim ve URL oluşturma fonksiyonu
    const handlePaste = async (e: React.ClipboardEvent) => {
        const pastedText = e.clipboardData.getData('text');
        
        // Eğer yapıştırılan metin bir URL gibi görünüyorsa
        if (pastedText.startsWith('http') && isValidImageUrl(pastedText)) {
            setInputUrl(pastedText);
            return;
        }
        
        // Resim yapıştırılmışsa
        const items = e.clipboardData.items;
        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
                const blob = items[i].getAsFile();
                if (!blob) continue;
                
                try {
                    setIsUploading(true);
                    
                    // Resmi data URL'e çevir (base64)
                    const dataUrl = await readFileAsDataURL(blob);
                    
                    // URL'i input'a yerleştir
                    setInputUrl(dataUrl);
                } catch (error) {
                    console.error('Resim işlenirken hata oluştu:', error);
                    alert('Resim işlenirken bir hata oluştu.');
                } finally {
                    setIsUploading(false);
                }
                
                break;
            }
        }
    };

    // Dosya okuma yardımcı fonksiyonu
    const readFileAsDataURL = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    // URL geçerliliği kontrolü
    const isValidImageUrl = (url: string): boolean => {
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'];
        return imageExtensions.some(ext => url.toLowerCase().includes(ext)) || 
               url.startsWith('data:image/');
    };

    // Dosya seçme işlemi
    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            
            try {
                setIsUploading(true);
                
                // Resmi data URL'e çevir
                const dataUrl = await readFileAsDataURL(file);
                
                // URL'i input'a yerleştir
                setInputUrl(dataUrl);
            } catch (error) {
                console.error('Resim işlenirken hata oluştu:', error);
                alert('Resim işlenirken bir hata oluştu.');
            } finally {
                setIsUploading(false);
                
                // Input'u resetle
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            }
        }
    };

    // URL'i Supabase'e kaydetme
    const saveImageUrl = async () => {
        if (!inputUrl.trim()) {
            alert('Lütfen geçerli bir resim URL\'i girin veya bir resim yapıştırın.');
            return;
        }
        
        if (!isValidImageUrl(inputUrl)) {
            alert('Lütfen geçerli bir resim URL\'i girin (.jpg, .png, vb. uzantılı).');
            return;
        }
        
        try {
            setIsUploading(true);
            
            // Memories tablosuna URL'i kaydet
            const { error } = await supabase
                .from('memories')
                .insert([{
                    url: inputUrl,
                    starred: false,
                    approved: true,
                    created_at: new Date().toISOString()
                }])
                .select();

            if (error) {
                throw error;
            }

            // UI'ı güncelle - Yeni verileri tekrar çek
            await fetchPhotos();
            
            // Input'u temizle
            setInputUrl('');
            
            alert("Resim URL'i başarıyla kaydedildi!");
        } catch (error) {
            console.error('URL kaydedilirken hata oluştu:', error);
            alert('URL kaydedilirken bir hata oluştu.');
        } finally {
            setIsUploading(false);
        }
    };

    // Bir fotoğrafı yıldızlı/yıldızsız yap
    const toggleStar = async (photo: Memory) => {
        try {
            const { error } = await supabase
                .from('memories')
                .update({ starred: !photo.starred })
                .eq('id', photo.id);

            if (error) {
                throw error;
            }

            // Verileri yeniden yükle
            await fetchPhotos();
        } catch (error) {
            console.error('İşlem sırasında hata oluştu:', error);
            alert('İşlem sırasında bir hata oluştu.');
        }
    };

    return (
        <div className="md:p-20 p-2 pt-5 w-full mx-auto bg-lapd-primary-light">
            <div className='m-2'>
                {/* 📤 Resim URL'i Ekleme Alanı */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-3 text-center text-white">Yeni Resim Ekle</h2>
                    <div className="flex flex-col md:flex-row gap-2 items-center justify-center text-black">
                        <input
                            type="text"
                            value={inputUrl}
                            onChange={(e) => setInputUrl(e.target.value)}
                            onPaste={handlePaste}
                            placeholder="Resim URL'i girin veya bir resim yapıştırın (Ctrl+V)"
                            className="p-3 rounded-lg border border-gray-300 flex-grow max-w-xl w-full"
                        />
                        <button
                            onClick={saveImageUrl}
                            disabled={isUploading || !inputUrl.trim()}
                            className="p-3 bg-lapd-secondary enabled:hover:bg-lapd-secondary-dark text-black rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors" 
                        >
                            {isUploading ? "Ekleniyor..." : "Ekle"}
                        </button>
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="p-3 bg-gray-800 hover:bg-gray-900 text-white rounded-lg cursor-pointer flex items-center transition-colors" 
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16" />
                            </svg>
                            Dosya Seç
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileSelect}
                        />
                    </div>
                    {inputUrl && isValidImageUrl(inputUrl) && (
                        <div className="mt-3 text-center">
                            <p className="text-white mb-2">Önizleme:</p>
                            <img src={inputUrl} alt="Preview" className="max-h-40 max-w-full inline-block rounded-lg" />
                        </div>
                    )}
                </div>

                {isLoading ? (
                    <div className="text-center py-8">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
                        <p className="mt-2 text-white">Fotoğraflar yükleniyor...</p>
                    </div>
                ) : (
                    <>
                        {/* ⭐ Yıldızlı Fotoğraflar (Slayt) */}
                        {starredPhotos.length > 0 && (
                            <div className="mb-6">
                                <h2 className="text-3xl font-bold mb-5 text-center text-white">Öne Çıkan Fotoğraflar</h2>
                                <Carousel showThumbs={false} autoPlay infiniteLoop>
                                    {starredPhotos.map(photo => (
                                        <div key={photo.id} className="relative">
                                            <img 
                                                src={photo.url} 
                                                className="w-3/4 h-[600px] object-cover rounded-lg cursor-pointer mx-auto" 
                                                alt="Starred Memory" 
                                                onClick={() => setSelectedImage(photo.url)}
                                            />
                                            <button 
                                                className="absolute top-2 right-[15%] bg-yellow-400 p-2 rounded-full"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleStar(photo);
                                                }}
                                            >
                                                ★
                                            </button>
                                        </div>
                                    ))}
                                </Carousel>
                            </div>
                        )}

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
                                    <button 
                                        className="absolute top-2 right-2 bg-gray-200 hover:bg-yellow-400 p-2 text-black rounded-full transition-colors"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleStar(photo);
                                        }}
                                    >
                                        ☆
                                    </button>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div> 

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

export default Memories;