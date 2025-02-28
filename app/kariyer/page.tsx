export default function Kariyer() {
  return (
    <div className="w-full bg-gray-50">
      {/* Main Heading Section */}
      <div className="py-4 max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-800 m-3">KARİYER BASAMAKLARI</h2>
          <div className="text-xl mb-2 text-gray-600">
          Los Angeles Polis Departmanı'nda iki tür ilerleme vardır
          </div>
        </div>

        {/* Two Types of Advancement Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
                1
              </div>
              <h3 className="text-xl font-bold text-blue-600">Terfi</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
            Terfi, bir sivil hizmet sınıfından diğerine yükselmeyi ifade eder; örneğin, Police Officer rütbesinden Detective veya Sergeant rütbesine geçiş gibi. Terfi her zaman, Personnel Department tarafından yapılan bir Civil Service sınavı sonucunda oluşturulan uygunluk listesinden gerçekleştirilir.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
                2
              </div>
              <h3 className="text-xl font-bold text-blue-600">Daha Yüksek Ücret Derecesine Atanma</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
            Daha yüksek bir maaş derecesine atanma, sivil hizmet sınıfında bir değişiklik olmaksızın, daha fazla sorumluluk veya uzmanlık gerektiren bir pozisyona atanmayı ifade eder. Örneğin, Police Officer II pozisyonundan Police Officer III pozisyonuna veya Detective I pozisyonundan Detective II pozisyonuna geçiş gibi. Police Officer I pozisyonundan Police Officer II pozisyonuna geçiş, 18 aylık hizmet süresinin (Akademi eğitimi ve saha deneme süresinin) başarılı bir şekilde tamamlanmasıyla otomatik olarak gerçekleşir. Daha yüksek maaş derecelerine yapılan atamaların çoğu, Police Department bünyesindeki iç seçim prosedürleriyle belirlenir.
            </p>
          </div>
        </div>

        {/* Career Progression Detail Section */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-blue-600 mb-4">Polis Memuru'ndan Terfi</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
            Polis Memuru rütbesinden terfi, Police Detective veya Police Sergeant rütbelerine olabilir. Ayrıca, Detective ile Sergeant arasında da terfi mümkündür.
              <br /><br />
              Sergeant veya Detective rütbelerinden terfi, Police Lieutenant rütbesine yapılır; buradan itibaren sadece tek bir terfi basamağı bulunmaktadır. Terfi sıralaması şu şekildedir: Police Captain, Police Commander, Police Deputy Chief ve Chief of Police ve Assistant Chief pozisyonu ise, Deputy Chief sivil hizmet sınıfı içinde bir maaş derecesi yükseltmesidir.
            </p>

            <h3 className="text-2xl font-bold text-blue-600 mb-4">Sergeant'a Terfi</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
            Sergeant pozisyonu, bir saha denetim pozisyonudur; Sergeant terfisi için adayların bu pozisyona uygun yeterliliklerini kanıtlamaları gerekmektedir. Ayrıca, Sergeant rütbesi için idari ve uzmanlık gerektiren görevler de bulunmaktadır.
              <br /><br />
            Detective rütbesindeki memurlar, özel veya genel soruşturma takip işleri yürütürler. Bu sivil hizmet sınıfındaki görev örnekleri şunlardır: Personnel Background Investigator, Undercover Narcotics Investigator, Internal Affairs Investigator ve Traffic Accident Follow-up Investigator.
            </p>
          </div>

          <div className="relative h-full">
            <div className="rounded-lg overflow-hidden h-full">
              <img 
                src="/isealim0.png" 
                alt="Polis memurları ve helikopter" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Police Officer I Section - Full Page */}
        <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Heading */}
          <div className="mb-1">
            <h2 className="text-2xl font-bold mx-[105px] mb-2 text-[#075bb1] flex items-center">
              <img src="https://cdn.prod.website-files.com/63db1d04e804176dcb525fc5/6437bb2cc524923c6df41ba8_Police-Officer%27s-Badge-911.webp" alt="Badge" className="w-8 mr-3" />
              Police Officer I
            </h2>
            <p className="mx-[105px] text-[#012b6d]">
            Los Angeles Police Department'taki kariyer basamaklarının ilk adımı Police Officer I rütbesidir. Bu, Police Academy'ye katılan tüm LAPD memurlarına verilen giriş seviyesi sınıflandırmadır. Memurlar, Police Academy'de altı ay boyunca ceza hukuku, insan ilişkileri, İspanyolca ve rapor yazımı eğitimi alırlar. Ayrıca, taktik, silah kullanımı ve sürüş konularında eğitim görürler. Fiziksel kondisyon ve kendini savunma, akademi eğitiminde önemli bir yer tutar. Police Officer I, 18 aylık deneme süresini başarıyla tamamladığında Police Officer II rütbesine otomatik olarak terfi eder.</p>
          </div>
          <div className="border-t-2 border-blue-400 my-5 mx-[105px]"></div>
      {/* Police Officer II Section - Full Page */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Heading */}
          <div className="mb-1">
            <h2 className="text-2xl font-bold mx-[90px] mb-3 text-[#075bb1] flex items-center">
              <img src="https://cdn.prod.website-files.com/63db1d04e804176dcb525fc5/6437bb2cc524923c6df41ba8_Police-Officer%27s-Badge-911.webp" alt="Badge" className="w-8 mr-3" />
              Police Officer II
            </h2>
            <p className="mx-[90px] text-[#012b6d]">
            Police Academy'den mezun olduktan sonra, Police Officer I, Los Angeles şehri içinde belirlenen bir coğrafi devriye birimine atanır ve akademide öğrendiği tüm bilgi ve taktikleri sahada uygulamak zorundadır. Terfi basamağındaki bir sonraki adım olan Police Officer II, hâlâ deneme sürecinde olan bir memur olarak kabul edilir ve genellikle Police Officer III - Field Training Officer gözetiminde görev yapar.              <br /><br />
            Bir devriye birimine atanan deneme sürecindeki Police Officer II, suç veya kaza mahalline müdahale etmek, şüpheliler ve tanıklarla görüşmeler yapmak, suç raporları yazmak, telsiz çağrılarına yanıt vermek, şüpheli faaliyetleri ve devam eden suçları izlemek, trafik akışını düzenlemek, bankalar, marketler, mağazalar ve akaryakıt istasyonları gibi açık işletmeleri ziyaret ederek iş yeri sahipleriyle güven ilişkisi kurmak, şüphelileri ve delilleri tutanak altına almak ve ilgili Police Department birimine sevk etmek, vatandaşların ve ziyaretçilerin sorularını yanıtlamak, günlük Field Activity Report hazırlamak, Neighborhood Watch toplantılarına katılmak ve organizasyonunu sağlamak ve toplum odaklı polislik kapsamında birçok farklı görevi yerine getirmekle sorumludur.              </p>
          </div>
              {/* Working Titles Section */}
              <div className="mx-[90px] text-lg font-semibold text-[#075bb1] mb-3 mt-3">Farklı çalışma başlıklarına örnekler:</div>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-700 leading-relaxed mx-[90px]">
                  <strong>Academy Instructor<br />
                    Accident Investigator<br />
                    Assistant Training Coordinator<br />
                    Beach Patrol Officer<br />
                    Bike Officer<br />
                    Community Relations Officer<br />
                    Court Liaison Officer<br />
                    Crime Analysis Detail Unit Officer<br />
                    Desk Officer<br />
                    Detective Trainee<br />
                    Driver-Security Aide to Chief of Police and Mayor<br />
                    Footbeat Officer<br />
                    Helicopter Observer<br />
                    Helicopter Pilot (Fixed Wing Aircraft)<br />
                    Honor Guard<br />
                    Jeopardy Officer</strong>
                  </p>
                </div>
                <div>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Kit-room Officer<br />
                    Legislative Officer<br />
                    Medical Liaison Evidence Officer<br />
                    News Media Coordinator<br />
                    Patrol Officer<br />
                    Preliminary Investigator<br />
                    Prostitution Enforcement Detail<br />
                    Public Affairs Officer<br />
                    Range Officer<br />
                    Recruitment Officer<br />
                    Senior Lead Officer<br />
                    Training Coordinator<br />
                    Two-Wheel Traffic Enforcement<br />
                    Unusual Occurrence Planning Officer<br />
                    Warrant Service<br />
                    Vice Investigator<br />
                    Youth Services Officer</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t-2 border-blue-400 my-5 mx-[105px]"></div>
      {/* Police Officer IıI Section - Full Page */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Heading */}
          <div className="mb-1">
            <h2 className="text-2xl font-bold mx-[90px] mb-3 text-[#075bb1] flex items-center">
              <img src="/PoliceOfficer3.webp" alt="Badge" className="w-8 mr-3" />
              POLICE OFFICER III
            </h2>
            <p className="mx-[90px] text-[#012b6d]">
            Police Officer III olarak, Police Academy'den mezun olduktan sonra, Los Angeles şehri içindeki bir coğrafi devriye birimine atanırsınız ve burada, eğitim sırasında öğrenilen bilgi ve taktikleri uygulamanın yanı sıra, daha az deneyime sahip memurlara rehberlik etmeniz beklenir. Bu rolünüzde, özellikle Police Officer I ve Police Officer II gibi deneme sürecindeki memurlara, doğru prosedürleri takip etmeleri ve becerilerini geliştirmeleri konusunda yardımcı olursunuz.
                <br /><br />
                Bir Police Officer III, devriye biriminde daha ileri düzey görevler üstlenir. Bu görevler şunları içerebilir: suç veya kaza mahallerini yönetmek, şüpheliler ve tanıklarla görüşmeler yapmak, detaylı suç raporları yazmak, telsiz çağrılarına yanıt vermek, devam eden suç faaliyetlerini izlemek, araç trafiğini düzenlemek ve kamu güvenliği sorunlarını yönetmek. Ayrıca, açık işletmelerle güven ilişkileri kurmak, şüphelileri ve delilleri tutanak altına almak, vatandaşların ve ziyaretçilerin sorularını yanıtlamak ve Neighborhood Watch toplantılarını koordine etmek gibi topluluk polisliği faaliyetlerinde de önemli bir rol oynarsınız.              <br />
                </p>
          </div>
              {/* Working Titles Section */}
              <div className="mx-[90px] text-lg font-semibold text-[#075bb1] mb-3 mt-3">Farklı çalışma başlıklarına örnekler:</div>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-700 leading-relaxed mx-[90px]">
                 <strong>Academy Instructor<br />
                  Accident Investigator<br />
                  Assistant Training Coordinator<br />
                  Beach Patrol Officer<br />
                  Bike Officer<br />
                  Community Relations Officer<br />
                  Court Liaison Officer<br />
                  Crime Analysis Detail Unit Officer<br />
                  Desk Officer<br />
                  Detective Trainee<br />
                  Driver-Security Aide to Chief of Police and Mayor<br />
                  Footbeat Officer<br />
                  Helicopter Observer<br />
                  Helicopter Pilot (Fixed Wing Aircraft)<br />
                  Honor Guard<br />
                  Jeopardy Officer<br />
                  Medical Liaison Evidence Officer<br /></strong>

                  </p>
                </div>
                <div>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>News Media Coordinator<br />
                    Patrol Officer<br />
                    Preliminary Investigator<br />
                    Prostitution Enforcement Detail<br />
                    Public Affairs Officer<br />
                    Range Officer<br />
                    Recruitment Officer<br />
                    Senior Lead Officer<br />
                    Training Coordinator<br />
                    Kit-room Officer<br />
                    Legislative Officer<br />
                    Two-Wheel Traffic Enforcement<br />
                    Unusual Occurrence Planning Officer<br />
                    Warrant Service<br />
                    Vice Investigator<br />
                    Youth Services Officer</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t-2 border-blue-400 my-5 mx-[105px]"></div>
      {/* Police Officer SLO Section - Full Page */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Heading */}
          <div className="mb-1">
            <h2 className="text-2xl font-bold mx-[90px] mb-3 text-[#075bb1] flex items-center">
              <img src="/slo.webp" alt="Badge" className="w-8 mr-3" />
              Senior Lead Officer
            </h2>
            <p className="mx-[90px] text-[#012b6d]">
            Bir polis memuru, Officer III rütbesinde 2 yıl tecrübe kazandıktan sonra Officer III+1 rütbesine yükselmeye hak kazanır. Officer III+1 rütbesindeki bir personel, istasyon bölgelerindeki mahallelere atanır ve o mahalledeki denetim görevini üstlenir. Atandığı bölgedeki halkın sorunlarını dinler, halk için bilgilendirme ve şikayet toplantıları düzenler, bölgede karşılaştığı potansiyel suçları raporlar ve gördüğü sorunları ilgili birimlere bildirir. Bölge dedektifleriyle işbirliği yaparak, gözlemlediği suç eğilimleri ve trendlerle ilgili dedektiflere bilgi verir. Officer III+1 rütbesindeki personel, Officer III rütbesindeki personelin görevlerine ek olarak Senior Lead Officer ve Assistant Team Leader of Specialized Section Team gibi ek görevleri de alabilir.  <br />
              </p>
          </div>
              {/* Working Titles Section */}
              <div className="mx-[90px] text-lg font-semibold text-[#075bb1] mb-3 mt-3">Farklı çalışma başlıklarına örnekler:</div>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-700 leading-relaxed mx-[90px]">
                  <strong>Senior Lead Officer<br />
                    Assistant Training Coordinator<br /></strong>
                  </p>
                </div>
                <div>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Assistant Team Leader of Specialized Section Team<br /></strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t-2 border-blue-400 my-5 mx-[105px]"></div>
      {/* Police Det I Section - Full Page */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Heading */}
          <div className="mb-1">
            <h2 className="text-2xl font-bold mx-[90px] mb-3 text-[#075bb1] flex items-center">
              <img src="/Detective1.webp" alt="Badge" className="w-8 mr-3" />
              Detective I
            </h2>
            <p className="mx-[90px] text-[#012b6d]">
            Polis Memuru III sınıflandırmasından, rekabetçi bir Dedektif sınavını ve görüşmesini başarıyla tamamladıktan sonra Dedektif I pozisyonuna terfi etmeyi de seçebilirsiniz. Dedektif I genellikle özel bir bölüme atanır ve suç mahalline müdahale etmekten, ön ve takip soruşturmalarını yürütmekten, gerekli soruşturma raporlarını hazırlamaktan, raporun biyopsisini hazırlamaktan, şüpheliyi yakalamaktan, davayı hazırlamaktan sorumludur. Başarılı kovuşturma ve mahkemede ifade verme.              <br /><br />
            Dedektifler, çeşitli suçları veya faaliyetleri soruşturan bir birimin veya birimin faaliyetlerini denetleyebilir ve/veya koordine edebilir. Bu sınıftaki görevlere örnek olarak gizli narkotik müfettişleri, içişleri müfettişleri ve trafik kazası takip müfettişleri verilebilir. Bazen bir Dedektif, Los Angeles şehrinde işlenen suçlarla bağlantılı olarak aranan şüphelileri iade etmek için ülkenin diğer bölgelerine veya yurt dışına seyahat eder. Bu sıfatla bir Dedektif, uluslararası kolluk kuvvetleriyle irtibatı sürdürür.
              </p>
          </div>
              {/* Working Titles Section */}
              <div className="mx-[90px] text-lg font-semibold text-[#075bb1] mb-3 mt-3">Farklı çalışma başlıklarına örnekler:</div>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-700 leading-relaxed mx-[90px]">
                  <strong>Follow-up Crime Investigator<br />
                  Court Liaison<br /></strong>
                  </p>
                </div>
                <div>
                <p className="text-gray-700 leading-relaxed">
                    <strong>Narcotics Officer<br /></strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t-2 border-blue-400 my-5 mx-[105px]"></div>
        {/* Detective II Section - Full Page */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Heading */}
          <div className="mb-1">
            <h2 className="text-2xl font-bold mx-[90px] mb-3 text-[#075bb1] flex items-center">
              <img src="/Detective2.webp" alt="Badge" className="w-8 mr-3" />
              Detective II
            </h2>
            <p className="mx-[90px] text-[#012b6d]">
            Dedektif II, Dedektif serisinin bir sonraki tanıtım adımıdır. Denetleyici bir pozisyondur ve Dedektifler I ile Polis Memurlarının eğitiminden ve faaliyetlerinin denetlenmesinden sorumludur. Dedektif II'nin gerçekleştirdiği uzmanlık görevlerinden bazıları şunlardır: narkotik soruşturmalarını yürütmek, gözetimi gerçekleştirmek ve muhbirlerle iletişim kurmak ve sürdürmek; çeteyle ilgili suçları araştırmak; cinayet, hırsızlık, soygun, araba hırsızlığı, yasa dışı seksle ilgili faaliyetler gibi suç mahalline müdahale etmek ve bunları araştırmak; ve çocuklar tarafından işlenen suçlar. Ek olarak, Dedektif II mahkemede irtibat işlevlerini yerine getirebilir              <br /><br />
            Nöbet Komutanı olarak hareket etmek; gözetleme ve yalan makinesi muayenelerini yürütmek için elektronik ekipman uzmanlığı sağlamak; İş yapmak için Polis Komisyonu iznine başvuran başvuru sahiplerini ve işletmeleri soruşturmak; çocuk istismarı vakalarını araştırmak; mahkemede bilirkişi ifadesi sağlamak; ve yabancı kökenli çetelerin işlediği suçlara ilişkin soruşturmalar yürütmek.
            </p>
          </div>
              {/* Working Titles Section */}
              <div className="mx-[90px] text-lg font-semibold text-[#075bb1] mb-3 mt-3">Farklı çalışma başlıklarına örnekler:</div>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-700 leading-relaxed mx-[90px]">
                  <strong>Auditor<br />
                  Commission Investigator<br />
                  Detective Supervisor<br />
                  Drug Testing Supervisor<br />
                  <br /></strong>
                  </p>
                </div>
                <div>
                <p className="text-gray-700 leading-relaxed">
                    <strong>Electronic Surveillance Officer<br />
                    Field Specialized Detective<br />
                    Gang Coordinator Supervisor<br /></strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t-2 border-blue-400 my-5 mx-[105px]"></div>
        {/* Detective III Section - Full Page */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Heading */}
          <div className="mb-1">
            <h2 className="text-2xl font-bold mx-[90px] mb-3 text-[#075bb1] flex items-center">
              <img src="/Detective3.webp" alt="Badge" className="w-8 mr-3" />
              Detective III
            </h2>
            <p className="mx-[90px] text-[#012b6d]">
            Dedektif III, Dedektif I ve II'nin görevlerine ek olarak yüksek profilli büyük soygun, dolandırıcılık ve cinayet vakalarında lider olarak hizmet vermekten sorumludur. Dedektif III, astları tarafından hazırlanan raporları inceler, bekleyen soruşturmaların durumu hakkında komutana bilgi verir, teknik uzmanlık sağlar, yeni atanan Dedektifleri ve sivil personeli eğitir ve denetler ve ilgili idari görevleri yerine getirir.              <br />
              </p>
          </div>
              {/* Working Titles Section */}
              <div className="mx-[90px] text-lg font-semibold text-[#075bb1] mb-3 mt-3">Farklı çalışma başlıklarına örnekler:</div>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-700 leading-relaxed mx-[90px]">
                  <strong>Detective Supervisor<br />
                  Judicial Liaison Officer<br />
                  <br /></strong>
                  </p>
                </div>
                <div>
                <p className="text-gray-700 leading-relaxed">
                    <strong>Narcotics Detective<br />
                    Polygraph Unit<br />
                    <br /></strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t-2 border-blue-400 my-5 mx-[105px]"></div>
        {/* Sergeant Section - Full Page */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Heading */}
          <div className="mb-1">
            <h2 className="text-2xl font-bold mx-[90px] mb-3 text-[#075bb1] flex items-center">
              <img src="/Sergeant1.webp" alt="Badge" className="w-8 mr-3" />
              Sergeant I
            </h2>
            <p className="mx-[90px] text-[#012b6d]">
              Sergeant I üniformalı ve sivil memurları barındıran bir ekip veya detail'ın denetmeni olarak görev alır.  Sergeant I yönettiği ekip veya detail'daki memurlara verilen görevleri yerine getirmeleri konusunda talimat verir. Sergeant I in temel görevi saha denetmenliğidir ama idari ve özel görevlendirmelerdede çalışabilir. Bazı Çavuşlar suçların ilk ve takip soruşturmasını gerçekleştirir ve suçu tespit etmek veya önlemek için gözlem çalışmaları yapar.              </p>
          </div>
              {/* Working Titles Section */}
              <div className="mx-[90px] text-lg font-semibold text-[#075bb1] mb-3 mt-3">Farklı çalışma başlıklarına örnekler:</div>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-700 leading-relaxed mx-[90px]">
                  <strong>Community Relations Officer<br />
                    Court Liaison Supervisor<br />
                    Discrimination Complaint Investigator<br />
                    Division Complaint Sergeant<br />
                    Drug Testing Supervisor<br />
                    Field Supervisor<br />
                    Fleet Coordinator<br />
                    Helicopter Supervisor<br />
                    <br /></strong>
                  </p>
                </div>
                <div>
                <p className="text-gray-700 leading-relaxed">
                    <strong>Mayors Security Aide<br />
                    Jail Supervisor<br />
                    Mounted Unit Officer<br />
                    Patrol Field Supervisor <br />
                    Staff Researcher<br />
                    Two-Wheel Motor Supervisor<br />
                    <br /></strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t-2 border-blue-400 my-5 mx-[105px]"></div>
        {/* Sergeant II Section - Full Page */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Heading */}
          <div className="mb-1">
            <h2 className="text-2xl font-bold mx-[90px] mb-3 text-[#075bb1] flex items-center">
              <img src="/Sergeant2.webp" alt="Badge" className="w-8 mr-3" />
              Sergeant II
            </h2>
            <p className="mx-[90px] text-[#012b6d]">
            Sergeant I den Sergeant II ye geçiş sadece bir maaş zam görüşmesi gerektirir. Çavuş II pozisyonu, uzmanlaşmış ve idari görevleri olan denetleyici bir pozisyondur. Çavuş II, bir grup Polis Memurunu ve/veya sivil çalışanı denetler ve onlara verilen görevlerin yerine getirilmesi konusunda talimat verir <br />
              </p>
          </div>
              {/* Working Titles Section */}
              <div className="mx-[90px] text-lg font-semibold text-[#075bb1] mb-3 mt-3">Farklı çalışma başlıklarına örnekler:</div>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-700 leading-relaxed mx-[90px]">
                  <strong>Assistant Patrol Watch Commander<br />
                  Community Relations Sergeant<br />
                  Complaint Investigator<br />
                  Field Supervisor Crime Task Force<br />
                  Geographic Vice Supervisor<br />
                  <br /></strong>
                  </p>
                </div>
                <div>
                <p className="text-gray-700 leading-relaxed">
                    <strong>Labor Relations<br />
                    Recruitment Supervisor<br />
                    Training Coordinator<br />
                    Officer In Charge of Specialized Unit<br />
                    <br /></strong>
                    </p>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t-2 border-blue-400 my-5 mx-[105px]"></div>
      {/* Lieutenant Section - Full Page */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Heading */}
          <div className="mb-1">
            <h2 className="text-2xl font-bold mx-[90px] mb-3 text-[#075bb1] flex items-center">
              <img src="/Lts.png" alt="Badge" className="w-8 mr-3" />
              Lieutenant I
            </h2>
            <p className="mx-[90px] text-[#012b6d]">
            Bir polis memuru 2 yıl çavuş veya detective olarak hizmet verdikten sonra zorlu bir sınav ve mülakat sürecini başarıyla tamamlar ise teğmen olmaya hak kazanır. Bir polis bölümünde veya bir soruşturma biriminde veya detail' a atanmış bir ekibin operasyonunda görev alan hem yeminli hem de sivil çalışanların çalışmalarını yönetir, planlar, organize eder ve yönlendirir              <br /><br />
            Etkili bir iş gücü oluşturmak ve sürdürmek için sağlam denetim ilkelerini ve tekniklerini uygulaması gereken uzmanlaşmış bir divizyon veya bölümden sorumludurlar.
            </p>
          </div>
              {/* Working Titles Section */}
              <div className="mx-[90px] text-lg font-semibold text-[#075bb1] mb-3 mt-3">Farklı çalışma başlıklarına örnekler:</div>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-700 leading-relaxed mx-[90px]">
                  <strong>Division Watch Commander<br />
                  Officer-in-Charge Of a Specialized Section<br />
                  </strong>
                  </p>
                </div>
                <div>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Officer-in-Charge Of a Specialized Division
                    </strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
     </div>
  </div>
  );
}