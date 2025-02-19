'use client';

import { useState } from 'react';

type FormField = {
  id: keyof typeof initialFormData;
  label: string;
  type: string;
  required?: boolean;
  min?: string;
  placeholder?: string;
  section: 'ic' | 'ooc';
};

const initialFormData = {
  email: '',
  oocFullName: '',
  oocAge: '',
  fivemHours: '',
  discordName: '',
  discordId: '',
  steamLink: '',
  whereDidYouSee: '',
  previousLEOExperience: '',
  reference: '',
  icFullName: '',
  icNationality: '',
  icBirthDate: '',
  icGender: '',
  icHealthIssues: '',
  discordJoined: false
};

const formFields: FormField[] = [
  // OOC Fields
  { id: 'email', label: 'E-posta *', type: 'email', section: 'ooc' },
  { id: 'oocFullName', label: 'Ad Soyad *', type: 'text', section: 'ooc' },
  { id: 'oocAge', label: 'Yaşınız *', type: 'number', min: '16', section: 'ooc' },
  { id: 'fivemHours', label: 'Fivem Saatiniz *', type: 'text', section: 'ooc' },
  { id: 'discordName', label: 'Discord İsminiz (Örnek: Swartez#2108) *', type: 'text', section: 'ooc' },
  { id: 'discordId', label: 'Discord ID\'niz *', type: 'text', section: 'ooc' },
  { id: 'steamLink', label: 'Steam Linkiniz *', type: 'url', section: 'ooc' },
  { id: 'whereDidYouSee', label: 'Başvuru formunu nerden gördünüz? *', type: 'text', section: 'ooc' },
  { id: 'previousLEOExperience', label: 'Daha önce kolluk kuvveti rolü yaptınız mı? *', type: 'text', section: 'ooc' },
  { id: 'reference', label: 'Ekipte tanıdığınız veya referansınız bulunmakta mı? *', type: 'text', section: 'ooc' },
  // IC Fields
  { id: 'icFullName', label: 'Karakterin Adı Soyadı *', type: 'text', section: 'ic' },
  { id: 'icNationality', label: 'Karakterin Uyruğu *', type: 'text', section: 'ic' },
  { id: 'icBirthDate', label: ' Karakterin Doğum Tarihi *', type: 'date', section: 'ic' },
  { id: 'icGender', label: 'Karakterin Cinsiyeti *', type: 'text', section: 'ic' },
  { id: 'icHealthIssues', label: 'Karakterin herhangi bir rahatsızlığı var mı? *', type: 'text', section: 'ic' },
];

export default function Basvuru() {
  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Form data being sent:', formData); // Debug log

    try {
      const response = await fetch('/api/submit-form', {
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
        <h1 className="text-3xl font-bold text-lapd-primary mb-8 text-center">LAPD Başvuru Formu</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-8">
            {/* OOC Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-lapd-primary border-b pb-2">Out of Character (OOC) Bilgileri</h2>
              {formFields
                .filter(field => field.section === 'ooc')
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

            {/* IC Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-lapd-primary border-b pb-2">In Character (IC) Bilgileri</h2>
              {formFields
                .filter(field => field.section === 'ic')
                .map((field) => (
                  <div key={field.id}>
                    <label className="block text-sm font-medium text-black">
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
                  checked={formData.discordJoined as boolean}
                  onChange={(e) => setFormData({...formData, discordJoined: e.target.checked})}
                />
                <span className="text-sm text-gray-700">discord.gg/westla Sunucusuna katıldım *</span>
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