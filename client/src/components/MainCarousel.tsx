import { useState, useEffect, useRef, useCallback } from "react";
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
  const [isLoaded, setIsLoaded] = useState<boolean[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const slides: CarouselSlide[] = [
    {
      title: "Megahand-a Xoş Gəlmisiniz",
      description: "Keyfiyyətli Avropa geyim mənbəyiniz",
      backgroundImage: "/src/assets/reklam-vinil-Megahand-90.jpg",
      buttonText: "Daha Çox",
      buttonLink: "/interesting",
      buttonColor: "bg-primary hover:bg-blue-600"
    },
    {
      title: "Mağazalarımızı Kəşf Edin",
      description: "Sizə yaxın filialı tapın",
      backgroundImage: "/src/assets/Mega-Hand-agac.jpg",
      buttonText: "Filiallar",
      buttonLink: "/locations",
      buttonColor: "bg-yellow-500 hover:bg-yellow-600"
    },
    {
      title: "Bizimlə Əlaqə",
      description: "Ən son kolleksiyalar və promosyonlardan xəbərdar olun",
      backgroundImage: "/src/assets/Logo.jpg",
      buttonText: "Əlaqə",
      buttonLink: "/contact",
      buttonColor: "bg-amber-500 hover:bg-amber-600"
    }
  ];

  // Initialize loaded state array
  useEffect(() => {
    setIsLoaded(Array(slides.length).fill(false));
  }, [slides.length]);

  // Preload images
  useEffect(() => {
    const preloadImages = () => {
      slides.forEach((slide, index) => {
        const img = new Image();
        img.src = slide.backgroundImage;
        img.onload = () => {
          setIsLoaded(prev => {
            const newArray = [...prev];
            newArray[index] = true;
            return newArray;
          });
        };
      });
    };
    
    preloadImages();
  }, [slides]);

  // Handle automatic sliding
  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 4000);
  }, [slides.length]);

  // Start/restart autoplay when slide changes
  useEffect(() => {
    startAutoPlay();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentSlide, startAutoPlay]);
  
  // Manual slide change function
  const changeSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    // Reset timer when manually changing slides
    startAutoPlay();
  }, [startAutoPlay]);

  return (
    <section 
      ref={carouselRef} 
      className="carousel-container relative h-[50vh] sm:h-[60vh] min-h-[300px] bg-gray-900 overflow-hidden"
      aria-label="Image Carousel"
    >
      {slides.map((slide, index) => (
        <div 
          key={index}
          className={`carousel-slide absolute inset-0 flex items-center justify-center text-white transition-opacity duration-500 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          style={{
            background: isLoaded[index] 
              ? `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${slide.backgroundImage}') no-repeat center center/cover` 
              : 'linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8))',
            willChange: 'opacity',
          }}
          aria-hidden={index !== currentSlide}
        >
          <div className="text-center px-4 sm:px-6 animate-fadeIn max-w-[90%] sm:max-w-[80%] lg:max-w-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">{slide.title}</h2>
            <p className="text-base sm:text-lg md:text-xl mx-auto">{slide.description}</p>
            <Link href={slide.buttonLink}>
              <Button className={`mt-4 sm:mt-8 px-4 sm:px-6 py-2 sm:py-3 rounded-lg btn-hover text-base ${slide.buttonColor}`}>
                {slide.buttonText}
              </Button>
            </Link>
          </div>
        </div>
      ))}

      {/* Carousel indicators */}
      <div className="carousel-indicators absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
        {slides.map((_, index) => (
          <button 
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide 
                ? 'bg-white w-6' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            onClick={() => changeSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide}
          />
        ))}
      </div>
    </section>
  );
};

export default MainCarousel;