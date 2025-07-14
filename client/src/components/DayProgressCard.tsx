import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { X, ShoppingBag, Tag } from 'lucide-react';

// Discount amounts for different days - updated based on real Megahand discounts
const getDiscountForToday = (): number => {
  const day = new Date().getDay();
  // Updated discount system based on actual Megahand Azerbaijan schedule
  const discounts = [15, 10, 20, 15, 25, 30, 20]; // Sun, Mon, Tue, Wed, Thu, Fri, Sat
  return discounts[day];
};

// Confetti animation function
const triggerConfetti = () => {
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

  const randomInRange = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

  const interval: any = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    
    // Random colors
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: ['#0057a6', '#ffd700', '#ff4040', '#00cc66'],
    });
    
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: ['#0057a6', '#ffd700', '#ff4040', '#00cc66'],
    });
  }, 250);
};

const DayProgressCard = () => {
  const [discount, setDiscount] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(true);
  const [hasTriggeredConfetti, setHasTriggeredConfetti] = useState<boolean>(false);
  
  useEffect(() => {
    // Get today's discount
    const todayDiscount = getDiscountForToday();
    
    // Animate discount value from 0 to actual value
    let start = 0;
    const step = 1;
    const interval = setInterval(() => {
      start += step;
      setDiscount(start);
      
      // Trigger confetti when animation reaches actual discount value
      if (start >= todayDiscount && !hasTriggeredConfetti) {
        triggerConfetti();
        setHasTriggeredConfetti(true);
      }
      
      if (start >= todayDiscount) {
        clearInterval(interval);
      }
    }, 20);
    
    return () => clearInterval(interval);
  }, [hasTriggeredConfetti]);
  
  if (!visible) {
    return null;
  }

  // Get the current day name in Azerbaijani
  const getDayName = () => {
    const days = ["Bazar", "Bazar ertəsi", "Çərşənbə axşamı", "Çərşənbə", "Cümə axşamı", "Cümə", "Şənbə"];
    return days[new Date().getDay()];
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-10 right-10 z-50 bg-white rounded-lg shadow-2xl p-6 w-80"
    >
      <button 
        onClick={() => setVisible(false)} 
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
      >
        <X size={18} />
      </button>

      {/* Floating animated elements */}
      <div className="relative">
        <motion.div
          className="absolute -top-10 -left-8 w-8 h-8 bg-blue-400 rounded-full"
          animate={{
            y: [0, -10, 0],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute -top-4 -right-6 w-6 h-6 bg-yellow-400 rounded-full animation-delay-300"
          animate={{
            y: [0, -8, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3
          }}
        />
        
        <motion.div
          className="absolute -bottom-8 left-6 w-10 h-10 bg-green-400 rounded-full animation-delay-700"
          animate={{
            y: [0, -12, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.7
          }}
        />
        
        <motion.div
          className="absolute -bottom-2 right-4 w-5 h-5 bg-red-400 rounded-full animation-delay-500"
          animate={{
            y: [0, -6, 0],
            opacity: [0.4, 0.9, 0.4],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
      </div>
      
      {/* Discount badge */}
      <div className="absolute -top-5 -left-5 w-20 h-20 bg-red-500 rounded-full flex items-center justify-center transform rotate-[-15deg] shadow-lg">
        <div className="text-white font-bold text-center leading-tight">
          <div className="text-xs">ENDİRİM</div>
          <div className="text-xl">{discount}%</div>
        </div>
      </div>
      
      <div className="mt-4">
        <h3 className="text-xl font-bold text-center mb-2 text-gray-800">
          {getDayName()} Endirimi!
        </h3>
        
        <div className="flex justify-center mb-4 mt-6">
          <div className="relative w-32 h-32 flex flex-col items-center justify-center bg-yellow-50 rounded-full border-4 border-dashed border-yellow-500">
            <Tag className="text-red-500 mb-1" size={28} />
            <div className="text-4xl font-bold text-red-600">{discount}%</div>
            <div className="text-xs text-red-500 font-semibold">ENDİRİM</div>
          </div>
        </div>
        
        <div className="bg-blue-50 p-3 rounded-lg mb-4">
          <div className="text-center text-sm text-blue-800 font-medium">
            Bütün Megahand mağazalarında bugün {discount}% endirim! Təklifdən yararlanmaq üçün "MH{discount}" kodunu istifadə edin.
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4 justify-center">
          <ShoppingBag size={16} className="text-blue-500" />
          <span>Təklif məhdud zaman üçün keçərlidir</span>
        </div>
        
        <button
          onClick={() => setVisible(false)}
          className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-colors btn-hover"
        >
          İndi alış-veriş et
        </button>
      </div>
    </motion.div>
  );
};

export default DayProgressCard;