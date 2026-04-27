import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Globe, Search, Book } from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';

interface NavbarProps {
  view: string;
  setView: (view: any) => void;
  setSelectedCategory: (id: number | null) => void;
  setSelectedSyllabusId: (id: number | null) => void;
  setIsRegistrationModalOpen: (open: boolean) => void;
  setIsAdmissionModalOpen: (open: boolean) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  view,
  setView,
  setSelectedCategory,
  setSelectedSyllabusId,
  setIsRegistrationModalOpen,
  setIsAdmissionModalOpen,
  isMenuOpen,
  setIsMenuOpen
}) => {
  const [showAdminTrigger, setShowAdminTrigger] = useState(false);

  const tickerItems = [
    { text: "ब्रेकिंग: २०२६ बॅच प्रवेश सुरू झाले आहेत", action: () => setIsAdmissionModalOpen(true), highlight: false },
    { text: "UPSC पूर्व परीक्षा काउंटडाउन सुरू", action: () => { setView('syllabus'); setSelectedSyllabusId(1); }, highlight: false },
    { text: "UPSC CSE २०२६", action: () => { setView('courses'); setSelectedCategory(1); }, highlight: true },
    { text: "१०,०००+ करिअर घडवले", action: () => setView('about'), highlight: false },
    { text: "सर्व 'गट अ' प्रोफाइल अपडेट केले आहेत", action: () => setView('courses'), highlight: false },
    { text: "जय हिंद", action: () => setView('home'), highlight: true }
  ];

  return (
    <>
      {/* Mobile Nav Toggle */}
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed top-2.5 right-4 z-[120] md:hidden w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center shadow-lg focus:outline-none"
      >
        {isMenuOpen ? <X size={20} className="text-ink" /> : <Menu size={20} className="text-ink" />}
      </button>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 bg-ink/60 backdrop-blur-sm z-[105] md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Ticker */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-ink h-14 flex items-center border-b-2 border-brand/20">
        <div className="flex-1 h-full overflow-hidden flex items-center">
          <div className="flex whitespace-nowrap animate-[marquee-scroll_120s_linear_infinite]">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex items-center gap-8 px-8 group">
                {tickerItems.map((item, idx) => (
                  <React.Fragment key={idx}>
                    <div className="flex items-center gap-4">
                      <span className="w-2 h-2 rounded-full bg-brand"></span>
                      <button 
                        onClick={item.action}
                        className={`font-mono text-xs font-black uppercase tracking-[0.3em] transition-all duration-300 hover:scale-110 hover:brightness-150 cursor-pointer outline-none ${item.highlight ? 'text-brand drop-shadow-[0_0_8px_rgba(247,147,26,0.4)]' : 'text-brand/90 hover:text-brand'}`}
                      >
                        {item.text}
                      </button>
                    </div>
                    {idx < tickerItems.length - 1 && <span className="opacity-30 text-brand">|</span>}
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>
        {/* Reserved space for mobile menu toggle */}
        <div className="w-16 md:w-0 shrink-0" />
      </div>

      {/* Navigation Sidebar */}
        <aside className={`fixed top-14 bottom-0 w-64 md:w-56 bg-white z-[110] flex flex-col items-center py-8 md:py-12 transition-transform duration-500 overflow-y-auto ${isMenuOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'} right-0 md:right-auto md:left-0 shadow-2xl md:shadow-none border-l border-gray-100 md:border-l-0 md:border-r border-gray-100`}>
        <div className="mb-8 md:mb-16 cursor-pointer group relative flex flex-col items-center" 
          onClick={(e) => { 
            e.stopPropagation();
            setView('home'); 
            setSelectedCategory(null); 
            setIsMenuOpen(false); 
          }}
          onDoubleClick={() => {
            setShowAdminTrigger(!showAdminTrigger);
            if (!showAdminTrigger) setTimeout(() => setShowAdminTrigger(false), 5000);
          }}>
          
          <BrandLogo className="w-10 h-10 md:w-16 md:h-16 group-hover:rotate-6 transition-transform" />
          
          <div className="mt-2 md:mt-4 flex flex-col items-center">
            <div className="flex items-center gap-1.5 h-6">
              <span className="text-[14px] md:text-[18px] font-black text-red-600 leading-none">BK</span>
              <div className="relative">
                <span className="text-[14px] md:text-[18px] font-black text-ink leading-none uppercase tracking-tight">Career</span>
                <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-ink"></div>
              </div>
            </div>
            <div className="mt-0.5 md:mt-1">
              <span className="text-[18px] md:text-[22px] font-black text-ink leading-none uppercase tracking-tighter">Academy</span>
            </div>
          </div>

          <AnimatePresence>
            {showAdminTrigger && (
              <motion.button
                key="admin-trigger-button"
                initial={{ opacity: 0, scale: 0, y: 10 }}
                animate={{ opacity: 1, scale: 1.1, y: 0 }}
                exit={{ opacity: 0, scale: 0, y: 10 }}
                onClick={(e) => { e.stopPropagation(); setView('adminLogin'); }}
                className="absolute -bottom-16 bg-red-600 text-white text-[10px] font-black py-1 px-3 border-2 border-ink shadow-[4px_4px_0_0_#1A1A1A] uppercase tracking-tighter whitespace-nowrap z-50 hover:bg-black transition-colors"
              >
                Access Admin
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <nav className="flex-grow w-full px-4 md:px-6 flex flex-col gap-1 md:gap-2">
          {[
            { id: 'home', label: 'Home', icon: '◰' },
            { id: 'about', label: 'About Us', icon: '◎' },
            { id: 'courses', label: 'Courses', icon: '⌬' },
            { id: 'courseDetailPolice', label: 'Police Bharti', icon: '🛡️' },
            { id: 'syllabus', label: 'Book', icon: '◈' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => { 
                setView(item.id); 
                if (item.id === 'courses' || item.id === 'home') {
                  setSelectedCategory(null);
                }
                setIsMenuOpen(false); 
              }}
              className={`sidebar-link ${view === item.id ? 'active' : ''}`}
            >
              <span className="text-lg font-mono">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
          
          <div className="mt-10 pt-8 border-t border-gray-50 flex flex-col gap-3">
            <button 
              onClick={() => setIsRegistrationModalOpen(true)}
              className="group relative bg-gray-50 rounded-2xl p-4 transition-all hover:bg-brand hover:shadow-[0_10px_20px_-10px_rgba(232,156,16,0.4)]"
            >
              <div className="flex items-center justify-center gap-3">
                <Search size={16} className="text-muted group-hover:text-ink transition-colors" />
                <span className="font-display font-bold uppercase text-[10px] tracking-widest text-muted group-hover:text-ink">Inquiry</span>
              </div>
            </button>

            <button 
              onClick={() => setIsAdmissionModalOpen(true)}
              className="group relative bg-ink rounded-2xl p-4 transition-all hover:shadow-[0_10px_20px_-10px_rgba(26,26,26,0.4)]"
            >
              <div className="flex items-center justify-center gap-3">
                <Globe size={16} className="text-brand group-hover:animate-spin" />
                <span className="font-display font-bold uppercase text-[10px] tracking-widest text-brand">Admission</span>
              </div>
            </button>
          </div>
        </nav>

      </aside>
    </>
  );
};

export default Navbar;
