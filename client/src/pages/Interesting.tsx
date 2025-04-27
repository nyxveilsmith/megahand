import { useEffect } from "react";
import { useArticles } from "@/hooks/useArticles";
import ArticleCard from "@/components/ArticleCard";
import { Button } from "@/components/ui/button";

const Interesting = () => {
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

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 slide-in">Maraqlı Məqalələr</h1>
          <div className="w-20 h-1 bg-primary mx-auto mb-8 slide-in"></div>
          <p className="text-gray-600 max-w-3xl mx-auto slide-in">
            Sizi məlumatlandıracaq və əyləndirəcək maraqlı məqalələr və xəbərlər kolleksiyamızı kəşf edin.
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
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
        ) : articles.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-gray-700 mb-4">Məqalə tapılmadı</h3>
            <p className="text-gray-500">
              Yeni və maraqlı məzmun üçün yenidən yoxlayın.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
        
        {articles.length > 0 && (
          <div className="text-center mt-12">
            <Button
              className="px-6 py-3 bg-primary text-white rounded-lg font-medium btn-hover"
              disabled
            >
              Load More Articles
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Interesting;