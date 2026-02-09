import React from 'react';
import Starry from "@/components/ui/Starry";
import Into from "@/components/images/into.png";
import Into1 from "@/components/images/intoup.png";
import Into2 from "@/components/images/into below.png";

export default function About() {
  return (
    <div className="relative min-h-screen bg-[#050505] py-50 px-6 overflow-hidden">
      <Starry />
      
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col gap-40">
        
        {/* Card 1: Introduction */}
        <div className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-zinc-900/20 p-12 pb-20 backdrop-blur-xl transition-all hover:border-amber-500/60">
          <div 
            className="absolute inset-0 z-0 opacity-60 mix-blend-screen pointer-events-none"
            style={{ 
              backgroundImage: `url(${Into1})`,
              backgroundSize: 'cover',
              backgroundPosition: 'bottom'
            }} 
          />
          <div className="relative z-10 text-center">
            <h3 className="text-amber-400 text-sm font-bold tracking-[0.4em] uppercase pt-5 mb-8">Introduction</h3>
            <p className="text-white/80 text-xl leading-relaxed max-w-3xl mx-auto pt-3 font-light">
              At GENESIS, we are committed to building transformative solutions that bridge technology, business, and human potential. Our mission is to empower organizations and individuals through innovation-driven services, scalable digital solutions, and forward-thinking collaboration. By combining strategic expertise with technical excellence, we aim to create sustainable value in an evolving global landscape.
            </p>
          </div>
        </div>

        {/* Card 2: Shared Leadership */}
        <div className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-zinc-900/20 p-12 backdrop-blur-xl transition-all hover:border-amber-500/60">
          <div 
            className="absolute inset-0 z-0 opacity-60 mix-blend-screen pointer-events-none"
            style={{ 
              backgroundImage: `url(${Into2})`,
              backgroundSize: 'cover',
              backgroundPosition: 'top'
            }} 
          />
          <div className="relative z-10">
            <h3 className="text-center text-amber-400 text-sm font-bold tracking-[0.4em] pt-4 uppercase mb-8">Shared Leadership with Edify Co. Ltd.</h3>
            <p className="text-center text-white/80 text-xl leading-relaxed pt-2 mb-12 font-light">
              GENESIS operates as part of a broader leadership vision shared with Edify Co. Ltd. (Japan), positioning us within a dynamic and future-focused group. Together, we combine complementary strengths to drive innovation across multiple industries and geographies.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-white/10">
              <div className="text-center">
                <h4 className="text-amber-400 font-light font-['Noto_Sans'] text-sm uppercase tracking-widest mb-4">Genesis Focus</h4>
                <p className="text-white/50 text-base leading-relaxed">Sales Enablement • Product Development (Software & Hardware) • Workforce Reskilling • Crypto & Blockchain Solutions • Technology Project Outsourcing</p>
              </div>
              <div className="text-center flex flex-col items-center">
                <h4 className="text-amber-400 text-sm font-light font-['Noto_Sans'] uppercase tracking-widest mb-4">Edify Co. Ltd. Focus</h4>
                <p className="text-white/50 text-base leading-relaxed mb-6">Artificial Intelligence • Drone Technology • GX (Green Transformation) Initiatives</p>
                <button className="px-6 py-2 cursor-pointer rounded-full bg-white/5 border border-white/10 text-xs text-white/60 hover:bg-white/10 transition-all">Visit Edify ↗</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}