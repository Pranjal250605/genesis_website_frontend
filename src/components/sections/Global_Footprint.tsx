import React from 'react';
import Starry from "@/components/ui/Starry";
import MapImg from "@/components/images/globalfoot.png";
import { MapPin } from "lucide-react";

export default function Global() {
  const locations = [
    { name: "DUBAI", top: "47%", left: "57%", pinRight: true },
    { name: "INDIA", top: "43%", left: "73%", pinRight: false },
    { name: "JAPAN", top: "39%", left: "85%", pinRight: false },
  ];

  return (
    <div className="relative min-h-screen bg-[#050505] py-5 px-6 overflow-hidden flex flex-col items-center">
      <Starry />

      {/* 1. Header Section */}
      <div className="relative z-10 text-center max-w-4xl">
        <h2 className="text-white text-5xl lg:text-6xl font-bold font-['Inter'] mb-6">
          Global Footprint
        </h2>
        <p className="text-white/70 text-lg leading-7 mx-auto max-w-2xl">
          Operating across key international hubs, we connect innovation, 
          technology, and strategy to deliver global impact.
        </p>
      </div>

      {/* 2. Map Container */}
      <div className="relative z-10 w-full max-w-7xl">
        <div className="relative">
          {/* Main Golden Map Image */}
          <img 
            src={MapImg} 
            alt="Global Map" 
            className="w-full h-auto object-contain opacity-90"
          />

          {/* Location Tags - Using % for better responsiveness */}
          {locations.map((loc, idx) => (
            <div 
              key={idx}
              className="absolute flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 shadow-lg group hover:bg-white/20 transition-all cursor-default"
              style={{ top: loc.top, left: loc.left }}
            >
              {!loc.pinRight && (
                <MapPin size={14} className="text-red-500 fill-red-500 animate-pulse" />
              )}
              <span className="text-white text-[10px] font-bold tracking-widest uppercase font-['Noto_Sans']">
                {loc.name}
              </span>
              {loc.pinRight && (
                <MapPin size={14} className="text-red-500 fill-red-500 animate-pulse" />
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative Gradient Background behind the map */}
      <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-amber-500/10 to-transparent pointer-events-none" />
    </div>
  );
}