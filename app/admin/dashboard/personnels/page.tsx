'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Loading from '@/app/loading';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase URL or Key');
}
const supabase = createClient(supabaseUrl, supabaseKey);

interface Personnel {
  id: number;
  fullname: string;
  rank: string;
  bureau: string;
  profile_photo: string;
}

const availableRanks = [
  'Lieutenant',
  'Sergeant II',
  'Detective II',
  'Sergeant I',
  'Senior Lead Officer',
  'Detective I',
  'Officer III',
  'Officer II'
] as const;

export default function AdminDashboard() {
  const [personnel, setPersonnel] = useState<Personnel[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(true);
  const [editingPerson, setEditingPerson] = useState<Personnel | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  // const [newPerson, setNewPerson] = useState<Omit<Personnel, 'id'>>({
  //   fullname: '',
  //   rank: '',
  //   bureau: '',
  //   profile_photo: ''
  // });
  const [fullname, setFullname] = useState('')
  const [rank, setRank] = useState('')
  const [bureau, setBureau] = useState('')
  const [profilePhoto, setProfilePhoto] = useState('')


  useEffect(() => {
    fetchPersonnel();
  }, []);

  const fetchPersonnel = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/admin/personnel");
      if (!response.ok) {
        setLoading(false)
        throw new Error("Veri çekme hatası");
      }
      const data = await response.json();
      setPersonnel(data);
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.error("Error fetching personnel:", err);
    }
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

  const handleEdit = async (person: Personnel) => {
    if (editingPerson) {
      if (confirm('Değişiklikleri kaydetmek istediğinizden emin misiniz?')) {
        try {
          const { error } = await supabase
            .from('users')
            .update({
              fullname: editingPerson.fullname,
              rank: editingPerson.rank,
              bureau: editingPerson.bureau,
              profile_photo: editingPerson.profile_photo
            })
            .eq('id', person.id);
  
          if (error) throw error;
          
          fetchPersonnel();
          setEditingPerson(null);
        } catch (error) {
          console.error('Error updating personnel:', error);
        }
      }
    } else {
      setEditingPerson(person);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Bu personeli silmek istediğinizden emin misiniz?')) {
      try {
        const { error } = await supabase
          .from('users')
          .delete()
          .eq('id', id);

        if (error) throw error;
        
        fetchPersonnel();
      } catch (error) {
        console.error('Error deleting personnel:', error);
      }
    }
  };

  const createPersonnel = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!fullname ||!rank ||!bureau) {
      alert('Tüm alanları doldurunuz');
      return;
    }

    if (profilePhoto == null) {
      const profile_photo = '/personnel/maloç.jpg'
      setLoading(true);
      const res = await fetch('/api/admin/personnel', {
        method: 'POST',
        body: JSON.stringify({ fullname, rank, bureau, profile_photo }),
      });

      const data = await res.json();

      if (data.error) {
        console.error('Error sending new email:', data.error);
      setLoading(false)
      } 
      else {
      setLoading(false)
        fetchPersonnel();
        setIsAdding(false);
        setFullname('');
        setRank('');
        setBureau('');
        setProfilePhoto('');
      }
    }
    setLoading(true);
    const res = await fetch('/api/admin/personnel', {
      method: 'POST',
      body: JSON.stringify({ fullname, rank, bureau, profilePhoto }),
    });

    const data = await res.json();

    if (data.error) {
      console.error('Error sending new email:', data.error);
    setLoading(false)
    } 
    else {
    setLoading(false)
      fetchPersonnel();
      setIsAdding(false);
      setFullname('');
      setRank('');
      setBureau('');
      setProfilePhoto('');
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="min-w-full text-center mb-8 bg-lapd-accent-light/50 py-10">
        <h1 className="text-4xl font-bold text-lapd-primary mb-4">Personel Yönetimi</h1>
        <button
          onClick={() => setIsAdding(true)}
          className="border border-green-500 text-green-950 px-4 py-2 rounded hover:bg-green-600 transition-colors"
        >
          + Personel
        </button>
      </div>

      {isAdding && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-2xl mb-4 text-lapd-primary">Yeni Personel Ekle</h2>
            <input
              type="text"
              placeholder="İsim"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}  
              className="block w-full mb-2 p-2 border rounded text-black"
            />
            <select
              value={rank}
              onChange={(e) => setRank(e.target.value)}
              className="block w-full mb-2 p-2 border rounded text-black"
            >
              <option value="">Rütbe Seçin</option>
              {availableRanks.map((rank) => (
                <option key={rank} value={rank}>
                  {rank}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Büro"
              value={bureau}
              onChange={(e) => setBureau(e.target.value)}
              className="block w-full mb-2 p-2 border rounded text-black"
            />
            <input
              type="text"
              placeholder="Fotoğraf URL"
              value={profilePhoto}
              onChange={(e) => setProfilePhoto(e.target.value)}
              className="block w-full mb-4 p-2 border rounded text-black"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsAdding(false)}
                className="border border-gray-500 text-gray-950 px-4 py-2 rounded hover:bg-gray-600 transition-colors"
              >
                İptal
              </button>
              <button
              type='submit'
                onClick={createPersonnel}
                className="border border-green-500 text-green-950 px-4 py-2 rounded hover:bg-green-600 transition-colors"
              >
                Ekle
              </button>
            </div>
          </div>
        </div>
      )}

      {Object.keys(groupedPersonnel).map((rank, index) => (
        <div key={index} className="w-full max-w-4xl mb-8 flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-lapd-primary mb-4">{rank}</h2>
          <div className="flex flex-wrap justify-center gap-4 mb-5">
            {groupedPersonnel[rank].map((person) => (
              <div key={person.id} className="border rounded-lg p-4 text-center max-w-[254px] text-black">
                {editingPerson?.id === person.id ? (
                  <div>
                    <input
                      type="text"
                      value={editingPerson.fullname}
                      onChange={(e) => setEditingPerson({...editingPerson, fullname: e.target.value})}
                      className="block w-full mb-2 p-2 border rounded"
                    />
                    <select
                      value={editingPerson.rank}
                      onChange={(e) => setEditingPerson({...editingPerson, rank: e.target.value})}
                      className="block w-full mb-2 p-2 border rounded"
                    >
                      {availableRanks.map((rank) => (
                        <option key={rank} value={rank}>
                          {rank}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={editingPerson.bureau}
                      onChange={(e) => setEditingPerson({...editingPerson, bureau: e.target.value})}
                      className="block w-full mb-2 p-2 border rounded"
                    />
                    <input
                      type="text"
                      value={editingPerson.profile_photo}
                      onChange={(e) => setEditingPerson({...editingPerson, profile_photo: e.target.value})}
                      className="block w-full mb-4 p-2 border rounded"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditingPerson(null)}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                      >
                        İptal
                      </button>
                      <button
                        onClick={() => handleEdit(person)}
                        className=" bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      >
                        Kaydet
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <img
                      src={person.profile_photo}
                      alt={person.fullname}
                      className="w-full h-[220px] object-cover mb-4 rounded"
                    />
                    <h3 className="text-xl font-semibold text-lapd-primary ">{person.fullname}</h3>
                    <p className="text-gray-600">{person.rank}</p>
                    <p className="text-gray-500 mb-4">{person.bureau}</p>
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => setEditingPerson(person)}
                        className="border  border-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 transition-colors"
                      >
                        Düzenle
                      </button>
                      <button
                        onClick={() => handleDelete(person.id)}
                        className="border border-red-500 text-black px-5 py-3 rounded hover:bg-red-600 transition-colors"
                      >
                        Sil
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
          {index < Object.keys(groupedPersonnel).length - 1 && <hr className="w-full border-t border-gray-300 my-8" />}
        </div>
      ))}
    </div>
  );
}