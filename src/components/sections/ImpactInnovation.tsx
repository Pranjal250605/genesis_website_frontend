import { motion } from "framer-motion";
import {
  Brain,
  Bot,
  BarChart3,
  FlaskConical,
} from "lucide-react";
import Starry from "@/components/ui/Starry";
import IitMandiImg from "@/components/images/IIT_Mandi_Logo_High_Resolution (1).jpg";
import IitRoparImg from "@/components/images/iit-ropar-01.jpeg";

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

/* ─── Component ─── */

export default function ImpactInnovation() {
  return (
    <div className="relative min-h-screen w-full bg-[#050505]">
      <Starry />

      <div className="relative z-10">

        {/* ═══════════════════════════════════════════
            HERO — Editorial, left-aligned asymmetry
        ═══════════════════════════════════════════ */}
        <section className="relative max-w-[1440px] mx-auto px-8 lg:px-16 pt-44 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <span className="text-amber-400 text-[11px] font-bold uppercase tracking-[0.6em] mb-5 block">
              Genesis Research Division
            </span>

            <h1 className="text-[56px] lg:text-[88px] font-bold text-white uppercase tracking-tight leading-[0.95] mb-8">
              Impact &<br />
              <span className="text-amber-400">Innovation</span>
            </h1>

            <div className="flex items-start gap-8">
              <div className="w-px h-20 bg-gradient-to-b from-amber-400/60 to-transparent shrink-0 mt-1" />
              <p className="text-[19px] text-white/50 max-w-2xl leading-relaxed">
                Bridging academia and industry to create scalable solutions that
                drive measurable progress across technology, defence, and
                sustainable development.
              </p>
            </div>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════
            ACADEMIC PARTNERSHIPS — Bento Asymmetric Grid
            IIT Mandi: Large hero card (spans 7 cols)
            IIT Ropar: Tall side card (spans 5 cols)
        ═══════════════════════════════════════════ */}
        <section className="relative max-w-[1440px] mx-auto px-8 lg:px-16 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <span className="text-amber-400 text-[11px] font-bold uppercase tracking-[0.6em] mb-3 block">
              Partnerships
            </span>
            <h2 className="text-[40px] lg:text-[56px] font-bold text-white uppercase tracking-tight leading-none">
              Academic &{" "}
              <span className="text-amber-400">Industry</span>
            </h2>
          </motion.div>

          {/* Asymmetric Bento grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 auto-rows-auto">

            {/* ── IIT MANDI — Large hero card (7/12) ── */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7 }}
              className="group lg:col-span-7 relative rounded-[28px] bg-white/[0.03] backdrop-blur-xl border border-white/10 overflow-hidden transition-all duration-500 hover:border-amber-400/30 hover:shadow-[0_0_50px_rgba(251,191,36,0.08)]"
            >
              {/* Image — tall hero proportion */}
              <div className="relative h-72 lg:h-80 w-full overflow-hidden">
                <img
                  src={IitMandiImg}
                  alt="IIT Mandi"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all duration-700 scale-105 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-8 lg:p-10">
                <div className="flex items-center gap-4 mb-5">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-400 bg-amber-400/10 border border-amber-400/20 rounded-full px-3 py-1">
                    Active Collaboration
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                </div>

                <h3 className="text-[32px] lg:text-[38px] font-bold text-white tracking-tight leading-tight mb-4">
                  IIT Mandi
                </h3>
                <p className="text-[16px] text-white/60 leading-relaxed max-w-xl">
                  Fostering innovation and applied research to translate emerging
                  ideas into scalable solutions across AI, data science, and
                  next-generation computing.
                </p>
              </div>
            </motion.div>

            {/* ── IIT ROPAR — Tall side card (5/12) ── */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="group lg:col-span-5 relative rounded-[28px] bg-white/[0.03] backdrop-blur-xl border border-white/10 overflow-hidden flex flex-col transition-all duration-500 hover:border-amber-400/30 hover:shadow-[0_0_50px_rgba(251,191,36,0.08)]"
            >
              {/* Image — fills more of the card */}
              <div className="relative h-64 lg:flex-1 min-h-[240px] w-full overflow-hidden">
                <img
                  src={IitRoparImg}
                  alt="IIT Ropar"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all duration-700 scale-105 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent" />

                {/* Floating badge on image */}
                <div className="absolute top-5 left-6">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-400 bg-black/60 backdrop-blur-md border border-amber-400/20 rounded-full px-3 py-1">
                    Memorandum of Understanding
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 lg:p-10">
                <h3 className="text-[28px] lg:text-[32px] font-bold text-white tracking-tight leading-tight mb-4">
                  IIT Ropar
                </h3>
                <p className="text-[15px] text-white/60 leading-relaxed">
                  Establishing a long-term framework for research excellence and
                  industry execution — bridging academic rigor with scalable,
                  market-ready innovation.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            DEFENCE & CONSULTANCY — Split-Screen Layout
            Left: Pinned editorial text
            Right: Dossier card grid
        ═══════════════════════════════════════════ */}
        <section className="relative max-w-[1440px] mx-auto px-8 lg:px-16 pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

            {/* Left column — editorial text (5 cols, sticky) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start"
            >
              <span className="text-amber-400 text-[11px] font-bold uppercase tracking-[0.6em] mb-4 block">
                Classified Initiatives
              </span>

              <h2 className="text-[40px] lg:text-[52px] font-bold text-white uppercase tracking-tight leading-[1.05] mb-6">
                Defence &<br />
                <span className="text-amber-400">Consultancy</span>
              </h2>

              <div className="w-16 h-px bg-amber-400/40 mb-6" />

              <p className="text-[17px] text-white/50 leading-relaxed mb-8">
                AI-focused initiatives within India's defence ecosystem —
                developing sovereign capabilities across intelligence, autonomy,
                and secure systems.
              </p>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-amber-400/60" />
                  <span className="text-[13px] text-white/40 uppercase tracking-[0.2em] font-bold">
                    Advanced Analytics
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-amber-400/40" />
                  <span className="text-[13px] text-white/40 uppercase tracking-[0.2em] font-bold">
                    Intelligent Systems
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-amber-400/30" />
                  <span className="text-[13px] text-white/40 uppercase tracking-[0.2em] font-bold">
                    Sovereign Infrastructure
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Right column — Dossier grid (7 cols) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {defenceAreas.map((area, i) => {
                const Icon = area.icon;
                return (
                  <motion.div
                    key={area.label}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                    className="group relative rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-7 overflow-hidden transition-all duration-500 hover:border-amber-400/30 hover:shadow-[0_0_30px_rgba(251,191,36,0.06)] cursor-default"
                  >

                    {/* Icon */}
                    <div className="w-14 h-14 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center mb-6 transition-all duration-500 group-hover:bg-amber-400/20 group-hover:border-amber-400/40 group-hover:shadow-[0_0_24px_rgba(251,191,36,0.15)]">
                      <Icon
                        size={24}
                        className="text-amber-400/70 group-hover:text-amber-400 transition-colors duration-500"
                        strokeWidth={1.5}
                      />
                    </div>

                    {/* Label */}
                    <h3 className="text-[15px] font-bold text-white/90 uppercase tracking-wide mb-2">
                      {area.label}
                    </h3>

                    {/* Description */}
                    <p className="text-[13px] text-white/45 leading-relaxed">
                      {area.description}
                    </p>

                    {/* Bottom scan-line */}
                    <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
