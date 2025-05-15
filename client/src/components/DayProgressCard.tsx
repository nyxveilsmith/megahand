import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";

// Animation helper function for creating confetti effect
const runConfettiAnimation = () => {
  const duration = 3000;
  const animationEnd = Date.now() + duration;
  const colors = ["#0057a6", "#ffd700", "#ff69b4", "#00ff00", "#ff4500"];

  // Create multiple confetti bursts
  const createConfettiBurst = () => {
    const timeLeft = animationEnd - Date.now();
    const ticks = Math.max(200, 500 * (timeLeft / duration));
    
    confetti({
      particleCount: 2,
      startVelocity: 30,
      spread: 360,
      ticks: ticks,
      zIndex: 1000,
      colors: colors,
      origin: {
        x: Math.random(),
        y: Math.random() - 0.2
      }
    });
    
    if (timeLeft > 0) {
      requestAnimationFrame(createConfettiBurst);
    }
  };

  createConfettiBurst();
};

// Progress circle component
const ProgressCircle = ({ percentage }: { percentage: number }) => {
  const circumference = 2 * Math.PI * 45; // Radius of 45 units
  const strokeDashoffset = circumference * (1 - percentage / 100);

  return (
    <div className="relative flex items-center justify-center w-48 h-48">
      {/* Background circle */}
      <svg className="absolute w-full h-full" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#e6e6e6"
          strokeWidth="5"
        />
      </svg>
      
      {/* Progress circle */}
      <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#0057a6"
          strokeWidth="5"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      
      {/* Percentage text */}
      <div className="text-4xl font-bold text-gray-800">
        {Math.round(percentage)}%
      </div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-44 h-44 rounded-full border-2 border-dashed border-blue-300 animate-spin-slow opacity-30"></div>
      </div>
    </div>
  );
};

// Main component
const DayProgressCard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  
  useEffect(() => {
    // Calculate the percentage of the day that has passed
    const calculateDayPercentage = () => {
      const now = new Date();
      const startOfDay = new Date(now);
      startOfDay.setHours(0, 0, 0, 0);
      
      const endOfDay = new Date(now);
      endOfDay.setHours(23, 59, 59, 999);
      
      const totalDayMs = endOfDay.getTime() - startOfDay.getTime();
      const elapsedMs = now.getTime() - startOfDay.getTime();
      
      return (elapsedMs / totalDayMs) * 100;
    };
    
    // Animate the progress from 0 to the actual value
    const dayPercentage = calculateDayPercentage();
    let currentProgress = 0;
    
    const progressInterval = setInterval(() => {
      currentProgress += 1;
      setProgress(currentProgress);
      
      // Start confetti when progress is around 25%, 50%, 75%
      if (currentProgress === 25 || currentProgress === 50 || currentProgress === 75) {
        setShowAnimation(true);
        runConfettiAnimation();
      }
      
      // Stop when we reach the actual percentage
      if (currentProgress >= dayPercentage) {
        setProgress(dayPercentage);
        clearInterval(progressInterval);
        
        // Final confetti burst
        setShowAnimation(true);
        runConfettiAnimation();
      }
    }, 30);
    
    return () => clearInterval(progressInterval);
  }, []);
  
  if (!isOpen) return null;
  
  // Get current date and format it
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('az-AZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-11/12 max-w-md p-6 mx-auto bg-white rounded-lg shadow-xl animate-fade-in">
        {/* Animation elements */}
        {showAnimation && (
          <>
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-yellow-300 rounded-full animate-ping-slow opacity-70"></div>
            <div className="absolute -bottom-2 -right-4 w-8 h-8 bg-blue-500 rounded-full animate-ping-slow opacity-70 animation-delay-300"></div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-ping-slow opacity-70 animation-delay-700"></div>
            <div className="absolute -bottom-4 -left-2 w-10 h-10 bg-pink-400 rounded-full animate-ping-slow opacity-70 animation-delay-500"></div>
          </>
        )}
        
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-bold text-gray-800">Günün İrəliləyişi</h2>
          <p className="mb-4 text-gray-600">{formattedDate}</p>
          
          <div className="flex flex-col items-center justify-center my-6">
            <ProgressCircle percentage={progress} />
            <p className="mt-4 mb-2 text-gray-700">
              Bugün {Math.round(progress)}% tamamlanıb
            </p>
          </div>
          
          <Button 
            onClick={() => setIsOpen(false)}
            className="px-6 py-3 mt-4 font-medium text-white bg-primary hover:bg-blue-700 transition-colors"
          >
            Davam Edin
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DayProgressCard;