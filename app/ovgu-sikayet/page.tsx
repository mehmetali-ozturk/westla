'use client';

import { useState } from 'react';

type FormField = {
  id: keyof typeof initialFormData;
  label: string;
  type: string;
  required?: boolean;
  min?: string;
  placeholder?: string;
  section: 'ic' | 'ooc' | 'ride-along' | 'ovgu-sikayet';
};

const initialFormData = {
    icName: '',
    phoneNumber: '',
    adress: '',
    convenientTime: '',
    casePlace: '',
    caseWitnesses: '',
    casePolice: '',
    caseAbout: ''
};

const formFields: FormField[] = [
  { id: 'icName', label: 'İsminiz *', type: 'text', section: 'ovgu-sikayet' },
  { id: 'phoneNumber', label: 'Telefon Numaranız *', type: 'text', section: 'ovgu-sikayet' },
  { id: 'adress', label: 'Adresiniz *', type: 'text', section: 'ovgu-sikayet' },
  { id: 'convenientTime', label: 'Size Ulaşabileceğimzi En Uygun Zaman *', type: 'time', section: 'ovgu-sikayet' },
  { id: 'casePlace', label: 'Olayın gerçekleştiği yer *', type: 'text', section: 'ovgu-sikayet' },
  { id: 'casePolice', label: 'Olaya karışan memurun ismi veya rozet numarası *', type: 'text', section: 'ovgu-sikayet' },
  { id: 'caseWitnesses', label: 'Şahitlerin isim ve iletişim bilgileri *', type: 'text', section: 'ovgu-sikayet' },
  { id: 'caseAbout', label: 'Olayın detaylarından bahsedin. (Mümkün olduğunca detaylı anlatmaya özen gösterin.) *', type: 'text', section: 'ovgu-sikayet' },
];

export default function RideAlong() {
  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Form data being sent:', formData); // Debug log

    try {
      const response = await fetch('/api/ovgu-sikayet', {
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
        <h1 className="text-3xl font-bold text-lapd-primary mb-8 text-center">LAPD Övgü Şikayet Formu</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-8">
            <div className="space-y-4">
              {formFields
                .filter(field => field.section === 'ovgu-sikayet')
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
          </div>

          <button
            type="submit"
            className="w-full bg-lapd-primary text-white rounded-md py-2 px-4 hover:bg-lapd-primary/90 transition-colors"
          >
            Formu Gönder
          </button>
        </form>
      </div>
    </div>
  );
}