import { motion } from "framer-motion";
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
    status: "active",
  },
  {
    year: "2027",
    location: "IIT Dubai",
    country: "UAE",
    status: "upcoming",
  },
];

/* ─── Component ─── */

export default function SignatureEvent() {
  return (
    <section className="relative w-full overflow-hidden bg-[#050505]">

      {/* ══════════════════════════════════════
          HERO — Video Background + Content
      ══════════════════════════════════════ */}
      <div className="relative min-h-screen">

        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            src={ZentejVideo}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent" />
        </div>

        {/* Content Layer */}
        <div className="relative z-10 flex flex-col justify-between min-h-screen max-w-[1440px] mx-auto px-8 lg:px-16">

          {/* Top: Hero Content */}
          <div className="pt-36 lg:pt-44 flex-1 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <span className="text-amber-400 text-[11px] font-bold uppercase tracking-[0.6em] mb-6 block">
                Signature Event
              </span>

              <div className="flex items-end gap-6 mb-6">
                <img
                  src={ZentejLogo}
                  alt="ZenTej"
                  className="h-20 lg:h-28 w-auto object-contain"
                />
                <h2 className="text-[48px] lg:text-[72px] font-bold text-white uppercase tracking-tight leading-none">
                  Hackathon
                </h2>
              </div>

              <p className="text-[18px] lg:text-[20px] text-white/50 leading-relaxed max-w-2xl mb-8">
                International event series focused on top-tier talent in AI and
                Drone Technology — connecting global innovators with real-world
                challenges.
              </p>

              <div className="flex items-center gap-4 flex-wrap mb-10">
                <motion.span
                  animate={{
                    boxShadow: [
                      "0 0 15px rgba(251,191,36,0.15)",
                      "0 0 30px rgba(251,191,36,0.25)",
                      "0 0 15px rgba(251,191,36,0.15)",
                    ],
                  }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                  className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-amber-400 bg-amber-400/10 border border-amber-400/30 rounded-full px-5 py-2"
                >
                  <Zap size={14} strokeWidth={2} />
                  Season 2
                </motion.span>

                <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/50 bg-white/[0.05] backdrop-blur-md border border-white/10 rounded-full px-5 py-2">
                  <Calendar size={13} strokeWidth={1.5} />
                  2025
                </span>
              </div>
            </motion.div>
          </div>

          {/* ══════════════════════════════════════
              TIMELINE — Horizontal (desktop) / Vertical (mobile)
          ══════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="pb-16 lg:pb-20"
          >
            {/* ── Desktop: Horizontal Timeline ── */}
            <div className="hidden lg:block">
              <div className="relative">
                {/* Glowing track line */}
                <div className="absolute top-6 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />

                <div className="flex items-start justify-start">
                  {timeline.map((node, i) => {
                    const isActive = node.status === "active";
                    const isCompleted = node.status === "completed";
                    const isUpcoming = node.status === "upcoming";

                    return (
                      <div key={node.year} className="flex items-start" style={{ flex: "0 0 auto" }}>
                        <div className="flex flex-col items-center w-64 xl:w-72">
                          {/* Dot */}
                          <div className="relative mb-5">
                            {isActive && (
                              <motion.div
                                animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="absolute inset-0 rounded-full bg-amber-400"
                              />
                            )}
                            <div
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
                              {isUpcoming && <Circle size={8} className="text-white/25" strokeWidth={0} fill="currentColor" />}
                            </div>
                          </div>

                          {/* Glass card */}
                          <div
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
                                isActive ? "text-amber-400" : isCompleted ? "text-white/60" : "text-white/30"
                              }`}
                            >
                              {node.year}
                            </span>
                            <span className={`text-[14px] font-bold block mb-1 ${isUpcoming ? "text-white/50" : "text-white/90"}`}>
                              {node.location}
                            </span>
                            <div className="flex items-center gap-1.5">
                              <MapPin size={11} className="text-white/30" strokeWidth={1.5} />
                              <span className="text-[11px] text-white/40 uppercase tracking-wider">
                                {node.country}
                              </span>
                            </div>

                            {/* Status badge */}
                            <div className="mt-3">
                              {isCompleted && (
                                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-amber-400/60 bg-amber-400/5 border border-amber-400/15 rounded-full px-2.5 py-0.5">
                                  Completed
                                </span>
                              )}
                              {isActive && (
                                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-amber-400 bg-amber-400/10 border border-amber-400/30 rounded-full px-2.5 py-0.5">
                                  Active
                                </span>
                              )}
                              {isUpcoming && (
                                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30 bg-white/[0.03] border border-white/10 rounded-full px-2.5 py-0.5">
                                  Upcoming
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Connector line between nodes */}
                        {i < timeline.length - 1 && (
                          <div className="flex items-center h-12 px-2">
                            <div
                              className={`w-12 xl:w-16 h-px ${
                                isCompleted
                                  ? "bg-gradient-to-r from-amber-400/40 to-amber-400/20"
                                  : "bg-gradient-to-r from-white/15 to-white/[0.07]"
                              }`}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ── Mobile: Vertical Timeline ── */}
            <div className="block lg:hidden">
              <div className="relative pl-10">
                {/* Vertical track line */}
                <div className="absolute left-[23px] top-0 bottom-0 w-px bg-gradient-to-b from-amber-400/30 via-amber-400/15 to-transparent" />

                <div className="flex flex-col gap-8">
                  {timeline.map((node) => {
                    const isActive = node.status === "active";
                    const isCompleted = node.status === "completed";
                    const isUpcoming = node.status === "upcoming";

                    return (
                      <div key={node.year} className="relative flex items-start gap-5">
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
                            <div
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
                              {isUpcoming && <Circle size={8} className="text-white/25" strokeWidth={0} fill="currentColor" />}
                            </div>
                          </div>
                        </div>

                        {/* Glass card */}
                        <div
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
                              isActive ? "text-amber-400" : isCompleted ? "text-white/60" : "text-white/30"
                            }`}
                          >
                            {node.year}
                          </span>
                          <span className={`text-[14px] font-bold block mb-1 ${isUpcoming ? "text-white/50" : "text-white/90"}`}>
                            {node.location}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <MapPin size={11} className="text-white/30" strokeWidth={1.5} />
                            <span className="text-[11px] text-white/40 uppercase tracking-wider">
                              {node.country}
                            </span>
                          </div>

                          <div className="mt-3">
                            {isCompleted && (
                              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-amber-400/60 bg-amber-400/5 border border-amber-400/15 rounded-full px-2.5 py-0.5">
                                Completed
                              </span>
                            )}
                            {isActive && (
                              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-amber-400 bg-amber-400/10 border border-amber-400/30 rounded-full px-2.5 py-0.5">
                                Active
                              </span>
                            )}
                            {isUpcoming && (
                              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30 bg-white/[0.03] border border-white/10 rounded-full px-2.5 py-0.5">
                                Upcoming
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          GALLERY MARQUEE — Infinite scroll
      ══════════════════════════════════════ */}
      <div className="relative py-16 lg:py-24">
        {/* Section label */}
        <div className="max-w-[1440px] mx-auto px-8 lg:px-16 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-amber-400 text-[11px] font-bold uppercase tracking-[0.6em] mb-3 block">
              Moments
            </span>
            <h3 className="text-[32px] lg:text-[44px] font-bold text-white uppercase tracking-tight leading-none">
              Event <span className="text-amber-400">Gallery</span>
            </h3>
          </motion.div>
        </div>

        {/* Marquee container — full width, overflow hidden */}
        <div className="relative overflow-hidden">
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
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all duration-700 scale-105 group-hover:scale-100"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
