import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserCircle, GraduationCap, Star, Globe, ChevronDown, ChevronUp, ExternalLink, HelpCircle, CheckCircle2, Clock, Ruler, Target, MessageSquarePlus, ArrowRight } from 'lucide-react';
import HomeHero from '../components/HomeHero';
import CourseCard from '../components/CourseCard';
import StaffCarousel from '../components/StaffCarousel';
import { COURSES, STAFF } from '../data/constants';
import { Story } from '../data/stories';

interface HomeProps {
  setView: (view: any) => void;
  setSelectedCategory: (id: number | null) => void;
  setIsRegistrationModalOpen: (open: boolean) => void;
  setIsAdmissionModalOpen: (open: boolean) => void;
  setIsAddStoryModalOpen: (open: boolean) => void;
  dynamicCourses: any[];
  dynamicExams: any[];
  stories: Story[];
  setSelectedExamName: (name: string) => void;
  quickAccessList: any[];
}

export const Home: React.FC<HomeProps> = ({
  setView,
  setSelectedCategory,
  setIsRegistrationModalOpen,
  setIsAdmissionModalOpen,
  setIsAddStoryModalOpen,
  dynamicCourses,
  dynamicExams,
  stories,
  setSelectedExamName,
  quickAccessList
}) => {
  const [selectedTab, setSelectedTab] = React.useState<string>('psi');

  // Sync selected tab with first item in dynamic list if available
  React.useEffect(() => {
    if (quickAccessList && quickAccessList.length > 0) {
      setSelectedTab(quickAccessList[0].category);
    }
  }, [quickAccessList]);

  return (
    <motion.div
      key="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      <HomeHero 
        setView={setView} 
        setSelectedCategory={setSelectedCategory} 
        onRegistration={() => setIsRegistrationModalOpen(true)}
        onAdmission={() => setIsAdmissionModalOpen(true)}
      />

      {/* Career Excellence Section */}
      {dynamicCourses && dynamicCourses.length > 0 && (
        <section className="pt-2 pb-6 px-6 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center text-center mb-6 gap-0">
              <div className="max-w-3xl flex flex-col items-center">
                <div className="divider-line mb-0 mx-auto" />
                <h2 className="section-title !text-5xl md:!text-6xl lg:!text-7xl !mb-3">
                  <span className="text-ink">COURSES</span>
                </h2>
                <div className="divider-line mb-1 mx-auto" />
                <p className="text-muted text-xl font-body leading-relaxed max-w-2xl mx-auto">
                  Our high-quality courses help you gain the{' '}
                  <span className="text-ink font-semibold">best skills</span> for a successful career. 
                  We help you turn your hard work into real success.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {dynamicCourses.map((course, index) => (
                <CourseCard 
                  key={course._id || course.id} 
                  course={course} 
                  index={index} 
                  onClick={() => {
                    if (course.id === 100) {
                      setView('courseDetailPolice');
                    } else if (course._id) {
                      // It's a dynamic course from admin panel
                      setSelectedExamName(course.subCategory || course.title);
                      setView('dynamicExamDetail');
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
      )}

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
                {(quickAccessList && quickAccessList.length > 0 ? quickAccessList : [
                  { category: 'psi', title: 'PSI / STI / ASO' },
                  { category: 'tet', title: 'TET / CTET' }
                ]).map(tab => (
                  <button
                    key={tab.category}
                    onClick={() => setSelectedTab(tab.category)}
                    className={`px-6 py-3 font-display font-black text-[10px] uppercase tracking-widest transition-all ${
                      selectedTab === tab.category 
                        ? 'bg-brand text-ink border-2 border-ink shadow-[2px_2px_0_0_#1A1A1A]' 
                        : 'text-ink/40 hover:text-ink'
                    }`}
                  >
                    {tab.title}
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
              {/* DYNAMIC CONTENT FROM ADMIN */}
              {quickAccessList.some(q => q.category === selectedTab) ? (
                quickAccessList.filter(q => q.category === selectedTab).map(item => (
                  <div 
                    key={item._id}
                    className="bg-white border-4 border-ink shadow-[12px_12px_0_0_#1A1A1A] overflow-hidden group/card transition-transform hover:-translate-y-1"
                  >
                    <div className="bg-ink text-white p-4 flex justify-between items-center group-hover/card:bg-brand group-hover/card:text-ink transition-colors">
                       <h3 className="text-lg md:text-2xl font-display font-black leading-none uppercase">
                         {item.title}
                       </h3>
                       {item.subCategory && (
                         <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono text-brand font-bold uppercase tracking-widest bg-white/10 px-3 py-1 border border-brand/30 group-hover/card:border-ink/30 group-hover/card:text-ink">{item.subCategory}</span>
                         </div>
                       )}
                    </div>
                    
                    <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:divide-x-4 divide-ink/5 items-start">
                       {item.dynamicSections?.map((module: any, mIdx: number) => (
                         <div key={mIdx} className={`space-y-6 ${mIdx > 0 ? 'md:pl-8' : ''}`}>
                            <div className="flex items-center gap-3">
                               <div className={`${mIdx % 2 === 0 ? 'bg-brand text-ink' : 'bg-ink text-white'} px-4 py-1 text-[10px] font-black uppercase border-2 border-ink shadow-[2px_2px_0_0_#000]`}>
                                 {module.title}
                               </div>
                            </div>
                            <div 
                              className="prose prose-sm max-w-none text-xs font-bold leading-relaxed space-y-4"
                              dangerouslySetInnerHTML={{ __html: module.content }}
                            />
                         </div>
                       ))}
                    </div>
                  </div>
                ))
              ) : (
                /* FALLBACK HARDCODED CONTENT */
                <>
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
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Staff Highlights Section */}
      <section className="pt-6 pb-12 px-6 relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center text-center mb-8 w-full">
            <div className="divider-line mb-2" />
            <h2 className="section-title !text-5xl md:!text-6xl lg:!text-7xl !mb-2 w-full text-center">
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

      {/* Success Stories Section */}
      <section className="py-12 px-6 bg-ink relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03]" 
          style={{
            backgroundImage: `linear-gradient(#FFC107 1px, transparent 1px), linear-gradient(90deg, #FFC107 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center text-center mb-8 w-full">
            <div className="divider-line mb-2" />
            <h2 className="section-title !text-4xl md:!text-5xl lg:!text-6xl !mb-2 w-full text-center">
              <span className="text-brand">SUCCESS</span> STORIES
            </h2>
            <p className="text-lg text-white/70 font-body max-w-3xl mx-auto w-full text-center">
              Watch as our graduates reshape global industries of technology and leadership.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-12">
            {stories.map((story, index) => (
              <motion.div 
                key={story.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`p-8 bg-white border border-ink/10 hover:border-brand/30 transition-all brutalist-card ${index % 2 === 1 ? 'mt-0 md:mt-8' : ''}`}
              >
                <div className="flex gap-2 mb-6 text-brand">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={18} 
                      fill={i < story.rating ? "currentColor" : "transparent"} 
                      className={i < story.rating ? "text-brand" : "text-ink/10"} 
                    />
                  ))}
                </div>
                <p className="text-lg font-body leading-relaxed mb-6 text-ink/90 italic">
                  "{story.content}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-none bg-brand/20 flex items-center justify-center text-lg font-bold text-brand">
                    {story.initials}
                  </div>
                  <div>
                    <div className="text-base font-display font-bold text-ink">{story.name}</div>
                    <div className="text-xs uppercase tracking-wider text-muted">{story.role || 'Successful Candidate'}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-12 bg-white/5 p-8 border-2 border-brand/20 border-dashed">
             <button 
               onClick={() => setView('successStories')}
               className="group btn-brutalist bg-brand px-8 py-3 text-sm flex items-center gap-2"
             >
               Read All Stories <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
             </button>
             <button 
               onClick={() => setIsAddStoryModalOpen(true)}
               className="group btn-brutalist bg-white text-ink px-8 py-3 text-sm flex items-center gap-2"
             >
               Add Your Story <MessageSquarePlus size={18} className="group-hover:scale-110 transition-transform" />
             </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 text-center">
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
      <section className="py-24 px-6 bg-[#f8f8f8] relative border-t-8 border-ink overflow-hidden">
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
              <h2 className="text-4xl md:text-6xl font-display font-black uppercase leading-none">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Dynamic Books from DB */}
            <BookRoomGrid setView={setView} />
          </div>

        </div>
      </section>

      {/* Resources & Links Section */}
      <section className="py-24 px-6 bg-white relative border-t-8 border-ink">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-2xl font-display font-black text-red-600 uppercase tracking-tight flex items-center gap-2">
               Our Resources
            </h2>
            <div className="w-12 h-1 bg-red-600 mt-1" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
                className="bg-white border border-gray-100 rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-[0_4px_25px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 min-h-[140px] group overflow-hidden"
              >
                {/* Logo with full color and hover scale */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <img 
                    src={res.logo} 
                    alt={res.name}
                    className="max-w-full max-h-[60px] object-contain transition-all duration-500 transform group-hover:scale-110"
                  />
                </div>
                <div className="absolute top-2 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                   <ExternalLink size={12} className="text-ink/30" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 bg-white border-t-8 border-ink">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center justify-center text-center mb-16">
            <div className="divider-line mb-3" />
            <h2 className="section-title !text-4xl md:!text-5xl lg:!text-6xl !mb-4">
               FREQUENTLY ASKED <span className="text-brand">QUESTIONS</span>
            </h2>
            
            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
               {['RAILWAY', 'UPSC', 'MPSC', 'SSC', 'BANK'].map(cat => (
                 <button 
                  key={cat}
                  className={`px-8 py-3 border-4 border-ink font-display font-black text-[10px] uppercase tracking-widest transition-all ${cat === 'RAILWAY' ? 'bg-brand shadow-[4px_4px_0_0_#1A1A1A]' : 'bg-white hover:bg-brand/10'}`}
                 >
                   {cat}
                 </button>
               ))}
            </div>
          </div>

          <div className="space-y-4">
             {[
               { q: "Can I send RRB application form by Speed Post/Registered Post?", a: "No. RRB applications must be submitted online through the official portal. Physical submissions are no longer accepted." },
               { q: "Can I send more than one application for a post?", a: "No. Multiple applications for the same post in the same RRB will lead to rejection. However, you can apply for different posts separately if allowed." },
               { q: "I have applied for a post in RRB Chennai. Will I be considered for the same post under RRB Patna?", a: "No. You are only considered for the RRB you applied to. You cannot be considered for multiple RRBs for same post in the same notification." },
               { q: "Can I apply online?", a: "Yes. All modern RRB recruitments are conducted exclusively through the online application system." },
               { q: "I am waiting for results for my Degree/Diploma. Can I apply?", a: "No. Candidates must possess the prescribed educational qualification as on the closing date of registration." },
               { q: "Can ladies apply for Railway jobs?", a: "Absolutely. Women are encouraged to apply and often have specific relaxations and reserved quotas in various posts." },
               { q: "Are there negative marking in RRB exam?", a: "Yes. Typically there is a deduction of 1/3 marks (0.33) for every wrong answer in Computer Based Tests." },
               { q: "What is RRB? What is its role and function?", a: "The Railway Recruitment Board (RRB) is a government agency responsible for recruiting staff for various positions in Indian Railways." },
               { q: "How can Students lodge their grievances to the committee?", a: "Grievances can be lodged through the official grievance portal linked on the RRB website or via the provided email in the specific notification." },
             ].map((faq, i) => (
               <FAQItem key={i} question={faq.q} answer={faq.a} />
             ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

// Sub-component for clean FAQ items
const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className={`border-4 border-ink transition-all ${isOpen ? 'bg-brand/5' : 'bg-white'}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-6 flex items-center justify-between text-left group"
      >
        <span className="text-sm md:text-lg font-display font-black text-ink uppercase pr-8 group-hover:text-brand transition-colors">
          {question}
        </span>
        <div className={`w-10 h-10 border-2 border-ink bg-white flex items-center justify-center shrink-0 transition-transform ${isOpen ? 'rotate-180 bg-brand' : ''}`}>
           <ChevronDown size={20} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-8 pb-8 text-sm md:text-base font-body text-ink/70 border-t-2 border-ink/10 pt-4 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;

const BookRoomGrid: React.FC<{ setView: (v: any) => void }> = ({ setView }) => {
  const [books, setBooks] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('/api/books')
      .then(res => res.json())
      .then(data => {
        if (data.success) setBooks(data.items.slice(0, 3));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return [1,2,3].map(i => (
      <div key={i} className="h-64 bg-white border-2 border-ink animate-pulse" />
    ));
  }

  return (
    <>
      {books.map((book) => (
        <div 
          key={book._id} 
          onClick={() => {
            setView('syllabus');
            window.scrollTo({ top: 0, behavior: 'instant' });
          }}
          className="bg-white border-2 border-ink p-6 flex flex-col justify-between hover:shadow-[8px_8px_0_0_#1A1A1A] hover:-translate-y-1 transition-all group cursor-pointer"
        >
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
          <div className="mt-6 flex items-center justify-between group/btn">
            <span className="text-[10px] font-black uppercase tracking-widest group-hover/btn:underline">View in Library</span>
            <div className="w-8 h-8 bg-ink text-white flex items-center justify-center group-hover/btn:bg-brand group-hover/btn:text-ink transition-colors">
               <ArrowRight size={14} />
            </div>
          </div>
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
