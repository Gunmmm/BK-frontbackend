import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";

interface ExamCategoryCardProps {
  category: any;
  idx: number;
  isOpen: boolean;
  onToggle: () => void;
  onViewSyllabus: () => void;
  onRegister: () => void;
  isSelected?: boolean;
  onSelect?: () => void;
  onViewMPSC?: () => void;
  onViewPolice?: () => void;
  onViewMAHATET?: () => void;
}

export function ExamCategoryCard({ 
  category, 
  idx, 
  isOpen, 
  onToggle, 
  onViewSyllabus, 
  onRegister, 
  isSelected, 
  onSelect,
  onViewMPSC,
  onViewPolice,
  onViewMAHATET
}: ExamCategoryCardProps) {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.05 }}
      onClick={() => onToggle()}
      className={`group flex flex-col bg-white border-4 border-ink transition-all duration-500 relative cursor-pointer overflow-hidden ${isOpen ? 'shadow-[-16px_16px_0_0_#F7931A] z-20 -translate-y-2' : 'hover:shadow-[-8px_8px_0_0_#1A1A1A] hover:-translate-y-2'} ${isSelected ? 'ring-4 ring-brand ring-offset-4' : ''}`}
    >
      {isSelected && (
        <div className="absolute -top-3 left-4 bg-brand text-ink font-display font-black text-xs px-3 py-1 uppercase z-30 border-2 border-ink">
          Selected
        </div>
      )}
      <motion.div 
        layout="position"
        animate={{ height: isOpen ? 220 : 180 }} 
        className="relative w-full shrink-0 bg-ink overflow-hidden"
      >
        <img 
          src={category.thumb} 
          alt={`${category.title} Coaching`}
          className="absolute inset-0 w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-110 transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent opacity-80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)]" />
        
        <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end pointer-events-none">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl filter drop-shadow-[0_0_10px_rgba(255,193,7,0.5)] transition-all group-hover:scale-125 group-hover:rotate-6">{category.icon}</span>
            <div className="h-[2px] flex-grow bg-brand/50" />
          </div>
          <motion.h3 layout="position" className="text-xl md:text-2xl font-display font-black leading-tight text-white uppercase tracking-tighter drop-shadow-lg">
            {category.title}
          </motion.h3>
        </div>
      </motion.div>

      <div 
        className="absolute top-4 right-4 w-10 h-10 border-2 border-ink bg-brand flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-20 shadow-[4px_4px_0_0_#1A1A1A]"
      >
        <ChevronDown 
          size={20} 
          className={`transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-white/95 backdrop-blur-sm"
          >
            <div className="p-6 border-t-4 border-ink flex flex-col gap-6 bg-gradient-to-b from-white to-gray-50">
              <div className="space-y-6">
                <div>
                  {category.subcategories && category.subcategories.length > 0 ? (
                    category.subcategories.map((sub: any) => (
                      <div key={sub.name} className="mb-6 last:mb-0">
                        <div className="pill-accent mb-3">
                          {sub.name}
                        </div>
                        <ul className="space-y-2">
                          {sub.exams && sub.exams.map((exam: string) => (
                            <li 
                              key={exam} 
                              onClick={(e) => { 
                                e.stopPropagation(); 
                                if (category.id === 12 && onViewMPSC) {
                                  onViewMPSC();
                                } else if (exam === "Maharashtra State Police" && onViewPolice) {
                                  onViewPolice();
                                } else if (exam === "MAHA TET (Maharashtra)" && onViewMAHATET) {
                                  onViewMAHATET();
                                } else {
                                  onRegister();
                                }
                              }}
                              className="text-xs font-display font-black text-ink uppercase tracking-wider flex items-center gap-3 cursor-pointer hover:text-brand transition-colors"
                            >
                              <div className="w-2 h-2 bg-brand" />
                              <span>{exam}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))
                  ) : (
                    <div className="py-8 text-center">
                      <p className="text-xs font-mono uppercase text-muted">Strategic resources being initialized...</p>
                      <p className="text-[10px] font-mono uppercase text-brand mt-2 font-bold">Extraction in progress</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-4 border-t-2 border-ink/10">
                <button 
                  onClick={(e) => { e.stopPropagation(); onSelect && onSelect(); }}
                  className={`btn-brutalist w-full ${isSelected ? 'bg-brand' : ''}`}
                >
                  {isSelected ? 'Remove Selection' : 'Select Course'}
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); onViewSyllabus(); }}
                   className="btn-brutalist w-full"
                 >
                   Open Strategy Portal
                 </button>
                 <button 
                   onClick={(e) => { e.stopPropagation(); onToggle(); }}
                   className="bg-transparent text-ink font-display font-black uppercase tracking-widest py-3 text-xs hover:text-brand transition-colors"
                 >
                   Close Module
                 </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default ExamCategoryCard;
