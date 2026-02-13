import { useRef, useState, useLayoutEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import Starry from "@/components/ui/Starry";

import { ClipboardCheck, UsersRound, Workflow, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import outsourcingBg from "@/components/images/outsourcing.webp";
import gxBg from "@/components/images/gx.webp";
import takakoImg from "@/components/images/takako1.png";

gsap.registerPlugin(ScrollTrigger);

interface ServiceCardData {
  number: string;
  title: string;
  desc: string;
  list: string[];
  footer: string;
}

const services: ServiceCardData[] = [
  {
    number: "01",
    title: "Product & Software / Hardware Sales",
    desc: "We connect innovative technology providers with high-potential markets through structured sales execution and strategic partnerships.",
    list: [
      "Enterprise SaaS & AI platforms",
      "Cybersecurity & cloud solutions",
      "Automation, IoT & emerging tech systems",
      "Industrial and specialized hardware",
    ],
    footer: "Market entry strategy · Channel development · Enterprise sales enablement · Revenue acceleration",
  },
  {
    number: "02",
    title: "Reskilling & Content Solutions",
    desc: "We design and distribute future-focused educational programs that prepare professionals and organizations for the evolving digital economy.",
    list: [
      "AI, Data & Cloud technologies",
      "Blockchain & Web3 fundamentals",
      "Cybersecurity & digital transformation",
      "Corporate training & certification tracks",
    ],
    footer: "Structured learning · Industry relevance · Scalable impact",
  },
  {
    number: "03",
    title: "Crypto & Blockchain Technology",
    desc: "We help organizations adopt decentralized technologies with clarity, security, and strategic alignment.",
    list: [
      "Blockchain strategy & advisory",
      "Smart contract & dApp support",
      "Tokenization frameworks",
      "Compliance-aware implementation",
    ],
    footer: "Secure · Scalable · Forward-looking",
  },
  {
    number: "04",
    title: "Tech Project Outsourcing",
    desc: "We deliver high-quality technical execution through dedicated teams in India serving international clients.",
    list: [
      "Custom software development",
      "Enterprise system architecture",
      "Embedded & hardware support",
      "Dedicated remote engineering teams",
    ],
    footer: "Transparent processes · Agile delivery · Global standards",
  },
];

const outsourcingSteps: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: ClipboardCheck,
    title: "Step 1. Project Intake & Vetting",
    description:
      "We consult with Japanese clients to define project scope, technical requirements, and vet the project through Edify Japan.",
  },
  {
    icon: UsersRound,
    title: "Step 2. Resource Allocation",
    description:
      "The project is routed to the Edify Bharat branch, where we match the requirements with specialized IIT researchers and engineers.",
  },
  {
    icon: Workflow,
    title: "Step 3. Execution & Management",
    description:
      "Our dedicated engineering teams execute the project with active coordination, offering time-and-materials or fixed-price development with regular progress reporting.",
  },
  {
    icon: ShieldCheck,
    title: "Step 4. QA & Delivery",
    description:
      "Final deliverables undergo ISO-inspired quality assurance and data security checks before handover and feedback collection.",
  },
];

