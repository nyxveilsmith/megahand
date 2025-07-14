import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLocations } from "@/hooks/useLocations";
import LocationCard from "@/components/LocationCard";
import { MapPin, Loader2 } from "lucide-react";
import { Location } from "@shared/schema";

// Function to return the correct Google Maps URL for each location
const getMapUrl = (locationId: number): string | null => {
  switch (locationId) {
    case 1: // Megahand Sumqayit #1
      return "https://maps.app.goo.gl/U9ZFGMH8PySBTy5M7";
    case 2: // Megahand Bakı -Q.Qarayev-
      return "https://maps.app.goo.gl/tRPAKnDzA8z9yC1S9";
    case 3: // Megahand-Gəncə
      return "https://maps.app.goo.gl/V9WJAhCdnEtJAFa77";
    case 4: // Megahand Bakı-28May
      return "https://maps.app.goo.gl/Bu1jb2zSbBSYZRcD8";
    default:
      return null;
  }
};

const Locations = () => {
  const { locations, isLoading, error } = useLocations();
  
  // Debug
  console.log("Locations data:", locations);
  console.log("Loading state:", isLoading);
  console.log("Error:", error);
  
  // Initialize scroll animation observer
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
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 slide-in">Filiallar</h1>
          <div className="w-16 sm:w-20 h-1 bg-yellow-500 mx-auto mb-4 sm:mb-8 slide-in"></div>
          <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto slide-in">
            Sizə yaxın Megahand mağazalarını və əlaqə məlumatlarını tapın.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16">
          <div className="col-span-1 sm:col-span-2 mb-2 sm:mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-2">Mağaza Filiallarımız</h2>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              Ən son kolleksiyalarımızı canlı görmək üçün sizə ən yaxın filialımıza yaxınlaşın.
            </p>
          </div>
          
          {isLoading ? (
            <div className="col-span-1 sm:col-span-2 flex justify-center items-center py-8 sm:py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : locations.length > 0 ? (
            locations.map((location) => (
              <div key={location.id} className="slide-in visible">
                <LocationCard 
                  location={{
                    ...location,
                    mapUrl: getMapUrl(location.id),
                    phone: location.phoneNumber || null,
                    instagram: location.instagramAccount || null,
                    whatsapp: location.whatsappNumber || null
                  }} 
                />
              </div>
            ))
          ) : (
            <div className="col-span-1 sm:col-span-2 bg-gray-50 p-6 sm:p-8 rounded-lg shadow-md slide-in text-center">
              <MapPin className="h-10 sm:h-12 w-10 sm:w-12 mx-auto text-yellow-500 mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900">No Locations Found</h3>
              <p className="text-sm sm:text-base text-gray-600">
                We're expanding! Check back soon for our store locations.
              </p>
            </div>
          )}
        </div>
        
        <div className="bg-yellow-50 p-4 sm:p-6 md:p-8 rounded-lg shadow-md slide-in">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900 text-center">Niyə Filiallarımızı Ziyarət Etməlisiniz?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="bg-yellow-500 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white mx-auto mb-3 sm:mb-4">
                <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900">Şəxsi Xidmət</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Təcrübəli işçilərimizdən fərdi yardım və ekspert məsləhətləri alın.
              </p>
            </div>
            
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="bg-yellow-500 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white mx-auto mb-3 sm:mb-4">
                <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900">Məhsulları Canlı Görün</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Alış-verişdən əvvəl məhsullarımızı birbaşa təcrübə edin.
              </p>
            </div>
            
            <div className="text-center p-4 bg-white rounded-lg shadow-sm sm:col-span-2 md:col-span-1 sm:max-w-md sm:mx-auto md:max-w-full">
              <div className="bg-yellow-500 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white mx-auto mb-3 sm:mb-4">
                <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900">Dərhal Əldə Etmək</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Çatdırılma gözləmədən alış-verişinizi dərhal götürün.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Locations;