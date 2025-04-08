import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [location] = useLocation();
  const { isAuthenticated } = useContext(AuthContext);
  
  // Close mobile menu when changing routes
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [location]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.querySelector(".dropdown");
      if (dropdown && !dropdown.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-[#0057a6] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              {/* MegaHand.ru logo with blue and yellow colors */}
              <div className="flex items-center">
                <img src="/src/assets/Logo.jpg" alt="Megahand Logo" className="h-10" />
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className={`px-3 py-2 rounded-md text-sm font-medium ${location === '/' ? 'text-yellow-300 font-bold' : 'text-white hover:text-yellow-300'} transition-colors duration-200`}>
              Main
            </Link>
            <Link href="/about" className={`px-3 py-2 rounded-md text-sm font-medium ${location === '/about' ? 'text-yellow-300 font-bold' : 'text-white hover:text-yellow-300'} transition-colors duration-200`}>
              About
            </Link>
            
            {/* Dropdown Menu */}
            <div className="relative dropdown">
              <button 
                onClick={toggleDropdown}
                className="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-yellow-300 transition-colors duration-200 flex items-center"
              >
                More
                <svg 
                  className={`ml-1 w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="white" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg z-20">
                  <Link href="/interesting" className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#0057a6] hover:text-white">
                    Interesting
                  </Link>
                  <Link href="/locations" className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#0057a6] hover:text-white">
                    Locations
                  </Link>
                </div>
              )}
            </div>
            
            <Link href="/contact" className={`px-3 py-2 rounded-md text-sm font-medium ${location === '/contact' ? 'text-yellow-300 font-bold' : 'text-white hover:text-yellow-300'} transition-colors duration-200`}>
              Contact
            </Link>
            
            {isAuthenticated ? (
              <Link href="/admin/dashboard">
                <Button size="sm" variant="default" className="ml-4 btn-hover">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/admin">
                <Button size="sm" variant="default" className="ml-4 btn-hover">
                  Admin
                </Button>
              </Link>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-yellow-300 focus:outline-none"
              aria-expanded="false"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              ) : (
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-white shadow-md`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link href="/" className={`block px-3 py-2 rounded-md text-base font-medium ${location === '/' ? 'text-[#0057a6] font-bold' : 'text-gray-900 hover:text-[#0057a6] hover:bg-gray-100'}`}>
            Main
          </Link>
          <Link href="/about" className={`block px-3 py-2 rounded-md text-base font-medium ${location === '/about' ? 'text-[#0057a6] font-bold' : 'text-gray-900 hover:text-[#0057a6] hover:bg-gray-100'}`}>
            About
          </Link>
          <Link href="/interesting" className={`block px-3 py-2 rounded-md text-base font-medium ${location === '/interesting' ? 'text-[#0057a6] font-bold' : 'text-gray-900 hover:text-[#0057a6] hover:bg-gray-100'}`}>
            Interesting
          </Link>
          <Link href="/locations" className={`block px-3 py-2 rounded-md text-base font-medium ${location === '/locations' ? 'text-[#0057a6] font-bold' : 'text-gray-900 hover:text-[#0057a6] hover:bg-gray-100'}`}>
            Locations
          </Link>
          <Link href="/contact" className={`block px-3 py-2 rounded-md text-base font-medium ${location === '/contact' ? 'text-[#0057a6] font-bold' : 'text-gray-900 hover:text-[#0057a6] hover:bg-gray-100'}`}>
            Contact
          </Link>
          {isAuthenticated ? (
            <Link href="/admin/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-[#0057a6] hover:bg-[#004d93]">
              Dashboard
            </Link>
          ) : (
            <Link href="/admin" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-[#0057a6] hover:bg-[#004d93]">
              Admin
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
