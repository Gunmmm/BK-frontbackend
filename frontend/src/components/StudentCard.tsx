import React from 'react';
import { motion } from 'framer-motion';
import { Award, GraduationCap, Trophy, Linkedin, Twitter, ExternalLink } from 'lucide-react';

export interface Student {
  id: number;
  name: string;
  exam: string;
  achievement: string;
  image: string;
}

interface StudentCardProps {
  student: Student;
}

export const StudentCard: React.FC<StudentCardProps> = ({ student }) => {
  return (
    <motion.div
      className="group relative flex flex-col bg-white/90 backdrop-blur-sm rounded-[2rem] h-full border border-gray-100 shadow-[0_15px_40px_rgba(79,156,249,0.08)] hover:shadow-[0_20px_50px_rgba(79,156,249,0.15)] transition-all duration-500 overflow-hidden w-full min-h-[460px] cursor-pointer"
    >
      {/* Soft Background Accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#4F9CF9]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Top Header - Soft pastel wave/split */}
      <div className="h-32 bg-[#4F9CF9]/5 w-full relative shrink-0">
         <div className="absolute inset-0 bg-gradient-to-b from-[#4F9CF9]/10 to-transparent" />
         <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 z-10 w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden transition-transform duration-500 group-hover:scale-105 bg-white">
            <img
              src={student.image}
              alt={student.name}
              className="w-full h-full object-cover"
            />
         </div>
      </div>

      <div className="p-8 pt-20 flex flex-col items-center text-center flex-grow relative z-10">
        <div className="mb-4">
          <span className="inline-block px-4 py-1.5 bg-[#4F9CF9]/10 text-[#4F9CF9] text-[10px] font-bold uppercase tracking-widest rounded-full border border-[#4F9CF9]/20">
            {student.exam}
          </span>
        </div>

        <h3 className="text-2xl font-display font-bold leading-tight mb-2 text-gray-800 tracking-tight group-hover:text-[#4F9CF9] transition-colors duration-300">
          {student.name}
        </h3>
        <div className="text-gray-400 font-medium text-[11px] uppercase tracking-wider mb-6">
          {student.achievement}
        </div>
        
        <p className="text-sm text-gray-500 font-body leading-relaxed mb-8 max-w-[240px]">
          Achieving excellence through dedicated preparation and strategic guidance at <span className="text-red-600">BK</span> Career Academy.
        </p>

        <div className="mt-auto flex gap-4 text-gray-300 group-hover:text-gray-400 transition-colors">
          <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center hover:bg-[#4F9CF9] hover:text-white transition-all duration-300 cursor-pointer border border-gray-100 shadow-sm active:scale-95">
             <Linkedin size={16} />
          </div>
          <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center hover:bg-[#4F9CF9] hover:text-white transition-all duration-300 cursor-pointer border border-gray-100 shadow-sm active:scale-95">
             <Twitter size={16} />
          </div>
          <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center hover:bg-[#4F9CF9] hover:text-white transition-all duration-300 cursor-pointer border border-gray-100 shadow-sm active:scale-95">
             <ExternalLink size={16} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StudentCard;
