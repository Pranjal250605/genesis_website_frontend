import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
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
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StarField from "@/components/ui/Starry";

gsap.registerPlugin(ScrollTrigger);

/* ───────────────────── Data ───────────────────── */

const teamCards = [
  {
    icon: GraduationCap,
    title: "Academic Depth",
    description: "Strong foundations from top IITs.",
  },
  {
    icon: Globe2,
    title: "Global Perspective",
    description: "International exposure across research ecosystems.",
  },
  {
    icon: Cpu,
    title: "Frontier Tech",
    description: "Experience in AI, Blockchain, and massive-scale systems.",
  },
  {
    icon: Target,
    title: "Culture of Precision",
    description: "A shared commitment to intellectual rigor.",
  },
];

const hiringTraits = [
  { icon: Lightbulb, text: "Curiosity & research-driven thinking" },
  { icon: Shield, text: "Integrity & ownership" },
  { icon: Users, text: "Collaborative problem-solving" },
  { icon: Heart, text: "Passion for building at the frontier" },
  { icon: Sparkles, text: "Bias toward action over perfection" },
];

const openRoles: { icon: LucideIcon; title: string; team: string; location: string; type: string }[] = [
  {
    icon: BrainCircuit,
    title: "AI & ML Engineering",
    team: "Research & Engineering",
    location: "Remote / Bengaluru",
    type: "Full-time",
  },
  {
    icon: ShieldCheck,
    title: "Blockchain & Web3",
    team: "Distributed Systems",
    location: "Remote / Singapore",
    type: "Full-time",
  },
  {
    icon: Code2,
    title: "Full Stack Development",
    team: "Product Engineering",
    location: "Remote / Delhi NCR",
    type: "Full-time",
  },
  {
    icon: Palette,
    title: "Product Design",
    team: "Design & UX",
    location: "Remote",
    type: "Full-time / Contract",
  },
  {
    icon: Server,
    title: "DevOps & Infrastructure",
    team: "Platform Engineering",
    location: "Remote / Bengaluru",
    type: "Full-time",
  },
];

/* ───────────────────── Animation Helpers ───────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ───────────────────── Component ───────────────────── */

