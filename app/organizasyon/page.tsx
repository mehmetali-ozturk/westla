export default function Organizasyon() {
  return (
    
     
        <div className=" w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-lapd-primary text-center">Organizasyon</h1>
          
          {/* Patrol Division Section */}
          <section className="space-y-4 flex flex-col md:flex-row items-center md:items-start">
            <div className="md:w-1/2 w-full">
              <img
                src="/patrol.jpg"
                alt="Patrol Division"
                className=""
              />
            </div>
            <div className="md:w-1/2 w-full md:pl-8">
              <h2 className="text-2xl font-semibold text-lapd-primary">Patrol Division</h2>
              <p className="text-gray-700">
                Patrol Division, şehrin sokaklarında devriye gezerek suçları önler ve müdahale eder. Memurlar, halkın güvenliğini sağlamak için sürekli olarak devriye gezer ve acil durumlara hızlı bir şekilde yanıt verir.
              </p>
            </div>
          </section>

          {/* Detective Bureau Section */}
          <section className="space-y-4 flex flex-col md:flex-row-reverse items-center md:items-start">
            <div className="md:w-1/2 w-full">
              <img
                src="/detective.jpg"
                alt="Detective Bureau"
                className=""
              />
            </div>
            <div className="md:w-1/2 w-full md:pr-8">
              <h2 className="text-2xl font-semibold text-lapd-primary">Detective Bureau</h2>
              <p className="text-gray-700">
                Detective Bureau, suçları araştırır ve çözümler. Dedektifler, karmaşık suçları çözmek için delil toplar, tanıklarla görüşür ve suçluları adalete teslim eder.
              </p>
            </div>
          </section>

          {/* Traffic Division Section */}
          <section className="space-y-4 flex flex-col md:flex-row items-center md:items-start">
            <div className="md:w-1/2 w-full">
              <img
                src="/traffic.jpg"
                alt="Traffic Division"
                className=""
              />
            </div>
            <div className="md:w-1/2 w-full md:pl-8">
              <h2 className="text-2xl font-semibold text-lapd-primary">Traffic Division</h2>
              <p className="text-gray-700">
                Traffic Division, trafik düzenini sağlar ve trafik kazalarını araştırır. Trafik memurları, trafik akışını düzenler ve sürücülerin güvenliğini sağlamak için çalışır.
              </p>
            </div>
          </section>

          {/* SWAT Section */}
          <section className="space-y-4 flex flex-col md:flex-row-reverse items-center md:items-start">
            <div className="md:w-1/2 w-full">
              <img
                src="/swat.jpg"
                alt="SWAT"
                className=""
              />
            </div>
            <div className="md:w-1/2 w-full md:pr-8">
              <h2 className="text-2xl font-semibold text-lapd-primary">Special Weapons and Tactics (SWAT)</h2>
              <p className="text-gray-700">
                SWAT, yüksek riskli operasyonları yürütür. SWAT ekibi, rehine kurtarma, terörle mücadele ve diğer tehlikeli görevlerde uzmanlaşmıştır.
              </p>
            </div>
          </section>

          {/* Community Relations Section */}
          <section className="space-y-4 flex flex-col md:flex-row items-center md:items-start">
            <div className="md:w-1/2 w-full">
              <img
                src="/community.jpg"
                alt="Community Relations"
                className=""
              />
            </div>
            <div className="md:w-1/2 w-full md:pl-8">
              <h2 className="text-2xl font-semibold text-lapd-primary">Community Relations</h2>
              <p className="text-gray-700">
                Community Relations, toplumla ilişkileri güçlendirir ve işbirliği yapar. Bu departman, toplumla polis arasındaki güveni artırmak için çeşitli programlar ve etkinlikler düzenler.
              </p>
            </div>
          </section>

          {/* Contact Section */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-lapd-primary">İletişim</h2>
            <p className="text-gray-700">
              LAPD ile iletişime geçmek için aşağıdaki bilgileri kullanabilirsiniz:
            </p>
            <ul className="list-disc list-inside text-gray-700">
              <li>Telefon: (123) 456-7890</li>
              <li>Email: info@lapd.com</li>
              <li>Adres: 123 Main St, Los Angeles, CA</li>
            </ul>
          </section>
        </div>

    
  );
}