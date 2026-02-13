import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import {
  Brain,
  Bot,
  BarChart3,
  FlaskConical,
} from "lucide-react";
import Starry from "@/components/ui/Starry";
import IitMandiImg from "@/components/images/IIT_Mandi_Logo_High_Resolution (1).jpg";
import IitRoparImg from "@/components/images/iit-ropar-01.jpeg";
import StateHealth from "@/components/images/State-Health-Society-Bihar-Vacancy (1).jpg";
import Iskcon from "@/components/images/iskcon_logo (1).jpg";
import TpcLogo from "@/components/images/tpcDcMO6EeUxpMd8ygs48Aem1pO1752661194034_200x200.png";
import Regvis from "@/components/images/Regvis.png";

const academicPartners = [IitMandiImg, IitRoparImg, StateHealth, Iskcon, TpcLogo, Regvis];

/* ─── Data ─── */

interface DefenceArea {
  icon: React.ElementType;
  label: string;
  code: string;
  description: string;
}

const defenceAreas: DefenceArea[] = [
  {
    icon: Brain,
    label: "AI / Machine Learning",
    code: "GEN-D01",
    description: "Neural architectures & predictive modeling for strategic decision systems",
  },
  {
    icon: Bot,
    label: "Autonomous Systems",
    code: "GEN-D02",
    description: "Unmanned platforms with real-time situational awareness & response",
  },
  {
    icon: BarChart3,
    label: "Data Modeling & Simulation",
    code: "GEN-D03",
    description: "High-fidelity scenario modeling for operational readiness & planning",
  },
  {
    icon: FlaskConical,
    label: "Applied Research",
    code: "GEN-D04",
    description: "Emerging defence technology R&D from concept to field deployment",
  },
];

/* ─── Reusable animated text line ─── */

