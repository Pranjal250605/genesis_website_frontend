import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Starry from "@/components/ui/Starry";
import MapImg from "@/components/images/publicFrame 76-topaz-enhance.png";
import JapanImg from "@/components/images/hiroshima.jpg";
import IndiaImg from "@/components/images/New-Delhi-India-War-Memorial-arch-Sir.webp";
import DubaiImg from "@/components/images/how_and_when_was_dubai_founded_d816846cf0.jpg";

gsap.registerPlugin(ScrollTrigger);

const stamps = [
  {
    name: "Hiroshima",
    subtitle: "Genesis Japan HQ",
    img: JapanImg,
    top: "10%",
    left: "93%",
  },
  {
    name: "New Delhi",
    subtitle: "Genesis India HQ",
    img: IndiaImg,
    top: "13%",
    left: "76%",
  },
  {
    name: "Dubai",
    subtitle: "Genesis Dubai HQ",
    badge: "Coming Soon",
    img: DubaiImg,
    top: "16%",
    left: "63%",
  },
];

export default function Global() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
        },
      });

      // Stagger the 3 stamp cards
      stamps.forEach((_, i) => {
        tl.fromTo(
          `.stamp-card-${i}`,
          { opacity: 0, y: 40, scale: 0.85 },
          { opacity: 1, y: 0, scale: 1, duration: 1, ease: "back.out(1.4)" },
          i * 1.0 
        );
      });

      tl.to({}, { duration: 0.8 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#050505]"
    >
      <Starry />

      <div className="relative z-10 h-full flex flex-col px-6">
        
        {/* 1. HEADER: Optimal padding to clear navbar but save space */}
        <div className="text-center pt-32 pb-2 shrink-0">
          <h2 className="text-white text-5xl lg:text-6xl font-bold font-['Inter'] mb-3">
            Global Footprint
          </h2>
          <p className="text-white/70 text-lg leading-7 mx-auto max-w-2xl">
            Operating across key international hubs, we connect innovation,
            technology, and strategy to deliver global impact.
          </p>
        </div>

        {/* 2. MAP CONTAINER: Constrained Width & Centered */}
        {/* max-w-6xl ensures it doesn't get too tall and go off-screen */}
        <div className="flex-1 flex items-start justify-center min-h-0 mt-8">
          <div className="relative w-full max-w-6xl">
            <img
              src={MapImg}
              alt="Global Map"
              className="w-full h-auto object-contain opacity-90"
            />

            {/* Cards */}
            {stamps.map((stamp, i) => (
              <div
                key={stamp.name}
                className={`stamp-card-${i} absolute w-36 opacity-0 bg-[#0a0a0a]/90 backdrop-blur-3xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl hover:border-amber-400/30 transition-colors duration-500`}
                style={{
                  top: stamp.top,
                  left: stamp.left,
                  transform: "translateX(-50%)",
                }}
              >
                <div className="relative h-20 w-full overflow-hidden border-b border-white/5">
                  <img
                    src={stamp.img}
                    alt={stamp.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/50 to-transparent" />
                </div>

                <div className="p-2.5">
                  <h3 className="text-white text-xs font-bold tracking-tight">
                    {stamp.name}
                  </h3>
                  <span className="text-amber-400/60 text-[8px] font-bold uppercase tracking-widest">
                    {stamp.subtitle}
                  </span>
                  {stamp.badge && (
                    <span className="mt-1.5 block text-[8px] font-bold uppercase tracking-widest text-amber-400 bg-amber-400/10 border border-amber-400/20 rounded-full px-2 py-0.5 w-fit">
                      {stamp.badge}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}