import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShortVideo {
  id: string;
  title: string;
}

const SHORTS: ShortVideo[] = [
  { id: 'z18YX4x1Lw8', title: 'Student Success Story 1' },
  { id: 'Jof92fozWuk', title: 'Student Success Story 2' },
  { id: 'wn7i39rNblw', title: 'Student Success Story 3' },
];

export const StudentSuccessShorts: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SHORTS.length);
    }, 8000); // Change video every 8 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full aspect-[4/5] mx-auto overflow-hidden rounded-3xl shadow-2xl bg-[#1a1a1a]">
      {/* Shimmer Effect Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" 
             style={{ backgroundSize: '200% 100%' }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={SHORTS[currentIndex].id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="h-full w-full overflow-hidden relative z-10"
        >
          {/* Aggressive scaling and offset to hide all YouTube UI elements */}
          <iframe
            src={`https://www.youtube.com/embed/${SHORTS[currentIndex].id}?autoplay=1&mute=1&loop=1&playlist=${SHORTS[currentIndex].id}&controls=1&modestbranding=1&rel=0&iv_load_policy=3&showinfo=0&fs=0`}
            title={SHORTS[currentIndex].title}
            className="w-[150%] h-[150%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-none"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </motion.div>
      </AnimatePresence>
      
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default StudentSuccessShorts;