function AnimatedLine({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ─── Component ─── */

export default function ImpactInnovation() {
  const heroRef = useRef<HTMLElement>(null);
  const partnerRef = useRef<HTMLElement>(null);
  const defenceRef = useRef<HTMLElement>(null);

  /* Hero parallax */
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(heroProgress, [0, 0.7], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 0.92]);

  /* Defence section parallax */
  const { scrollYProgress: defenceProgress } = useScroll({
    target: defenceRef,
    offset: ["start end", "end start"],
  });
  const defenceTextY = useTransform(defenceProgress, [0, 1], [60, -30]);
  const smoothDefenceTextY = useSpring(defenceTextY, { stiffness: 80, damping: 20 });

  return (
    <div className="relative min-h-screen w-full bg-[#050505]">
      <Starry />

      <div className="relative z-10">

        {/* ═══════════════════════════════════════════
            HERO — Parallax + line-reveal text
        ═══════════════════════════════════════════ */}
        <section ref={heroRef} className="relative max-w-[1440px] mx-auto px-8 lg:px-16 pt-44 pb-24 overflow-hidden">
          <motion.div
            style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
            className="max-w-4xl"
          >
            {/* Eyebrow — slides in from left */}
            <motion.span
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-amber-400 text-[11px] font-bold uppercase tracking-[0.6em] mb-5 block"
            >
              Genesis Research Division
            </motion.span>

            {/* Title — line-by-line reveal from below */}
            <h1 className="text-[56px] lg:text-[88px] font-bold text-white uppercase tracking-tight leading-[0.95] mb-8">
              <AnimatedLine delay={0.1}>
                Impact &
              </AnimatedLine>
              <AnimatedLine delay={0.2}>
                <span className="text-amber-400">Innovation</span>
              </AnimatedLine>
            </h1>

            {/* Description — fade + blur */}
            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="flex items-start gap-8"
            >
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-px h-20 bg-gradient-to-b from-amber-400/60 to-transparent shrink-0 mt-1 origin-top"
              />
              <p className="text-[19px] text-white/50 max-w-2xl leading-relaxed">
                Bridging academia and industry to create scalable solutions that
                drive measurable progress across technology, defence, and
                sustainable development.
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════
            ACADEMIC PARTNERSHIPS — Parallax cards + stagger
        ═══════════════════════════════════════════ */}
        <section ref={partnerRef} className="relative pb-32 overflow-hidden">
          {/* Section heading */}
          <div className="max-w-[1440px] mx-auto px-8 lg:px-16 mb-12">
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-amber-400 text-[11px] font-bold uppercase tracking-[0.6em] mb-3 block"
            >
              Partnerships
            </motion.span>
            <h2 className="text-[40px] lg:text-[56px] font-bold text-white uppercase tracking-tight leading-none">
              <AnimatedLine>
                Academic &{" "}
                <span className="text-amber-400">Industry</span>
              </AnimatedLine>
            </h2>
          </div>

          {/* Infinite scroll marquee */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative overflow-hidden"
          >
            {/* Edge fades */}
            <div className="absolute left-0 top-0 bottom-0 w-24 lg:w-40 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 lg:w-40 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

            <div className="flex gap-6 w-max animate-marquee hover:[animation-play-state:paused]">
              {[...academicPartners, ...academicPartners].map((src, i) => (
                <div
                  key={i}
                  className="group relative flex-shrink-0 w-72 h-48 bg-white/[0.03] backdrop-blur-3xl rounded-[32px] border border-white/10 overflow-hidden transition-all duration-500 hover:border-amber-400/30 shadow-2xl flex items-center justify-center p-4"
                >
                  <div className="flex items-center justify-center w-full h-full bg-white rounded-2xl p-4">
                    <img
                      src={src}
                      alt={`Partner ${(i % academicPartners.length) + 1}`}
                      className="max-w-full max-h-full object-contain grayscale-[20%] group-hover:grayscale-0 opacity-80 group-hover:opacity-100 transition-all duration-700"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════
            DEFENCE & CONSULTANCY — Split-Screen + stagger
        ═══════════════════════════════════════════ */}
        <section ref={defenceRef} className="relative max-w-[1440px] mx-auto px-8 lg:px-16 pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

            {/* Left column — editorial text (5 cols, sticky) */}
            <motion.div
              style={{ y: smoothDefenceTextY }}
              className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start"
            >
              <motion.span
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-amber-400 text-[11px] font-bold uppercase tracking-[0.6em] mb-4 block"
              >
                Classified Initiatives
              </motion.span>

              <h2 className="text-[40px] lg:text-[52px] font-bold text-white uppercase tracking-tight leading-[1.05] mb-6">
                <AnimatedLine>Defence &</AnimatedLine>
                <AnimatedLine delay={0.1}>
                  <span className="text-amber-400">Consultancy</span>
                </AnimatedLine>
              </h2>

              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="w-16 h-px bg-amber-400/40 mb-6 origin-left"
              />

              <motion.p
                initial={{ opacity: 0, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-[17px] text-white/50 leading-relaxed mb-8"
              >
                AI-focused initiatives within India's defence ecosystem —
                developing sovereign capabilities across intelligence, autonomy,
                and secure systems.
              </motion.p>

              <div className="flex flex-col gap-3">
                {["Advanced Analytics", "Intelligent Systems", "Sovereign Infrastructure"].map((label, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.1, ease: "easeOut" }}
                    className="flex items-center gap-3"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.5 + i * 0.1, type: "spring", stiffness: 300 }}
                      className={`w-2 h-2 rounded-full ${
                        i === 0 ? "bg-amber-400/60" : i === 1 ? "bg-amber-400/40" : "bg-amber-400/30"
                      }`}
                    />
                    <span className="text-[13px] text-white/40 uppercase tracking-[0.2em] font-bold">
                      {label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right column — Dossier grid (7 cols) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {defenceAreas.map((area, i) => (
                <DossierCard key={area.label} area={area} index={i} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
    Sub-components
═══════════════════════════════════════════ */

function DossierCard({ area, index }: { area: DefenceArea; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = area.icon;

  // Alternate cards come from slightly different directions
  const xOffset = index % 2 === 0 ? -30 : 30;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, x: xOffset, scale: 0.9, rotateY: index % 2 === 0 ? -5 : 5 }}
      animate={isInView ? { opacity: 1, y: 0, x: 0, scale: 1, rotateY: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ perspective: 800 }}
      className="group relative rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-7 overflow-hidden transition-all duration-500 hover:border-amber-400/30 hover:shadow-[0_0_30px_rgba(251,191,36,0.06)] cursor-default"
    >
      {/* Icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={isInView ? { scale: 1, rotate: 0 } : {}}
        transition={{
          duration: 0.6,
          delay: index * 0.12 + 0.2,
          type: "spring",
          stiffness: 200,
          damping: 15,
        }}
        className="w-14 h-14 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center mb-6 transition-all duration-500 group-hover:bg-amber-400/20 group-hover:border-amber-400/40 group-hover:shadow-[0_0_24px_rgba(251,191,36,0.15)]"
      >
        <Icon
          size={24}
          className="text-amber-400/70 group-hover:text-amber-400 transition-colors duration-500"
          strokeWidth={1.5}
        />
      </motion.div>

      {/* Label */}
      <div className="overflow-hidden">
        <motion.h3
          initial={{ y: "100%" }}
          animate={isInView ? { y: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.12 + 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-[15px] font-bold text-white/90 uppercase tracking-wide mb-2"
        >
          {area.label}
        </motion.h3>
      </div>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.12 + 0.4 }}
        className="text-[13px] text-white/45 leading-relaxed"
      >
        {area.description}
      </motion.p>

      {/* Bottom scan-line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}
