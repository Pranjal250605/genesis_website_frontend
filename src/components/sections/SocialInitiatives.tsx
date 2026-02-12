import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
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

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay: i * 0.15,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const breathe: Variants = {
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

const ripple = (delay: number): Variants => ({
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

/* ───────────────────── Main Component ───────────────────── */

export default function SocialInitiatives() {
  return (
    <div className="relative min-h-screen bg-[#050505] overflow-hidden text-white selection:bg-amber-400/30">
      
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <StarField />
      </div>

      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(251,191,36,0.07) 0%, rgba(251,191,36,0.02) 40%, transparent 70%)",
        }}
        variants={breathe}
        animate="animate"
      />

      {/* Content */}
      <div className="relative z-10">

        {/* HERO */}
        <section className="min-h-[90vh] flex flex-col items-center justify-center px-6 text-center pt-28">
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
              <span className="text-amber-400/60 text-xs font-medium uppercase tracking-[0.35em]">
                Wellness & Purpose
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-400/40" />
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter leading-[0.95]"
            >
              Social{" "}
              <span className="bg-gradient-to-r from-amber-200/90 via-amber-400/80 to-amber-500/70 bg-clip-text text-transparent">
                Initiatives
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-8 text-lg md:text-xl text-white/40 max-w-xl mx-auto"
            >
              Balancing technological progress with human well-being.
            </motion.p>
          </motion.div>
        </section>

        {/* FOCUS GRID */}
        <section className="py-32 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto">
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
                  className="rounded-[32px] border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl p-10 flex flex-col items-center text-center"
                >
                  <div className="relative mb-8">
                    <div className="w-16 h-16 rounded-full border border-white/[0.08] bg-white/[0.02] flex items-center justify-center">
                      <Icon size={26} className="text-amber-400/70" strokeWidth={1.2} />
                    </div>
                  </div>

                  <h3 className="text-lg font-medium text-white/80 mb-3">
                    {card.title}
                  </h3>
                  <p className="text-white/30 text-sm">
                    {card.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* CTA */}
        <section className="py-32 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              ease: [0.25, 0.46, 0.45, 0.94] as const,
            }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl font-light mb-6">
              Join the{" "}
              <span className="bg-gradient-to-r from-amber-200/80 to-amber-400/70 bg-clip-text text-transparent">
                Mission.
              </span>
            </h2>

            <a
              href="mailto:initiatives@genesis.co"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full border border-white/10 hover:border-amber-400/50 transition-all"
            >
              <span className="text-sm text-white/70">
                Get Involved
              </span>
              <ArrowRight size={16} />
            </a>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
