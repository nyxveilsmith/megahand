import { useEffect } from "react";
import MainCarousel from "@/components/MainCarousel";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import ArticleCard from "@/components/ArticleCard";
import { useArticles } from "@/hooks/useArticles";
import { DownloadButton } from "@/components/DownloadButton";

const Home = () => {
  const { articles, isLoading } = useArticles();
  
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
  
  return (
    <>
      <MainCarousel />
      
      {/* About Section Preview */}
      <section id="about-preview" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 slide-in">MegaHand Haqqında</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-8 slide-in"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="slide-in">
              <img 
                src="https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="MegaHand.az Haqqında" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            
            <div className="slide-in">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Bizim Missiyamız</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                MegaHand.az müştərilərimiz üçün keyfiyyətli Avropa geyimləri təqdim etməyə həsr olunub. Biz sizin məlumatlı və ilhamlı olmağınız üçün ən cəlbedici məqalələr və xəbərləri təqdim edirik.
              </p>
              
              <Link href="/about">
                <Button className="px-6 py-3 bg-primary text-white rounded-lg font-medium btn-hover">
                  Haqqımızda Ətraflı
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Interesting Articles Preview */}
      <section id="articles-preview" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 slide-in">Maraqlı Məqalələr</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-8 slide-in"></div>
            <p className="text-gray-600 max-w-3xl mx-auto slide-in">
              Sizi məlumatlandıracaq və əyləndirəcək maraqlı məqalələr və xəbərlər kolleksiyamızı kəşf edin.
            </p>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg p-6 shadow-md animate-pulse h-96">
                  <div className="w-full h-48 bg-gray-200 rounded-md mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6 mb-2"></div>
                  <div className="flex justify-between mt-6">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestArticles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link href="/interesting">
              <Button className="px-6 py-3 bg-primary text-white rounded-lg font-medium btn-hover">
                Daha çox
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Locations Section */}
      <section id="locations-preview" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 slide-in">Filiallar</h2>
            <div className="w-20 h-1 bg-yellow-500 mx-auto mb-8 slide-in"></div>
            <p className="text-gray-600 max-w-3xl mx-auto slide-in">
              Sizə yaxın Megahand mağazalarını tapın və bu gün bizə müraciət edin.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Location 1 */}
            <div className="bg-gray-50 p-8 rounded-lg shadow-md slide-in">
              <div className="flex items-start">
                <div className="bg-yellow-500 p-3 rounded-full text-white mr-4 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Baku City Center</h3>
                  <p className="text-gray-600 mb-4">Tam kolleksiyamızla Bakının mərkəzində yerləşən flaqman mağazamıza baş çəkin.</p>
                  <Link href="/locations" className="text-blue-500 font-medium hover:text-blue-700 transition-colors duration-200 flex items-center">
                    Daha ətraflı
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Location 2 */}
            <div className="bg-gray-50 p-8 rounded-lg shadow-md slide-in">
              <div className="flex items-start">
                <div className="bg-yellow-500 p-3 rounded-full text-white mr-4 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Ganjlik Mall</h3>
                  <p className="text-gray-600 mb-4">Ən son kolleksiyalarımızı rahat ticarət mərkəzimizdə uzun saatlarla alış-veriş edin.</p>
                  <Link href="/locations" className="text-blue-500 font-medium hover:text-blue-700 transition-colors duration-200 flex items-center">
                    Daha ətraflı
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link href="/locations">
              <Button className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium btn-hover">
                Bütün Filiallar
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      
    </>
  );
};

export default Home;
