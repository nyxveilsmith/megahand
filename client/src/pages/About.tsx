
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
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 slide-in">Megahand Haqqında</h1>
          <div className="w-20 h-1 bg-primary mx-auto mb-8 slide-in"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div className="slide-in">
            <img 
              src="/src/assets/Mega-Hand-agac.jpg" 
              alt="Megahand Haqqında" 
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
          
          <div className="slide-in">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Bizim Missiyamız</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Megahand bütün ailə üçün yüksək keyfiyyətli Avropa geyimləri təmin etməyə həsr olunub. Biz müştərilərimizə ən yaxşı görünüşlərini qorumaq üçün münasib qiymətlərlə geniş çeşiddə dəbli məhsullar təklif edirik.
            </p>
            
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Bizim Baxışımız</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Biz Azərbaycanda keyfiyyət, münasib qiymət və mükəmməl müştəri xidməti ilə tanınan aparıcı geyim pərakəndəçisinə çevrilməyi hədəfləyirik. Komandamız ən son Avropa dəb tendensiyalarını mağazalarımıza gətirmək üçün yorulmadan çalışır.
            </p>
          </div>
        </div>
        
        <div className="bg-gray-50 p-8 rounded-lg shadow-md slide-in">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">Bizim Dəyərlərimiz</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white mb-4 mx-auto">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 text-center">Keyfiyyət</h3>
              <p className="text-gray-600 text-center">
                Biz material və sənətkarlıq üçün ciddi standartlarımıza cavab verən yalnız ən yüksək keyfiyyətli Avropa geyimləri təqdim etməyə sadiqik.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white mb-4 mx-auto">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 text-center">Şəffaflıq</h3>
              <p className="text-gray-600 text-center">
                Biz müştərilərimizlə məhsullarımız və əməliyyatlarımız haqqında dürüst və şəffaf olmağa inanırıq.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white mb-4 mx-auto">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 text-center">İnnovasiya</h3>
              <p className="text-gray-600 text-center">
                Biz daim müştəri təcrübəsini təkmilləşdirmək üçün innovativ yollar axtarırıq.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center slide-in">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Bizim Komandamız</h2>
          <p className="text-gray-700 mb-8 max-w-3xl mx-auto">
            MegaHand.az müştərilərimizə ən yaxşı təcrübəni təqdim etməyə həvəsli peşəkar komanda tərəfindən idarə olunur.
          </p>
          
          <Link href="/contact">
            <Button className="px-6 py-3 bg-primary text-white rounded-lg font-medium btn-hover">
              Bizimlə Əlaqə Saxlayın
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
