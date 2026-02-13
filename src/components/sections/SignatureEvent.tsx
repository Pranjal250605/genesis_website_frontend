import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";
import { MapPin, Calendar, CheckCircle2, Zap, Circle } from "lucide-react";
import ZentejVideo from "@/components/images/zentejvid.mp4";
import ZentejLogo from "@/components/images/Zentej_logo_only.png";

/* ─── Gallery Images ─── */
import Img1 from "@/components/images/unnamed (1).webp";
import Img2 from "@/components/images/unnamed (2).webp";
import Img3 from "@/components/images/unnamed (3).webp";
import Img4 from "@/components/images/unnamed (4).webp";
import Img5 from "@/components/images/unnamed (5).webp";
import Img6 from "@/components/images/unnamed (6).webp";
import Img7 from "@/components/images/unnamed (7).webp";
import Img8 from "@/components/images/unnamed (8).webp";
import Img9 from "@/components/images/unnamed (9).webp";

const galleryImages = [Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8, Img9];

/* ─── Timeline Data ─── */

interface TimelineNode {
  year: string;
  location: string;
  country: string;
  status: "completed" | "active" | "upcoming";
}

const timeline: TimelineNode[] = [
  {
    year: "2024",
    location: "Hokkaido University",
    country: "Japan",
    status: "completed",
  },
  {
    year: "2025",
    location: "IIT Ropar",
    country: "India",
    status: "completed",
  },
  {
    year: "2026",
    location: "IIT Mandi",
    country: "India",
    status: "completed",
  },
  {
    year: "IDEATHON",
    location: "IIT Mandi",
    country: "India",
    status: "active",
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

export default function SignatureEvent() {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  /* Video parallax — video moves slower than scroll */
  const { scrollYProgress: videoProgress } = useScroll({
    target: videoRef,
    offset: ["start start", "end start"],
  });
  const videoY = useTransform(videoProgress, [0, 1], [0, 100]);
  const videoScale = useTransform(videoProgress, [0, 1], [1, 1.1]);

  /* Hero content parallax */
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroContentY = useTransform(heroProgress, [0, 1], [0, 120]);
  const heroContentOpacity = useTransform(heroProgress, [0, 0.6], [1, 0]);

  /* Gallery parallax — slides up as it enters */
  const { scrollYProgress: galleryProgress } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"],
  });
  const galleryY = useTransform(galleryProgress, [0, 0.5], [80, 0]);
  const galleryScale = useTransform(galleryProgress, [0, 0.5], [0.95, 1]);
  const smoothGalleryY = useSpring(galleryY, { stiffness: 80, damping: 20 });
  const smoothGalleryScale = useSpring(galleryScale, { stiffness: 80, damping: 20 });

  return (
    <section className="relative w-full overflow-hidden bg-[#050505]">

      {/* ══════════════════════════════════════
          HERO — Video Background + Content
      ══════════════════════════════════════ */}
      <div ref={videoRef} className="relative min-h-screen">

        {/* Video Background — parallax */}
        <motion.div
          style={{ y: videoY, scale: videoScale }}
          className="absolute inset-0 z-0"
        >
          <video
            src={ZentejVideo}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/50 via-transparent to-transparent" />
        </motion.div>

        {/* Content Layer */}
        <div ref={heroRef} className="relative z-10 flex flex-col justify-between min-h-screen max-w-[1440px] mx-auto px-8 lg:px-16">

          {/* Top: Hero Content — parallax + fade out on scroll */}
          <motion.div
            style={{ y: heroContentY, opacity: heroContentOpacity }}
            className="pt-36 lg:pt-44 flex-1 flex flex-col justify-center"
          >
            <div className="max-w-3xl">
              {/* Eyebrow — slides in from left */}
              <motion.span
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="text-amber-400 text-[11px] font-bold uppercase tracking-[0.6em] mb-6 block"
              >
                {t("signature_event_page.eyebrow")}
              </motion.span>

              {/* Logo + Hackathon — staggered scale-in */}
              <div className="flex items-end gap-6 mb-6">
                <motion.img
                  src={ZentejLogo}
                  alt="ZenTej"
                  initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1, type: "spring", stiffness: 150, damping: 15 }}
                  className="h-20 lg:h-28 w-auto object-contain"
                />
                <div className="overflow-hidden">
                  <motion.h2
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="text-[48px] lg:text-[72px] font-bold text-white uppercase tracking-tight leading-none"
                  >
                    {t("signature_event_page.title")}
                  </motion.h2>
                </div>
              </div>

              {/* Description — blur-in */}
              <motion.p
                initial={{ opacity: 0, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.4 }}
                className="text-[18px] lg:text-[20px] text-white/75 leading-relaxed max-w-2xl mb-8"
              >
                {t("signature_event_page.subtitle")}
              </motion.p>

              {/* Badges — staggered pop-in */}
              <div className="flex items-center gap-4 flex-wrap mb-10">
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5, type: "spring", stiffness: 200, damping: 15 }}
                  animate={{
                    boxShadow: [
                      "0 0 15px rgba(251,191,36,0.15)",
                      "0 0 30px rgba(251,191,36,0.25)",
                      "0 0 15px rgba(251,191,36,0.15)",
                    ],
                  }}
                  className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-amber-400 bg-amber-400/10 border border-amber-400/30 rounded-full px-5 py-2"
                >
                  <Zap size={14} strokeWidth={2} />
                  {t("signature_event_page.badge_season")}
                </motion.span>

                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6, type: "spring", stiffness: 200, damping: 15 }}
                  className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/70 bg-white/[0.05] backdrop-blur-md border border-white/10 rounded-full px-5 py-2"
                >
                  <Calendar size={13} strokeWidth={1.5} />
                  {t("signature_event_page.badge_year")}
                </motion.span>
              </div>
            </div>
          </motion.div>

          {/* ══════════════════════════════════════
              TIMELINE — Horizontal (desktop) / Vertical (mobile)
          ══════════════════════════════════════ */}
          <div className="pb-16 lg:pb-20">
            {/* ── Desktop: Horizontal Timeline ── */}
            <div className="hidden lg:block">
              <div className="relative">
                {/* Glowing track line — draws in from left */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-6 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent origin-left"
                />

                <div className="flex items-start justify-start">
                  {timeline.map((node, i) => (
                    <TimelineNodeDesktop key={node.year} node={node} index={i} isLast={i === timeline.length - 1} />
                  ))}
                </div>
              </div>
            </div>

            {/* ── Mobile: Vertical Timeline ── */}
            <div className="block lg:hidden">
              <div className="relative pl-10">
                {/* Vertical track line — draws down */}
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-[23px] top-0 bottom-0 w-px bg-gradient-to-b from-amber-400/30 via-amber-400/15 to-transparent origin-top"
                />

                <div className="flex flex-col gap-8">
                  {timeline.map((node, i) => (
                    <TimelineNodeMobile key={node.year} node={node} index={i} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          GALLERY MARQUEE — Infinite scroll
      ══════════════════════════════════════ */}
      <motion.div
        ref={galleryRef}
        style={{ y: smoothGalleryY, scale: smoothGalleryScale }}
        className="relative py-16 lg:py-24"
      >
        {/* Section label */}
        <div className="max-w-[1440px] mx-auto px-8 lg:px-16 mb-10">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-amber-400 text-[11px] font-bold uppercase tracking-[0.6em] mb-3 block"
            >
              {t("signature_event_page.gallery_eyebrow")}
            </motion.span>
            <h3
              className="text-[32px] lg:text-[44px] font-bold text-white uppercase tracking-tight leading-none"
              dangerouslySetInnerHTML={{
                __html: t("signature_event_page.gallery_title")
                  .replace("<1>", '<span class="text-amber-400">')
                  .replace("</1>", "</span>"),
              }}
            />
          </div>
        </div>

        {/* Marquee container — full width, overflow hidden */}
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

          {/* Sliding track — duplicated for seamless loop */}
          <div className="flex animate-marquee w-max gap-5">
            {[...galleryImages, ...galleryImages].map((src, i) => (
              <div
                key={i}
                className="group relative w-72 h-48 lg:w-96 lg:h-64 rounded-2xl overflow-hidden border border-white/10 shrink-0 cursor-pointer transition-all duration-500 hover:border-amber-400/30 hover:shadow-[0_0_30px_rgba(251,191,36,0.08)]"
              >
                <img
                  src={src}
                  alt={`Event photo ${(i % galleryImages.length) + 1}`}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 opacity-90 group-hover:opacity-100 transition-all duration-700 scale-105 group-hover:scale-100"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/40 via-transparent to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════
    Timeline Sub-components
═══════════════════════════════════════════ */

function TimelineNodeDesktop({ node, index, isLast }: { node: TimelineNode; index: number; isLast: boolean }) {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const isActive = node.status === "active";
  const isCompleted = node.status === "completed";
  const isUpcoming = node.status === "upcoming";

  return (
    <div ref={ref} className="flex items-start" style={{ flex: "0 0 auto" }}>
      <div className="flex flex-col items-center w-64 xl:w-72">
        {/* Dot — bounces in */}
        <div className="relative mb-5">
          {isActive && (
            <motion.div
              animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 rounded-full bg-amber-400"
            />
          )}
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{
              duration: 0.5,
              delay: index * 0.15,
              type: "spring",
              stiffness: 300,
              damping: 15,
            }}
            className={`relative w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
              isActive
                ? "border-amber-400 bg-amber-400/20 shadow-[0_0_20px_rgba(251,191,36,0.3)]"
                : isCompleted
                ? "border-amber-400/50 bg-amber-400/10"
                : "border-white/15 bg-white/[0.03]"
            }`}
          >
            {isCompleted && <CheckCircle2 size={18} className="text-amber-400/80" strokeWidth={2} />}
            {isActive && <Zap size={16} className="text-amber-400" strokeWidth={2} />}
            {isUpcoming && <Circle size={8} className="text-white/50" strokeWidth={0} fill="currentColor" />}
          </motion.div>
        </div>

        {/* Glass card — slides up + fades in */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.92 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{
            duration: 0.6,
            delay: index * 0.15 + 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={`w-full rounded-2xl backdrop-blur-xl border p-5 transition-all duration-500 ${
            isActive
              ? "bg-white/[0.06] border-amber-400/30 shadow-[0_0_30px_rgba(251,191,36,0.08)]"
              : isCompleted
              ? "bg-white/[0.04] border-white/10"
              : "bg-white/[0.02] border-white/[0.07]"
          }`}
        >
          <span
            className={`text-[28px] font-bold tracking-tight block mb-1 ${
              isActive ? "text-amber-400" : isCompleted ? "text-white/85" : "text-white/60"
            }`}
          >
            {node.year}
          </span>
          <span className={`text-[14px] font-bold block mb-1 ${isUpcoming ? "text-white/70" : "text-white/95"}`}>
            {node.location}
          </span>
          <div className="flex items-center gap-1.5">
            <MapPin size={11} className="text-white/50" strokeWidth={1.5} />
            <span className="text-[11px] text-white/60 uppercase tracking-wider">
              {node.country}
            </span>
          </div>

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: index * 0.15 + 0.3, type: "spring", stiffness: 250 }}
            className="mt-3"
          >
            {isCompleted && (
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-amber-400/80 bg-amber-400/10 border border-amber-400/20 rounded-full px-2.5 py-0.5">
                {t("signature_event_page.status.completed")}
              </span>
            )}
            {isActive && (
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-amber-400 bg-amber-400/10 border border-amber-400/30 rounded-full px-2.5 py-0.5">
                {t("signature_event_page.status.active")}
              </span>
            )}
            {isUpcoming && (
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/55 bg-white/[0.05] border border-white/15 rounded-full px-2.5 py-0.5">
                {t("signature_event_page.status.upcoming")}
              </span>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Connector line — draws in */}
      {!isLast && (
        <div className="flex items-center h-12 px-2">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.15 + 0.2, ease: "easeOut" }}
            className={`w-12 xl:w-16 h-px origin-left ${
              isCompleted
                ? "bg-gradient-to-r from-amber-400/40 to-amber-400/20"
                : "bg-gradient-to-r from-white/15 to-white/[0.07]"
            }`}
          />
        </div>
      )}
    </div>
  );
}

function TimelineNodeMobile({ node, index }: { node: TimelineNode; index: number }) {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const isActive = node.status === "active";
  const isCompleted = node.status === "completed";
  const isUpcoming = node.status === "upcoming";

  return (
    <div ref={ref} className="relative flex items-start gap-5">
      {/* Dot — positioned on the vertical line */}
      <div className="absolute -left-10 top-1">
        <div className="relative">
          {isActive && (
            <motion.div
              animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 rounded-full bg-amber-400"
            />
          )}
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{
              duration: 0.5,
              delay: index * 0.12,
              type: "spring",
              stiffness: 300,
              damping: 15,
            }}
            className={`relative w-12 h-12 rounded-full border-2 flex items-center justify-center ${
              isActive
                ? "border-amber-400 bg-amber-400/20 shadow-[0_0_20px_rgba(251,191,36,0.3)]"
                : isCompleted
                ? "border-amber-400/50 bg-amber-400/10"
                : "border-white/15 bg-white/[0.03]"
            }`}
          >
            {isCompleted && <CheckCircle2 size={18} className="text-amber-400/80" strokeWidth={2} />}
            {isActive && <Zap size={16} className="text-amber-400" strokeWidth={2} />}
            {isUpcoming && <Circle size={8} className="text-white/50" strokeWidth={0} fill="currentColor" />}
          </motion.div>
        </div>
      </div>

      {/* Glass card — slides in from right */}
      <motion.div
        initial={{ opacity: 0, x: 40, scale: 0.92 }}
        animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
        transition={{
          duration: 0.6,
          delay: index * 0.12 + 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`flex-1 rounded-2xl backdrop-blur-xl border p-5 transition-all duration-500 ${
          isActive
            ? "bg-white/[0.06] border-amber-400/30 shadow-[0_0_30px_rgba(251,191,36,0.08)]"
            : isCompleted
            ? "bg-white/[0.04] border-white/10"
            : "bg-white/[0.02] border-white/[0.07]"
        }`}
      >
        <span
          className={`text-[24px] font-bold tracking-tight block mb-1 ${
            isActive ? "text-amber-400" : isCompleted ? "text-white/85" : "text-white/60"
          }`}
        >
          {node.year}
        </span>
        <span className={`text-[14px] font-bold block mb-1 ${isUpcoming ? "text-white/70" : "text-white/95"}`}>
          {node.location}
        </span>
        <div className="flex items-center gap-1.5">
          <MapPin size={11} className="text-white/50" strokeWidth={1.5} />
          <span className="text-[11px] text-white/60 uppercase tracking-wider">
            {node.country}
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.12 + 0.3, type: "spring", stiffness: 250 }}
          className="mt-3"
        >
          {isCompleted && (
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-amber-400/80 bg-amber-400/10 border border-amber-400/20 rounded-full px-2.5 py-0.5">
              {t("signature_event_page.status.completed")}
            </span>
          )}
          {isActive && (
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-amber-400 bg-amber-400/10 border border-amber-400/30 rounded-full px-2.5 py-0.5">
              {t("signature_event_page.status.active")}
            </span>
          )}
          {isUpcoming && (
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/55 bg-white/[0.05] border border-white/15 rounded-full px-2.5 py-0.5">
              {t("signature_event_page.status.upcoming")}
            </span>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
