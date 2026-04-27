import React from 'react';
import { BrandLogo } from './BrandLogo';

interface FormLayoutProps {
  children: React.ReactNode;
  title: string;
}

export const FormLayout: React.FC<FormLayoutProps> = ({ children, title }) => {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex flex-col items-center justify-center text-center mb-8 border-b-2 border-ink/10 pb-6">
        <BrandLogo className="w-16 h-16 sm:w-20 sm:h-20 mb-4" />
        <h1 className="text-2xl sm:text-3xl font-display font-black text-ink uppercase tracking-tighter leading-none"><span className="text-red-600">BK</span> Career Academy</h1>
        <p className="text-[8px] sm:text-[10px] font-bold text-brand mt-2 tracking-widest leading-relaxed">
          | नहि ज्ञानेन सदृशं पवित्रमिह विद्यते |
        </p>
      </div>

      {/* Form Title */}
      <div className="text-center mb-6">
        <h2 className="text-xl sm:text-2xl font-display font-black text-ink uppercase tracking-tighter inline-block border-b-4 border-brand pb-1">
          {title}
        </h2>
      </div>

      {/* Content */}
      <div className="flex-1">
        {children}
      </div>

      {/* Footer */}
      <div className="mt-10 pt-8 border-t-2 border-ink/10 text-center">
        <div className="space-y-2">
          <p className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-ink/40">Connect With Us</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-4 text-xs sm:text-sm font-black text-brand">
            <span>+91 80801 95558</span>
            <span className="hidden sm:inline text-ink/10">•</span>
            <span>+91 88883 01363</span>
          </div>
        </div>
        <div className="mt-6">
          <p className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-ink/40 mb-1">Academy Address</p>
          <p className="text-[10px] font-medium text-muted/80 leading-relaxed max-w-sm mx-auto px-4 uppercase italic">
            2nd Floor, Gajanan Plaza, Gharpure Ghat Road, Ashok Stambh,
            Nashik, Maharashtra, <span className="text-red-600">BK</span> Educational & Welfare Society
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormLayout;
