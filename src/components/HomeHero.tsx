import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { ArrowRight, User, GraduationCap, ChevronLeft, ChevronRight } from "lucide-react";

interface HomeHeroProps {
  setView: (view: string) => void;
  setSelectedCategory: (category: any) => void;
  onRegistration: () => void;
  onAdmission: () => void;
}

const carouselImages = [
  "/home/banner1.png",
  "/home/banner2.png",
  "/home/banner3.png",
  "/home/banner4.png"
];

export const HomeHero: React.FC<HomeHeroProps> = ({ setView, setSelectedCategory, onRegistration, onAdmission }) => {
  const heroRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4000); // Slightly slower for better experience
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={heroRef} className="relative h-[300px] md:h-[350px] lg:h-[400px] flex flex-col items-center justify-center px-6 pt-14 pb-10 text-center overflow-hidden bg-ink">
      {/* Carousel Background */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img 
              src={carouselImages[currentSlide]} 
              alt={`${['UPSC & MPSC Success', 'Banking & SSC Preparation', 'Police Bharti Training', 'Civil Services Strategy'][currentSlide]} - BK Career Academy Nashik Banner`} 
              className="w-full h-full object-contain"
            />
            {/* Subtle Overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-ink/20" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 sm:px-8 z-30 pointer-events-none">
        <button 
          onClick={prevSlide}
          className="w-12 h-12 border-4 border-white bg-brand text-ink flex items-center justify-center hover:bg-white transition-all shadow-[4px_4px_0_0_#FFFFFF] active:translate-x-1 active:translate-y-1 active:shadow-none pointer-events-auto group"
          aria-label="Previous slide"
        >
          <ChevronLeft size={32} className="group-hover:scale-110 transition-transform stroke-[3px]" />
        </button>
        <button 
          onClick={nextSlide}
          className="w-12 h-12 border-4 border-white bg-brand text-ink flex items-center justify-center hover:bg-white transition-all shadow-[4px_4px_0_0_#FFFFFF] active:translate-x-1 active:translate-y-1 active:shadow-none pointer-events-auto group"
          aria-label="Next slide"
        >
          <ChevronRight size={32} className="group-hover:scale-110 transition-transform stroke-[3px]" />
        </button>
      </div>

      <motion.div 
        style={{ y: y1, opacity }}
        className="max-w-7xl z-10 relative"
      >
        <div className="relative z-20 flex flex-col items-center justify-center">
           
           
          
          {/* <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-xl md:text-3xl text-white font-bold mb-16 max-w-3xl mx-auto uppercase tracking-tighter drop-shadow-lg"
          >
            You don't need daily motivation—you need daily <span className="text-white decoration-brand underline decoration-4 underline-offset-8">discipline</span>, because discipline builds your future
          </motion.p> */}

          {/* <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <motion.button    
              whileHover={{ 
                scale: 1.05, 
                rotate: -1,
                x: -4, 
                y: -4, 
                boxShadow: "10px 10px 0px 0px #FFFFFF" 
              }}
              whileTap={{ scale: 0.98, x: 0, y: 0, boxShadow: "0px 0px 0px 0px #FFFFFF" }}
              onClick={() => setView('courses')}
              className="bg-brand text-ink font-display font-black text-xs uppercase px-8 py-4 border-4 border-white shadow-[4px_4px_0_0_#FFFFFF] transition-colors flex flex-col items-center justify-center gap-2 group relative overflow-hidden min-w-[260px]"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <motion.div
                  animate={{ rotate: [0, 8, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <User size={32} className="relative z-10 stroke-[3px]" />
                </motion.div>
              </motion.div> */}
              {/* <span className="relative z-10 text-base tracking-widest font-black uppercase">Explore the Government exam</span>
              <motion.div 
                className="absolute inset-0 bg-white/30 -skew-x-12 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-1000"
              /> */}
            {/* </motion.button>
          </motion.div> */}
        </div>
      </motion.div>



      {/* Slide Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-20">
        {carouselImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 transition-all duration-500 border-2 border-white ${currentSlide === idx ? 'w-12 bg-brand border-brand' : 'w-4 bg-transparent hover:bg-white/30'}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-12 left-12 flex flex-col items-start gap-4 text-white font-black uppercase tracking-[0.2em] text-xs z-20"
      >
        <span>0{currentSlide + 1} / 0{carouselImages.length}</span>
        <div className="w-16 h-1 bg-brand relative overflow-hidden">
          <motion.div 
            key={currentSlide}
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 3, ease: "linear" }}
            className="absolute inset-0 bg-white"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HomeHero;
