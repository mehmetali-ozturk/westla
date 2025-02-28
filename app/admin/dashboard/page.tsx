'use client'
import { useEffect, useState } from 'react';
import { Search, User, Users } from 'lucide-react'; 
import Link from 'next/link';
import Loading from "../../loading";

export default function Dashboard() {
  const [userInfo, setUserInfo] = useState({
    fullname: '',
    rank: '',
    profile_photo: '',
    bureau: '',
    badge: '',
    email: ''
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
  }, []);

  useEffect(() => {
    fetch('/api/user')
     .then((res) => res.json())
     .then((data) => {
        if (data.error) {
          console.error('Error fetching announcements:', data.error);
        } else {
          setUserInfo({
            fullname: data.fullname,
            rank: data.rank,
            bureau: data.bureau,
            badge: data.badge,
            email: data.email,
            profile_photo: data.profile_photo
          });
        }
      })
     .catch((error) => {
        console.error('Error fetching announcements:', error);
      }).finally(() => {
        setLoading(false);
      })
  }, [])



  if (loading) {
    return (
      <Loading></Loading>
    )
  }

  return (
    <div className="flex bg-gray-100 ">
      {/* Sol taraf - Admin Bilgileri */}
      <aside className="w-[25%] bg-white p-4 shadow-md flex flex-col text-black h- ">
        <div className="rounded-md p-5">
          <div className="flex flex-col items-center bg-lapd-accent-light/30 gap-4 p-6 rounded-lg w-full">
            <div className="w-48 h-48 bg-gray-300 rounded-full">
              <img src={userInfo.profile_photo} alt="" className="rounded-full"/>
            </div>
            <div className="text-center">
                  <p className="text-3xl font-medium">{userInfo.fullname}</p>
                  <p className="text-xl text-gray-500">{userInfo.rank}</p>
                  <p className="text-xl text-gray-500">{userInfo.bureau}</p>
                  <p className="text-xl text-gray-500">{userInfo.badge}</p>
            </div>
          </div>
          <div className="w-full my-5 h-[1px] bg-lapd-primary/50"></div>
          <div className="grid grid-rows-3 gap-3 transition-colors">
            <Link href="/admin/dashboard/investigations" className="p-5 text-lapd-primary rounded-lg hover:bg-gray-200 transition-colors text-left flex items-center">
              <Search className="mr-2" /> Soruşturmalar
            </Link>
            <Link href="/admin/dashboard/personnels" className="p-5 text-lapd-primary rounded-lg hover:bg-gray-200 transition-colors text-left flex items-center">
              <User className="mr-2" /> Personeller
            </Link>
            <Link href="/admin/dashboard/users" className="p-5 text-lapd-primary rounded-lg hover:bg-gray-200 transition-colors text-left flex items-center">
              <Users className="mr-2" /> Üyeler
            </Link>
          </div>
        </div>
      </aside>
      
      {/* Sağ taraf - İçerik */}  
      <main className="flex-1 p-4">
        <div className="bg-white p-6 rounded-lg shadow-md m-2">
          <div className="flex justify-between items-center border-b-2 border-gray-200 pb-4">
            <h2 className="text-2xl font-semibold text-gray-700">Logs</h2>
          </div>
          <div className="overflow-auto max-h-60 mt-2">
            <p className="text-sm font-semibold text-gray-700">Sistem logları buraya gelecek...</p>
          </div>
        </div>
      </main>
    </div>
  );
}
