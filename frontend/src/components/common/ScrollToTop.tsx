import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Smooth out the progress value
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Calculate the path length for the circular progress
  // Circumference = 2 * PI * R (R=22) -> ~138.2
  const pathLength = 138.2;
  const strokeDashoffset = useTransform(scaleX, [0, 1], [pathLength, 0]);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, x: -20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.5, x: -20 }}
          className="fixed bottom-10 left-6 z-[150] flex items-center justify-center"
        >
          {/* Circular Progress Container */}
          <div className="relative w-16 h-16 flex items-center justify-center">
            {/* SVG Progress Circle */}
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 50 50">
              {/* Background Circle */}
              <circle
                cx="25"
                cy="25"
                r="22"
                fill="white"
                stroke="rgba(26, 26, 26, 0.1)"
                strokeWidth="4"
                className="shadow-sm"
              />
              {/* Progress Circle */}
              <motion.circle
                cx="25"
                cy="25"
                r="22"
                fill="none"
                stroke="#F7931A" // Brand color
                strokeWidth="4"
                strokeLinecap="round"
                style={{
                  strokeDasharray: pathLength,
                  strokeDashoffset
                }}
              />
            </svg>

            {/* Clickable Image Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="relative z-10 w-12 h-12 rounded-full overflow-hidden border-2 border-ink bg-white shadow-xl flex items-center justify-center"
            >
              <img 
                src="/images/chatboot/flagg.gif" 
                alt="Scroll to top" 
                className="w-full h-full object-cover scale-150" 
              />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
