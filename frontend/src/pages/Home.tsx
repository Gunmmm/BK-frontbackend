import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserCircle, GraduationCap, Star, Globe, ChevronDown, ChevronUp, ExternalLink, HelpCircle, CheckCircle2, Clock, Ruler, Target, MessageSquarePlus, ArrowRight } from 'lucide-react';
import HomeHero from '../components/HomeHero';
import CourseCard from '../components/CourseCard';
import StaffCarousel from '../components/StaffCarousel';
import { COURSES, STAFF } from '../data/constants';
import { Story } from '../data/stories';
import YouTubeShortCard from '../components/YouTubeShortCard';

interface HomeProps {
  setView: (view: any) => void;
  setSelectedCategory: (id: number | null) => void;
  setIsRegistrationModalOpen: (open: boolean) => void;
  setIsAdmissionModalOpen: (open: boolean) => void;
  setIsAddStoryModalOpen: (open: boolean) => void;
  dynamicCourses: any[];
}

export const Home: React.FC<HomeProps> = ({
  setView,
  setSelectedCategory,
  setIsRegistrationModalOpen,
  setIsAdmissionModalOpen,
  setIsAddStoryModalOpen,
  dynamicCourses
}) => {
  const [selectedTab, setSelectedTab] = React.useState<'psi' | 'tet' | 'police'>('psi');
  const [faqCategory, setFaqCategory] = React.useState('RAILWAY');

  return (
    <motion.div
      key="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <HomeHero 
        setView={setView} 
        onRegistration={() => setIsRegistrationModalOpen(true)}
      />

      {/* Career Excellence Section */}
      <section className="pt-0 pb-6 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center text-center mb-0 gap-0">
            <div className="max-w-3xl flex flex-col items-center">
              <div className="flex flex-col items-center gap-0">
                <div className="divider-line !mb-0 mx-auto" />
                <h2 className="section-title !text-2xl md:!text-4xl !mb-0 !mt-0 leading-none">
                  <span className="text-ink">COURSES</span>
                </h2>
                <div className="divider-line !mb-0 mx-auto" />
              </div>
              <p className="hidden md:block text-muted text-xl font-body leading-relaxed max-w-2xl mx-auto mt-4">
                Our high-quality courses help you gain the{' '}
                <span className="text-ink font-semibold">best skills</span> for a successful career. 
                We help you turn your hard work into real success.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mt-8">
            {[...dynamicCourses, ...COURSES].map((course, index) => (
              <CourseCard 
                key={course._id || course.id} 
                course={course} 
                index={index} 
                onClick={() => {
                  if (course.id === 100) {
                    setView('courseDetailPolice');
                  } else {
                    setSelectedCategory(course.id);
                    setView('courses');
                  }
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Exam Portal: 3 Tabs Section */}
      <section className="py-12 px-4 bg-white relative">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center mb-8">
             <div className="divider-line mb-1" />
             <h2 className="section-title !text-2xl md:!text-4xl !mb-8 uppercase">
               QUICK <span className="text-brand">EXAM</span> ACCESS
             </h2>
             
             {/* Tab Switcher */}
             <div className="flex flex-wrap justify-center gap-2 bg-ink/5 p-1.5 border-4 border-ink shadow-[4px_4px_0_0_#1A1A1A]">
                {[
                  { id: 'psi', label: 'PSI / STI / ASO' },
                  { id: 'tet', label: 'TET / CTET' },
                  { id: 'police', label: 'POLICE BHARTI' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id as any)}
                    className={`px-6 py-3 font-display font-black text-[10px] uppercase tracking-widest transition-all ${
                      selectedTab === tab.id 
                        ? 'bg-brand text-ink border-2 border-ink shadow-[2px_2px_0_0_#1A1A1A]' 
                        : 'text-ink/40 hover:text-ink'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
             </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-5xl mx-auto"
            >
              {selectedTab === 'psi' && (
                <div 
                  onClick={() => setView('courseDetailMPSC')}
                  className="bg-white border-4 border-ink shadow-[12px_12px_0_0_#1A1A1A] overflow-hidden cursor-pointer group/card transition-transform hover:-translate-y-1"
                >
                  <div className="bg-ink text-white p-4 flex justify-between items-center group-hover/card:bg-brand group-hover/card:text-ink transition-colors">
                     <h3 className="text-lg md:text-2xl font-display font-black leading-none uppercase">
                       MPSC <span className="text-brand group-hover/card:text-ink">(MAHARASHTRA SERVICES)</span>
                     </h3>
                     <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-brand font-bold uppercase tracking-widest bg-white/10 px-3 py-1 border border-brand/30 group-hover/card:border-ink/30 group-hover/card:text-ink">GROUP B & C</span>
                        <ExternalLink size={14} className="opacity-0 group-hover/card:opacity-100 transition-opacity" />
                     </div>
                  </div>
                  
                  <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:divide-x-4 divide-ink/5 items-start">
                    {/* Group B */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                         <div className="bg-brand text-ink px-4 py-1 text-[10px] font-black uppercase border-2 border-ink shadow-[2px_2px_0_0_#000]">MPSC GROUP B</div>
                         <span className="text-[10px] font-bold text-muted">PSI / STI / ASO</span>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-6">
                         <div className="space-y-3">
                            <h4 className="text-[10px] font-mono font-black text-brand uppercase border-b border-ink/10 pb-1">ELIGIBILITY (पात्रता)</h4>
                            <div className="space-y-2">
                               <div className="flex justify-between text-xs font-bold border-b border-ink/5 pb-1"><span>Graduate (कोणतीही पदवी)</span> <CheckCircle2 size={12} className="text-brand"/></div>
                               <div className="flex justify-between text-xs font-bold border-b border-ink/5 pb-1"><span>Age: 19-31 (PSI), 19-38 (Others)</span> <Clock size={12} className="text-brand"/></div>
                               <div className="flex justify-between text-xs font-bold"><span>Height (PSI): 165cm (M), 157cm (F)</span> <Ruler size={12} className="text-brand"/></div>
                            </div>
                         </div>
                         <div className="space-y-3">
                            <h4 className="text-[10px] font-mono font-black text-brand uppercase border-b border-ink/10 pb-1">STAGES (परीक्षेचे स्वरूप)</h4>
                            <div className="grid grid-cols-2 gap-2">
                               <div className="bg-ink/5 border border-ink/10 p-2 text-center"><p className="text-[10px] text-muted">PRELIMS</p><p className="text-xs font-black">100 MARKS</p></div>
                               <div className="bg-ink/5 border border-ink/10 p-2 text-center"><p className="text-[10px] text-muted">MAINS</p><p className="text-xs font-black">400 MARKS</p></div>
                               <div className="bg-ink text-white p-2 text-center col-span-2"><p className="text-[9px] text-brand/70 font-black italic">PHYSICAL & INTERVIEW (ONLY PSI)</p></div>
                            </div>
                         </div>
                      </div>
                    </div>

                    {/* Group C */}
                    <div className="space-y-6 md:pl-8">
                      <div className="flex items-center gap-3">
                         <div className="bg-ink text-white px-4 py-1 text-[10px] font-black uppercase border-2 border-brand shadow-[2px_2px_0_0_#F7931A]">MPSC GROUP C</div>
                         <span className="text-[10px] font-bold text-muted">CLERK / TAX ASST</span>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-6">
                         <div className="space-y-3">
                            <h4 className="text-[10px] font-mono font-black text-brand uppercase border-b border-ink/10 pb-1">ELIGIBILITY (पात्रता)</h4>
                            <div className="space-y-2">
                               <div className="flex justify-between text-xs font-bold border-b border-ink/5 pb-1"><span>Graduate + Typing (Clerk/Tax)</span> <CheckCircle2 size={12} className="text-brand"/></div>
                               <div className="flex justify-between text-xs font-bold border-b border-ink/5 pb-1"><span>Age: 19 - 38 Years</span> <Clock size={12} className="text-brand"/></div>
                               <div className="flex justify-between text-xs font-bold italic text-ink/40 italic"><span>Excise Insp: Height Req Appears</span></div>
                            </div>
                         </div>
                         <div className="space-y-3">
                            <h4 className="text-[10px] font-mono font-black text-brand uppercase border-b border-ink/10 pb-1">STAGES (परीक्षेचे स्वरूप)</h4>
                            <div className="grid grid-cols-2 gap-2">
                               <div className="bg-brand/10 border border-brand/20 p-2 text-center"><p className="text-[10px] text-muted">PRELIMS</p><p className="text-xs font-black">100 MARKS</p></div>
                               <div className="bg-brand/10 border border-brand/20 p-2 text-center"><p className="text-[10px] text-muted">MAINS</p><p className="text-xs font-black">200 MARKS</p></div>
                               <div className="bg-ink text-brand p-2 text-center col-span-2"><p className="text-[9px] font-black italic">SKILL TEST & TYPING REQ.</p></div>
                            </div>
                         </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-ink/5 p-4 text-center border-t border-ink/10 group-hover/card:bg-brand transition-colors">
                     <span className="text-[10px] font-display font-bold uppercase tracking-widest text-ink/60 group-hover/card:text-ink">Click for Detailed Syllabus & Exam Dates →</span>
                  </div>
                </div>
              )}

              {selectedTab === 'tet' && (
                <div 
                  onClick={() => setView('courseDetailMAHATET')}
                  className="bg-white border-4 border-ink shadow-[12px_12px_0_0_#1A1A1A] overflow-hidden cursor-pointer group/card transition-transform hover:-translate-y-1"
                >
                  <div className="bg-[#5c4033] text-white p-4 flex justify-between items-center group-hover/card:bg-brand group-hover/card:text-ink transition-colors">
                     <h3 className="text-lg md:text-2xl font-display font-black leading-none uppercase">
                       TEACHING <span className="text-brand group-hover/card:text-brand-dark">& EDUCATION</span>
                     </h3>
                     <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-brand font-bold uppercase tracking-widest bg-white/10 px-3 py-1 border border-brand/30 group-hover/card:border-ink/30 group-hover/card:text-ink">MAHA TET / CTET 2026</span>
                        <ExternalLink size={14} className="opacity-0 group-hover/card:opacity-100 transition-opacity" />
                     </div>
                  </div>
                  <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:divide-x-4 divide-ink/5 items-start">
                      <div className="space-y-4">
                        <div className="bg-brand text-ink px-4 py-1 text-[10px] font-black uppercase inline-block border-2 border-ink">PAPER I (PRIMARY)</div>
                        <div className="space-y-3">
                           <h4 className="text-[10px] font-mono font-black text-brand uppercase">ELIGIBILITY</h4>
                           <p className="text-xs font-bold leading-relaxed">HSC (12th) 50% + D.T.Ed / D.Ed 2-Year Diploma.</p>
                        </div>
                      </div>
                      <div className="space-y-4 md:pl-8">
                        <div className="bg-ink text-white px-4 py-1 text-[10px] font-black uppercase inline-block border-2 border-brand">PAPER II (UPPER PR.)</div>
                        <div className="space-y-3">
                           <h4 className="text-[10px] font-mono font-black text-brand uppercase">ELIGIBILITY</h4>
                           <p className="text-xs font-bold leading-relaxed">Graduation (Degree) + B.Ed / Graduation + 2-Pr D.Ed.</p>
                        </div>
                      </div>
                      <div className="md:col-span-2 border-t-2 border-ink/5 pt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                         <div className="p-3 bg-brand/5 border border-brand/10 text-center"><p className="text-[9px] text-muted">TOTAL MARKS</p><p className="text-sm font-black">150</p></div>
                         <div className="p-3 bg-brand/5 border border-brand/10 text-center"><p className="text-[9px] text-muted">TIME</p><p className="text-sm font-black">150 MIN</p></div>
                         <div className="p-3 bg-brand/5 border border-brand/10 text-center"><p className="text-[9px] text-muted">NEG. MARKS</p><p className="text-sm font-black text-red-600">NONE</p></div>
                         <div className="p-3 bg-brand/5 border border-brand/10 text-center"><p className="text-[9px] text-muted">PASSING</p><p className="text-sm font-black text-green-600">60% GEN</p></div>
                      </div>
                  </div>
                  <div className="bg-ink/5 p-4 text-center border-t border-ink/10 group-hover/card:bg-brand transition-colors">
                     <span className="text-[10px] font-display font-bold uppercase tracking-widest text-ink/60 group-hover/card:text-ink">Click for Detailed Syllabus & Exam Dates →</span>
                  </div>
                </div>
              )}

              {selectedTab === 'police' && (
                <div 
                  onClick={() => setView('courseDetailPolice')}
                  className="bg-white border-4 border-ink shadow-[12px_12px_0_0_#1A1A1A] overflow-hidden cursor-pointer group/card transition-transform hover:-translate-y-1"
                >
                  <div className="bg-[#1a1a1a] text-white p-4 flex justify-between items-center group-hover/card:bg-brand group-hover/card:text-ink transition-colors">
                     <h3 className="text-lg md:text-2xl font-display font-black leading-none uppercase italic">
                       POLICE <span className="text-brand group-hover/card:text-ink">BHARTI 2026</span>
                     </h3>
                     <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-brand font-bold uppercase tracking-widest bg-white/10 px-3 py-1 border border-brand/30 group-hover/card:border-ink/30 group-hover/card:text-ink">HSC LEVEL RECRUITMENT</span>
                        <ExternalLink size={14} className="opacity-0 group-hover/card:opacity-100 transition-opacity" />
                     </div>
                  </div>
                  <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                      <div className="space-y-4">
                         <div className="bg-brand text-ink px-4 py-1 text-[10px] font-black uppercase inline-block border-2 border-ink">ELIGIBILITY (पात्रता)</div>
                         <div className="space-y-2">
                             <div className="flex justify-between text-xs font-bold border-b border-ink/5 pb-2"><span>12th Pass (HSC)</span> <CheckCircle2 size={12} className="text-brand"/></div>
                             <div className="flex justify-between text-xs font-bold border-b border-ink/5 pb-2"><span>Age: 18 - 28 Years</span> <Clock size={12} className="text-brand"/></div>
                             <div className="flex justify-between text-xs font-bold border-b border-ink/5 pb-2"><span>Height: 165cm (M), 155cm (F)</span> <Ruler size={12} className="text-brand"/></div>
                             <div className="flex justify-between text-xs font-bold"><span>Chest: 79cm (+5cm Expand)</span> <Target size={12} className="text-brand"/></div>
                         </div>
                      </div>
                      <div className="space-y-4">
                         <div className="bg-ink text-white px-4 py-1 text-[10px] font-black uppercase inline-block border-2 border-brand">EXAM PATTERN (स्वरूप)</div>
                         <div className="space-y-3">
                             <div className="flex items-center gap-3 p-3 bg-ink/5 border border-ink/10">
                                <span className="text-sm font-black text-brand">50M</span>
                                <div className="text-[10px] font-bold text-ink/70">PHYSICAL GROUND TEST (पॅरोडे टेस्ट)</div>
                             </div>
                             <div className="flex items-center gap-3 p-3 bg-ink/5 border border-ink/10">
                                <span className="text-sm font-black text-brand">100M</span>
                                <div className="text-[10px] font-bold text-ink/70">WRITTEN EXAMINATION (लेखी परीक्षा)</div>
                             </div>
                             <p className="text-[10px] text-muted font-bold italic">उमेदवारांना लेखी परीक्षेसाठी पात्र होण्यासाठी शारीरिक चाचणीत किमान ५०% गुण मिळवणे आवश्यक आहे.</p>
                         </div>
                      </div>
                  </div>
                  <div className="bg-ink/5 p-4 text-center border-t border-ink/10 group-hover/card:bg-brand transition-colors">
                     <span className="text-[10px] font-display font-bold uppercase tracking-widest text-ink/60 group-hover/card:text-ink">Click for Detailed Syllabus & Exam Dates →</span>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Staff Highlights Section */}
      <section className="pt-6 pb-4 px-6 relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center text-center mb-8 w-full">
            <div className="divider-line mb-2" />
            <h2 className="section-title !text-2xl md:!text-4xl !mb-2 w-full text-center">
              <span className="text-ink">MEET OUR</span> <span className="text-brand">STAFF</span>
            </h2>
            <p className="text-lg text-ink/70 font-body max-w-3xl mx-auto w-full text-center">
              Guided by industry veterans and academic giants dedicated to your professional evolution.
            </p>
          </div>

          <div className="relative z-10 -mx-6">
            <StaffCarousel staff={STAFF} />
          </div>
        </div>
      </section>


      {/* Success Stories Section - Modern Redesign */}
      <section className="pt-6 pb-6 md:pt-12 md:pb-8 px-6 bg-slate-50 relative overflow-hidden border-t-8 border-ink">
        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-center justify-center text-center mb-16 w-full">

            <h2 className="section-title !text-2xl md:!text-4xl !mb-4 w-full text-center">
              <span className="text-ink">LIMITLESS</span> <span className="text-brand">SUCCESS</span>
            </h2>
            <p className="text-lg text-ink/60 font-body max-w-3xl mx-auto w-full text-center leading-relaxed">
              Real stories from our candidates who turned their aspirations into administrative reality. 
              Join the ranks of Maharashtra's finest.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch mb-16">
            {[
              { id: 'mFnRVNOI2_E', title: 'Student Success Story 1' },
              { id: 'cPLrVlE2uRQ', title: 'Student Success Story 2' },
              { id: 'y65ArcDxITw', title: 'Student Success Story 3' },
            ].map((short, index) => (
              <YouTubeShortCard 
                key={short.id}
                videoId={short.id}
                title={short.title}
                index={index}
              />
            ))}
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4 mt-12">
             <motion.button 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               onClick={() => window.open("https://youtube.com/@bkcareeracademy2025?si=_npQzmvWFI65nHG9", "_blank")}
               className="px-8 py-3 bg-[#FDE047] text-gray-800 text-[11px] font-bold uppercase tracking-widest rounded-full shadow-lg shadow-yellow-500/20 flex items-center gap-2"
             >
               View All Video Stories
               <ArrowRight size={16} />
             </motion.button>
             <motion.button 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               onClick={() => setIsAddStoryModalOpen(true)}
               className="px-8 py-3 bg-white border border-gray-100 text-gray-600 text-[11px] font-bold uppercase tracking-widest rounded-full shadow-sm flex items-center gap-2"
             >
               Share Your Story
               <MessageSquarePlus size={16} className="text-[#4F9CF9]" />
             </motion.button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pt-0 pb-12 md:py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto high-contrast-block relative overflow-hidden">
          <h2 className="text-4xl sm:text-5xl font-display font-black uppercase mb-6 leading-tight">Ready to become a giant?</h2>
          <p className="text-lg text-brand/80 mb-8 font-body">
            Join We Shape Careers and architect your absolute legacy.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => setIsRegistrationModalOpen(true)}
              className="bg-white text-ink font-display font-bold uppercase tracking-wider px-10 py-4 transition-all duration-300 hover:bg-brand hover:text-ink w-full sm:w-auto"
            >
              Apply Now
            </button>
          </div>
        </div>
      </section>
      {/* Book Room Section */}
      <section className="pt-12 pb-12 md:py-24 px-6 bg-[#f8f8f8] relative border-t-8 border-ink overflow-hidden">
        {/* Decorative Watermark */}
        <div className="absolute top-0 right-0 text-[12rem] font-display font-black text-ink/[0.03] leading-none select-none translate-x-1/4 -translate-y-1/4">
          LIB
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-12 h-1 bg-brand" />
                 <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-ink/40">Knowledge Archive</span>
              </div>
              <h2 className="section-title !text-2xl md:!text-4xl !mb-0 uppercase leading-none">
                THE <span className="text-brand">BOOK</span> ROOM
              </h2>
              <p className="text-muted mt-6 text-lg font-body leading-relaxed">
                Direct access to our curated administrative library. Download specialized notes, previous year papers, and strategic roadmap PDFs.
              </p>
            </div>
            <button 
              onClick={() => setView('syllabus')}
              className="bg-ink text-brand px-8 py-3 text-[10px] font-black uppercase border-2 border-ink hover:bg-brand hover:text-ink transition-all shadow-[4px_4px_0_0_#F7931A]"
            >
              Explore Full Library
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Dynamic Books from DB */}
            <BookRoomGrid />
          </div>

          <div className="mt-16 bg-white border-4 border-ink p-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-[12px_12px_0_0_#1A1A1A]">
             <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-brand flex items-center justify-center shrink-0 border-2 border-ink">
                   <Target size={32} className="text-ink" />
                </div>
                <div>
                   <h3 className="font-display font-black text-xl uppercase">Request a Resource</h3>
                   <p className="text-xs text-muted font-mono uppercase mt-1">Can't find a specific book? Let us know.</p>
                </div>
             </div>
             <button 
               onClick={() => setIsRegistrationModalOpen(true)}
               className="w-full md:w-auto bg-ink text-white px-10 py-4 text-[10px] font-black uppercase border-2 border-ink hover:bg-brand hover:text-ink transition-all"
             >
               Contact Librarian
             </button>
          </div>
        </div>
      </section>

      {/* Resources & Links Section - Themed */}
      <section className="pt-0 pb-12 md:pt-24 md:pb-24 px-6 bg-white relative border-t-8 border-ink">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-8 md:mb-16">
            <div className="divider-line mb-3" />
            <h2 className="section-title !text-2xl md:!text-4xl !mb-2 uppercase">
              STRATEGIC <span className="text-brand">RESOURCES</span>
            </h2>
            <p className="text-sm text-muted font-mono uppercase tracking-[0.2em] mt-2">External Portals & Knowledge Hubs</p>
          </div>

          <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-6">
            {[
              { name: "THE HINDU", url: "https://www.thehindu.com", logo: "/images/resources/the-hindu-new.webp" },
              { name: "PIB INDIA", url: "https://pib.gov.in", logo: "/images/resources/press-information-bureau.webp" },
              { name: "THE INDIAN EXPRESS", url: "https://indianexpress.com", logo: "/images/resources/the-indian-express.webp" },
              { name: "LOKSATTA", url: "https://www.loksatta.com", logo: "/images/resources/loksatta.png" },
              { name: "UPSC", url: "https://www.upsc.gov.in", logo: "/images/resources/upscs.jpeg" },
              { name: "MPSC", url: "https://mpsc.gov.in", logo: "/images/resources/mpsc-logo.webp" },
              { name: "SSC", url: "https://ssc.nic.in", logo: "/images/resources/ssc-resc-logo.webp" },
              { name: "RBI", url: "https://www.rbi.org.in", logo: "/images/resources/download.jpg" },
              { name: "INDIAN RAILWAYS", url: "https://indianrailways.gov.in", logo: "/images/resources/railways-logo.webp" },
              { name: "MAHARASHTRA TIMES", url: "https://maharashtratimes.com", logo: "/images/resources/maharashtra-times.webp" },
              { name: "MY GOV", url: "https://www.mygov.in", logo: "/images/resources/my-gov.webp" },
              { name: "AAPLE SARKAR", url: "https://aaplesarkar.mahaonline.gov.in", logo: "/images/resources/aaple-sarkar.webp" },
            ].map((res, i) => (
              <a 
                key={res.name}
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-white border border-ink/20 sm:border-2 sm:border-ink p-2 sm:p-8 flex flex-col items-center justify-center text-center shadow-[2px_2px_0_0_#1A1A1A] sm:shadow-[4px_4px_0_0_#1A1A1A] hover:shadow-[6px_6px_0_0_#F7931A] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300 min-h-[80px] sm:min-h-[160px] overflow-hidden"
              >
                {/* Logo with scale effect */}
                <div className="relative w-full h-full flex items-center justify-center z-10">
                  <img 
                    src={res.logo} 
                    alt={res.name}
                    className="max-w-full max-h-[32px] sm:max-h-[64px] object-contain transition-all duration-500 transform group-hover:scale-110"
                  />
                </div>
                
                {/* Label that appears on hover - hidden on mobile for space */}
                <div className="absolute bottom-2 left-0 right-0 text-[8px] font-black uppercase tracking-widest text-ink opacity-0 md:group-hover:opacity-40 transition-opacity hidden sm:block">
                   {res.name}
                </div>

                <div className="absolute top-1 right-1 sm:top-3 sm:right-3 opacity-0 sm:group-hover:opacity-100 transition-opacity">
                   <ExternalLink size={10} className="text-brand sm:w-[14px] sm:h-[14px]" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - Interactive */}
      <section className="pt-12 pb-24 md:py-24 px-6 bg-white border-t-8 border-ink">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center justify-center text-center mb-16">
            <div className="divider-line mb-3" />
            <h2 className="section-title !text-2xl md:!text-4xl !mb-4">
               FREQUENTLY ASKED <span className="text-brand">QUESTIONS</span>
            </h2>
            
            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
               {['RAILWAY', 'UPSC', 'MPSC', 'SSC', 'BANK'].map(cat => (
                 <button 
                  key={cat}
                  onClick={() => setFaqCategory(cat)}
                  className={`px-8 py-3 border-4 border-ink font-display font-black text-[10px] uppercase tracking-widest transition-all ${faqCategory === cat ? 'bg-brand shadow-[4px_4px_0_0_#1A1A1A]' : 'bg-white hover:bg-brand/10'}`}
                 >
                   {cat}
                 </button>
               ))}
            </div>
          </div>

          <motion.div 
            key={faqCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-0 border-t-2 border-ink/10"
          >
             {FAQ_DATA[faqCategory as keyof typeof FAQ_DATA].map((faq, i) => (
               <FAQItem key={`${faqCategory}-${i}`} question={faq.q} answer={faq.a} />
             ))}
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

const FAQ_DATA = {
  RAILWAY: [
    { q: "Can I send RRB application form by Speed Post?", a: "No. RRB applications must be submitted online through the official portal. Physical submissions are no longer accepted." },
    { q: "Can I send more than one application for a post?", a: "No. Multiple applications for the same post in the same RRB will lead to rejection." },
    { q: "Are there negative marking in RRB exam?", a: "Yes. Typically there is a deduction of 1/3 marks (0.33) for every wrong answer in Computer Based Tests." },
    { q: "What is the age limit for RRB NTPC?", a: "For Graduate posts, it is generally 18-33 years, and for Undergraduate posts, it is 18-30 years, with relaxations for reserved categories." }
  ],
  UPSC: [
    { q: "What is the minimum age to apply for UPSC?", a: "A candidate must have attained the age of 21 years on 1st August of the year of examination." },
    { q: "How many attempts are allowed for General category?", a: "General category candidates are allowed 6 attempts until the age of 32." },
    { q: "Is a degree from a private university valid for UPSC?", a: "Yes, as long as the university is recognized by the UGC (University Grants Commission)." },
    { q: "Can I choose any optional subject?", a: "Yes, you can choose any one optional subject from the list provided by UPSC, regardless of your graduation stream." }
  ],
  MPSC: [
    { q: "Is Marathi language compulsory for MPSC?", a: "Yes, proficiency in Marathi is essential as most of the administrative work in Maharashtra is conducted in Marathi." },
    { q: "What is the difference between Rajyaseva and Combined Exam?", a: "Rajyaseva is for Group A and B (Gazetted) posts like Deputy Collector, while Combined is for Group B (Non-Gazetted) like PSI, STI, and ASO." },
    { q: "Can other state candidates apply for MPSC?", a: "Yes, but they will be considered under the General/Open category and must fulfill the Marathi language criteria." },
    { q: "What is the age limit for PSI post?", a: "For the Open category, the age limit is 19 to 31 years, with relaxations for other categories as per government rules." }
  ],
  SSC: [
    { q: "What are the tiers in SSC CGL?", a: "SSC CGL currently consists of two tiers: Tier-I (Qualifying) and Tier-II (Final Selection), both conducted online (CBT)." },
    { q: "Can a final year student apply for SSC CHSL?", a: "Yes, provided they complete their 12th standard or equivalent before the specified cutoff date in the notification." },
    { q: "Is there any physical test for SSC CGL?", a: "Only for specific posts like Inspector (Central Excise/Examiner/Preventive Officer) and Sub-Inspector in CBI/NIA." },
    { q: "What is the salary for SSC CGL posts?", a: "Salary varies by Pay Level (4 to 8), ranging from approx ₹35,000 to ₹80,000 per month including allowances." }
  ],
  BANK: [
    { q: "What is the difference between IBPS and SBI exams?", a: "IBPS conducts recruitment for 11+ public sector banks, while SBI conducts its own separate exams for PO, Clerk, and Specialist Officers." },
    { q: "Is there a sectional cutoff in Bank exams?", a: "Yes, most bank exams (like IBPS PO/Clerk) require candidates to clear both sectional and overall cutoffs in Prelims and Mains." },
    { q: "Can an Arts graduate apply for Bank PO?", a: "Yes, any graduate from a recognized university in any discipline (Arts, Science, Commerce, etc.) can apply for Bank PO/Clerk." },
    { q: "Is computer knowledge necessary for Bank exams?", a: "Yes, basic computer awareness is often a part of the syllabus, and some banks require a certificate/diploma in computer operations." }
  ]
};

// Sub-component for clean FAQ items
const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border-b-2 border-ink/10 transition-all">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 md:px-6 py-4 md:py-5 flex items-center justify-between text-left group hover:bg-slate-50 transition-colors"
      >
        <span className="text-[11px] md:text-sm font-display font-black text-ink uppercase pr-8 group-hover:text-brand transition-colors leading-tight">
          {question}
        </span>
        <div className={`w-8 h-8 md:w-10 md:h-10 border-2 border-ink flex items-center justify-center shrink-0 transition-all ${isOpen ? 'rotate-180 bg-brand' : 'bg-white shadow-[2px_2px_0_0_#1A1A1A]'}`}>
           <ChevronDown size={16} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-slate-50/30"
          >
            <div className="px-4 md:px-6 pb-6 text-[10px] md:text-sm font-body text-ink/70 leading-relaxed max-w-4xl pt-2">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;

const BookRoomGrid = () => {
  const [books, setBooks] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('/api/books')
      .then(res => res.json())
      .then(data => {
        if (data.success) setBooks(data.items.slice(0, 4));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return [1,2,3,4].map(i => (
      <div key={i} className="h-64 bg-white border-2 border-ink animate-pulse" />
    ));
  }

  return (
    <>
      {books.map((book) => (
        <div key={book._id} className="bg-white border-2 border-ink p-6 flex flex-col justify-between hover:shadow-[8px_8px_0_0_#1A1A1A] hover:-translate-y-1 transition-all group">
          <div>
            <div className="flex justify-between items-start mb-4">
               <div className="w-10 h-10 bg-brand/10 flex items-center justify-center text-brand border border-brand/20">
                  <Star size={20} />
               </div>
               <span className="text-[8px] font-mono bg-ink text-white px-2 py-1 uppercase">{book.category}</span>
            </div>
            <h4 className="font-display font-black text-sm uppercase leading-tight group-hover:text-brand transition-colors line-clamp-2">
              {book.title}
            </h4>
            {book.description && <p className="text-[10px] text-muted mt-3 line-clamp-2 italic">{book.description}</p>}
          </div>
          <a 
            href={book.pdfUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-6 flex items-center justify-between group/btn"
            onClick={() => {
              fetch('/api/track/download', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ formType: book.title, studentName: 'Home User' })
              });
            }}
          >
            <span className="text-[10px] font-black uppercase tracking-widest group-hover/btn:underline">Download PDF</span>
            <div className="w-8 h-8 bg-ink text-white flex items-center justify-center group-hover/btn:bg-brand group-hover/btn:text-ink transition-colors">
               <ArrowRight size={14} />
            </div>
          </a>
        </div>
      ))}
      {books.length === 0 && (
        <div className="col-span-full py-12 text-center bg-white border-2 border-dashed border-ink/20 opacity-40 uppercase font-mono text-xs">
          The Book Room is currently being stocked. Check back soon.
        </div>
      )}
    </>
  );
};
