import { useEffect } from "react";
import { useParams, Link } from "wouter";
import { useArticle } from "@/hooks/useArticles";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ChevronLeft } from "lucide-react";

const InterestingDetail = () => {
  const { id } = useParams();
  const articleId = id ? parseInt(id) : null;
  const { article, isLoading, isError } = useArticle(articleId);
  
  // Format date
  const formattedDate = article?.date 
    ? format(new Date(article.date), "MMMM dd, yyyy") 
    : "No date";

  // Handle scroll to top when article changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [articleId]);

  if (isLoading) {
    return (
      <div className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-8"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="w-full h-72 bg-gray-200 rounded-lg mb-8"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !article) {
    return (
      <div className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
        <p className="text-gray-600 mb-8">
          The article you're looking for doesn't exist or has been removed.
        </p>
        <Link href="/interesting">
          <Button>
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Articles
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <article className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <Link href="/interesting">
        <Button variant="outline" className="mb-8">
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Articles
        </Button>
      </Link>
      
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>
      <time className="text-gray-500 block mb-8">{formattedDate}</time>
      
      {article.imageUrl && (
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="w-full h-auto rounded-lg shadow-md mb-8 max-h-[500px] object-cover object-center"
        />
      )}
      
      <div className="prose max-w-none">
        {/* Display the summary as a bold introduction */}
        <p className="font-medium text-lg mb-6">{article.summary}</p>
        
        {/* Split the content by new lines and create paragraphs */}
        {article.content.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-6 text-gray-700 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
      
      <div className="mt-12 pt-8 border-t border-gray-200">
        <Link href="/interesting">
          <Button variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Articles
          </Button>
        </Link>
      </div>
    </article>
  );
};

export default InterestingDetail;
