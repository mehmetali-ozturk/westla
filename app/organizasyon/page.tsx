const sections = [
  {
    title: "Patrol Division",
    imgSrc: "/patrol.jpg",
    description: "Patrol Division, şehrin güvenliğini sağlamak için gece gündüz devriye gezerek suçları önler ve hızlı müdahalelerde bulunur. Memurlar, mahalleleri, iş bölgelerini ve ana yolları sürekli olarak kontrol ederek, vatandaşların kendilerini güvende hissetmesini sağlar. Acil durum çağrılarına anında yanıt verir, suç mahallerine ilk ulaşan ekip olarak olayları değerlendirir ve gerektiğinde diğer birimlerle koordineli çalışır. Ayrıca, toplumla iç içe çalışarak halkın polis teşkilatına olan güvenini artırmayı amaçlar.",
    description2: "Devriye ekiplerimiz 7/24 görev başında.",
    reverse: false,
  },
  {
    title: "Detective Bureau",
    imgSrc: "/detective.jpg",
    description: "Detective Bureau, suçları araştırarak faillerin adalete teslim edilmesini sağlar. Dedektifler, olay yerlerinden delil toplayarak adli incelemeler yapar, tanıklarla görüşerek olay örgüsünü çözer ve şüphelileri tespit eder. Cinayet, organize suç, dolandırıcılık ve uyuşturucu kaçakçılığı gibi geniş çaplı soruşturmalar yürütür. Suçluların yakalanması ve mahkum edilmesi için istihbarat ve teknolojiyi etkin bir şekilde kullanır. Bu süreçte diğer kolluk kuvvetleri ve adli birimlerle iş birliği yaparak, adaletin yerini bulmasını sağlar.",
    description2: "Her ipucu önemli, hiçbir suç cezasız kalmaz.",
    reverse: true,
  },
  {
    title: "Traffic Division",
    imgSrc: "/traffic.jpg",
    description: "Batı Trafik Bürosu olarak hizmetimiz vatandaşlarımızın trafikte yaşamış olduğu olaylarla alakalı olup, bunlara çözüm üretme üzerinedir. Trafik konusunda eğitilen personeller tarafından 7/24 vatandaşlarımıza yardım etmekteyiz. Düzenli olarak yaptığımız çevirmelerle, vatandaşlarımızın daha güvenli araç kullanmalarına olanak sağlıyoruz. Bunun yanı sıra şehrimizde trafiğe uygun olmayan araçlar ve hatalı sürücüler hakkında işlemler yaparak şehrimizin daha yaşanabilir olmasını sağlıyoruz.",
    description2: "Batı Trafik Bürosu her zaman hizmetinizde.",
    reverse: false,
  },
  {
    title: "Metropolitan Division",
    imgSrc: "/swat.jpg",
    description: "Metropolitan Bölümü, yaygın olarak Metro Bölümü veya sadece Metro olarak anılır, Los Angeles Polis Departmanı'nın (LAPD) Özel Operasyonlar Grubu'na bağlı seçkin bir bölümüdür. Metropolitan Bölümü, LAPD'nin 'platoons' olarak adlandırılan özel suç bastırma, K-9, atlı ve SWAT birimlerini yönetmekten sorumludur. Metropolitan Bölümü, büyük suçları çözme, arama emri hizmeti, ileri gelen koruma, gözetleme, terörle mücadele, isyan kontrolü ve yüksek riskli çıkmazları çözme dahil olmak üzere çok sayıda görevden sorumludur.",
    description2: "Zor görevler, cesur ekipler gerektirir.",
    reverse: true,
  },
 /*{
    title: "Community Relations",
    imgSrc: "/community.jpg",
    description: "Community Relations, polis ile halk arasındaki bağı güçlendirmek için çeşitli projeler ve etkinlikler düzenler. Okullarda bilinçlendirme seminerleri, suç önleme programları ve toplum güvenliği çalışmaları yürütülerek halkın katılımı teşvik edilir. Bu birim, polis teşkilatına duyulan güveni artırmayı, suç oranlarını düşürmeyi ve toplumda huzuru sağlamayı hedefler. Halkın sorunlarını dinleyerek çözüm üretir ve polis ile toplum arasında bir köprü görevi görür. Tüm çalışmalar, güvenli ve dayanışma içinde bir şehir yaratmak için gerçekleştirilir.",
    description2: "Toplumla el ele, güvenli bir gelecek için.",
    reverse: false,
  },*/
];



export default function Organizasyon() {
  return (
    <div className="w-full bg-white ">
      <div className="py-8 bg-lapd-accent/30">
      <h1 className="text-4xl font-bold text-black text-center m-3">Organizasyon</h1>
      <p className="text-black text-center ">Şehrimizin güvenliği için farklı görevlerde uzmanlaşmış birimlerimizle hizmet veriyoruz. Her birim, topluma daha güvenli ve huzurlu bir ortam sağlamak için özel eğitim almış personellerden oluşur. Aşağıda, organizasyonumuzun farklı bölümlerini keşfedebilirsiniz.</p>
      </div>
      {sections.map((section, index) => (
        <section key={index} className={`space-y-4 flex flex-col ${section.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center md:items-start my-0 md:my-0`}>
          <div className="md:w-1/2 w-full object-fill h-full">
            <img 
              src={section.imgSrc}
              alt={section.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:w-1/2 w-full md:px-8 md:mt-3">
            <h2 className="text-2xl font-semibold text-lapd-primary mt-20">{section.title}</h2>
            <p className="text-gray-700 my-2 ">{section.description}</p>
            <p className="text-gray-700 my-8">{section.description2}</p>
          </div>
        </section>
      ))}

      {/* Contact Section 
      <section className="space-y-4 mt-8 text-center">
        <h2 className="text-2xl font-semibold text-lapd-primary">İletişim</h2>
        <p className="text-gray-700">
          LAPD ile iletişime geçmek için aşağıdaki bilgileri kullanabilirsiniz:
        </p>
        <ul className="list-disc list-inside text-gray-700">
          <li>Telefon: (123) 456-7890</li>
          <li>Email: info@lapd.com</li>
          <li>Adres: 123 Main St, Los Angeles, CA</li>
        </ul>
      </section>*/}
    </div>
  );
}