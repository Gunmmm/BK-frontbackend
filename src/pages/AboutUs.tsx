import React from 'react';
import { motion } from 'motion/react';
import { Info, Target, Users, BookOpen, Quote, Shield, Globe, Award, Heart, CheckCircle2 } from 'lucide-react';

const Shimmer = ({ className = "" }: { className?: string }) => (
  <div className={`relative overflow-hidden bg-gray-100 border-2 border-ink ${className}`}>
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-ink/[0.03] to-transparent" />
    <div className="absolute inset-0 flex items-center justify-center opacity-10">
      <Info size={40} className="text-ink" />
    </div>
  </div>
);

const OrganizationCard = ({ name, url, logo }: { name: string; url: string; logo?: string }) => {
  const fullUrl = url.startsWith('http') ? url : `https://${url}`;
  const isAvailable = url !== "Coming Soon";

  return (
    <a 
      href={isAvailable ? fullUrl : '#'} 
      target={isAvailable ? "_blank" : undefined}
      rel={isAvailable ? "noopener noreferrer" : undefined}
      className={`group bg-white border-4 border-ink p-8 shadow-[8px_8px_0px_0px_#1A1A1A] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex flex-col justify-between h-full ${!isAvailable ? 'cursor-default' : 'cursor-pointer'}`}
    >
      <div>
        <div className="w-16 h-16 bg-white border-2 border-ink mb-6 flex items-center justify-center group-hover:bg-brand transition-colors overflow-hidden">
          {typeof logo === 'string' ? (
            <img src={logo} alt={`${name} Logo`} className="w-full h-full object-contain p-2" />
          ) : (
            <Shield size={32} className="text-ink" />
          )}
        </div>
        <h3 className="text-xl font-display font-black text-ink uppercase tracking-tighter leading-tight mb-2 group-hover:text-brand transition-colors">{name}</h3>
        <p className="text-xs font-mono text-muted uppercase tracking-widest">{url.replace('https://', '').replace('www.', '')}</p>
      </div>
      {isAvailable && (
        <div className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-ink group-hover:text-brand transition-colors">
          Visit Website <Globe size={12} />
        </div>
      )}
    </a>
  );
};

export const AboutUs = () => {
  const networks = [
    { name: "BK Educational And Welfare Society", url: "https://bkngo.in", logo: "/images/about_logos/bk.png" },
    { name: "BK Science Academy", url: "https://bkscience.in", logo: "/images/about_logos/bk.png" },
    { name: "Science Career Academy", url: "https://bkcareer.in", logo: "/images/about_logos/bk.png" },
    { name: "BK Sports Academy", url: "https://www.bksports.in/", logo: "/images/about_logos/bksports.png" },
    { name: "BK Times", url: "https://www.bktimes.co.in/", logo: "/images/about_logos/bktimes.png" },
    { name: "Gurukul Vidya Niketan", url: "https://bkgurukul.in/testimonials", logo: "/images/about_logos/GurukulLogo.jpg" },
    { name: "Sanskar English Medium School", url: "https://www.bksanskar.in/", logo: "/images/about_logos/sanskar.png?v=" + Date.now() },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background pt-40 pb-40"
    >

      {/* Story & Vision */}
      <section className="px-6 sm:px-12 mb-40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
          <div className="space-y-8">
            <div className="relative">
              <Quote className="absolute -top-10 -left-10 text-brand opacity-20" size={120} />
              <h2 className="text-4xl font-display font-black text-ink uppercase tracking-tight relative z-10">
                A Dream That <span className="text-brand">Grew</span>
              </h2>
            </div>
            <p className="text-xl font-body leading-relaxed text-ink/80 border-l-4 border-brand pl-8 py-2">
              Our journey started with a simple dream: to give every child a chance to succeed. Since 2009, the BK Education And Welfare Society has grown from a small idea into a large family of schools and academies.
            </p>
            <p className="text-lg font-body leading-relaxed text-muted">
              We believe that education is not just about passing exams, but about building character and confidence. For more than 15+ years, we have worked hard to help students learn and grow through our different schools.
            </p>
          </div>
          <div className="relative">
            <div className="aspect-square w-full border-4 border-ink shadow-[12px_12px_0_0_#F7931A] overflow-hidden">
              <img 
                src="/images/about_main.png" 
                alt="BK Academy Students" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-ink text-brand p-8 border-4 border-brand shadow-[8px_8px_0px_0px_#1A1A1A]">
              <div className="text-5xl font-display font-black italic">15,000+</div>
              <div className="text-xs font-mono uppercase tracking-widest mt-1">Students Empowered</div>
            </div>
          </div>
        </div>
      </section>



      {/* Network */}
      <section className="px-6 sm:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="text-5xl md:text-7xl font-display font-black text-ink uppercase tracking-tighter">
              Our Educational <span className="text-brand text-outline-ink">Network</span>
            </h2>
            <p className="text-muted mt-4 font-mono uppercase tracking-[0.3em] text-xs">Serving diverse educational needs since 2009</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {networks.map((org, i) => (
              <OrganizationCard key={i} {...org} />
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default AboutUs;