function HolographicCard({ card, index }: { card: ServiceCardData; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), {
    stiffness: 150,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{ 
          rotateX, 
          rotateY, 
          transformStyle: "preserve-3d",
          borderColor: isHovered ? "rgba(251,191,36,0.5)" : "rgba(255,255,255,0.1)",
          boxShadow: isHovered
            ? "0 0 40px rgba(251,191,36,0.12), 0 0 80px rgba(251,191,36,0.06), inset 0 0 60px rgba(251,191,36,0.03)"
            : "none",
        }}
        className="relative flex flex-col rounded-[28px] border bg-white/[0.02] backdrop-blur-xl overflow-hidden transition-[border-color,box-shadow] duration-500 h-full cursor-pointer"
      >
        <div
          className="pointer-events-none absolute inset-0 z-10 rounded-[28px] transition-opacity duration-500"
          style={{
            opacity: isHovered ? 0.08 : 0,
            background:
              "linear-gradient(105deg, transparent 30%, rgba(251,191,36,0.3) 45%, rgba(255,255,255,0.15) 50%, rgba(251,191,36,0.3) 55%, transparent 70%)",
          }}
        />

        <div
          className="relative z-20 flex flex-col h-full p-8 lg:p-10 transition-transform duration-500 ease-out"
          style={{ 
            transform: isHovered ? "translateZ(50px)" : "translateZ(0px)",
            transformStyle: "preserve-3d"
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-amber-400/60">{card.number}</span>
            <div className="flex-1 h-px bg-gradient-to-r from-amber-400/30 to-transparent" />
          </div>

          <h3 className="text-[26px] lg:text-[30px] font-bold text-amber-400 leading-tight uppercase tracking-tight mb-5">
            {card.title}
          </h3>

          <p className="text-[15px] text-white/70 leading-relaxed mb-7">{card.desc}</p>

          <ul className="flex flex-col gap-3 mb-8 flex-1">
            {card.list.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/50" />
                <span className="text-[14px] text-white/70 leading-snug">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-auto">
            <div className="h-px w-full bg-gradient-to-r from-white/10 via-amber-400/20 to-white/10 mb-5" />
            <p className="text-[12px] text-white/40 uppercase tracking-[0.15em] leading-relaxed">
              {card.footer}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  const { t } = useTranslation();
  const gxContainerRef = useRef<HTMLDivElement>(null);
  const gxImageRef = useRef<HTMLImageElement>(null);
  const gxOverlayRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: gxContainerRef.current,
          start: "top top",
          end: "+=600%",
          pin: true,
          scrub: 1,
        },
      });

      // Image zoom & brighten
      tl.fromTo(
        gxImageRef.current,
        { scale: 1.2, filter: "brightness(0.4) grayscale(0.5)" },
        { scale: 1, filter: "brightness(0.7) grayscale(0)", duration: 5 },
        0
      );
      tl.to(gxOverlayRef.current, { backgroundColor: "rgba(0,0,0,0.55)", duration: 2 }, 0);

      // Panel sequencing
      const panels = [".gx-panel-1", ".gx-panel-2", ".gx-panel-3"];
      panels.forEach((panel, i) => {
        tl.fromTo(panel, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.5, ease: "expo.out" });
        tl.to({}, { duration: 3 }); // reading pause

        if (i !== panels.length - 1) {
          tl.to(panel, { opacity: 0, y: -40, duration: 1.2 });
        }
      });

      // Card slides in on panel 3
      tl.fromTo(
        ".gx-card",
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration: 1.5, ease: "power3.out" },
        "-=4.5"
      );

      tl.to({}, { duration: 2 }); // final buffer
    }, gxContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    /* Changed bg-[#050505] to bg-transparent to allow Starry to show through */
    <section className="relative min-h-screen w-full bg-transparent overflow-hidden py-32">
      
      {/* Background Layer: Stars explicitly placed at z-0 */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Starry />
      </div>

      {/* Ambient background glow (over the stars, under the text) */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
        style={{
          width: "80vw",
          height: "80vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(251,191,36,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-8 lg:px-16">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-[48px] lg:text-[72px] font-bold text-white uppercase tracking-tight leading-none mb-4">
            Our <span className="text-amber-400">Services</span>
          </h2>
          <p className="text-[18px] text-white/50 max-w-2xl leading-relaxed">
            Integrated solutions across technology, education, and innovation — designed for scale.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
          {services.map((card, i) => (
            <HolographicCard key={card.number} card={card} index={i} />
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          OUTSOURCING HERO BANNER
      ═══════════════════════════════════════════ */}
      <div className="relative z-10 mt-24 sm:mt-32">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="relative w-full h-[320px] sm:h-[420px] lg:h-[520px] overflow-hidden"
        >
          <motion.img
            src={outsourcingBg}
            alt="Outsourcing"
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/85" />
          <div className="relative z-10 flex items-center justify-center h-full px-6">
            <motion.h2
              initial={{ opacity: 0, y: 40, letterSpacing: "0.2em" }}
              whileInView={{ opacity: 1, y: 0, letterSpacing: "0.05em" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="text-[36px] sm:text-[52px] md:text-[64px] lg:text-[80px] xl:text-[96px] font-bold text-white uppercase tracking-tight text-center"
            >
              Outsourcing
            </motion.h2>
          </div>
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════════
          4-STEP PROCESS
      ═══════════════════════════════════════════ */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-16 py-20 sm:py-28 lg:py-36">
        {/* Section header — prominent "How It Works" */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mb-12 sm:mb-16 lg:mb-20 text-center"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto mb-6 sm:mb-8 h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent origin-center"
          />
          <h3 className="text-[32px] sm:text-[42px] md:text-[52px] lg:text-[64px] font-bold text-white uppercase tracking-tight leading-none">
            How It <span className="text-amber-400">Works</span>
          </h3>
          <p className="mt-4 sm:mt-5 text-[14px] sm:text-[16px] lg:text-[18px] text-white/40 max-w-xl mx-auto leading-relaxed">
            From intake to delivery — a streamlined, transparent process.
          </p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto mt-6 sm:mt-8 h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent origin-center"
          />
        </motion.div>

        {/* Step cards with flow arrows */}
        <div className="flex flex-col xl:flex-row items-center xl:items-stretch gap-0 xl:gap-0">
          {outsourcingSteps.map((step, i) => (
            <div key={step.title} className="flex flex-col xl:flex-row items-center xl:items-stretch xl:flex-1">
              {/* Card */}
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: "easeOut" }}
                className="group relative flex flex-col items-center text-center rounded-[28px] border border-white/10 bg-white/[0.02] backdrop-blur-xl p-6 sm:p-8 lg:p-10 hover:border-amber-400/30 hover:bg-white/[0.04] transition-all duration-500 w-full"
              >
                {/* Step number badge */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-block px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.3em] text-amber-400/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Icon container — large & breathing */}
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.85, 1, 0.85],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.5,
                  }}
                  className="mt-4 mb-6 sm:mb-8 w-28 h-28 sm:w-32 sm:h-32 lg:w-40 lg:h-40 flex items-center justify-center rounded-full bg-gradient-to-br from-amber-400/15 to-amber-400/5 border border-amber-400/20 group-hover:border-amber-400/40 transition-colors duration-500"
                >
                  <step.icon
                    className="w-12 h-12 sm:w-14 sm:h-14 lg:w-[72px] lg:h-[72px] text-amber-400/80 drop-shadow-[0_0_12px_rgba(251,191,36,0.15)]"
                    strokeWidth={1.2}
                  />
                </motion.div>

                {/* Title */}
                <h4 className="text-[15px] sm:text-[16px] lg:text-[18px] font-bold text-amber-400 uppercase tracking-tight mb-3 sm:mb-4 leading-snug">
                  {step.title}
                </h4>

                {/* Divider */}
                <div className="w-10 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent mb-3 sm:mb-4" />

                {/* Description */}
                <p className="text-[13px] sm:text-[14px] lg:text-[15px] text-white/60 leading-relaxed group-hover:text-white/75 transition-colors duration-500">
                  {step.description}
                </p>
              </motion.div>

              {/* Flow arrow between cards */}
              {i < outsourcingSteps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 + 0.3 }}
                  className="flex items-center justify-center shrink-0"
                >
                  {/* Vertical arrow — mobile / tablet */}
                  <div className="flex xl:hidden flex-col items-center py-4 sm:py-5">
                    <div className="w-px h-6 sm:h-8 bg-gradient-to-b from-amber-400/40 to-amber-400/20" />
                    <svg width="16" height="10" viewBox="0 0 16 10" fill="none" className="text-amber-400/50 mt-0.5">
                      <path d="M1 1L8 8L15 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  {/* Horizontal arrow — desktop */}
                  <div className="hidden xl:flex items-center px-3 lg:px-4">
                    <div className="h-px w-5 lg:w-7 bg-gradient-to-r from-amber-400/40 to-amber-400/20" />
                    <svg width="10" height="16" viewBox="0 0 10 16" fill="none" className="text-amber-400/50 ml-0.5">
                      <path d="M1 1L8 8L1 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          GX — GREEN TRANSFORMATION (Scroll Hijack)
      ═══════════════════════════════════════════ */}
      <div ref={gxContainerRef} className="relative h-screen w-full overflow-hidden">
        {/* Top gradient blend */}
        <div className="absolute top-0 left-0 w-full h-48 z-50 bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none" />

        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img ref={gxImageRef} src={gxBg} className="h-full w-full object-cover" alt="Green Transformation" />
          <div ref={gxOverlayRef} className="absolute inset-0 z-10 bg-black/30" />
          <div className="absolute inset-0 z-20 bg-gradient-to-tr from-black/80 via-black/30 to-transparent" />
        </div>

        {/* Content layer */}
        <div className="relative z-30 flex h-full w-full items-end justify-start p-8 md:p-16 lg:p-32">

          {/* Panel 1 */}
          <div className="gx-panel-1 absolute flex flex-col items-start text-left gap-4 sm:gap-6 max-w-5xl pb-16 opacity-0">
            <h2 className="text-[36px] sm:text-[50px] lg:text-[70px] font-medium text-white leading-[1.05] uppercase tracking-tight drop-shadow-2xl">
              {t("gxSection.panel1Title").split(" ").slice(0, -2).join(" ")}{" "}
              <span className="text-amber-400">
                {t("gxSection.panel1Title").split(" ").slice(-2).join(" ")}
              </span>
            </h2>
            <div className="flex items-start">
              <div className="w-px h-12 sm:h-16 bg-amber-400/30 mr-6 sm:mr-8 shrink-0" />
              <p className="text-[18px] sm:text-[24px] lg:text-[30px] font-medium text-white/60 leading-snug max-w-3xl">
                {t("gxSection.panel1Sub")}
              </p>
            </div>
          </div>

          {/* Panel 2 */}
          <div className="gx-panel-2 absolute flex flex-col items-start text-left gap-4 sm:gap-6 max-w-5xl pb-16 opacity-0">
            <h2 className="text-[36px] sm:text-[50px] lg:text-[70px] font-medium text-white leading-[1.05] uppercase tracking-tight drop-shadow-2xl">
              {t("gxSection.panel2Title").split(" ").slice(0, -3).join(" ")}{" "}
              <span className="text-amber-400">
                {t("gxSection.panel2Title").split(" ").slice(-3).join(" ")}
              </span>
            </h2>
            <div className="flex items-start">
              <div className="w-px h-12 sm:h-16 bg-amber-400/30 mr-6 sm:mr-8 shrink-0" />
              <p className="text-[18px] sm:text-[24px] lg:text-[30px] font-medium text-white/60 leading-snug max-w-3xl">
                {t("gxSection.panel2Sub")}
              </p>
            </div>
          </div>

          {/* Panel 3 + Card */}
          <div className="gx-panel-3 absolute inset-0 z-30 flex flex-col lg:flex-row items-end lg:items-center justify-start lg:justify-between p-8 md:p-16 lg:p-32 pt-32 md:pt-40 pb-16 opacity-0">
            {/* Left text */}
            <div className="flex flex-col items-start text-left gap-4 sm:gap-6 max-w-2xl">
              <h2 className="text-[36px] sm:text-[50px] lg:text-[70px] font-medium text-white leading-[1.05] uppercase tracking-tight drop-shadow-2xl">
                {t("gxSection.panel3Title").split(" ").slice(0, -2).join(" ")}{" "}
                <span className="text-amber-400">
                  {t("gxSection.panel3Title").split(" ").slice(-2).join(" ")}
                </span>
              </h2>
              <div className="flex items-start">
                <div className="w-px h-12 sm:h-16 bg-amber-400/30 mr-6 sm:mr-8 shrink-0" />
                <p className="text-[18px] sm:text-[24px] lg:text-[30px] font-medium text-white/60 leading-snug max-w-3xl">
                  {t("gxSection.panel3Sub")}
                </p>
              </div>
            </div>

            {/* Right card */}
            <div className="gx-card opacity-0 mt-8 lg:mt-24 lg:ml-12 w-full sm:w-[380px] lg:w-[400px] shrink-0">
              <div className="rounded-[24px] bg-white/[0.06] backdrop-blur-2xl border border-white/15 overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.4)]">
                {/* Image */}
                <div className="relative h-72 sm:h-80 overflow-hidden">
                  <img
                    src={takakoImg}
                    alt={t("gxSection.card.name")}
                    className="w-full h-full object-cover object-[center_15%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                  {/* Company badge */}
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-400 bg-black/60 backdrop-blur-md border border-amber-400/25 rounded-full px-3 py-1">
                      {t("gxSection.card.company")}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6 sm:p-7">
                  <h4 className="text-[17px] sm:text-[19px] font-bold text-white leading-tight mb-1">
                    {t("gxSection.card.name")}
                  </h4>
                  <p className="text-[13px] text-amber-400/80 font-semibold uppercase tracking-wide mb-5">
                    {t("gxSection.card.subtitle")}
                  </p>

                  <div className="h-px w-full bg-gradient-to-r from-white/10 via-amber-400/20 to-white/10 mb-5" />

                  <p className="text-[12px] text-white/50 font-bold uppercase tracking-[0.15em] mb-3">
                    {t("gxSection.card.heading")}
                  </p>
                  <ul className="flex flex-col gap-2.5">
                    <li className="flex items-start gap-2.5">
                      <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/50" />
                      <span className="text-[13px] text-white/65 leading-snug">
                        {t("gxSection.card.affiliation1")}
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/50" />
                      <span className="text-[13px] text-white/65 leading-snug">
                        {t("gxSection.card.affiliation2")}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom gradient blend */}
        <div className="absolute bottom-0 left-0 w-full h-32 z-50 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      </div>
    </section>
  );
}