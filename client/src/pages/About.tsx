
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const About = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    
    const elements = document.querySelectorAll('.slide-in');
    elements.forEach(element => observer.observe(element));
    
    return () => {
      elements.forEach(element => observer.unobserve(element));
    };
  }, []);

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 slide-in">Megahand Haqqında</h1>
          <div className="w-16 sm:w-20 h-1 bg-primary mx-auto mb-4 sm:mb-8 slide-in"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center mb-8 sm:mb-12 md:mb-16">
          <div className="slide-in">
            <img 
              src="/src/assets/Mega-Hand-agac.jpg" 
              alt="Megahand Haqqında" 
              loading="lazy"
              width="800"
              height="600"
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
          
          <div className="slide-in">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900">Bizim Missiyamız</h2>
            <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 leading-relaxed">
              Megahand bütün ailə üçün yüksək keyfiyyətli Avropa geyimləri təmin etməyə həsr olunub. Biz müştərilərimizə ən yaxşı görünüşlərini qorumaq üçün münasib qiymətlərlə geniş çeşiddə dəbli məhsullar təklif edirik.
            </p>
            
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900">Bizim Baxışımız</h2>
            <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 leading-relaxed">
              Biz Azərbaycanda keyfiyyət, münasib qiymət və mükəmməl müştəri xidməti ilə tanınan aparıcı geyim pərakəndəçisinə çevrilməyi hədəfləyirik. Komandamız ən son Avropa dəb tendensiyalarını mağazalarımıza gətirmək üçün yorulmadan çalışır.
            </p>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 sm:p-6 md:p-8 rounded-lg shadow-md slide-in">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900 text-center">Bizim Dəyərlərimiz</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-full flex items-center justify-center text-white mb-3 sm:mb-4 mx-auto">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900 text-center">Keyfiyyət</h3>
              <p className="text-sm sm:text-base text-gray-600 text-center">
                Biz material və sənətkarlıq üçün ciddi standartlarımıza cavab verən yalnız ən yüksək keyfiyyətli Avropa geyimləri təqdim etməyə sadiqik.
              </p>
            </div>
            
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-full flex items-center justify-center text-white mb-3 sm:mb-4 mx-auto">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path>
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900 text-center">Şəffaflıq</h3>
              <p className="text-sm sm:text-base text-gray-600 text-center">
                Biz müştərilərimizlə məhsullarımız və əməliyyatlarımız haqqında dürüst və şəffaf olmağa inanırıq.
              </p>
            </div>
            
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm sm:col-span-2 md:col-span-1 sm:max-w-md sm:mx-auto md:max-w-full">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-full flex items-center justify-center text-white mb-3 sm:mb-4 mx-auto">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900 text-center">İnnovasiya</h3>
              <p className="text-sm sm:text-base text-gray-600 text-center">
                Biz daim müştəri təcrübəsini təkmilləşdirmək üçün innovativ yollar axtarırıq.
              </p>
            </div>
          </div>
        </div>
        
        {/* Video Section */}
        <div className="mt-8 sm:mt-12 md:mt-16 slide-in">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900 text-center">Megahand Videosu</h2>
          <div className="max-w-4xl mx-auto mb-4 sm:mb-8">
            <div className="aspect-video rounded-lg shadow-lg overflow-hidden">
              <iframe 
                src="https://www.youtube.com/embed/5CA5_iDZhCw" 
                title="Megahand Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
          <p className="text-sm sm:text-base text-gray-700 mb-6 sm:mb-8 max-w-3xl mx-auto text-center">
            Megahand mağazalarımız və təklif etdiyimiz məhsullar haqqında daha çox məlumat əldə etmək üçün videomuzu izləyin.
          </p>
        </div>

        <div className="mt-8 sm:mt-12 md:mt-16 text-center slide-in">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900">Bizim Komandamız</h2>
          <p className="text-sm sm:text-base text-gray-700 mb-6 sm:mb-8 max-w-3xl mx-auto">
            MegaHand.az müştərilərimizə ən yaxşı təcrübəni təqdim etməyə həvəsli peşəkar komanda tərəfindən idarə olunur.
          </p>
          
          <Link href="/contact">
            <Button className="px-4 sm:px-6 py-2 sm:py-3 bg-primary text-white rounded-lg font-medium btn-hover text-sm sm:text-base">
              Bizimlə Əlaqə Saxlayın
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
