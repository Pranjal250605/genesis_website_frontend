import { useTranslation, Trans } from 'react-i18next';
import Unnamed1 from "@/components/images/unnamed (1).webp";
import Unnamed2 from "@/components/images/unnamed (2).webp";
import Unnamed3 from "@/components/images/unnamed (3).webp";
import Unnamed4 from "@/components/images/unnamed (4).webp";
import Unnamed5 from "@/components/images/unnamed (5).webp";
import Unnamed6 from "@/components/images/unnamed (6).webp";
import Unnamed7 from "@/components/images/unnamed (7).webp";
import Unnamed8 from "@/components/images/unnamed (8).webp";
import Unnamed9 from "@/components/images/unnamed (9).webp";

import StateHealth from "@/components/images/State-Health-Society-Bihar-Vacancy (1).jpg";
import Iskcon from "@/components/images/iskcon_logo (1).jpg";
import TpcLogo from "@/components/images/tpcDcMO6EeUxpMd8ygs48Aem1pO1752661194034_200x200.png";
import Regvis from "@/components/images/Regvis.png";
import IitRopar from "@/components/images/iit-ropar-01.jpeg";
import IitMandi from "@/components/images/IIT_Mandi_Logo_High_Resolution (1).jpg";

const collaborations = [
    Unnamed1, Unnamed2, Unnamed3, Unnamed4, Unnamed5,
    Unnamed6, Unnamed7, Unnamed8, Unnamed9,
];

const partners = [
    StateHealth, Iskcon, TpcLogo, Regvis, IitRopar, IitMandi,
];

export default function Partners() {
    const { t } = useTranslation();

    return (
        <section className="relative w-full bg-[#050505] py-16 sm:py-24 px-4 sm:px-10 overflow-hidden">
            {/* HEADER */}
            <div className="text-center mb-10 sm:mb-16">
                <span className="text-amber-400 text-xs font-bold uppercase tracking-[0.6em] mb-4 block">
                    {t('partnersSection.eyebrow')}
                </span>
                <h2 className="text-white text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-4 sm:mb-8">
                    {t('partnersSection.title')}
                </h2>
                <p className="text-white/50 text-sm sm:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
                    <Trans
                        i18nKey="partnersSection.subtitle"
                        components={{
                            1: <span className="text-amber-400" />
                        }}
                    />
                </p>
            </div>

            {/* ROW 1 — Collaborations (scrolls left) */}
            <div className="group/track overflow-hidden mb-8">
                <div className="flex gap-4 sm:gap-6 w-max animate-marquee hover:[animation-play-state:paused]">
                    {[...collaborations, ...collaborations].map((src, i) => (
                        <div
                            key={i}
                            className="group relative flex-shrink-0 w-48 h-32 sm:w-72 sm:h-48 bg-white/[0.03] backdrop-blur-3xl rounded-[20px] sm:rounded-[32px] border border-white/10 overflow-hidden transition-all duration-500 hover:border-amber-400/30 shadow-2xl"
                        >
                            <img
                                src={src}
                                alt={`${t('partnersSection.altCollaboration')} ${(i % collaborations.length) + 1}`}
                                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 opacity-80 group-hover:opacity-100 transition-all duration-700"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* ROW 2 — Partners (scrolls right) */}
            <div className="group/track overflow-hidden">
                <div className="flex gap-4 sm:gap-6 w-max animate-marquee-reverse hover:[animation-play-state:paused]">
                    {[...partners, ...partners].map((src, i) => (
                        <div
                            key={i}
                            className="group relative flex-shrink-0 w-48 h-32 sm:w-72 sm:h-48 bg-white/[0.03] backdrop-blur-3xl rounded-[20px] sm:rounded-[32px] border border-white/10 overflow-hidden transition-all duration-500 hover:border-amber-400/30 shadow-2xl flex items-center justify-center p-2 sm:p-4"
                        >
                            <div className="flex items-center justify-center w-full h-full bg-white rounded-2xl p-4">
                                <img
                                    src={src}
                                    alt={`${t('partnersSection.altPartner')} ${(i % partners.length) + 1}`}
                                    className="max-w-full max-h-full object-contain grayscale-[20%] group-hover:grayscale-0 opacity-80 group-hover:opacity-100 transition-all duration-700"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
