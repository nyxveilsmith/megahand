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
              Sizi məlumatlandıracaq və ilhamlandıracaq ən son məqalələrimiz ilə tanış olun.
            </p>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-md mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4 w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2 w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestArticles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link href="/interesting">
              <Button className="px-6 py-3 bg-primary text-white rounded-lg font-medium btn-hover">
                Bütün Məqalələr
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Locations Preview */}
      <section id="locations-preview" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 slide-in">Mağazalarımız</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-8 slide-in"></div>
            <p className="text-gray-600 max-w-3xl mx-auto slide-in">
              Bizi tapmaq asandır. Şəhərin müxtəlif yerlərində yerləşən mağazalarımıza baş çəkin.
            </p>
          </div>
          
          <div className="my-12">
            <Link href="/locations">
              <Button className="px-6 py-3 bg-primary text-white rounded-lg font-medium btn-hover mx-auto block">
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