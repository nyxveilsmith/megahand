import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLocations } from "@/hooks/useLocations";
import LocationCard from "@/components/LocationCard";
import { MapPin, Loader2 } from "lucide-react";

const Alternatives = () => {
  const { locations, isLoading } = useLocations();
  
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
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 slide-in">Alternatives</h1>
          <div className="w-20 h-1 bg-yellow-500 mx-auto mb-8 slide-in"></div>
          <p className="text-gray-600 max-w-3xl mx-auto slide-in">
            Explore alternative solutions and approaches to common challenges.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="col-span-1 md:col-span-2 mb-4">
            <h2 className="text-2xl font-bold text-primary mb-2">Our Store Locations</h2>
            <p className="text-gray-600 mb-6">
              Visit one of our convenient locations to shop our latest collections in person.
            </p>
          </div>
          
          {isLoading ? (
            <div className="col-span-1 md:col-span-2 flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : locations.length > 0 ? (
            locations.map((location) => (
              <div key={location.id} className="slide-in">
                <LocationCard 
                  location={{
                    ...location,
                    mapUrl: (
                      location.latitude && location.longitude 
                        ? `https://maps.google.com/?q=${location.latitude},${location.longitude}` 
                        : null
                    ),
                    phone: location.phoneNumber || null,
                    instagram: location.instagramAccount || null,
                    whatsapp: location.whatsappNumber || null
                  }} 
                />
              </div>
            ))
          ) : (
            <div className="col-span-1 md:col-span-2 bg-gray-50 p-8 rounded-lg shadow-md slide-in text-center">
              <MapPin className="h-12 w-12 mx-auto text-yellow-500 mb-4" />
              <h3 className="text-xl font-bold mb-3 text-gray-900">No Locations Found</h3>
              <p className="text-gray-600">
                We're expanding! Check back soon for our store locations.
              </p>
            </div>
          )}
        </div>
        
        <div className="bg-yellow-50 p-8 rounded-lg shadow-md slide-in">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">Why Consider Alternatives?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Increased Efficiency</h3>
              <p className="text-gray-600">
                Alternative solutions often provide more efficient ways to solve problems and accomplish tasks.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Reduced Risk</h3>
              <p className="text-gray-600">
                By exploring alternatives, you can diversify your options and reduce potential risks.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Better Outcomes</h3>
              <p className="text-gray-600">
                Finding the right alternative can lead to improved results and greater satisfaction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Alternatives;
