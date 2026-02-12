import { motion } from "framer-motion";
import {
  Flower2,
  Sparkles,
  Sun,
  Users,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";
import StarField from "@/components/ui/Starry";

/* ───────────────────── Data ───────────────────── */

const focusCards = [
  {
    icon: Flower2,
    title: "Yoga",
    description: "Traditional practices for physical harmony and strength.",
  },
  {
    icon: Sparkles,
    title: "Mindfulness",
    description: "Cultivating present-moment awareness in daily life.",
  },
  {
    icon: Sun,
    title: "Inner Balance",
    description: "Techniques for emotional resilience and mental clarity.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Building networks of support, compassion, and growth.",
  },
];

const missionPoints = [
  "Cultivating a conscious society through accessible wellness programs.",
  "Bridging the gap between modern technology and ancient wisdom.",
  "Empowering individuals regardless of socioeconomic background.",
  "Building long-term community resilience through mindful practices.",
];

/* ───────────────────── Animation Variants ───────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay: i * 0.15,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

/* Slow breathing pulse for the ambient glow */
const breathe = {
  animate: {
    scale: [1, 1.08, 1],
    opacity: [0.15, 0.25, 0.15],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

/* Concentric ripple rings */
const ripple = (delay: number) => ({
  animate: {
    scale: [0.6, 1.6],
    opacity: [0.4, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeOut",
      delay,
    },
  },
});

/* ───────────────────── Component ───────────────────── */

export default function SocialInitiatives() {
  return (
    <div className="relative min-h-screen bg-[#050505] overflow-hidden">
      {/* ── Background Layers ── */}
      <StarField />

      {/* Slow-pulsing ambient amber glow */}
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(circle, rgba(251,191,36,0.07) 0%, rgba(251,191,36,0.02) 40%, transparent 70%)",
        }}
        {...breathe}
      />

      {/* ── Content ── */}
      <div className="relative z-10">
        {/* ═══════════════ HERO ═══════════════ */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center pt-28">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.div
              variants={fadeUp}
              custom={0}
              className="flex items-center justify-center gap-3 mb-8"
            >
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-400/40" />
              <span
                className="text-amber-400/60 text-xs font-medium uppercase tracking-[0.35em]"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Wellness & Purpose
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-400/40" />
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter text-white leading-[0.95]"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Social{" "}
              <span className="bg-gradient-to-r from-amber-200/90 via-amber-400/80 to-amber-500/70 bg-clip-text text-transparent">
                Initiatives
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-8 text-lg md:text-xl text-white/40 max-w-xl mx-auto leading-relaxed font-light"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Balancing technological progress with human well-being.
            </motion.p>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 1.2 }}
            className="absolute bottom-16 flex flex-col items-center gap-3"
          >
            <motion.div
              className="w-6 h-10 rounded-full border border-white/15 flex items-start justify-center p-2"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div
                className="w-1 h-2 rounded-full bg-amber-400/50"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </section>

        {/* ═══════════════ OUR FOCUS – ZEN GRID ═══════════════ */}
        <section className="py-32 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="text-center mb-20"
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="text-amber-400/50 text-xs font-medium uppercase tracking-[0.35em] mb-4"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Our Focus
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl md:text-5xl font-light tracking-tighter text-white"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Paths to well-being
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            {focusCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  variants={fadeUp}
                  custom={i}
                  className="group relative rounded-[32px] border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl p-10 flex flex-col items-center text-center transition-all duration-700 hover:border-amber-400/20 hover:bg-white/[0.03]"
                >
                  {/* Icon with soft glow circle */}
                  <div className="relative mb-8">
                    {/* Glow ring */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{
                        width: 72,
                        height: 72,
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        background:
                          "radial-gradient(circle, rgba(251,191,36,0.08) 0%, transparent 70%)",
                      }}
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.8,
                      }}
                    />
                    <div className="relative w-16 h-16 rounded-full border border-white/[0.08] bg-white/[0.02] flex items-center justify-center transition-all duration-700 group-hover:border-amber-400/20">
                      <Icon
                        size={26}
                        className="text-white/30 transition-colors duration-700 group-hover:text-amber-400/70"
                        strokeWidth={1.2}
                      />
                    </div>
                  </div>

                  <h3
                    className="text-lg font-medium text-white/80 tracking-tight mb-3 transition-colors duration-700 group-hover:text-white"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="text-white/30 text-sm leading-relaxed font-light"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {card.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Free of Cost badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center mt-16"
          >
            <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-amber-400/15 bg-amber-400/[0.03] backdrop-blur-xl">
              <div className="w-2 h-2 rounded-full bg-amber-400/50" />
              <span
                className="text-amber-400/70 text-sm font-medium tracking-wide"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Offered Free of Cost in India
              </span>
            </div>
          </motion.div>
        </section>

        {/* ═══════════════ MISSION & IMPACT ═══════════════ */}
        <section className="py-32 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            <motion.div
              variants={fadeUp}
              custom={0}
              className="rounded-[32px] border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row">
                {/* Left – Mission text */}
                <div className="flex-1 p-10 md:p-16 flex flex-col justify-center">
                  <p
                    className="text-amber-400/50 text-xs font-medium uppercase tracking-[0.35em] mb-6"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Mission & Impact
                  </p>
                  <h2
                    className="text-3xl md:text-4xl font-light tracking-tighter text-white leading-[1.15] mb-10"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    Cultivating a{" "}
                    <span className="bg-gradient-to-r from-amber-200/80 to-amber-400/70 bg-clip-text text-transparent">
                      conscious society
                    </span>
                  </h2>

                  <motion.div
                    className="space-y-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={stagger}
                  >
                    {missionPoints.map((point, i) => (
                      <motion.div
                        key={i}
                        variants={fadeUp}
                        custom={i}
                        className="flex items-start gap-4"
                      >
                        <div className="w-8 h-8 rounded-full border border-white/[0.06] bg-white/[0.02] flex items-center justify-center shrink-0 mt-0.5">
                          <HeartHandshake
                            size={14}
                            className="text-amber-400/50"
                            strokeWidth={1.2}
                          />
                        </div>
                        <p
                          className="text-white/40 text-base leading-relaxed font-light"
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          {point}
                        </p>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* Divider */}
                <div className="hidden lg:block w-px bg-gradient-to-b from-transparent via-white/[0.06] to-transparent" />
                <div className="lg:hidden h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

                {/* Right – Zero Cost visual */}
                <div className="flex-1 p-10 md:p-16 flex items-center justify-center min-h-[400px]">
                  <div className="relative flex items-center justify-center">
                    {/* Concentric rippling circles */}
                    {[0, 1, 2, 3].map((ring) => (
                      <motion.div
                        key={ring}
                        className="absolute rounded-full border border-amber-400/10"
                        style={{
                          width: 120 + ring * 80,
                          height: 120 + ring * 80,
                        }}
                        {...ripple(ring * 1)}
                      />
                    ))}

                    {/* Static subtle rings */}
                    {[0, 1, 2].map((ring) => (
                      <div
                        key={`static-${ring}`}
                        className="absolute rounded-full border border-white/[0.03]"
                        style={{
                          width: 140 + ring * 90,
                          height: 140 + ring * 90,
                        }}
                      />
                    ))}

                    {/* Inner glow */}
                    <motion.div
                      className="absolute w-32 h-32 rounded-full"
                      style={{
                        background:
                          "radial-gradient(circle, rgba(251,191,36,0.06) 0%, transparent 70%)",
                      }}
                      animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />

                    {/* Center text */}
                    <div className="relative text-center">
                      <motion.span
                        className="block text-6xl md:text-7xl font-light tracking-tighter text-amber-400/80"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                        animate={{
                          opacity: [0.6, 1, 0.6],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        0$
                      </motion.span>
                      <span
                        className="block text-xs text-white/25 uppercase tracking-[0.3em] mt-3 font-light"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        Zero barriers
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ═══════════════ FOOTER CTA ═══════════════ */}
        <section className="py-32 px-6 md:px-16 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2
              className="text-4xl md:text-6xl font-light tracking-tighter text-white mb-6"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Join the{" "}
              <span className="bg-gradient-to-r from-amber-200/80 to-amber-400/70 bg-clip-text text-transparent">
                Mission.
              </span>
            </h2>
            <p
              className="text-white/35 text-base max-w-md mx-auto leading-relaxed font-light mb-14"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Be part of a movement that values the human spirit as much as human ingenuity.
            </p>

            {/* Pill button with amber fill on hover */}
            <a
              href="mailto:initiatives@genesis.co"
              className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full border border-white/10 overflow-hidden transition-all duration-700 hover:border-amber-400/30"
            >
              {/* Amber fill layer */}
              <span className="absolute inset-0 bg-amber-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]" />

              <span
                className="relative z-10 text-sm font-medium tracking-wide text-white/60 group-hover:text-black transition-colors duration-500"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Get Involved
              </span>
              <ArrowRight
                size={16}
                className="relative z-10 text-white/40 group-hover:text-black transition-all duration-500 group-hover:translate-x-1"
                strokeWidth={1.5}
              />
            </a>
          </motion.div>

          {/* Footer spacer */}
          <div className="h-24" />
        </section>
      </div>
    </div>
  );
}
