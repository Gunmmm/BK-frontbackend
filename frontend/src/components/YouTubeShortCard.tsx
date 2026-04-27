import React from 'react';
import { motion } from 'framer-motion';

interface YouTubeShortCardProps {
  videoId: string;
  title: string;
  index: number;
}

const YouTubeShortCard: React.FC<YouTubeShortCardProps> = ({ videoId, title, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className="group relative bg-white border-4 border-ink shadow-[8px_8px_0_0_#1A1A1A] hover:shadow-[12px_12px_0_0_#F7931A] transition-all duration-300 aspect-[4/5] overflow-hidden rounded-xl"
    >
      <div className="absolute inset-0 bg-[#1a1a1a]">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&rel=0&modestbranding=1&iv_load_policy=3`}
          title={title}
          className="w-[150%] h-[150%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-none"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      
      {/* Overlay for hover effect or title if needed */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <p className="text-white text-xs font-bold uppercase tracking-widest">{title}</p>
      </div>
    </motion.div>
  );
};

export default YouTubeShortCard;
