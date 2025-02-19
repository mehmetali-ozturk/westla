'use client';

import { useState } from 'react';

type FormField = {
  id: keyof typeof initialFormData;
  label: string;
  type: string;
  required?: boolean;
  min?: string;
  placeholder?: string;
  section: 'ic' | 'ooc' | 'ride-along';
};

const initialFormData = {
  icName: '',
  DOB: '',
  phoneNumber: '',
  adress: '',
  rideAlongDate: '',
  rideAlongTime: '',
  TOC: false,
  TOC2: false
};

const formFields: FormField[] = [
  { id: 'icName', label: 'İsminiz *', type: 'text', section: 'ride-along' },
  { id: 'DOB', label: 'Doğum Tarihiniz *', type: 'text', section: 'ride-along' },
  { id: 'phoneNumber', label: 'Telefon Numaranız *', type: 'text', section: 'ride-along' },
  { id: 'adress', label: 'Adresiniz *', type: 'text', section: 'ride-along' },
  { id: 'rideAlongDate', label: 'Ride Along Tarihi *', type: 'date', section: 'ride-along' },
  { id: 'rideAlongTime', label: 'Ride Along Saati *', type: 'time', section: 'ride-along' },
];

export default function RideAlong() {
  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Form data being sent:', formData); // Debug log

    try {
      const response = await fetch('/api/ride-along', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData) // Send the complete formData object
      });

      const result = await response.json();
      console.log('API Response:', result); // Debug log

      if (!response.ok) {
        throw new Error(result.error || 'Başvuru gönderilirken bir hata oluştu');
      }

      alert('Başvurunuz başarıyla gönderildi!');
      setFormData(initialFormData); // Reset form
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Başvuru gönderilirken bir hata oluştu.');
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-lapd-accent-light/10 p-8 rounded-lg shadow">
        <h1 className="text-3xl font-bold text-lapd-primary mb-8 text-center">LAPD Ride Along Başvuru Formu</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-8">
            <div className="space-y-4">
              {formFields
                .filter(field => field.section === 'ride-along')
                .map((field) => (
                  <div key={field.id}>
                    <label className="block text-sm font-medium text-[#012b6d]">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      required
                      min={field.min}
                      placeholder={field.placeholder}
                      className="mt-1 block w-full rounded-md border text-black shadow-sm p-2"
                      value={formData[field.id].toString()}
                      onChange={(e) => setFormData({...formData, [field.id]: e.target.value})}
                    />
                  </div>
                ))}
            </div>

            {/* Discord Checkbox */}
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  required
                  className="rounded border-gray-300"
                  checked={formData.TOC as boolean}
                  onChange={(e) => setFormData({...formData, TOC: e.target.checked})}
                />
                <span className="text-sm text-gray-700">Devriye esansında başıma gelebilecek ölüm, yaralanma, kalıcı hasar, psikolojik hasar vb. hiçbir olumsuz durumdan devriye memurunun veya LAPD'nin sorumlu olmadığını kabul ediyorum. *</span>
              </label>
            </div>
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  required
                  className="rounded border-gray-300"
                  checked={formData.TOC2 as boolean}
                  onChange={(e) => setFormData({...formData, TOC2: e.target.checked})}
                />
                <span className="text-sm text-gray-700">Devriye esnasında devriye memurunun talimatlarına uyacağımı aksi takdirde programdan atılacağımı kabul ediyorum.*</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-lapd-primary text-white rounded-md py-2 px-4 hover:bg-lapd-primary/90 transition-colors"
          >
            Başvuruyu Gönder
          </button>
        </form>
      </div>
    </div>
  );
}