export default function Careers() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".gsap-fade-section").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative min-h-screen bg-[#050505] overflow-hidden">
      {/* ── Background Layers ── */}
      <StarField />
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(251,191,36,0.08) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10">
        {/* ═══════════════ HERO ═══════════════ */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center pt-28">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-4xl"
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="text-amber-400/70 text-sm font-medium uppercase tracking-[0.3em] mb-8"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Careers at Genesis
            </motion.p>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-6xl md:text-8xl font-bold tracking-tighter text-white leading-[0.95]"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Build the{" "}
              <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">
                Future.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-8 text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Combining international exposure with strong academic foundations.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="mt-12 flex items-center justify-center gap-6">
              <a
                href="#opportunities"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-amber-400 text-black font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-amber-300 hover:shadow-[0_0_40px_rgba(251,191,36,0.3)]"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                View Open Roles
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
              <a
                href="#philosophy"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/15 text-white/70 font-medium text-sm tracking-wide backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:text-white"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Our Philosophy
              </a>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-12 flex flex-col items-center gap-3"
          >
            <span
              className="text-white/30 text-xs tracking-[0.2em] uppercase"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Scroll
            </span>
            <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent" />
          </motion.div>
        </section>

        {/* ═══════════════ OUR TEAM – HOLOGRAPHIC GRID ═══════════════ */}
        <section className="gsap-fade-section py-32 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p
              className="text-amber-400/60 text-xs font-medium uppercase tracking-[0.35em] mb-4"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Our Team
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold tracking-tighter text-white"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              The minds behind Genesis
            </h2>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
          >
            {teamCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  variants={fadeUp}
                  custom={i}
                  className="group relative rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-10 transition-all duration-500 hover:border-amber-400/30 hover:shadow-[0_0_30px_rgba(251,191,36,0.15)]"
                >
                  {/* Corner glow */}
                  <div className="absolute -top-px -left-px w-24 h-24 bg-gradient-to-br from-amber-400/10 to-transparent rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center mb-6 transition-all duration-500 group-hover:border-amber-400/30 group-hover:bg-amber-400/[0.06]">
                      <Icon
                        size={26}
                        className="text-white/40 transition-colors duration-500 group-hover:text-amber-400"
                        strokeWidth={1.5}
                      />
                    </div>

                    <h3
                      className="text-xl font-bold text-white tracking-tight mb-3 transition-colors duration-500 group-hover:text-amber-400"
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      {card.title}
                    </h3>
                    <p
                      className="text-white/40 text-base leading-relaxed"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {card.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* ═══════════════ HIRING PHILOSOPHY – THE MANIFESTO ═══════════════ */}
        <section
          id="philosophy"
          className="gsap-fade-section py-32 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto"
        >
          <div className="flex flex-col lg:flex-row gap-0">
            {/* Left – Statement */}
            <div className="flex-1 flex flex-col justify-center pr-0 lg:pr-16 pb-12 lg:pb-0">
              <p
                className="text-amber-400/60 text-xs font-medium uppercase tracking-[0.35em] mb-6"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Hiring Philosophy
              </p>
              <h2
                className="text-3xl md:text-5xl font-bold tracking-tighter text-white leading-[1.1]"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                We don't just hire
                <br />
                for roles.{" "}
                <span className="bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">
                  We hire for impact.
                </span>
              </h2>
              <p
                className="mt-6 text-white/40 text-base leading-relaxed max-w-md"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Every person at Genesis is selected not just for what they know,
                but for who they are and what they're capable of becoming.
              </p>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px bg-gradient-to-b from-transparent via-amber-400/30 to-transparent" />
            <div className="lg:hidden h-px w-full bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />

            {/* Right – Traits */}
            <div className="flex-1 flex flex-col justify-center pl-0 lg:pl-16 pt-12 lg:pt-0">
              <motion.div
                className="space-y-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={stagger}
              >
                {hiringTraits.map((trait, i) => {
                  const Icon = trait.icon;
                  return (
                    <motion.div
                      key={trait.text}
                      variants={fadeUp}
                      custom={i}
                      className="group flex items-center gap-5"
                    >
                      <div className="w-10 h-10 rounded-lg border border-white/10 bg-white/[0.02] flex items-center justify-center shrink-0 transition-all duration-300 group-hover:border-amber-400/30 group-hover:bg-amber-400/[0.06]">
                        <Icon
                          size={18}
                          className="text-white/30 transition-colors duration-300 group-hover:text-amber-400"
                          strokeWidth={1.5}
                        />
                      </div>
                      <span
                        className="text-white/60 text-base font-medium transition-colors duration-300 group-hover:text-white"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {trait.text}
                      </span>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════ OPEN OPPORTUNITIES ═══════════════ */}
        <section
          id="opportunities"
          className="gsap-fade-section py-32 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto"
        >
          <div className="text-center mb-20">
            <p
              className="text-amber-400/60 text-xs font-medium uppercase tracking-[0.35em] mb-4"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Open Opportunities
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold tracking-tighter text-white"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Find your role
            </h2>
          </div>

          <motion.div
            className="space-y-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            {/* Header row */}
            <div
              className="hidden md:grid grid-cols-[auto_2fr_1fr_1fr_1fr_auto] gap-4 px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-white/30"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              <span className="w-10" />
              <span>Role</span>
              <span>Team</span>
              <span>Location</span>
              <span>Type</span>
              <span className="w-24" />
            </div>

            <div className="h-px bg-white/[0.06]" />

            {openRoles.map((role, i) => {
              const RoleIcon = role.icon;
              return (
                <motion.div
                  key={role.title}
                  variants={fadeUp}
                  custom={i}
                  className="group grid grid-cols-1 md:grid-cols-[auto_2fr_1fr_1fr_1fr_auto] gap-2 md:gap-4 items-center px-8 py-6 rounded-xl border border-transparent bg-transparent transition-all duration-300 hover:border-white/10 hover:bg-white/[0.02] cursor-pointer"
                >
                  <div className="hidden md:flex w-10 h-10 rounded-lg border border-white/10 bg-white/[0.02] items-center justify-center shrink-0 transition-all duration-300 group-hover:border-amber-400/30 group-hover:bg-amber-400/[0.06]">
                    <RoleIcon
                      size={18}
                      className="text-white/30 transition-colors duration-300 group-hover:text-amber-400"
                      strokeWidth={1.5}
                    />
                  </div>
                  <span
                    className="text-white font-semibold text-lg tracking-tight transition-colors duration-300 group-hover:text-amber-400 flex items-center gap-3"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    <RoleIcon size={18} className="md:hidden text-white/30 group-hover:text-amber-400 transition-colors duration-300" strokeWidth={1.5} />
                    {role.title}
                  </span>
                  <span
                    className="text-white/40 text-sm"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {role.team}
                  </span>
                  <span
                    className="text-white/40 text-sm"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {role.location}
                  </span>
                  <span
                    className="text-white/40 text-sm"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {role.type}
                  </span>
                  <div className="flex items-center gap-2 md:opacity-0 md:translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 w-24">
                    <span
                      className="text-amber-400 text-sm font-medium whitespace-nowrap"
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      Apply Now
                    </span>
                    <ArrowUpRight size={16} className="text-amber-400" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* ═══════════════ CTA ═══════════════ */}
        <section className="gsap-fade-section py-32 px-6 md:px-16 lg:px-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="relative rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl py-20 px-8 overflow-hidden">
              {/* Ambient glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(251,191,36,0.04) 0%, transparent 70%)",
                }}
              />

              <div className="relative z-10">
                <p
                  className="text-amber-400/60 text-xs font-medium uppercase tracking-[0.35em] mb-6"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Don't see your role?
                </p>
                <h2
                  className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-6"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Ready to make{" "}
                  <span className="bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">
                    your mark?
                  </span>
                </h2>
                <p
                  className="text-white/40 text-base max-w-lg mx-auto mb-10 leading-relaxed"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Send us your profile and tell us how you'd make an impact.
                  The right people always find a place at Genesis.
                </p>
                <a
                  href="mailto:careers@genesis.co"
                  className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-amber-400 text-black font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:bg-amber-300 hover:shadow-[0_0_40px_rgba(251,191,36,0.3)]"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Apply via Email
                </a>
              </div>
            </div>
          </div>

          {/* Footer spacer */}
          <div className="h-24" />
        </section>
      </div>
    </div>
  );
}
