import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Clock, Calendar } from 'lucide-react';

interface DynamicExamDetailsPageProps {
  examName: string;
  onBack: () => void;
  onRegister: () => void;
}

// ── Live Countdown Timer Component ──────────────────────────────────────────
const CountdownTimer: React.FC<{ examDate: string }> = ({ examDate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, passed: false });

  useEffect(() => {
    const calc = () => {
      const diff = new Date(examDate).getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, passed: true });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
        passed: false
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [examDate]);

  if (timeLeft.passed) {
    return (
      <div className="mb-10 p-8 bg-red-950/20 border-2 border-red-500/30 text-center rounded-2xl backdrop-blur-sm">
        <p className="text-red-400 font-mono uppercase tracking-[0.3em] text-xs font-black flex items-center justify-center gap-3">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          Strategic Window Closed: Exam Date Passed
        </p>
      </div>
    );
  }

  const blocks = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds },
  ];

  return (
    <div className="mb-12 p-8 md:p-10 bg-[#121212] border-2 border-[#F7931A]/20 rounded-[2rem] relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#F7931A]/40 to-transparent" />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div className="flex items-center gap-5">
          <div className="w-12 h-12 rounded-full bg-[#F7931A]/10 border border-[#F7931A]/30 flex items-center justify-center shrink-0">
            <Clock className="text-[#F7931A]" size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-[#F7931A] text-lg font-black uppercase tracking-[0.2em] leading-tight">EXAM</span>
            <span className="text-[#F7931A] text-lg font-black uppercase tracking-[0.2em] leading-tight opacity-90">COUNTDOWN</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full self-start md:self-auto">
          <Calendar className="text-[#F7931A]/60" size={16} />
          <span className="text-white/60 text-[11px] font-mono font-bold uppercase tracking-widest">
            {new Date(examDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        {blocks.map(b => (
          <div key={b.label} className="flex flex-col items-center">
            <div className="w-full bg-[#1A1A1A] border-2 border-[#F7931A]/10 py-8 md:py-12 px-2 relative overflow-hidden rounded-[1.5rem] shadow-2xl transition-all hover:border-[#F7931A]/40 group">
              <div className="absolute inset-0 bg-gradient-to-b from-[#F7931A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <motion.span 
                key={b.value}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-5xl md:text-7xl font-black text-[#F7931A] font-mono tabular-nums leading-none block text-center drop-shadow-[0_0_20px_rgba(247,147,26,0.4)]"
                style={{ color: '#F7931A' }}
              >
                {String(b.value).padStart(2, '0')}
              </motion.span>
            </div>
            <p className="text-[10px] md:text-xs font-mono font-black uppercase tracking-[0.4em] text-[#F7931A]/90 mt-5">{b.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Main Page ────────────────────────────────────────────────────────────────
export const DynamicExamDetailsPage: React.FC<DynamicExamDetailsPageProps> = ({
  examName,
  onBack,
  onRegister
}) => {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const [upscResp, coursesResp, examsResp] = await Promise.all([
          fetch('/api/content/upsc_hub'),
          fetch('/api/content/courses'),
          fetch('/api/content/exams')
        ]);
        
        const [upscData, coursesData, examsData] = await Promise.all([
          upscResp.json(),
          coursesResp.json(),
          examsResp.json()
        ]);
        
        const allItems = [
          ...(upscData.items || []), 
          ...(coursesData.items || []),
          ...(examsData.items || [])
        ];
        
        const match = allItems.find(item => 
          item.subCategory?.trim().toLowerCase() === examName.trim().toLowerCase() ||
          item.title?.trim().toLowerCase() === examName.trim().toLowerCase() ||
          item.category?.trim().toLowerCase() === examName.trim().toLowerCase()
        );
        
        setContent(match || null);
      } catch (err) {
        console.error("Failed to fetch exam details", err);
      } finally {
        setLoading(false);
      }
    };
    
    if (examName) fetchContent();
  }, [examName]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background relative selection:bg-brand selection:text-ink"
    >
      {/* Premium Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-[100] px-8 h-20 flex items-center justify-between bg-white border-b-4 border-ink shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-4 cursor-pointer" onClick={onBack}>
          <BrandLogo className="w-10 h-10" />
          <div className="flex flex-col">
            <span className="text-xl font-display font-black uppercase text-ink leading-none">{examName} Hub</span>
            <span className="text-[10px] font-mono text-brand font-bold uppercase tracking-widest mt-1">Strategic Portal</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button onClick={onRegister} className="btn-brutalist bg-brand px-6 py-2 text-xs">Inquiry</button>
          <button onClick={onRegister} className="hidden sm:flex btn-brutalist bg-ink text-brand px-6 py-2 text-xs">Apply Now</button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-40 pb-20 px-8 bg-ink relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #E89C10 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <button 
            onClick={onBack}
            className="group flex items-center gap-2 text-brand mb-10 hover:translate-x-1 transition-transform"
          >
            <ChevronRight className="rotate-180" size={18} />
            <span className="text-xs font-mono uppercase tracking-[0.3em] font-black">Return to Navigation</span>
          </button>
          <h1 className="text-5xl md:text-8xl font-display font-black text-white uppercase tracking-tighter leading-none mb-8">
            {examName} <span className="text-brand">Explosion</span>
          </h1>
          <p className="text-white/60 text-lg md:text-2xl font-body max-w-3xl leading-relaxed">
            Detailed strategic roadmap for {examName} recruitment — Your blueprint to administrative success.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-24 pb-40">
        <div className="grid grid-cols-1 gap-24">
            {loading ? (
              <div className="py-20 text-center text-[#F7931A] animate-pulse uppercase font-mono tracking-widest">
                Fetching Strategic Insights...
              </div>
          ) : content ? (
            <>
              {/* ── COUNTDOWN TIMER ── */}
              {content.examDate && (
                <div className="scroll-mt-32">
                   <CountdownTimer examDate={content.examDate} />
                </div>
              )}

              {/* ── FEATURED IMAGE ── */}
              {content.image && (
                <div className="w-full h-[400px] md:h-[600px] overflow-hidden border-8 border-ink shadow-[20px_20px_0_0_#F7931A] rounded-none">
                   <img src={content.image} alt={content.title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                </div>
              )}

              {/* ── DYNAMIC CONTENT MODULES ── */}
              <div className="grid grid-cols-1 gap-20">
                {content.dynamicSections && content.dynamicSections.length > 0 ? (
                  content.dynamicSections.map((sec: any, sIdx: number) => (
                    <section key={sIdx} className="bg-white border-8 border-ink p-10 md:p-16 shadow-[-20px_20px_0_0_#F7931A] relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                        <GraduationCap size={400} />
                      </div>
                      <h3 className="text-3xl md:text-5xl font-display font-black text-ink uppercase tracking-tight mb-10 flex items-center gap-6">
                         <div className="w-4 h-12 bg-brand" /> {sec.title}
                      </h3>
                      <div className="text-ink/80 text-xl md:text-2xl leading-relaxed font-body whitespace-pre-wrap max-w-4xl">
                        {sec.content}
                      </div>
                    </section>
                  ))
                ) : (
                  <div className="text-center py-24 border-8 border-dashed border-ink/10 opacity-50">
                    <p className="text-ink text-2xl font-display font-black uppercase">"Strategic modules are being finalized."</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-40 border-8 border-ink bg-white shadow-[20px_20px_0_0_#F7931A]">
              <p className="text-ink text-3xl font-display font-black uppercase mb-10 italic">"Content not published yet."</p>
              <button 
                onClick={onRegister}
                className="btn-brutalist bg-brand px-12 py-5 text-xl"
              >
                Inquire About {examName}
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Global Footer Call to Action */}
      <section className="bg-ink py-32 px-8 text-center border-t-[16px] border-brand">
         <div className="max-w-5xl mx-auto">
            <h2 className="text-5xl md:text-8xl font-display font-black text-white uppercase mb-12 leading-none tracking-tighter">
              Start Your <span className="text-brand">{examName}</span> Preparation Today
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-10">
               <button onClick={onRegister} className="btn-brutalist bg-brand px-16 py-6 text-2xl group">
                  <span className="group-hover:translate-x-3 transition-transform inline-block">Join Batch 2026 →</span>
               </button>
               <button onClick={onRegister} className="btn-brutalist bg-white text-ink px-16 py-6 text-2xl">
                  Download Guide
               </button>
            </div>
         </div>
      </section>
    </motion.div>
  );
};

export default DynamicExamDetailsPage;
