'use client';
import { Mail, User, X, Megaphone, PlusCircle, Images } from 'lucide-react';
import { useEffect, useState } from 'react';
import Loading from "../loading";
import Gallery from '@/components/Gallery';

interface Email {
  id: number;
  sender: string;
  subject: string;
  body: string;
  isRead: boolean;
}
interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
}

type ActiveView = 'inbox' | 'profile' | 'announcements' | 'memories';

export default function PersonnelDash() {
  const [activeView, setActiveView] = useState<ActiveView>('inbox');
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [emails, setEmails] = useState<Email[]>([]); // Boş bir diziyle başlat
  const [receiver, setReceiver] = useState('')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    { id: 1, title: "Departman Toplantısı", content: "Pazartesi saat 10:00'da bir departman toplantısı olacak.", date: "2025-02-23" },
    { id: 2, title: "Politika Güncellemesi", content: "Fazla mesai ile ilgili yeni politikalar uygulanmıştır.", date: "2025-02-22" },
  ]);
  
  const [userInfo, setUserInfo] = useState({
    fullname: '',
    rank: '',
    profile_photo: '',
    bureau: '',
    badge: '',
    email: ''
  });

  const [loading, setLoading] = useState(true);
  // const [newEmail, setNewEmail] = useState<{ receiver: string; subject: string; body: string; }>({ receiver: '', subject: '', body: '' });
  const [isComposing, setIsComposing] = useState(false);

  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email);
  };

  const sendNewEmail = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const res = await fetch('/api/user/emailService', {
      method: 'POST',
      body: JSON.stringify({ receiver, body, subject }),
    });

    const data = await res.json();

    if (data.error) {
      console.error('Error sending new email:', data.error);
    } else {
      setIsComposing(false);
    }
  };


  useEffect(() => {
    fetch('/api/user')
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.error('Error fetching user info:', data.error);
        } else {
          setUserInfo(data);
        }
      })
      .catch((error) => {
        console.error('Error fetching user info:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch('/api/user/emailService')
      .then((res) => res.json())
      .then((data) => {
        if (data.emails && Array.isArray(data.emails)) {
          setEmails(data.emails);
        } else {
          console.error('Beklenen yapı bulunamadı, gelen veri:', data);
        }
      })
      .catch((error) => {
        console.error('Veriler alınırken bir hata oluştu:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  

  if (loading) {
    return <Loading />;
  }
  const renderInbox = () => (
    
    <div className="bg-white p-6 rounded-lg shadow-md m-2 flex-1 overflow-auto">
      <div className="flex justify-between items-center border-b-2 border-gray-200 pb-4">
        <h2 className="text-2xl font-semibold text-gray-700">Gelen Kutusu</h2>
        <button onClick={() => setIsComposing(true)} className="text-blue-600 flex items-center">
          <PlusCircle size={20} className="mr-2" /> Yeni Mail
        </button>
      </div>
      <div className="overflow-y-auto flex-1 mt-2 space-y-2">
        {emails.map((email) => (
          <div 
            key={email.id} 
            className={`cursor-pointer p-3 rounded-lg shadow-md hover:bg-gray-200 
              ${email.sender === 'IA' ? 'bg-yellow-300' : email.isRead ? 'bg-gray-100' : 'bg-blue-100'}`}
            onClick={() => handleEmailClick(email)}
          >
            <div className="flex items-center">
              <img 
                src="/personnel/maloç.jpg" 
                alt="" 
                className="rounded-full w-8 h-8 mr-2"
              />
              <div>
                <p className="text-sm font-semibold text-gray-700">{email.sender}</p>
                <p className="text-sm text-gray-600">{email.subject}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isComposing && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-3/4 relative">
            <button onClick={() => setIsComposing(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors">
              <X size={24} />
            </button>
            <h3 className="text-xl font-semibold text-gray-700 pr-8">Yeni Mail Gönder</h3>
            <form>
            <hr className="my-4" />
            <input 
              type="text" 
              placeholder="Kime" 
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}  
              className="w-full p-2 border rounded-md mb-2 text-black" 
            />
            <input 
              type="text" 
              placeholder="Konu" 
              value={subject}
              onChange={(e) => setSubject(e.target.value)}  
              className="w-full p-2 border rounded-md mb-2 text-black" 
            />
            <textarea 
              placeholder="Mesajınız" 
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full p-2 border rounded-md mb-2 text-black"
            ></textarea>
            <button type='submit' onClick={sendNewEmail} className="bg-blue-600 text-white px-4 py-2 rounded-lg">Gönder</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );

  const renderAnnouncements = () => (
    <div className="bg-white p-6 rounded-lg shadow-md m-2 flex-1">
      <h2 className="text-2xl font-semibold text-gray-700">Duyurular</h2>
      <div className="mt-4 space-y-4">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="p-4 border-b border-gray-300">
            <h3 className="text-lg font-semibold text-gray-800">{announcement.title}</h3>
            <p className="text-sm text-gray-600">{announcement.date}</p>
            <p className="mt-2 text-gray-700">{announcement.content}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="bg-white p-6 rounded-lg shadow-md m-2 flex-1">
      <div className="flex justify-between items-center border-b-2 border-gray-200 pb-4">
        <h2 className="text-2xl font-semibold text-gray-700">Profil</h2>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-700">Kişisel Bilgiler</h3>
        <div className="mt-4 text-gray-500 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-900">Tam İsim</p>
            <p className="text-base">{userInfo.fullname}</p>
          </div>
          <div>
            <p className="text-sm text-gray-900">Rütbe</p>
            <p className="text-base">{userInfo.rank}</p>
          </div>
          <div>
            <p className="text-sm text-gray-900">Rozet Numarası</p>
            <p className="text-base">{userInfo.badge}</p>
          </div>
          <div>
            <p className="text-sm text-gray-900">Division</p>
            <p className="text-base">{userInfo.bureau}</p>
          </div>
          <div>
            <p className="text-sm text-gray-900">Email</p>
            <p className="text-base">{userInfo.email}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMemories = () => (
    <Gallery />
  );

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="flex h-fit bg-gray-100">
      <aside className="w-[25%] bg-white p-4 shadow-md flex flex-col text-black">
        <div className="rounded-md p-5">
          <div className="flex flex-col items-center bg-lapd-accent-light/20 gap-4 p-6 rounded-lg w-full">
            <div className="w-32 h-32 bg-gray-300 rounded-full">
              <img src={userInfo.profile_photo} alt="" className="rounded-full"/>
            </div>
            <div className="text-center">
              <p className="text-2xl font-medium">{userInfo.fullname}</p>
              <p className="text-lg text-gray-500">{userInfo.rank}</p>
              <p className="text-lg text-gray-500">{userInfo.bureau}</p>
              <p className="text-lg text-gray-500">{userInfo.badge}</p>
            </div>
          </div>
          <div className="w-full my-5 h-[1px] bg-lapd-primary/50"></div>
          <div className="grid grid-rows-2 gap-3 transition-colors">
            <button
              onClick={() => setActiveView('inbox')}
              className={`p-5 rounded-lg hover:bg-gray-200 transition-colors text-left flex items-center
                ${activeView === 'inbox' ? 'bg-gray-200 text-blue-600' : 'text-lapd-primary'}`}
            >
              <Mail className="mr-2" /> 
              Gelen Kutusu {emails.filter(e => !e.isRead).length > 0 && 
                <span className="ml-2 bg-blue-500 text-white px-2 py-1 rounded-full text-sm">
                  {emails.filter(e => !e.isRead).length}
                </span>
              }
            </button>
            <button
              onClick={() => setActiveView('profile')}
              className={`p-5 rounded-lg hover:bg-gray-200 transition-colors text-left flex items-center
                ${activeView === 'profile' ? 'bg-gray-200 text-blue-600' : 'text-lapd-primary'}`}
            >
              <User className="mr-2" /> Profil
            </button>
            <button
              onClick={() => setActiveView('announcements')}
              className={`p-5 rounded-lg hover:bg-gray-200 transition-colors text-left flex items-center
                ${activeView === 'announcements' ? 'bg-gray-200 text-blue-600' : 'text-lapd-primary'}`}
              >
              <Megaphone className="mr-2" /> Duyurular
            </button>
            <button
              onClick={() => setActiveView('memories')}
              className={`p-5 rounded-lg hover:bg-gray-200 transition-colors text-left flex items-center
                ${activeView === 'memories' ? 'bg-gray-200 text-blue-600' : 'text-lapd-primary'}`}
              >
              <Images className="mr-2" /> Anılar
            </button>
            
          </div>
        </div>
      </aside>
      
      <main className="flex-1 p-4 overflow-hidden flex flex-col h-screen">
        {activeView === 'inbox' && renderInbox()}
        {activeView === 'profile' && renderProfile()}
        {activeView === 'announcements' && renderAnnouncements()}
        {activeView === 'memories' && renderMemories()}
        {selectedEmail && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-md w-3/4 relative">
              <button 
                onClick={() => setSelectedEmail(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={24} />
              </button>

              <h3 className="text-xl font-semibold text-gray-700 pr-8">{selectedEmail.subject}</h3>
              <hr className="my-4" />
              <p className="text-sm text-gray-600 mt-2">From: {selectedEmail.sender}</p>
              <p className="mt-4 text-gray-800">{selectedEmail.body}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}