import { useLayoutEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BackgroundImg from "@/components/images/unnamed (10).webp";

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
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
      const pairs = [".aboutus-pair-1", ".aboutus-pair-2", ".aboutus-pair-3"];
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
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-[#050505]">

      {/* TOP GRADIENT BLEND */}
      <div className="absolute top-0 left-0 w-full h-48 z-50 bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none" />

      {/* DATA INITIALIZATION HUD */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-12 left-12 z-50 flex flex-col gap-1 pointer-events-none"
      >
        <div className="flex items-center gap-2">
          <motion.span animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }} className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
          <p className="text-[10px] text-white/40 uppercase tracking-[0.5em] font-bold">{t("aboutus_page.hud_module")}</p>
        </div>
        <span className="text-[8px] text-white/20 uppercase tracking-[0.3em] ml-3">{t("aboutus_page.hud_version")}</span>
      </motion.div>

      {/* BRAND MASK */}
      <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
        <h1 ref={maskRef} className="text-[15vw] font-bold text-white uppercase tracking-[-0.02em] leading-none drop-shadow-xl">{t("aboutus_page.mask")}</h1>
      </div>

      {/* BACKGROUND & READABILITY */}
      <div className="absolute inset-0 z-0">
        <img ref={imageRef} src={BackgroundImg} className="h-full w-full object-cover" alt="About Us" />
        <div ref={overlayRef} className="absolute inset-0 z-10 bg-black/20" />
        <div className="absolute inset-0 z-20 bg-gradient-to-tr from-black/80 via-black/20 to-transparent" />
      </div>

      {/* CONTENT LAYER */}
      <div className="relative z-30 flex h-full w-full items-end justify-start p-12 md:p-32">

        {/* Pair 1 */}
        <div className="aboutus-pair-1 absolute flex flex-col items-start text-left gap-6 max-w-5xl pb-16 opacity-0">
          <h2 className="text-[70px] font-medium text-white leading-[1.05] uppercase tracking-tight drop-shadow-2xl" dangerouslySetInnerHTML={{ __html: t("aboutus_page.pair1_title").replace("<1>", '<span class="text-amber-400">').replace("</1>", "</span>").replace("<br/>", "<br/>") }} />
          <div className="flex items-start">
            <motion.div initial={{ height: 0 }} whileInView={{ height: '100%' }} transition={{ duration: 1 }} className="w-px bg-amber-400/30 mr-8" />
            <p className="text-[30px] font-medium text-white/60 leading-snug max-w-3xl">
              {t("aboutus_page.pair1_text")}
            </p>
          </div>
        </div>

        {/* Pair 2 */}
        <div className="aboutus-pair-2 absolute flex flex-col items-start text-left gap-6 max-w-5xl opacity-0 pb-16">
          <h2 className="text-[70px] font-medium text-white leading-[1.05] uppercase tracking-tight drop-shadow-2xl" dangerouslySetInnerHTML={{ __html: t("aboutus_page.pair2_title").replace("<1>", '<span class="text-amber-400">').replace("</1>", "</span>").replace("<br/>", "<br/>") }} />
          <div className="flex items-start">
            <motion.div initial={{ height: 0 }} whileInView={{ height: '100%' }} transition={{ duration: 1 }} className="w-px bg-amber-400/30 mr-8" />
            <p className="text-[30px] font-medium text-white/60 leading-snug max-w-3xl">
              {t("aboutus_page.pair2_text")}
            </p>
          </div>
        </div>

        {/* Pair 3 */}
        <div className="aboutus-pair-3 absolute flex flex-col items-start text-left gap-6 max-w-5xl opacity-0 pb-16">
          <h2 className="text-[70px] font-medium text-white leading-[1.05] uppercase tracking-tight drop-shadow-2xl" dangerouslySetInnerHTML={{ __html: t("aboutus_page.pair3_title").replace("<1>", '<span class="text-amber-400">').replace("</1>", "</span>").replace("<br/>", "<br/>") }} />
          <div className="flex items-start">
            <motion.div initial={{ height: 0 }} whileInView={{ height: '100%' }} transition={{ duration: 1 }} className="w-px bg-amber-400/30 mr-8" />
            <p className="text-[30px] font-medium text-white/60 leading-snug max-w-3xl">
              {t("aboutus_page.pair3_text")}
            </p>
          </div>
        </div>

      </div>

      {/* BOTTOM GRADIENT BLEND */}
      <div className="absolute bottom-0 left-0 w-full h-32 z-50 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
};

export default AboutUs;
