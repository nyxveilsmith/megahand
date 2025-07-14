import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, Sun, Moon, X } from 'lucide-react';

const DayRhythmCard = () => {
  const [dayProgress, setDayProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(true);
  const [dayOfYear, setDayOfYear] = useState<number>(0);
  const [yearProgress, setYearProgress] = useState<number>(0);

  // Calculate day progress based on current time
  const calculateDayProgress = () => {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    
    const totalDayMs = endOfDay.getTime() - startOfDay.getTime();
    const elapsedMs = now.getTime() - startOfDay.getTime();
    
    return (elapsedMs / totalDayMs) * 100;
  };

  // Calculate day of year
  const calculateDayOfYear = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  // Calculate year progress
  const calculateYearProgress = () => {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const endOfYear = new Date(now.getFullYear() + 1, 0, 1);
    
    const totalYearMs = endOfYear.getTime() - startOfYear.getTime();
    const elapsedMs = now.getTime() - startOfYear.getTime();
    
    return (elapsedMs / totalYearMs) * 100;
  };

  // Format time in HH:MM:SS format
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('az-AZ', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  // Format date in Azerbaijani
  const formatDate = (date: Date) => {
    const days = ["Bazar", "Bazar ertəsi", "Çərşənbə axşamı", "Çərşənbə", "Cümə axşamı", "Cümə", "Şənbə"];
    const months = ["Yanvar", "Fevral", "Mart", "Aprel", "May", "İyun", "İyul", "Avqust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"];
    
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${dayName}, ${day} ${month} ${year}`;
  };

  // Get time-based icon
  const getTimeIcon = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 18) {
      return <Sun className="text-yellow-500" size={24} />;
    } else {
      return <Moon className="text-blue-400" size={24} />;
    }
  };

  // Get progress color based on time of day
  const getProgressColor = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) return 'from-yellow-400 to-orange-500'; // Morning
    if (hour >= 12 && hour < 18) return 'from-orange-500 to-red-500'; // Afternoon
    if (hour >= 18 && hour < 22) return 'from-purple-500 to-indigo-600'; // Evening
    return 'from-indigo-800 to-purple-900'; // Night
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setDayProgress(calculateDayProgress());
      setCurrentTime(formatTime(now));
      setCurrentDate(formatDate(now));
      setDayOfYear(calculateDayOfYear());
      setYearProgress(calculateYearProgress());
    };

    // Update immediately
    updateTime();

    // Update every second
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-10 left-10 z-50 bg-white rounded-lg shadow-2xl p-6 w-80"
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
          className="absolute -top-4 -right-6 w-6 h-6 bg-yellow-400 rounded-full"
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
      </div>
      
      {/* Time icon */}
      <div className="absolute -top-5 -left-5 w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
        {getTimeIcon()}
      </div>
      
      <div className="mt-4">
        <h3 className="text-xl font-bold text-center mb-2 text-gray-800">
          Gün Ritmi
        </h3>
        
        {/* Current Time */}
        <div className="flex items-center justify-center mb-4">
          <Clock className="text-blue-500 mr-2" size={20} />
          <span className="text-2xl font-mono font-bold text-gray-800">{currentTime}</span>
        </div>
        
        {/* Current Date */}
        <div className="flex items-center justify-center mb-4">
          <Calendar className="text-green-500 mr-2" size={16} />
          <span className="text-sm text-gray-600">{currentDate}</span>
        </div>
        
        {/* Day Progress */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Günün keçən hissəsi</span>
            <span className="text-sm font-bold text-gray-800">{dayProgress.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              className={`h-3 rounded-full bg-gradient-to-r ${getProgressColor()}`}
              style={{ width: `${dayProgress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
        
        {/* Year Progress */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">İlin keçən hissəsi</span>
            <span className="text-sm font-bold text-gray-800">{yearProgress.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="h-2 rounded-full bg-gradient-to-r from-green-400 to-blue-500"
              style={{ width: `${yearProgress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
        
        {/* Day of Year */}
        <div className="bg-gray-50 p-3 rounded-lg mb-4">
          <div className="text-center text-sm text-gray-700">
            <div className="font-medium">İlin <span className="text-blue-600 font-bold">{dayOfYear}</span>-ci günü</div>
            <div className="text-xs text-gray-500 mt-1">Ritm davam edir...</div>
          </div>
        </div>
        
        {/* Rhythm Pattern */}
        <div className="text-center">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  i === new Date().getDay() 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {['B', 'B', 'Ç', 'Ç', 'C', 'C', 'Ş'][i]}
              </div>
            ))}
          </div>
          <div className="text-xs text-gray-500">Həftənin ritmi</div>
        </div>
      </div>
    </motion.div>
  );
};

export default DayRhythmCard;