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
            <p className="text-[10px] md:text-xs font-mono font-black uppercase tracking-[0.4em] text-[#F7931A]/60 mt-5">{b.label}</p>
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
      className="min-h-screen bg-void pt-20 pb-32"
    >
      <div className="max-w-5xl mx-auto px-8 relative">
        <button 
          onClick={onBack}
          className="inline-flex items-center btn-outline px-6 py-3 mb-8 bg-void/50 backdrop-blur-md border border-white/10 hover:border-[#F7931A] transition-colors rounded-sm"
        >
          <ChevronRight className="rotate-180 mr-2" size={16} />
          <span className="text-xs font-mono uppercase tracking-widest text-[#F7931A]">Back to Courses</span>
        </button>

        <article className="prose prose-invert max-w-none mt-10">
          <header className="mb-20 text-center border-b border-white/10 pb-12">
            <div className="text-[#F7931A] text-xs font-mono uppercase tracking-[0.4em] mb-6">Strategic orientation</div>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white leading-[1.1] tracking-tighter uppercase mb-6">
              <span className="bg-gradient-to-r from-[#F7931A] to-[#FFD600] bg-clip-text text-transparent italic">{examName}</span>
            </h1>
            <p className="text-[#94A3B8] font-body text-xl max-w-3xl mx-auto leading-relaxed">
              Complete blueprint and strategy details for {examName}.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-16">
            {loading ? (
              <div className="py-20 text-center text-[#F7931A] animate-pulse uppercase font-mono tracking-widest">
                Fetching Strategic Insights...
              </div>
            ) : content ? (
              <section className="relative group">

                {/* ── COUNTDOWN TIMER ── */}
                {content.examDate && (
                  <CountdownTimer examDate={content.examDate} />
                )}

                {content.image && (
                  <div className="mb-12 w-full h-[300px] md:h-[400px] overflow-hidden border-4 border-[#F7931A]/20 rounded-xl">
                     <img src={content.image} alt={content.title} className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="grid grid-cols-1 gap-8">
                  {content.dynamicSections && content.dynamicSections.length > 0 ? (
                    content.dynamicSections.map((sec: any, sIdx: number) => (
                      <div key={sIdx} className="p-10 bg-[#0F1115] border border-white/5 rounded-2xl relative overflow-hidden transition-all hover:border-[#F7931A]/30">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#F7931A]/5 rounded-full blur-[60px]" />
                        <h3 className="text-2xl font-heading font-bold text-[#F7931A] uppercase tracking-wider mb-6 flex items-center gap-4">
                           {sec.title}
                        </h3>
                        <div className="text-white/80 text-lg leading-relaxed font-body whitespace-pre-wrap">
                          {sec.content}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-20 border border-white/5 rounded-3xl">
                      <p className="text-[#94A3B8] text-xl font-body italic">"Strategic modules for this exam are being finalized."</p>
                    </div>
                  )}
                </div>
              </section>
            ) : (
              <div className="text-center py-40 border border-white/5 rounded-3xl">
                <p className="text-[#94A3B8] text-xl font-body italic mb-6">"Content for this specific exam has not been published yet."</p>
                <button 
                  onClick={onRegister}
                  className="bg-transparent border border-[#F7931A] text-[#F7931A] py-3 px-8 text-sm uppercase tracking-widest hover:bg-[#F7931A] hover:text-black transition-all"
                >
                  Inquire About This Course
                </button>
              </div>
            )}

            {content && (
              <footer className="text-center py-20 border-t border-white/10 mt-20">
                <h2 className="text-3xl font-heading font-bold text-white mb-6 uppercase">Ready to Forge Your Legacy?</h2>
                <button 
                   onClick={onRegister}
                   className="bg-[#F7931A] text-black font-bold py-5 px-16 text-xl uppercase tracking-[0.2em] hover:bg-white transition-all shadow-[8px_8px_0_0_#1A1A1A] hover:shadow-none hover:translate-x-2 hover:translate-y-2"
                >
                  Start Your Journey →
                </button>
              </footer>
            )}
          </div>
        </article>
      </div>
    </motion.div>
  );
};

export default DynamicExamDetailsPage;
