
import { Link } from "wouter";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Article } from "@shared/schema";
import { format } from "date-fns";
import React from "react";

interface ArticleCardProps {
  article: Article;
}

const ArticleCard = React.memo(({ article }: ArticleCardProps) => {
  const formattedDate = article.date 
    ? format(new Date(article.date), "MMMM dd, yyyy") 
    : "No date";

  return (
    <Card className="card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl">
      <div className="h-48 overflow-hidden bg-gray-100">
        <img 
          src={article.imageUrl || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"} 
          alt={article.title} 
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            // If image fails to load, replace with a fallback
            e.currentTarget.src = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
          }}
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-900">{article.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{article.summary}</p>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0 flex justify-between items-center">
        <span className="text-sm text-gray-500">{formattedDate}</span>
        <Link href={`/interesting/${article.id}`}>
          <Button variant="link" className="text-primary font-medium hover:text-blue-700 transition-colors duration-200">
            Ətraflı
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
});

export default ArticleCard;
