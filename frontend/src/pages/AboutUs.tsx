import React from 'react';
import { motion } from 'motion/react';
import { Info, Target, Users, BookOpen, Quote, Shield, Globe, Award, Heart, CheckCircle2 } from 'lucide-react';

const RedBK = (text: string) => {
  if (!text.includes('BK')) return text;
  return text.split('BK').map((part, i, arr) => (
    <React.Fragment key={i}>
      {part}
      {i < arr.length - 1 && <span className="text-red-600">BK</span>}
    </React.Fragment>
  ));
};

const OrganizationCard = ({ name, url, logo }: { name: string; url: string; logo?: string }) => {
  const fullUrl = url.startsWith('http') ? url : `https://${url}`;
  const isAvailable = url !== "Coming Soon";

  return (
    <a 
      href={isAvailable ? fullUrl : '#'} 
      target={isAvailable ? "_blank" : undefined}
      rel={isAvailable ? "noopener noreferrer" : undefined}
      className={`group relative bg-white rounded-[1.5rem] p-4 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col justify-between h-full border border-gray-50 overflow-hidden ${!isAvailable ? 'cursor-default' : 'cursor-pointer'}`}
    >
      {/* Top-right subtle blob */}
      <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#FDF6E9] rounded-full transition-transform group-hover:scale-125 duration-700" />
      
      <div className="relative z-10">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl shadow-sm mb-4 flex items-center justify-center group-hover:-translate-y-1 transition-all duration-500 overflow-hidden border border-gray-50">
          {typeof logo === 'string' ? (
            <img src={logo} alt={`${name} Logo`} className="w-full h-full object-contain p-2" />
          ) : (
            <Shield size={20} className="text-brand" />
          )}
        </div>
        <h3 className="text-[9px] md:text-[10px] font-display font-bold text-ink leading-[1.2] mb-2 group-hover:text-brand transition-colors line-clamp-2">{RedBK(name)}</h3>
        <p className="text-[8px] font-black text-ink/70 tracking-wider flex items-center gap-1">
          <Globe size={10} className="text-brand/60" />
          {url.replace('https://', '').replace('www.', '').split('/')[0]}
        </p>
      </div>

      {isAvailable && (
        <div className="mt-4 relative z-10 flex items-center gap-2 text-[7px] font-bold uppercase tracking-widest text-brand group-hover:gap-4 transition-all">
          <span className="h-[1px] w-4 bg-brand/30 group-hover:bg-brand transition-all"></span>
          Explore
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
      className="min-h-screen bg-background pt-12 pb-40"
    >

      {/* Story & Vision */}
      <section className="px-6 sm:px-12 mb-40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          {/* Photo Container - First on Mobile */}
          <div className="relative order-1 md:order-2">
            {/* Background Accent */}
            <div className="absolute inset-0 bg-brand/5 rounded-[3rem] translate-x-8 translate-y-8" />
            
            {/* Main Image Container */}
            <div className="relative aspect-[4/3] w-full rounded-[3rem] border border-white shadow-2xl overflow-hidden z-10">
              <img 
                src="/images/about_logos/bhagwansir.jpg" 
                alt="Dr. Adv. Er. Bhagwan Elmame - Secretary" 
                className="w-full h-full object-cover"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-60" />
            </div>

            {/* Profile Label */}
            <div className="absolute -bottom-6 -right-4 md:-right-6 bg-white p-4 md:p-6 rounded-[1.5rem] shadow-2xl border border-gray-50 z-20 max-w-[280px]">
              <div className="text-lg md:text-xl font-display font-black uppercase text-ink leading-tight mb-2">DR. ADV. ER. <br/> BHAGWAN ELMAME</div>
              <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand flex items-center gap-2">
                <span className="w-6 h-[1px] bg-brand"></span>
                {RedBK("Secretary - BK Education And Welfare Society")}
              </div>
            </div>
          </div>

          {/* Info Container - Second on Mobile */}
          <div className="space-y-10 order-2 md:order-1 mt-12 md:mt-0">
            <div className="space-y-6">
              <p className="text-2xl font-body font-medium leading-relaxed text-ink/90 border-l-[6px] border-brand pl-8 py-2">
                Our journey started with a simple dream: to give every child a chance to succeed. Since 2009, we've evolved into a thriving ecosystem of excellence.
              </p>
              <p className="text-lg font-body leading-relaxed text-muted/80 max-w-xl">
                We believe that education is not just about passing exams, but about building character and confidence. For more than 15+ years, we have worked hard to help students learn and grow through our different schools.
              </p>
            </div>

            <div className="flex gap-10">
              <div>
                <div className="text-4xl font-display font-black text-ink">15+</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted">Years of Legacy</div>
              </div>
              <div className="w-[1px] h-12 bg-gray-100"></div>
              <div>
                <div className="text-4xl font-display font-black text-ink">10K+</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted">Students Guided</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Network */}
      <section className="px-6 sm:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 text-center">
            <h2 className="text-4xl md:text-5xl font-display font-black text-ink uppercase tracking-tighter leading-none">
              Educational <span className="text-brand">Network</span>
            </h2>
            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="h-[2px] w-12 bg-brand/20"></div>
              <p className="text-muted font-medium uppercase tracking-[0.2em] text-[10px]">Excellence in Education Since 2009</p>
              <div className="h-[2px] w-12 bg-brand/20"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 md:gap-4">
            {networks.map((org, i) => (
              <OrganizationCard key={i} {...org} />
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};
