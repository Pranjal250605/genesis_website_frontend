import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Vid from "@/components/images/japan.mp4";
import JapanMap from "@/components/images/istockphoto-537287287-612x612.jpg";
import EdifyLogo from "@/components/images/[TP]Edify_logo_white_JAPAN 1.png";

function Hero() {
  const { t } = useTranslation();
  const [coords, setCoords] = useState({ lat: '22.00', lng: '30.00' });

  useEffect(() => {
    const interval = setInterval(() => {
      const newLat = (22 + Math.random() * 0.4).toFixed(2);
      const newLng = (30 + Math.random() * 0.6).toFixed(2);
      setCoords({ lat: newLat, lng: newLng });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex min-h-screen items-center overflow-hidden bg-[#050505]">
      {/* 1. Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover"
      >
        <source src={Vid} type="video/mp4" />
      </video>
      
      {/* 2. Overlays */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gray-900/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent" />
      </div>

      {/* 3. Content Container */}
      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-12 lg:px-24">
        <div>
          {/* Metadata Row */}
          <div className="flex w-full items-end justify-between mb-8">
  
            {/* LEFT GROUP */}
            <div className="flex flex-col gap-6">
              <div className="h-px w-12 bg-amber-400/60" />

              <div className="flex items-center gap-3">
                <h2 className="text-amber-400 text-lg tracking-[0.2em] font-medium uppercase">
                  {t('hero.group')}
                </h2>
                <img
                  src={JapanMap}
                  alt="Japan Location"
                  className="h-5 w-auto object-contain opacity-90 grayscale-[20%]"
                />
              </div>
            </div>

            {/* RIGHT GROUP: Coordinates (Text Updated) */}
            <div className="flex flex-col text-right min-w-[220px]">
              <h1 className="text-amber-400 text-xl tracking-wider tabular-nums">
                35°41'{coords.lat}"N 139°41'{coords.lng}"E
              </h1>
              <p className="text-[12px] uppercase tracking-widest text-white/40">
                {t('hero.location')}
              </p>
            </div>
            
          </div>
          
          <div className="w-full h-px bg-white/40 mt-6 mb-12" />

          <div className='ml-14'>
            <h1
              className="text-6xl md:text-7xl font-bold leading-[1.1] text-amber-400"
              dangerouslySetInnerHTML={{ __html: t('hero.title') }}
            />

            <p
              className="mt-6 text-xl md:text-2xl font-normal leading-normal tracking-wide text-gray-100"
              dangerouslySetInnerHTML={{ __html: t('hero.subtitle') }}
            />

            <div className="mt-10">
              <a
                href="https://edify.jp/"
                target="_blank"
                rel="noopener noreferrer"
                className="
                group relative flex items-center justify-center gap-4 w-fit whitespace-nowrap
                rounded-full border border-white/25
                bg-[#556982] backdrop-blur-xl
                px-10 py-5
                text-lg sm:text-xl font-bold tracking-[0.15em] text-white uppercase
                transition-all duration-300 ease-out
                hover:bg-[#60748e] hover:border-white/40 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(85,105,130,0.5)]
                active:scale-95
              ">
                <img
                  src={EdifyLogo}
                  alt="Edify Logo"
                  className="h-9 w-auto object-contain"
                />
                {t('hero.cta')}
                <svg
                  width="16" height="16" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2.5"
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
         <div className="animate-bounce text-amber-400/50">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
               <path d="M19 9l-7 7-7-7" />
            </svg>
         </div>
      </div>
    </div>
  );
}

export default Hero;