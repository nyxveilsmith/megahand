import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "./context/AuthContext";
import { useScrollToTop } from "./hooks/useScrollToTop";
import { useState, useEffect } from "react";

import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Interesting from "@/pages/Interesting";
import InterestingDetail from "@/pages/InterestingDetail";
import Locations from "@/pages/Locations";
import Admin from "@/pages/Admin";
import AdminDashboard from "@/pages/AdminDashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DayProgressCard from "./components/DayProgressCard";

function Router() {
  // Scroll to top when route changes
  useScrollToTop();
  
  // Show the progress card popup on first load
  const [showProgressCard, setShowProgressCard] = useState(true);
  
  // Check if this is the first visit of the day
  useEffect(() => {
    const lastVisitDate = localStorage.getItem('lastVisitDate');
    const today = new Date().toLocaleDateString();
    
    if (lastVisitDate !== today) {
      setShowProgressCard(true);
      localStorage.setItem('lastVisitDate', today);
    } else {
      setShowProgressCard(false);
    }
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/interesting" component={Interesting} />
          <Route path="/interesting/:id" component={InterestingDetail} />
          <Route path="/locations" component={Locations} />
          <Route path="/contact" component={Contact} />
          <Route path="/admin" component={Admin} />
          <Route path="/admin/dashboard" component={AdminDashboard} />
          <Route component={NotFound} />
        </Switch>
        
        {/* Day Progress Card popup */}
        {showProgressCard && <DayProgressCard />}
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
