import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldCheck, Scale, RefreshCcw, FileText } from 'lucide-react';

interface LegalPageProps {
  type: 'csr' | 'privacy' | 'refund' | 'terms';
  onBack: () => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type, onBack }) => {
  const content = {
    csr: {
      title: "CSR Policy",
      icon: <ShieldCheck className="text-brand" size={48} />,
      text: "Our Corporate Social Responsibility (CSR) policy outlines our commitment to education equity and community welfare. We dedicate 2% of our annual profits to scholarships for students from marginalized backgrounds and local infrastructure projects in Nashik."
    },
    privacy: {
      title: "Privacy Policy",
      icon: <FileText className="text-brand" size={48} />,
      text: "At BK Career Academy, we respect your privacy. We collect only necessary information to facilitate your academic journey. Your data is encrypted and never shared with third-party marketing agencies. You have full control over your personal data at all times."
    },
    refund: {
      title: "Refund Rules",
      icon: <RefreshCcw className="text-brand" size={48} />,
      text: "Course fees are non-refundable after the first 7 days of the batch start date. Within the first 7 days, a 90% refund is available if the student is not satisfied with the teaching methodology. All refund requests must be submitted in writing to the corporate office."
    },
    terms: {
      title: "Terms & Conditions",
      icon: <Scale className="text-brand" size={48} />,
      text: "By enrolling at BK Career Academy, students agree to maintain academic integrity and discipline. Access to online portals and materials is for individual use only. Any unauthorized distribution of academy materials will lead to immediate cancellation of admission."
    }
  }[type];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-screen p-8 md:p-16 max-w-4xl mx-auto"
    >
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-ink/40 hover:text-brand transition-colors mb-12 font-mono uppercase tracking-widest text-xs font-bold"
      >
        <ArrowLeft size={16} /> Back to Home
      </button>

      <div className="flex items-center gap-6 mb-8">
        <div className="w-20 h-20 bg-ink flex items-center justify-center border-4 border-ink shadow-[8px_8px_0_0_#F7931A]">
          {content.icon}
        </div>
        <h1 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter text-ink">
          {content.title}
        </h1>
      </div>

      <div className="prose prose-lg max-w-none bg-white p-10 border-4 border-ink shadow-[12px_12px_0_0_#1A1A1A] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-brand" />
        <p className="font-body text-lg leading-relaxed text-ink/80 whitespace-pre-wrap">
          {content.text.split('BK').map((part, i, arr) => (
            <React.Fragment key={i}>
              {part}
              {i < arr.length - 1 && <span className="text-red-600">BK</span>}
            </React.Fragment>
          ))}
        </p>
        
        <div className="mt-12 pt-8 border-t-2 border-ink/5">
          <p className="text-xs font-mono uppercase tracking-widest text-muted">
            Last Updated: April 2026 • © <span className="text-red-600">BK</span> Career Academy Education & Welfare Society
          </p>
        </div>
      </div>
    </motion.div>
  );
};
