import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Landmark, Shield, BookOpen, Wallet, TrainFront } from 'lucide-react';

interface ExamItem {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  gradient: string;
  fontSize?: string;
}

const EXAMS: ExamItem[] = [
  { 
    id: 'upsc', 
    name: 'UPSC', 
    icon: Landmark, 
    color: '#0066FF', 
    gradient: 'from-black to-black' 
  },
  { 
    id: 'mpsc', 
    name: 'MPSC', 
    icon: Shield, 
    color: '#9900FF', 
    gradient: 'from-black to-black' 
  },
  { 
    id: 'tet', 
    name: 'MAHA-TET', 
    icon: BookOpen, 
    color: '#00C853', 
    gradient: 'from-black to-black',
    fontSize: 'text-4xl md:text-6xl lg:text-7xl' 
  },
  { 
    id: 'banking', 
    name: 'Banking', 
    icon: Wallet, 
    color: '#FFD600', 
    gradient: 'from-black to-black' 
  },
  { 
    id: 'railway', 
    name: 'Railway', 
    icon: TrainFront, 
    color: '#FF1744', 
    gradient: 'from-black to-black' 
  },
];

export const ExamAnimation3D: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % EXAMS.length);
    }, 6000); // ~1s animation + 5s stay
    return () => clearInterval(timer);
  }, []);

  const current = EXAMS[index];
  const Icon = current.icon;

  return (
    <div className="relative h-[80px] md:h-[120px] flex flex-col justify-start items-start overflow-visible perspective-1000">
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, x: -150, rotateY: -30, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
          exit={{ opacity: 0, x: 150, rotateY: 30, scale: 0.9 }}
          transition={{ 
            duration: 1.2, 
            ease: [0.22, 1, 0.36, 1] // Custom premium ease-in-out (cubic-bezier)
          }}
          whileHover={{ 
            rotateY: 10, 
            rotateX: -5,
            transition: { duration: 0.3 }
          }}
          className="flex flex-col items-start gap-6 cursor-default"
        >
          {/* Bold 3D Animated Text */}
          <div className="relative">
            <h2 
              className={`${current.fontSize || 'text-5xl md:text-7xl lg:text-8xl'} font-display font-black tracking-tighter drop-shadow-2xl whitespace-nowrap`}
              style={{
                color: current.color,
                textShadow: `
                  1px 1px 0px #d1d1d1,
                  2px 2px 0px #c1c1c1,
                  3px 3px 0px #b1b1b1,
                  4px 4px 0px #a1a1a1,
                  5px 5px 15px rgba(0,0,0,0.3)
                `
              }}
            >
              {current.name}
            </h2>
            
            {/* Loading Dots Animation */}
            <div className="flex gap-2 mt-4 ml-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3],
                    backgroundColor: [current.color, current.color, current.color]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: current.color }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Background Particles (Subtle) */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.2, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1,
            }}
            className="absolute w-2 h-2 rounded-full"
            style={{ 
              backgroundColor: current.color,
              left: `${10 + i * 20}%`,
              top: '80%',
              filter: 'blur(2px)'
            }}
          />
        ))}
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default ExamAnimation3D;
