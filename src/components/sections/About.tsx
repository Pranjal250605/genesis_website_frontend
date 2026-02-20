import { useLayoutEffect, useRef } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BackgroundImg from "@/components/images/unnamed.webp";
import { useIsMobile } from '@/lib/useIsMobile';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const maskRef = useRef(null);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);
  const isMobile = useIsMobile();

  useLayoutEffect(() => {
    if (isMobile) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=700%",
          pin: true,
          scrub: 1,
        }
      });

      // 1. BLEND & REVEAL
      tl.to(overlayRef.current, { backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(3px)", duration: 2 }, 0);
      tl.fromTo(maskRef.current, { scale: 0.9, opacity: 1 }, { scale: 50, opacity: 0, ease: "power2.in", duration: 5 });
      tl.fromTo(imageRef.current, { scale: 1.2, filter: "brightness(0.5) grayscale(0.5)" }, { scale: 1, filter: "brightness(0.8) grayscale(0)", duration: 5 }, 0);

      // 2. TEXT SEQUENCING
      const pairs = [".pair-1", ".pair-2", ".pair-3"];
      pairs.forEach((pair, i) => {
        tl.fromTo(pair, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.5, ease: "expo.out" });
        tl.to({}, { duration: 3 }); // Reading pause

        if (i !== pairs.length - 1) {
          tl.to(pair, { opacity: 0, y: -40, duration: 1.2 });
        }
      });

      tl.to({}, { duration: 2 }); // Final buffer

    }, containerRef);
    return () => ctx.revert();
  }, [isMobile]);

  // ─── MOBILE: Premium sticky-card layout (no scroll hijacking) ───────────────
  if (isMobile) {
    return (
      <section className="relative w-full bg-[#050505]">

        {/* TOP GRADIENT BLEND */}
        <div className="absolute top-0 left-0 w-full h-24 z-[100] bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none" />

        {/* CARD 1 – image visible; pair-1 content — centered */}
        <div className="relative sticky top-0 min-h-screen flex flex-col justify-center items-center px-6 py-12 z-10 overflow-hidden">
          <img src={BackgroundImg} className="absolute inset-0 h-full w-full object-cover brightness-[0.45]" alt="city" />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/90 via-black/50 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/60 to-black/30" />

          <div className="relative z-10 pair-1 flex flex-col items-center text-center gap-4 max-w-xl mx-auto">
            <h2 className="text-[30px] font-medium text-white leading-[1.1] uppercase tracking-tight drop-shadow-2xl">
              <Trans
                i18nKey="aboutSection.pair1Title"
                components={{ 1: <span className="text-amber-400" />, br: <br /> }}
              />
            </h2>
            <motion.div initial={{ width: 0 }} whileInView={{ width: '3rem' }} transition={{ duration: 1 }} className="h-px bg-amber-400/30 mx-auto" />
            <p className="text-[15px] font-medium text-white/60 leading-relaxed text-center">
              {t('aboutSection.pair1Text')}
            </p>
          </div>
        </div>

        {/* CARD 2 – slides over card 1 — centered */}
        <div className="sticky top-0 min-h-screen flex flex-col justify-center items-center px-6 py-12 z-20 bg-gradient-to-br from-black via-zinc-950 to-[#1a1200]">
          <div className="pair-2 flex flex-col items-center text-center gap-4 max-w-xl mx-auto">
            <h2 className="text-[30px] font-medium text-white leading-[1.1] uppercase tracking-tight drop-shadow-2xl">
              <Trans
                i18nKey="aboutSection.pair2Title"
                components={{ 1: <span className="text-amber-400" />, br: <br /> }}
              />
            </h2>
            <motion.div initial={{ width: 0 }} whileInView={{ width: '3rem' }} transition={{ duration: 1 }} className="h-px bg-amber-400/30 mx-auto" />
            <p className="text-[15px] font-medium text-white/60 leading-relaxed text-center">
              {t('aboutSection.pair2Text')}
            </p>
          </div>
        </div>

        {/* CARD 3 – final opaque card — centered */}
        <div className="relative sticky top-0 min-h-screen flex flex-col justify-center items-center px-6 py-12 z-30 bg-gradient-to-br from-black via-zinc-950 to-[#1a1200]">
          <div className="pair-3 flex flex-col items-center text-center gap-4 max-w-xl mx-auto">
            <h2 className="text-[30px] font-medium text-white leading-[1.1] uppercase tracking-tight drop-shadow-2xl">
              <Trans
                i18nKey="aboutSection.pair3Title"
                components={{ 1: <span className="text-amber-400" />, br: <br /> }}
              />
            </h2>
            <motion.div initial={{ width: 0 }} whileInView={{ width: '3rem' }} transition={{ duration: 1 }} className="h-px bg-amber-400/30 mx-auto" />
            <p className="text-[15px] font-medium text-white/60 leading-relaxed text-center">
              {t('aboutSection.pair3Text')}
            </p>
          </div>
          {/* Bottom gradient on final card to blend into next section */}
          <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black to-transparent pointer-events-none" />
        </div>

      </section>
    );
  }

  // ─── DESKTOP: original layout (unchanged) ───────────────────────────────────
  return (
    <section ref={containerRef} className={`relative w-full overflow-hidden bg-[#050505] ${isMobile ? 'h-auto' : 'h-screen'}`}>

      {/* RECTANGLE LAYER BLUR: Blends Earth Hero */}
      <div className="absolute top-0 left-0 w-full h-48 z-50 bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none" />

      {/* DATA INITIALIZATION HUD */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-12 left-12 z-50 flex flex-col gap-1 pointer-events-none"
      >
      </motion.div>

      {/* BRAND MASK — nearly invisible on small screens, full opacity on desktop where GSAP takes over */}
      <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none opacity-5 md:opacity-100">
        <h1 ref={maskRef} className="text-[15vw] font-bold text-white uppercase tracking-[-0.02em] leading-none drop-shadow-xl">{t('aboutSection.mask')}</h1>
      </div>

      {/* BACKGROUND & READABILITY */}
      <div className="absolute inset-0 z-0">
        <img ref={imageRef} src={BackgroundImg} className="h-full w-full object-cover" alt="city" />
        <div ref={overlayRef} className="absolute inset-0 z-10 bg-black/20" />
        <div className="absolute inset-0 z-20 bg-gradient-to-tr from-black/80 via-black/20 to-transparent" />
      </div>

      {/* CONTENT LAYER */}
      <div className={`relative z-30 flex w-full p-6 sm:p-12 md:p-32 ${isMobile ? 'flex-col gap-12 py-20' : 'h-full items-end justify-start'}`}>

        {/* Pair 1 */}
        <div className={`pair-1 flex flex-col items-start text-left gap-3 sm:gap-6 max-w-5xl pb-8 sm:pb-16 ${isMobile ? 'relative opacity-100' : 'absolute opacity-0'}`}>
          <h2 className="text-[28px] sm:text-[50px] md:text-[70px] font-medium text-white leading-[1.05] uppercase tracking-tight drop-shadow-2xl">
            <Trans
              i18nKey="aboutSection.pair1Title"
              components={{
                1: <span className="text-amber-400" />,
                br: <br />
              }}
            />
          </h2>
          <div className="flex items-start">
            <motion.div initial={{ height: 0 }} whileInView={{ height: '100%' }} transition={{ duration: 1 }} className="w-px bg-amber-400/30 mr-4 sm:mr-8" />
            <p className="text-[16px] sm:text-[22px] md:text-[30px] font-medium text-white/60 leading-snug max-w-3xl">
              {t('aboutSection.pair1Text')}
            </p>
          </div>
        </div>

        {/* Pair 2 */}
        <div className={`pair-2 flex flex-col items-start text-left gap-3 sm:gap-6 max-w-5xl pb-8 sm:pb-16 ${isMobile ? 'relative opacity-100' : 'absolute opacity-0'}`}>
          <h2 className="text-[28px] sm:text-[50px] md:text-[70px] font-medium text-white leading-[1.05] uppercase tracking-tight drop-shadow-2xl">
            <Trans
              i18nKey="aboutSection.pair2Title"
              components={{
                1: <span className="text-amber-400" />,
                br: <br />
              }}
            />
          </h2>
          <div className="flex items-start">
            <motion.div initial={{ height: 0 }} whileInView={{ height: '100%' }} transition={{ duration: 1 }} className="w-px bg-amber-400/30 mr-4 sm:mr-8" />
            <p className="text-[16px] sm:text-[22px] md:text-[30px] font-medium text-white/60 leading-snug max-w-3xl">
              {t('aboutSection.pair2Text')}
            </p>
          </div>
        </div>

        {/* Pair 3 */}
        <div className={`pair-3 flex flex-col items-start text-left gap-3 sm:gap-6 max-w-5xl pb-8 sm:pb-16 ${isMobile ? 'relative opacity-100' : 'absolute opacity-0'}`}>
          <h2 className="text-[28px] sm:text-[50px] md:text-[70px] font-medium text-white leading-[1.05] uppercase tracking-tight drop-shadow-2xl">
            <Trans
              i18nKey="aboutSection.pair3Title"
              components={{
                1: <span className="text-amber-400" />,
                br: <br />
              }}
            />
          </h2>
          <div className="flex items-start">
            <motion.div initial={{ height: 0 }} whileInView={{ height: '100%' }} transition={{ duration: 1 }} className="w-px bg-amber-400/30 mr-4 sm:mr-8" />
            <p className="text-[16px] sm:text-[22px] md:text-[30px] font-medium text-white/60 leading-snug max-w-3xl">
              {t('aboutSection.pair3Text')}
            </p>
          </div>
        </div>

      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 z-50 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
};

export default About;
