import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface CarouselSlide {
  title: string;
  description: string;
  backgroundImage: string;
  buttonText: string;
  buttonLink: string;
  buttonColor: string; // This will be a tailwind class
}

const MainCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const slides: CarouselSlide[] = [
    {
      title: "Welcome to MegaHand.az",
      description: "Your trusted source for the most interesting content",
      backgroundImage: "https://images.unsplash.com/photo-1484417894907-623942c8ee29?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
      buttonText: "Discover More",
      buttonLink: "/interesting",
      buttonColor: "bg-primary hover:bg-blue-600"
    },
    {
      title: "Explore Alternatives",
      description: "Discover new possibilities and solutions",
      backgroundImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
      buttonText: "Learn More",
      buttonLink: "/alternatives",
      buttonColor: "bg-green-500 hover:bg-green-600"
    },
    {
      title: "Connect With Us",
      description: "Stay updated with the latest news and trends",
      backgroundImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
      buttonText: "Contact Now",
      buttonLink: "/contact",
      buttonColor: "bg-amber-500 hover:bg-amber-600"
    }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [slides.length]);
  
  return (
    <section ref={carouselRef} className="carousel-container relative h-[60vh] min-h-[400px] bg-gray-900">
      {slides.map((slide, index) => (
        <div 
          key={index}
          className={`carousel-slide flex items-center justify-center text-white ${index === currentSlide ? 'active' : ''}`}
          style={{
            background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${slide.backgroundImage}') no-repeat center center/cover`
          }}
        >
          <div className="text-center px-6 animate-fadeIn">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{slide.title}</h2>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">{slide.description}</p>
            <Link href={slide.buttonLink}>
              <Button className={`mt-8 px-6 py-3 rounded-lg btn-hover ${slide.buttonColor}`}>
                {slide.buttonText}
              </Button>
            </Link>
          </div>
        </div>
      ))}
      
      {/* Carousel indicators */}
      <div className="carousel-indicators">
        {slides.map((_, index) => (
          <span 
            key={index}
            className={`carousel-indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default MainCarousel;
