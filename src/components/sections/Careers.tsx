import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  GraduationCap,
  Globe2,
  Cpu,
  Target,
  ArrowUpRight,
  Sparkles,
  Heart,
  Lightbulb,
  Shield,
  Users,
  BrainCircuit,
  ShieldCheck,
  Code2,
  Palette,
  Server,
  ChevronRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Starry from "@/components/ui/Starry";

/* ───────────────────── Data ───────────────────── */

const teamCards = [
  {
    icon: GraduationCap,
    key: "academic",
  },
  {
    icon: Globe2,
    key: "global",
  },
  {
    icon: Cpu,
    key: "frontier",
  },
  {
    icon: Target,
    key: "precision",
  },
];

const hiringTraits = [
  { icon: Lightbulb, index: 0 },
  { icon: Shield, index: 1 },
  { icon: Users, index: 2 },
  { icon: Heart, index: 3 },
  { icon: Sparkles, index: 4 },
];

const openRoles: { icon: LucideIcon; key: string }[] = [
  { icon: BrainCircuit, key: "ai_ml" },
  { icon: ShieldCheck, key: "blockchain" },
  { icon: Code2, key: "fullstack" },
  { icon: Palette, key: "design" },
  { icon: Server, key: "devops" },
];

/* ───────────────────── Component ───────────────────── */

interface CareersProps {
  onNavigate?: (page: "home" | "about-us" | "services" | "impact-innovation" | "careers" | "social-initiatives" | "join-us" | "updates") => void;
}

