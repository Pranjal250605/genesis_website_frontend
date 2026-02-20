import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Flower2, Sparkles, Sun, Users, HeartHandshake, Landmark, GraduationCap, Building2, BookOpen } from "lucide-react";
import Starry from "@/components/ui/Starry";
import { useIsMobile } from "@/lib/useIsMobile";
import indiaJapanBg from "@/components/images/indiajapan1.png";

/* ─── Data ─── */

interface FocusCard {
  icon: React.ElementType;
  title: string;
  description: string;
}

/* focusAreas and missionPoints are now computed inside the component using t() */

interface Partner {
  icon: React.ElementType;
  name: string;
  country: string;
}

const cultureCenterPartners: Partner[] = [
  { icon: GraduationCap, name: "IIT Mandi", country: "India" },
  { icon: Building2, name: "ISKCON", country: "India" },
  { icon: BookOpen, name: "Bhaktivedanta University", country: "India" },
];

/* ─── Breathing Animation Variants ─── */

const breathingVariants = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
};

/* ─── Component ─── */

interface SocialInitiativesProps {
  onNavigate?: (page: "home" | "about-us" | "services" | "impact-innovation" | "careers" | "social-initiatives" | "join-us" | "updates") => void;
}

export default function SocialInitiatives({ onNavigate }: SocialInitiativesProps = {}) {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const heroRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);

  const focusAreas: FocusCard[] = [
    { icon: Flower2, title: t("social_page.focus_cards.yoga.title"), description: t("social_page.focus_cards.yoga.description") },
    { icon: Sparkles, title: t("social_page.focus_cards.mindfulness.title"), description: t("social_page.focus_cards.mindfulness.description") },
    { icon: Sun, title: t("social_page.focus_cards.balance.title"), description: t("social_page.focus_cards.balance.description") },
    { icon: Users, title: t("social_page.focus_cards.community.title"), description: t("social_page.focus_cards.community.description") },
  ];

  const missionPoints = t("social_page.mission_points", { returnObjects: true }) as string[];

  /* Hero parallax */
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(heroProgress, [0, 0.7], [1, 0]);
  const smoothHeroY = useSpring(heroY, { stiffness: 50, damping: 20 });

  /* Mission section parallax */
  const { scrollYProgress: missionProgress } = useScroll({
    target: missionRef,
    offset: ["start end", "end start"],
  });
  const missionY = useTransform(missionProgress, [0, 1], [100, -50]);
  const smoothMissionY = useSpring(missionY, { stiffness: 60, damping: 20 });

  return (
    <div className="relative min-h-screen w-full bg-[#050505]">
      {/* Starry background */}
      <Starry />

      {/* Ambient pulsing light */}
      {!isMobile && (
        <motion.div
          animate={{
            opacity: [0.15, 0.3, 0.15],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-amber-400/20 blur-[120px] pointer-events-none"
          style={{ zIndex: 1 }}
        />
      )}

      <div className="relative z-10">
        {/* ═══════════════════════════════════════════
            HERO — Soft & Welcoming
        ═══════════════════════════════════════════ */}
        <section ref={heroRef} className="relative max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 pt-28 sm:pt-44 pb-20 sm:pb-40">
          <motion.div
            style={isMobile ? undefined : { y: smoothHeroY, opacity: heroOpacity }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Eyebrow */}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="text-amber-400/70 text-[11px] font-light uppercase tracking-[0.5em] mb-10 block"
            >
              {t("social_page.hero_eyebrow")}
            </motion.span>

            {/* Title — soft gradient on "Initiatives" */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.2, ease: "easeOut" }}
              className="text-[32px] sm:text-[52px] lg:text-[88px] font-extralight text-white uppercase tracking-tight leading-[1.05] mb-8 sm:mb-12"
              dangerouslySetInnerHTML={{ __html: t("social_page.hero_title").replace("<1>", '<span class="bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">').replace("</1>", "</span>") }}
            />

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.6, delay: 0.4 }}
              className="text-[15px] sm:text-[20px] font-light text-white/60 leading-loose max-w-2xl mx-auto"
            >
              {t("social_page.hero_subtitle")}
            </motion.p>

            {/* Decorative divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2, delay: 0.6, ease: "easeInOut" }}
              className="w-32 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent mx-auto mt-12 origin-center"
            />
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════
            OUR FOCUS — Zen Grid with Breathing Icons
        ═══════════════════════════════════════════ */}
        <section className="relative max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 pb-20 sm:pb-40">
          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <span className="text-amber-400/70 text-[11px] font-light uppercase tracking-[0.5em] mb-5 block">
              {t("social_page.focus_eyebrow")}
            </span>
            <h2 className="text-[26px] sm:text-[40px] lg:text-[56px] font-extralight text-white uppercase tracking-tight leading-snug" dangerouslySetInnerHTML={{ __html: t("social_page.focus_title").replace("<1>", '<span class="bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">').replace("</1>", "</span>") }} />
          </motion.div>

          {/* Grid of focus cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8 mb-10 sm:mb-16">
            {focusAreas.map((focus, i) => (
              <FocusCard key={focus.title} focus={focus} index={i} />
            ))}
          </div>

          {/* Free badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
            className="flex justify-center"
          >
            <div className="relative">
              <motion.div
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-full bg-amber-400/20 blur-xl"
              />
              <div className="relative px-10 py-5 rounded-full bg-white/[0.03] backdrop-blur-xl border border-amber-400/30">
                <span className="text-[14px] font-light text-amber-400 uppercase tracking-[0.35em]">
                  {t("social_page.free_badge")}
                </span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════
            MISSION & IMPACT — Split Screen with Ripples
        ═══════════════════════════════════════════ */}
        <section ref={missionRef} className="relative max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 pb-20 sm:pb-40">
          <motion.div
            style={isMobile ? undefined : { y: smoothMissionY }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="rounded-[20px] sm:rounded-[32px] bg-white/[0.02] backdrop-blur-xl border border-white/10 overflow-hidden"
          >
            {/* Section header */}
            <div className="p-5 sm:p-10 lg:p-14 border-b border-white/10">
              <span className="text-amber-400/70 text-[11px] font-light uppercase tracking-[0.5em] mb-5 block">
                {t("social_page.mission_eyebrow")}
              </span>
              <h2 className="text-[24px] sm:text-[32px] lg:text-[48px] font-extralight text-white uppercase tracking-tight leading-snug" dangerouslySetInnerHTML={{ __html: t("social_page.mission_title").replace("<1>", '<span class="bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">').replace("</1>", "</span>") }} />
            </div>

            {/* Split content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Left: Mission points */}
              <div className="p-5 sm:p-10 lg:p-14 border-b lg:border-b-0 lg:border-r border-white/10">
                <div className="space-y-6 sm:space-y-8">
                  {missionPoints.map((point, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
                      className="flex items-start gap-4"
                    >
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.6, 1, 0.6],
                        }}
                        transition={{
                          duration: 8,
                          delay: i * 0.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="shrink-0 w-8 h-8 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mt-1"
                      >
                        <HeartHandshake size={14} className="text-amber-400/80" strokeWidth={1.5} />
                      </motion.div>
                      <p className="text-[16px] font-light text-white/70 leading-loose">
                        {point}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Sub-badge */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="mt-12 pt-10 border-t border-white/10"
                >
                  <span className="text-[13px] font-light text-amber-400/60 uppercase tracking-[0.3em]">
                    {t("social_page.zero_barriers")}
                  </span>
                </motion.div>
              </div>

              {/* Right: Rippling zero cost visual */}
              <div className="relative p-5 sm:p-8 lg:p-12 flex items-center justify-center min-h-[300px] sm:min-h-[400px]">
                <ZeroCostVisual />
              </div>
            </div>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════
            INDO–JAPAN CULTURE CENTER
        ═══════════════════════════════════════════ */}
        <section className="relative max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 pb-20 sm:pb-40 flex flex-col items-center">
          {/* Background image */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 mx-8 lg:mx-16 rounded-[32px] overflow-hidden"
          >
            <img
              src={indiaJapanBg}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="relative mt-32 rounded-[32px] bg-white/10 backdrop-blur-lg border border-white/20 overflow-hidden shadow-[0_0_60px_rgba(255,255,255,0.05)]"
          >
            {/* Header */}
            <div className="p-5 sm:p-10 lg:p-14 border-b border-white/15">
              <div className="flex items-center gap-4 mb-5">
                <motion.div
                  animate={{
                    scale: [1, 1.08, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-12 h-12 rounded-full bg-amber-400/10 border border-amber-400/20 flex items-center justify-center"
                >
                  <Landmark size={22} className="text-amber-400/80" strokeWidth={1.5} />
                </motion.div>
                <span className="text-amber-400/70 text-[11px] font-light uppercase tracking-[0.5em]">
                  {t("social_page.featured_eyebrow")}
                </span>
              </div>
              <h2 className="text-[24px] sm:text-[32px] lg:text-[48px] font-extralight text-white uppercase tracking-tight leading-snug" dangerouslySetInnerHTML={{ __html: t("social_page.featured_title").replace("<1>", '<span class="bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">').replace("</1>", "</span>") }} />
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Left: Description */}
              <div className="p-5 sm:p-10 lg:p-14 border-b lg:border-b-0 lg:border-r border-white/15">
                <div className="flex items-center gap-3 mb-8">
                  <span className="text-[28px]">🇮🇳</span>
                  <div className="w-8 h-px bg-gradient-to-r from-amber-400/40 to-transparent" />
                  <span className="text-[28px]">🇯🇵</span>
                </div>

                <p className="text-[17px] font-light text-white/70 leading-loose mb-8">
                  {t("social_page.featured_desc1")}
                </p>

                <p className="text-[17px] font-light text-white/60 leading-loose">
                  {t("social_page.featured_desc2")}
                </p>

                {/* Decorative divider */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="w-24 h-px bg-gradient-to-r from-amber-400/30 to-transparent mt-10 origin-left"
                />
              </div>

              {/* Right: Partners */}
              <div className="p-5 sm:p-10 lg:p-14">
                <span className="text-amber-400/70 text-[11px] font-light uppercase tracking-[0.5em] mb-8 block">
                  {t("social_page.major_partners")}
                </span>

                <div className="space-y-6">
                  {cultureCenterPartners.map((partner, i) => {
                    const Icon = partner.icon;
                    return (
                      <motion.div
                        key={partner.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
                        className="group flex items-center gap-5 p-5 rounded-2xl border border-transparent transition-all duration-500 hover:border-white/10 hover:bg-white/[0.02]"
                      >
                        <motion.div
                          animate={{
                            scale: [1, 1.06, 1],
                            opacity: [0.7, 1, 0.7],
                          }}
                          transition={{
                            duration: 8,
                            delay: i * 0.6,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="shrink-0 w-14 h-14 rounded-2xl bg-amber-400/[0.06] border border-amber-400/20 flex items-center justify-center transition-all duration-500 group-hover:border-amber-400/30 group-hover:bg-amber-400/[0.1]"
                        >
                          <Icon size={24} className="text-amber-400/70 transition-colors duration-500 group-hover:text-amber-400" strokeWidth={1.5} />
                        </motion.div>
                        <div>
                          <h4 className="text-[18px] font-light text-white/90 tracking-wide transition-colors duration-500 group-hover:text-amber-400">
                            {partner.name}
                          </h4>
                          <span className="text-[13px] font-light text-white/40 uppercase tracking-[0.2em]">
                            {partner.country}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════
            CTA — Join the Mission
        ═══════════════════════════════════════════ */}
        <section className="relative max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 pb-20 sm:pb-40">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="text-center"
          >
            <h2 className="text-[28px] sm:text-[48px] lg:text-[72px] font-extralight text-white uppercase tracking-tight leading-snug mb-8 sm:mb-14" dangerouslySetInnerHTML={{ __html: t("social_page.cta_title").replace("<1>", '<span class="bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">').replace("</1>", "</span>") }} />

            {/* CTA Button with fill animation */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              onClick={() => onNavigate?.("join-us")}
              className="group relative px-8 py-4 sm:px-14 sm:py-6 rounded-full border border-amber-400/30 text-white/80 font-light text-[13px] sm:text-[15px] uppercase tracking-[0.35em] overflow-hidden transition-all duration-500 hover:text-white hover:border-amber-400/50 hover:shadow-[0_0_40px_rgba(251,191,36,0.15)] cursor-pointer"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-amber-300/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
              <span className="relative z-10">{t("social_page.cta_button")}</span>
            </motion.button>
          </motion.div>
        </section>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
    Sub-components
═══════════════════════════════════════════ */

function FocusCard({ focus, index }: { focus: FocusCard; index: number }) {
  const Icon = focus.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1.2, delay: index * 0.15, ease: "easeOut" }}
      className="group relative rounded-[24px] sm:rounded-[32px] bg-white/[0.02] backdrop-blur-xl border border-white/10 p-6 sm:p-10 transition-all duration-700 hover:bg-white/[0.04] hover:border-amber-400/20 hover:shadow-[0_0_40px_rgba(251,191,36,0.08)]"
    >
      {/* Floating icon with breathing glow */}
      <div className="flex justify-center mb-6 sm:mb-10">
        <motion.div
          variants={breathingVariants}
          animate="animate"
          className="relative"
          style={{ transitionDelay: `${index * 0.5}s` }}
        >
          {/* Outer glow */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 8,
              delay: index * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 rounded-full bg-amber-400/30 blur-xl"
          />

          {/* Icon container */}
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-amber-400/10 to-amber-300/5 border border-amber-400/20 flex items-center justify-center">
            <Icon size={32} className="text-amber-400/80" strokeWidth={1.5} />
          </div>
        </motion.div>
      </div>

      {/* Title */}
      <h3 className="text-[18px] sm:text-[22px] font-light text-white/90 text-center mb-4 sm:mb-5 tracking-wide">
        {focus.title}
      </h3>

      {/* Description */}
      <p className="text-[15px] font-light text-white/50 text-center leading-loose">
        {focus.description}
      </p>

      {/* Bottom accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: index * 0.15 + 0.4, ease: "easeOut" }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent origin-center"
      />
    </motion.div>
  );
}

function ZeroCostVisual() {
  const { t } = useTranslation();
  return (
    <div className="relative w-full max-w-[320px] aspect-square">
      {/* Concentric rippling circles */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          animate={{
            scale: [1 + i * 0.15, 1.3 + i * 0.15, 1 + i * 0.15],
            opacity: [0.4 - i * 0.08, 0.15 - i * 0.03, 0.4 - i * 0.08],
          }}
          transition={{
            duration: 8,
            delay: i * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-full border border-amber-400/30"
          style={{
            width: `${100 - i * 12}%`,
            height: `${100 - i * 12}%`,
            top: `${i * 6}%`,
            left: `${i * 6}%`,
          }}
        />
      ))}

      {/* Central 0$ text */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 flex flex-col items-center justify-center"
      >
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-full bg-amber-400/10 blur-2xl"
        />

        <div className="relative text-center">
          <div className="text-[80px] lg:text-[120px] font-light text-amber-400/90 leading-none">
            0
          </div>
          <div className="text-[40px] lg:text-[60px] font-light text-amber-400/70 -mt-4">
            $
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
            className="w-24 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent mx-auto mt-4 origin-center"
          />
          <p className="text-[11px] font-light text-white/40 uppercase tracking-[0.3em] mt-4">
            {t("social_page.no_barriers")}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
