import { useRef, useLayoutEffect } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Starry from "@/components/ui/Starry";
import Core_img from "@/components/images/core_img.png";
import GreenTransImg from "@/components/images/Image (AI Analytics).png";
import OutsourcingImg from "@/components/images/Image (Business Solutions).png";
import CryptoImg from "@/components/images/Image (Cybersecurity).png";
import ReskillingImg from "@/components/images/reskilling.png";
import DroneImg from "@/components/images/dronee.png";
import { Target, BarChart3, ShieldCheck, Clock, Radar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Core() {
    const { t } = useTranslation();
    const sectionRef = useRef<HTMLElement>(null);

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

    useLayoutEffect(() => {
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
    }, []);

    return (
        <section ref={sectionRef} className="relative h-screen w-full bg-[#050505] py-24 px-10 overflow-hidden">

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
                <div className="text-center mb-12">
                    <span className="text-amber-400 text-xs font-bold uppercase tracking-[0.6em] mb-4 block">
                        {t('coreSection.eyebrow')}
                    </span>
                    <h2 className="text-white text-5xl lg:text-7xl font-bold tracking-tight mb-8">
                        {t('coreSection.title')}
                    </h2>
                    <p className="text-white/50 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
                        <Trans
                            i18nKey="coreSection.subtitle"
                            components={{
                                1: <span className="text-amber-400" />
                            }}
                        />
                    </p>
                </div>

                {/* TRANSPARENT GLASS CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 flex-1 items-start">
                    {capabilities.map((item, index) => (
                        <div key={index} className="core-card opacity-0 group relative bg-white/[0.03] backdrop-blur-3xl rounded-[32px] border border-white/10 overflow-hidden transition-all duration-500 hover:border-amber-400/30 flex flex-col shadow-2xl">

                            {/* IMAGE SECTION */}
                            <div className="relative h-44 w-full overflow-hidden border-b border-white/5">
                                <img
                                    src={item.thumb}
                                    alt={t(`coreSection.capabilities.${item.key}.title`)}
                                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 opacity-80"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/40 to-transparent" />

                                {/* ICON BADGE */}
                                <div className="absolute bottom-4 left-6 w-10 h-10 bg-amber-400/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-amber-400/20">
                                    <item.icon size={18} className="text-amber-400" strokeWidth={2.5} />
                                </div>
                            </div>

                            <div className="p-6 pt-5 flex flex-col flex-1">
                                <h3 className="text-white text-lg font-bold mb-1 tracking-tight">{t(`coreSection.capabilities.${item.key}.title`)}</h3>
                                <span className="text-amber-400/60 text-[10px] font-bold uppercase tracking-widest mb-4 block">
                                    {t(`coreSection.capabilities.${item.key}.tag`)}
                                </span>

                                <p className="text-white/40 text-[12px] font-medium leading-relaxed mb-6 flex-1">
                                    {t(`coreSection.capabilities.${item.key}.desc`)}
                                </p>

                                {/* STATS FOOTER */}
                                <div className="flex gap-8 pt-5 border-t border-white/10 mt-auto">
                                    <div>
                                        <div className="text-amber-400 text-xl font-bold tracking-tighter">{item.clients}</div>
                                        <div className="text-white/20 text-[9px] font-bold uppercase tracking-widest mt-1">{t('coreSection.stats.clients')}</div>
                                    </div>
                                    <div>
                                        <div className="text-amber-400 text-xl font-bold tracking-tighter">{item.projects}</div>
                                        <div className="text-white/20 text-[9px] font-bold uppercase tracking-widest mt-1">{t('coreSection.stats.projects')}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