export default function Careers({ onNavigate }: CareersProps = {}) {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);

  /* Hero parallax */
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(heroProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 0.9]);
  const smoothHeroY = useSpring(heroY, { stiffness: 50, damping: 20 });

  /* Team section parallax */
  const { scrollYProgress: teamProgress } = useScroll({
    target: teamRef,
    offset: ["start end", "end start"],
  });
  const teamY = useTransform(teamProgress, [0, 1], [80, -40]);
  const smoothTeamY = useSpring(teamY, { stiffness: 60, damping: 20 });

  /* Philosophy section parallax */
  const { scrollYProgress: philosophyProgress } = useScroll({
    target: philosophyRef,
    offset: ["start end", "end start"],
  });
  const philosophyY = useTransform(philosophyProgress, [0, 1], [60, -30]);
  const smoothPhilosophyY = useSpring(philosophyY, { stiffness: 60, damping: 20 });

  return (
    <div className="relative min-h-screen w-full bg-[#050505]">
      {/* Starry background */}
      <Starry />

      {/* Ambient light */}
      <motion.div
        animate={{
          opacity: [0.08, 0.15, 0.08],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-amber-400/10 blur-[120px] pointer-events-none"
        style={{ zIndex: 1 }}
      />

      <div className="relative z-10">
        {/* ═══════════════════════════════════════════
            HERO — Dramatic Entrance
        ═══════════════════════════════════════════ */}
        <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-8 lg:px-16 text-center">
          <motion.div
            style={{ y: smoothHeroY, opacity: heroOpacity, scale: heroScale }}
            className="max-w-5xl"
          >
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex items-center justify-center gap-4 mb-10"
            >
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
              <span className="text-amber-400/70 text-[11px] font-medium uppercase tracking-[0.4em]">
                {t('careers_page.hero_eyebrow')}
              </span>
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
            </motion.div>

            {/* Main title */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-[56px] lg:text-[96px] font-bold tracking-tight leading-[0.95] mb-8"
            >
              <span
                className="text-white"
                dangerouslySetInnerHTML={{ __html: t('careers_page.hero_title', { interpolation: { escapeValue: false } }) }}
              />
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
              className="text-[20px] text-white/50 leading-relaxed max-w-2xl mx-auto mb-12"
            >
              {t('careers_page.hero_subtitle')}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button
                onClick={() => onNavigate?.("join-us")}
                className="group relative px-10 py-5 rounded-full bg-amber-400 text-black font-bold text-[14px] uppercase tracking-wider overflow-hidden transition-all duration-500 hover:bg-amber-300 hover:shadow-[0_0_50px_rgba(251,191,36,0.4)] hover:scale-105 active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t('careers_page.cta_view_roles')}
                  <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </button>

              <button
                onClick={() => onNavigate?.("about-us")}
                className="group px-10 py-5 rounded-full border border-white/10 text-white/70 font-medium text-[14px] uppercase tracking-wider backdrop-blur-xl transition-all duration-300 hover:border-amber-400/30 hover:text-white hover:bg-white/[0.03]"
              >
                <span className="flex items-center gap-2">
                  {t('careers_page.cta_philosophy')}
                  <ChevronRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </button>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1.5 }}
            className="absolute bottom-16 flex flex-col items-center gap-3"
          >
            <span className="text-white/30 text-[11px] tracking-[0.3em] uppercase">
              {t('careers_page.scroll_indicator')}
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-16 bg-gradient-to-b from-amber-400/50 via-amber-400/20 to-transparent"
            />
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════
            OUR TEAM — Asymmetric Bento Grid
        ═══════════════════════════════════════════ */}
        <section ref={teamRef} className="relative max-w-[1440px] mx-auto px-8 lg:px-16 pb-32">
          <motion.div style={{ y: smoothTeamY }}>
            {/* Section heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="mb-20"
            >
              <span className="text-amber-400/70 text-[11px] font-medium uppercase tracking-[0.4em] mb-4 block">
                {t('careers_page.team_eyebrow')}
              </span>
              <h2 className="text-[48px] lg:text-[64px] font-bold tracking-tight text-white leading-tight">
                {t('careers_page.team_title')}
              </h2>
            </motion.div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teamCards.map((card, i) => (
                <TeamCard key={card.key} card={card} index={i} />
              ))}
            </div>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════
            HIRING PHILOSOPHY — Split Screen
        ═══════════════════════════════════════════ */}
        <section
          id="philosophy"
          ref={philosophyRef}
          className="relative max-w-[1440px] mx-auto px-8 lg:px-16 pb-32"
        >
          <motion.div
            style={{ y: smoothPhilosophyY }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="rounded-[32px] bg-white/[0.02] backdrop-blur-xl border border-white/10 overflow-hidden"
          >
            {/* Header */}
            <div className="p-10 lg:p-14 border-b border-white/10">
              <span className="text-amber-400/70 text-[11px] font-medium uppercase tracking-[0.4em] mb-4 block">
                {t('careers_page.hiring_eyebrow')}
              </span>
              <h2
                className="text-[32px] lg:text-[48px] font-bold tracking-tight text-white leading-tight"
                dangerouslySetInnerHTML={{ __html: t('careers_page.hiring_title', { interpolation: { escapeValue: false } }) }}
              />
            </div>

            {/* Content split */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Left: Mission */}
              <div className="p-10 lg:p-14 border-b lg:border-b-0 lg:border-r border-white/10">
                <p className="text-[17px] text-white/60 leading-relaxed mb-10">
                  {t('careers_page.hiring_subtitle')}
                </p>

                {/* Stats or metrics could go here */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-[40px] font-bold text-amber-400 mb-2">50+</div>
                    <div className="text-[13px] text-white/40 uppercase tracking-wider">Team Members</div>
                  </div>
                  <div>
                    <div className="text-[40px] font-bold text-amber-400 mb-2">12</div>
                    <div className="text-[13px] text-white/40 uppercase tracking-wider">Countries</div>
                  </div>
                </div>
              </div>

              {/* Right: Traits */}
              <div className="p-10 lg:p-14">
                <div className="space-y-6">
                  {hiringTraits.map((trait, i) => (
                    <HiringTrait key={i} trait={trait} index={i} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════
            OPEN OPPORTUNITIES — Modern Table
        ═══════════════════════════════════════════ */}
        <section
          id="opportunities"
          className="relative max-w-[1440px] mx-auto px-8 lg:px-16 pb-32"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mb-16"
          >
            <span className="text-amber-400/70 text-[11px] font-medium uppercase tracking-[0.4em] mb-4 block">
              {t('careers_page.opportunities_eyebrow')}
            </span>
            <h2 className="text-[48px] lg:text-[64px] font-bold tracking-tight text-white">
              {t('careers_page.opportunities_title')}
            </h2>
          </motion.div>

          {/* Table header */}
          <div className="hidden lg:grid grid-cols-[auto_2.5fr_1.5fr_1.5fr_1fr_auto] gap-6 px-8 py-4 mb-2">
            <div className="w-12" />
            <div className="text-[11px] font-medium uppercase tracking-[0.3em] text-white/30">
              {t('careers_page.roles_header.role')}
            </div>
            <div className="text-[11px] font-medium uppercase tracking-[0.3em] text-white/30">
              {t('careers_page.roles_header.team')}
            </div>
            <div className="text-[11px] font-medium uppercase tracking-[0.3em] text-white/30">
              {t('careers_page.roles_header.location')}
            </div>
            <div className="text-[11px] font-medium uppercase tracking-[0.3em] text-white/30">
              {t('careers_page.roles_header.type')}
            </div>
            <div className="w-32" />
          </div>

          <div className="h-px bg-white/[0.06] mb-3" />

          {/* Roles list */}
          <div className="space-y-2">
            {openRoles.map((role, i) => (
              <RoleCard key={role.key} role={role} index={i} />
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            CTA — Unlisted Role
        ═══════════════════════════════════════════ */}
        <section className="relative max-w-[1200px] mx-auto px-8 lg:px-16 pb-40">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-[32px] border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-xl overflow-hidden"
          >
            {/* Ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-amber-400/[0.06] blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10 py-20 px-8 lg:px-16 text-center">
              <span className="text-amber-400/70 text-[11px] font-medium uppercase tracking-[0.4em] mb-6 block">
                {t('careers_page.cta_unlisted_role_eyebrow')}
              </span>

              <h2
                className="text-[36px] lg:text-[56px] font-bold tracking-tight text-white leading-tight mb-6"
                dangerouslySetInnerHTML={{ __html: t('careers_page.cta_unlisted_role_title', { interpolation: { escapeValue: false } }) }}
              />

              <p className="text-[17px] text-white/50 leading-relaxed max-w-2xl mx-auto mb-12">
                {t('careers_page.cta_unlisted_role_subtitle')}
              </p>

              <motion.a
                href="mailto:careers@genesis.co"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-12 py-6 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold text-[14px] uppercase tracking-wider shadow-[0_0_40px_rgba(251,191,36,0.2)] transition-all duration-500 hover:shadow-[0_0_60px_rgba(251,191,36,0.4)]"
              >
                {t('careers_page.cta_unlisted_role_button')}
                <ArrowUpRight size={18} />
              </motion.a>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
    Sub-components
═══════════════════════════════════════════ */

function TeamCard({ card, index }: { card: typeof teamCards[0]; index: number }) {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const Icon = card.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-[28px] border border-white/10 bg-white/[0.02] backdrop-blur-xl p-10 overflow-hidden transition-all duration-500 hover:border-amber-400/30 hover:shadow-[0_0_50px_rgba(251,191,36,0.12)] hover:bg-white/[0.04]"
    >
      {/* Corner accent */}
      <div className="absolute -top-px -left-px w-32 h-32 bg-gradient-to-br from-amber-400/10 via-amber-400/5 to-transparent rounded-tl-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Icon */}
      <motion.div
        animate={isInView ? { scale: [0, 1], rotate: [0, 360] } : {}}
        transition={{ duration: 0.8, delay: index * 0.15 + 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-16 h-16 rounded-2xl border border-white/10 bg-white/[0.03] flex items-center justify-center mb-8 transition-all duration-500 group-hover:border-amber-400/30 group-hover:bg-amber-400/[0.08] group-hover:scale-110"
      >
        <Icon size={28} className="text-white/40 transition-colors duration-500 group-hover:text-amber-400" strokeWidth={1.5} />
      </motion.div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-[24px] font-bold text-white/90 tracking-tight mb-4 transition-colors duration-500 group-hover:text-amber-400">
          {t(`careers_page.team_cards.${card.key}.title`)}
        </h3>
        <p className="text-[15px] text-white/50 leading-relaxed">
          {t(`careers_page.team_cards.${card.key}.description`)}
        </p>
      </div>

      {/* Bottom glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}

function HiringTrait({ trait, index }: { trait: typeof hiringTraits[0]; index: number }) {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = trait.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="group flex items-center gap-5"
    >
      <motion.div
        animate={isInView ? { scale: [0, 1.2, 1], rotate: [0, 180, 0] } : {}}
        transition={{ duration: 0.8, delay: index * 0.1 + 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="shrink-0 w-12 h-12 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center transition-all duration-300 group-hover:border-amber-400/30 group-hover:bg-amber-400/[0.08] group-hover:scale-110"
      >
        <Icon size={20} className="text-white/30 transition-colors duration-300 group-hover:text-amber-400" strokeWidth={1.5} />
      </motion.div>
      <span className="text-[16px] text-white/60 font-medium transition-colors duration-300 group-hover:text-white">
        {t(`careers_page.hiring_traits.${index}`)}
      </span>
    </motion.div>
  );
}

function RoleCard({ role, index }: { role: typeof openRoles[0]; index: number }) {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = role.icon;

  return (
    <motion.a
      ref={ref}
      href={`mailto:careers@genesis.co?subject=Application for ${t(`careers_page.roles.${role.key}.title`)}`}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
      className="group grid grid-cols-1 lg:grid-cols-[auto_2.5fr_1.5fr_1.5fr_1fr_auto] gap-4 lg:gap-6 items-center px-8 py-7 rounded-2xl border border-transparent bg-transparent backdrop-blur-sm transition-all duration-300 hover:border-white/10 hover:bg-white/[0.03] hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] cursor-pointer"
    >
      {/* Icon */}
      <div className="hidden lg:flex w-12 h-12 rounded-xl border border-white/10 bg-white/[0.02] items-center justify-center shrink-0 transition-all duration-300 group-hover:border-amber-400/30 group-hover:bg-amber-400/[0.06] group-hover:scale-110">
        <Icon size={20} className="text-white/30 transition-colors duration-300 group-hover:text-amber-400" strokeWidth={1.5} />
      </div>

      {/* Title */}
      <div className="flex items-center gap-3 lg:block">
        <Icon size={20} className="lg:hidden text-white/30 group-hover:text-amber-400 transition-colors duration-300" strokeWidth={1.5} />
        <span className="text-[19px] font-bold text-white tracking-tight transition-colors duration-300 group-hover:text-amber-400">
          {t(`careers_page.roles.${role.key}.title`)}
        </span>
      </div>

      {/* Team */}
      <span className="text-[15px] text-white/40">
        {t(`careers_page.roles.${role.key}.team`)}
      </span>

      {/* Location */}
      <span className="text-[15px] text-white/40">
        {t(`careers_page.roles.${role.key}.location`)}
      </span>

      {/* Type */}
      <span className="text-[15px] text-white/40">
        {t(`careers_page.roles.${role.key}.type`)}
      </span>

      {/* Apply button */}
      <div className="flex items-center gap-2 lg:opacity-0 lg:translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
        <span className="text-amber-400 text-[14px] font-bold uppercase tracking-wider whitespace-nowrap">
          {t('careers_page.apply_now')}
        </span>
        <ArrowUpRight size={16} className="text-amber-400" />
      </div>
    </motion.a>
  );
}
