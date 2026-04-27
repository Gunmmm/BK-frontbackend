import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimationControls } from 'motion/react';
import StudentCard, { Student } from './StudentCard';

const DUMMY_STUDENTS: Student[] = [
  {
    id: 1,
    name: "Aditya Patil",
    exam: "UPSC 2023",
    achievement: "Selected as IAS Officer (AIR 42)",
    image: "https://i.pravatar.cc/150?u=aditya"
  },
  {
    id: 2,
    name: "Sneha Kulkarni",
    exam: "MPSC 2024",
    achievement: "Rank 1 in Deputy Collector",
    image: "https://i.pravatar.cc/150?u=sneha"
  },
  {
    id: 3,
    name: "Rahul Deshmukh",
    exam: "SSC CGL",
    achievement: "Excise Inspector (2024 Batch)",
    image: "https://i.pravatar.cc/150?u=rahul"
  },
  {
    id: 4,
    name: "Priya Shinde",
    exam: "PSI 2023",
    achievement: "Top Scorer in Physical Test",
    image: "https://i.pravatar.cc/150?u=priya"
  },
  {
    id: 5,
    name: "Vikram More",
    exam: "STI 2024",
    achievement: "State Tax Inspector Selected",
    image: "https://i.pravatar.cc/150?u=vikram"
  },
  {
    id: 6,
    name: "Anjali Joshi",
    exam: "TET",
    achievement: "Qualified with 92% Marks",
    image: "https://i.pravatar.cc/150?u=anjali"
  }
];

export const StudentVerticalScroll: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Duplicate students for infinite loop
  const duplicatedStudents = [...DUMMY_STUDENTS, ...DUMMY_STUDENTS];

  return (
    <div 
      className="relative h-[160px] w-full overflow-hidden flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top and Bottom Gradient Fade - Stronger for "one card" focus */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-[#0A0A0B] to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#0A0A0B] to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex flex-col w-full"
        animate={{
          y: isHovered ? undefined : ["0%", "-50%"]
        }}
        transition={{
          y: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20, // Slightly faster to keep it engaging with one card
            ease: "linear",
          },
        }}
      >
        {duplicatedStudents.map((student, index) => (
          <div 
            key={`${student.id}-${index}`} 
            className="h-[160px] w-full flex items-center justify-center px-4 shrink-0"
          >
            <StudentCard student={student} />
          </div>
        ))}
      </motion.div>
    </div>
  );
};


export default StudentVerticalScroll;
