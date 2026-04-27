import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

export const StudentSingleCardScroll: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % DUMMY_STUDENTS.length);
    }, 4000); // Change card every 4 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[550px] w-full flex items-center justify-center overflow-visible">
      <AnimatePresence>
        <motion.div
          key={DUMMY_STUDENTS[currentIndex].id}
          initial={{ opacity: 0, y: 200, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -200, scale: 0.9 }}
          transition={{ 
            duration: 1.5, 
            ease: [0.16, 1, 0.3, 1] 
          }}
          className="absolute w-full"
        >
          <StudentCard student={DUMMY_STUDENTS[currentIndex]} />
        </motion.div>
      </AnimatePresence>
      
      {/* Subtle Progress Dots */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
        {DUMMY_STUDENTS.map((_, idx) => (
          <div 
            key={idx}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${idx === currentIndex ? 'w-8 bg-[#4F9CF9]' : 'bg-gray-200'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default StudentSingleCardScroll;
