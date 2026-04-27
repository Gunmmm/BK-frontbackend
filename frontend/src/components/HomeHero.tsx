import React, { Suspense, useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial, PerspectiveCamera } from "@react-three/drei";
import { ArrowRight, Play, Users, BookOpen, Award, CheckCircle2 } from "lucide-react";
import StudentSuccessShorts from "./StudentSuccessShorts";
import ExamAnimation3D from "./ExamAnimation3D";


interface HomeHeroProps {
  setView: (view: string) => void;
  onRegistration: () => void;
}

// 3D Animated Object Component - Light Version
const AnimatedShape = () => {
  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <Sphere args={[1, 100, 100]} scale={1.4}>
        <MeshDistortMaterial
          color="#4F9CF9"
          attach="material"
          distort={0.4}
          speed={1.5}
          roughness={0.4}
          metalness={0.1}
        />
      </Sphere>
    </Float>
  );
};

// CountUp Component
const CountUp = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString() + suffix);

  useEffect(() => {
    const controls = animate(count, value, { duration: 2, ease: "easeOut" });
    return controls.stop;
  }, [value]);

  return <motion.span>{rounded}</motion.span>;
};

export const HomeHero: React.FC<HomeHeroProps> = ({ setView, onRegistration }) => {
  return (
    <section className="relative min-h-0 w-full flex items-start justify-center bg-gradient-to-br from-white via-[#F8FAFC] to-[#EEF2FF] pt-8 md:pt-12 pb-0">
      {/* Soft Background Blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          animate={{ 
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-[#4F9CF9]/5 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            x: [0, -50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-[#FDE047]/5 rounded-full blur-[120px]" 
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-[#FDBA74]/3 rounded-full blur-[150px]" />
      </div>
      
      {/* Sanskrit Shloka at the top center */}
      <div className="absolute top-2 md:top-4 left-0 w-full flex justify-center z-20">
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-[10px] md:text-sm tracking-[0.2em] md:tracking-widest font-bold text-center px-4"
        >
          | नहि ज्ञानेन सदृशं पवित्रमिह विद्यते |
        </motion.p>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center relative z-10 pt-6 md:pt-20 pb-12">
        
        {/* Left Side: Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-start lg:items-start text-left lg:text-left space-y-4 md:border-none border-2 border-brand/20 bg-white/40 backdrop-blur-md p-8 rounded-[2.5rem] shadow-xl md:p-0 md:bg-transparent md:backdrop-blur-none md:shadow-none md:rounded-none"
        >
          <div className="space-y-2 w-full flex flex-col items-start lg:items-start">
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/40 backdrop-blur-md border border-white/50 text-blue-600 font-bold text-xs mb-4 md:mb-8 shadow-sm tracking-widest uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Since 2009
            </div>
            <div className="w-full md:pl-0 lg:pl-20 pt-4 flex justify-start lg:justify-start">
              <ExamAnimation3D />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-8 md:pt-16 w-full justify-start lg:justify-start">
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 20px 40px -10px rgba(79, 156, 249, 0.5)",
                y: -5
              }}
              whileTap={{ scale: 0.95 }}
              onClick={onRegistration}
              className="px-8 md:px-14 py-4 bg-gradient-to-r from-[#4F9CF9] to-[#FDE047] text-white font-black rounded-full text-sm flex items-center justify-center gap-3 group shadow-xl transition-all whitespace-nowrap w-full sm:w-auto"
            >
              Get Started for Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                y: -5 
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open("https://youtube.com/@bkcareeracademy2025?si=_npQzmvWFI65nHG9", "_blank")}
              className="px-8 md:px-14 py-4 bg-white/20 backdrop-blur-md border border-white/30 text-gray-700 font-bold rounded-full text-sm flex items-center justify-center gap-3 shadow-lg whitespace-nowrap w-full sm:w-auto"
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white shrink-0">
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </div>
              Watch Video Lectures
            </motion.button>
          </div>
        </motion.div>

        {/* Right Side: Student Success Column - Visible on all screens now */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative w-full flex items-center justify-center lg:justify-end pt-8 lg:pt-0 lg:-mt-10"
        >
          <div className="w-full max-w-[280px] md:max-w-[320px] relative z-10">
            {/* Smooth Background Glow for Video */}
            <div className="absolute inset-0 bg-blue-400/20 blur-[60px] md:blur-[80px] rounded-full -z-10 animate-pulse" />
            <div className="absolute -inset-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-[30px] md:rounded-[40px] -z-10 shadow-2xl" />
            
            <StudentSuccessShorts />
          </div>
        </motion.div>

      </div>

      {/* Floating Particles/Dots */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            delay: i * 3,
          }}
          className="absolute w-2 h-2 bg-[#4F9CF9]/20 rounded-full blur-[1px]"
          style={{
            left: `${10 + i * 20}%`,
            top: `${20 + i * 15}%`,
          }}
        />
      ))}
    </section>
  );
};

export default HomeHero;
