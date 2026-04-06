import { useRef, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsMobile } from '@/lib/useIsMobile';
import HiroshimaImg from '@/components/images/hiroshima.jpg';

gsap.registerPlugin(ScrollTrigger);

const HAKATA_IMG =
  'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=900&q=85&auto=format&fit=crop';
const SAPPORO_IMG =
  'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=900&q=85&auto=format&fit=crop';

const offices = [
  { key: 'hiroshima', img: HiroshimaImg, number: '01', isHQ: true  },
  { key: 'hakata',    img: HAKATA_IMG,   number: '02', isHQ: false },
  { key: 'sapporo',   img: SAPPORO_IMG,  number: '03', isHQ: false },
];

export default function JapanOffices() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        '.jo-header',
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.jo-header',
            start: 'top 88%',
          },
        }
      );

      // Cards stagger
      offices.forEach((_, i) => {
        gsap.fromTo(
          `.jo-card-${i}`,
          { opacity: 0, y: 70, scale: 0.94 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'expo.out',
            delay: i * 0.14,
            scrollTrigger: {
              trigger: `.jo-card-${i}`,
              start: 'top 90%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#050505] border-t border-white/5 py-24 sm:py-32 px-4 sm:px-6 overflow-hidden"
    >
      {/* Ambient amber glow — top center */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[260px] bg-amber-400/[0.055] blur-[80px]"
      />
      {/* Subtle horizontal rule glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent"
      />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ── Header ─────────────────────────────────────── */}
        <div className="jo-header mb-14 sm:mb-20">
          <span className="inline-flex items-center gap-2.5 text-amber-400 text-[10px] font-bold uppercase tracking-[0.28em] mb-5">
            <span className="w-6 h-px bg-amber-400/70" />
            {t('japanOfficesSection.eyebrow')}
            <span className="w-6 h-px bg-amber-400/70" />
          </span>

          <h2 className="text-white font-['Inter'] font-black text-4xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-[-0.03em] whitespace-pre-line mb-5">
            {t('japanOfficesSection.title')}
          </h2>

          <p className="text-white/45 text-sm sm:text-base max-w-lg leading-relaxed">
            {t('japanOfficesSection.subtitle')}
          </p>
        </div>

        {/* ── Cards ──────────────────────────────────────── */}
        <div className={`grid gap-5 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
          {offices.map((office, i) => (
            <article
              key={office.key}
              className={`jo-card-${i} group relative flex flex-col rounded-[22px] overflow-hidden border border-white/[0.08] bg-[#0c0c0c] hover:border-amber-400/20 transition-colors duration-700`}
            >
              {/* ─ Image panel ─ */}
              <div className="relative h-64 sm:h-72 overflow-hidden shrink-0">
                <img
                  src={office.img}
                  alt={t(`japanOfficesSection.offices.${office.key}.city`)}
                  className="w-full h-full object-cover scale-[1.03] group-hover:scale-110 transition-transform duration-[1200ms] ease-out"
                  loading="lazy"
                />

                {/* Gradient: bottom-heavy so city name stays legible */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-[#0c0c0c]/25 to-transparent" />

                {/* Sequence number — top-left */}
                <span className="absolute top-4 left-4 text-white/20 text-[11px] font-black tracking-[0.22em] font-['Inter'] select-none">
                  {office.number}
                </span>

                {/* HQ / Satellite badge — top-right */}
                <div className="absolute top-4 right-4">
                  {office.isHQ ? (
                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-amber-400 bg-amber-400/15 border border-amber-400/30 rounded-full px-3 py-1">
                      {t('japanOfficesSection.badges.hq')}
                    </span>
                  ) : (
                    <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/50 bg-white/5 border border-white/10 rounded-full px-3 py-1">
                      {t('japanOfficesSection.badges.satellite')}
                    </span>
                  )}
                </div>

                {/* City name — anchored to bottom of image */}
                <div className="absolute bottom-4 left-5 right-5">
                  <h3 className="text-white font-['Inter'] font-black text-2xl sm:text-3xl leading-none tracking-[-0.02em]">
                    {t(`japanOfficesSection.offices.${office.key}.city`)}
                  </h3>
                  <p className="text-white/35 text-[9px] font-bold uppercase tracking-[0.22em] mt-1">
                    {t(`japanOfficesSection.offices.${office.key}.prefecture`)}
                  </p>
                </div>
              </div>

              {/* ─ Text panel ─ */}
              <div className="flex flex-col justify-between p-5 pt-4 flex-1 border-t border-white/[0.06]">
                <p className="text-white/50 text-[13px] sm:text-sm leading-relaxed">
                  {t(`japanOfficesSection.offices.${office.key}.description`)}
                </p>

                {/* Active status indicator */}
                <div className="flex items-center gap-2 mt-5">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${office.isHQ ? 'bg-amber-400' : 'bg-white/30'}`}
                  />
                  <span className="text-white/25 text-[9px] font-bold uppercase tracking-[0.22em]">
                    {office.isHQ
                      ? t('japanOfficesSection.badges.hq')
                      : t('japanOfficesSection.badges.satellite')}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
