import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Starry from "@/components/ui/Starry";
import { useIsMobile } from '@/lib/useIsMobile';
import Core_img from "@/components/images/core_img.png";
import GreenTransImg from "@/components/images/Image (AI Analytics).png";
import OutsourcingImg from "@/components/images/Image (Business Solutions).png";
import CryptoImg from "@/components/images/Image (Cybersecurity).png";
import ReskillingImg from "@/components/images/reskilling.png";
import DroneImg from "@/components/images/dronee.png";
import { Target, BarChart3, ShieldCheck, Clock, Radar, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Core() {
    const { t } = useTranslation();
    const sectionRef = useRef<HTMLElement>(null);
    const isMobile = useIsMobile();
    const [activeCard, setActiveCard] = useState<number | null>(null);

    const capabilities = [
        {
            key: 'greenTransformation',
            thumb: GreenTransImg,
            icon: Target,
            clients: "220+",
            projects: "580+"
        },
        {
            key: 'outsourcing',
            thumb: OutsourcingImg,
            icon: BarChart3,
            clients: "150+",
            projects: "340+"
        },
        {
            key: 'crypto',
            thumb: CryptoImg,
            icon: ShieldCheck,
            clients: "180+",
            projects: "420+"
        },
        {
            key: 'reskilling',
            thumb: ReskillingImg,
            icon: Clock,
            clients: "190+",
            projects: "500+"
        },
        {
            key: 'drone',
            thumb: DroneImg,
            icon: Radar,
            clients: "90+",
            projects: "210+"
        }
    ];

    // Lock body scroll when modal is open
    useEffect(() => {
        if (activeCard !== null) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [activeCard]);

    useLayoutEffect(() => {
        if (isMobile) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=100%",
                    pin: true,
                    scrub: 1,
                }
            });

            const cards = gsap.utils.toArray<HTMLElement>(".core-card");

            cards.forEach((card, i) => {
                tl.fromTo(card,
                    { opacity: 0, y: 60 },
                    { opacity: 1, y: 0, duration: 1, ease: "expo.out" },
                    i * 0.3
                );
            });

            tl.to({}, { duration: 0.5 });

        }, sectionRef);

        return () => ctx.revert();
    }, [isMobile]);

    return (
        <>
        <section ref={sectionRef} className={`relative w-full bg-[#050505] py-12 sm:py-24 px-4 sm:px-10 overflow-hidden ${isMobile ? 'h-auto' : 'h-screen'}`}>

            {/* 1. NEBULA BACKGROUND - Optimized for Glassmorphism */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <img
                    src={Core_img}
                    alt="Core Background"
                    className="w-full h-full object-cover opacity-100 scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] opacity-100" />
            </div>

            <Starry />

            <div className="relative z-10 w-full max-w-8xl mx-auto h-full flex flex-col">
                {/* HEADER */}
                <div className="text-center mb-6 sm:mb-12">
                    <span className="text-amber-400 text-xs font-bold uppercase tracking-[0.6em] mb-2 sm:mb-4 block">
                        {t('coreSection.eyebrow')}
                    </span>
                    <h2 className="text-white text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-4 sm:mb-8">
                        {t('coreSection.title')}
                    </h2>
                    <p className="text-white/50 text-sm sm:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
                        <Trans
                            i18nKey="coreSection.subtitle"
                            components={{
                                1: <span className="text-amber-400" />
                            }}
                        />
                    </p>
                </div>

                {/* TRANSPARENT GLASS CARDS */}
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-6 flex-1 items-start">
                    {capabilities.map((item, index) => (
                        <div
                            key={index}
                            className={`core-card ${isMobile ? 'opacity-100' : 'opacity-0'} group relative bg-white/[0.03] backdrop-blur-3xl rounded-[20px] sm:rounded-[32px] border border-white/10 overflow-hidden transition-all duration-500 hover:border-amber-400/30 flex flex-col shadow-2xl ${isMobile ? 'cursor-pointer active:scale-95 active:border-amber-400/40' : ''}`}
                            onClick={isMobile ? () => setActiveCard(index) : undefined}
                        >

                            {/* IMAGE SECTION */}
                            <div className="relative h-24 sm:h-44 w-full overflow-hidden border-b border-white/5">
                                <img
                                    src={item.thumb}
                                    alt={t(`coreSection.capabilities.${item.key}.title`)}
                                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 opacity-80"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/40 to-transparent" />

                                {/* ICON BADGE */}
                                <div className="absolute bottom-2 left-3 sm:bottom-4 sm:left-6 w-7 h-7 sm:w-10 sm:h-10 bg-amber-400/10 backdrop-blur-md rounded-lg sm:rounded-xl flex items-center justify-center border border-amber-400/20">
                                    <item.icon size={18} className="text-amber-400" strokeWidth={2.5} />
                                </div>

                                {/* Mobile tap hint */}
                                {isMobile && (
                                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-amber-400/20 border border-amber-400/30 flex items-center justify-center">
                                        <span className="text-amber-400 text-[10px] font-bold">+</span>
                                    </div>
                                )}
                            </div>

                            <div className="p-3 sm:p-6 pt-3 sm:pt-5 flex flex-col flex-1">
                                <h3 className="text-white text-sm sm:text-lg font-bold mb-1 tracking-tight">{t(`coreSection.capabilities.${item.key}.title`)}</h3>
                                <span className="text-amber-400/60 text-[8px] sm:text-[10px] font-bold uppercase tracking-widest mb-2 sm:mb-4 block">
                                    {t(`coreSection.capabilities.${item.key}.tag`)}
                                </span>

                                <p className="text-white/40 text-[10px] sm:text-[12px] font-medium leading-relaxed mb-3 sm:mb-6 flex-1 hidden sm:block">
                                    {t(`coreSection.capabilities.${item.key}.desc`)}
                                </p>

                                {/* STATS FOOTER */}
                                <div className="flex gap-4 sm:gap-8 pt-3 sm:pt-5 border-t border-white/10 mt-auto">
                                    <div>
                                        <div className="text-amber-400 text-sm sm:text-xl font-bold tracking-tighter">{item.clients}</div>
                                        <div className="text-white/20 text-[8px] sm:text-[9px] font-bold uppercase tracking-widest mt-1">{t('coreSection.stats.clients')}</div>
                                    </div>
                                    <div>
                                        <div className="text-amber-400 text-sm sm:text-xl font-bold tracking-tighter">{item.projects}</div>
                                        <div className="text-white/20 text-[8px] sm:text-[9px] font-bold uppercase tracking-widest mt-1">{t('coreSection.stats.projects')}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* ─── MOBILE FULL-SCREEN DETAIL MODAL ─────────────────────────────────── */}
        <AnimatePresence>
            {isMobile && activeCard !== null && (() => {
                const item = capabilities[activeCard];
                const Icon = item.icon;
                return (
                    <motion.div
                        key="core-modal"
                        className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col overflow-y-auto"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 40 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setActiveCard(null)}
                            className="absolute top-5 right-5 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white active:scale-90 transition-transform"
                            aria-label="Close"
                        >
                            <X size={20} strokeWidth={2} />
                        </button>

                        {/* Hero image */}
                        <div className="relative w-full h-56 shrink-0 overflow-hidden">
                            <img
                                src={item.thumb}
                                alt={t(`coreSection.capabilities.${item.key}.title`)}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-transparent" />

                            {/* Icon badge */}
                            <div className="absolute bottom-5 left-5 w-11 h-11 bg-amber-400/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-amber-400/20">
                                <Icon size={22} className="text-amber-400" strokeWidth={2.5} />
                            </div>
                        </div>

                        {/* Content — vertically and horizontally centered */}
                        <div className="flex flex-col items-center justify-center flex-1 text-center px-7 py-10 gap-5">

                            {/* Tag */}
                            <span className="text-amber-400/60 text-[10px] font-bold uppercase tracking-[0.5em]">
                                {t(`coreSection.capabilities.${item.key}.tag`)}
                            </span>

                            {/* Title */}
                            <h3 className="text-white text-[26px] font-bold tracking-tight leading-tight">
                                {t(`coreSection.capabilities.${item.key}.title`)}
                            </h3>

                            {/* Divider */}
                            <div className="w-10 h-px bg-amber-400/30" />

                            {/* Description — full text (PC content) */}
                            <p className="text-white/55 text-[14px] font-medium leading-relaxed max-w-sm">
                                {t(`coreSection.capabilities.${item.key}.desc`)}
                            </p>

                            {/* Stats */}
                            <div className="flex gap-14 pt-6 mt-1 border-t border-white/10 w-full max-w-xs justify-center">
                                <div className="text-center">
                                    <div className="text-amber-400 text-2xl font-bold tracking-tighter">{item.clients}</div>
                                    <div className="text-white/30 text-[9px] font-bold uppercase tracking-widest mt-1.5">{t('coreSection.stats.clients')}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-amber-400 text-2xl font-bold tracking-tighter">{item.projects}</div>
                                    <div className="text-white/30 text-[9px] font-bold uppercase tracking-widest mt-1.5">{t('coreSection.stats.projects')}</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                );
            })()}
        </AnimatePresence>
        </>
    );
}
