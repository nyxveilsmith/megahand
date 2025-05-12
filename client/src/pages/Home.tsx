import { useEffect } from "react";
import MainCarousel from "@/components/MainCarousel";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import ArticleCard from "@/components/ArticleCard";
import { useArticles } from "@/hooks/useArticles";
import { useLocations } from "@/hooks/useLocations";
import LocationCard from "@/components/LocationCard";
import { DownloadButton } from "@/components/DownloadButton";
import { Loader2 } from "lucide-react";

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

const Home = () => {
  const { articles, isLoading } = useArticles();
  const { locations, isLoading: locationsLoading } = useLocations();
  
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
  
  // Filter to show only 3 latest articles for the homepage
  const latestArticles = articles.slice(0, 3);
  
  // Filter to show only 3 first locations for the homepage
  const previewLocations = locations.slice(0, 3);
  
  return (
    <>
      <MainCarousel />
      
      {/* About Section Preview */}
      <section id="about-preview" className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 slide-in">MegaHand Haqqında</h2>
            <div className="w-16 sm:w-20 h-1 bg-primary mx-auto mb-4 sm:mb-8 slide-in"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
            <div className="slide-in">
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
            
            <div className="slide-in">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900">Bizim Missiyamız</h3>
              <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                MegaHand.az müştərilərimiz üçün keyfiyyətli Avropa geyimləri təqdim etməyə həsr olunub. Biz sizin məlumatlı və ilhamlı olmağınız üçün ən cəlbedici məqalələr və xəbərləri təqdim edirik.
              </p>
              
              <Link href="/about">
                <Button className="px-4 sm:px-6 py-2 sm:py-3 bg-primary text-white rounded-lg font-medium btn-hover text-sm sm:text-base">
                  Haqqımızda Ətraflı
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Interesting Articles Preview */}
      <section id="articles-preview" className="py-8 sm:py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 slide-in">Maraqlı Məqalələr</h2>
            <div className="w-16 sm:w-20 h-1 bg-primary mx-auto mb-4 sm:mb-8 slide-in"></div>
            <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto slide-in">
              Sizi məlumatlandıracaq və ilhamlandıracaq ən son məqalələrimiz ilə tanış olun.
            </p>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-lg shadow-lg p-4 sm:p-6 animate-pulse">
                  <div className="h-36 sm:h-48 bg-gray-200 rounded-md mb-3 sm:mb-4"></div>
                  <div className="h-5 sm:h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
                  <div className="h-3 sm:h-4 bg-gray-200 rounded mb-3 sm:mb-4 w-1/2"></div>
                  <div className="h-3 sm:h-4 bg-gray-200 rounded mb-2 w-full"></div>
                  <div className="h-3 sm:h-4 bg-gray-200 rounded mb-2 w-5/6"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {latestArticles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
          
          <div className="text-center mt-6 sm:mt-10">
            <Link href="/interesting">
              <Button className="px-4 sm:px-6 py-2 sm:py-3 bg-primary text-white rounded-lg font-medium btn-hover text-sm sm:text-base">
                Bütün Məqalələr
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Locations Preview */}
      <section id="locations-preview" className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 slide-in">Mağazalarımız</h2>
            <div className="w-16 sm:w-20 h-1 bg-primary mx-auto mb-4 sm:mb-8 slide-in"></div>
            <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto slide-in">
              Bizi tapmaq asandır. Şəhərin müxtəlif yerlərində yerləşən mağazalarımıza baş çəkin.
            </p>
          </div>
          
          {locationsLoading ? (
            <div className="flex justify-center my-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {previewLocations.map((location) => (
                <div key={location.id} className="slide-in visible">
                  <LocationCard 
                    location={{
                      ...location,
                      mapUrl: getMapUrl(location.id),
                      phone: location.phoneNumber || null,
                      instagram: location.instagramAccount || null,
                      whatsapp: location.whatsappNumber || null,
                      zipCode: location.zipCode
                    }} 
                  />
                </div>
              ))}
            </div>
          )}
          
          <div className="text-center mt-6 sm:mt-10">
            <Link href="/locations">
              <Button className="px-4 sm:px-6 py-2 sm:py-3 bg-primary text-white rounded-lg font-medium btn-hover text-sm sm:text-base">
                Bütün Mağazalar
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;