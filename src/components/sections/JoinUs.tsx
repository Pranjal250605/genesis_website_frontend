import { useRef, useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MapPin, Briefcase, ArrowUpRight } from "lucide-react";
import Starry from "@/components/ui/Starry";

/* ─── Role Data ─── */

interface Role {
  key: string;
  tags: string[];
}

/* ─── 3D Holographic Tilt Card (from Services.tsx) ─── */

function RoleCard({ role, index }: { role: Role; index: number }) {
  const { t } = useTranslation();
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
      transition={{ duration: 0.7, delay: index * 0.12, ease: "easeOut" }}
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
          borderColor: isHovered
            ? "rgba(251,191,36,0.5)"
            : "rgba(255,255,255,0.1)",
          boxShadow: isHovered
            ? "0 0 40px rgba(251,191,36,0.12), 0 0 80px rgba(251,191,36,0.06), inset 0 0 60px rgba(251,191,36,0.03)"
            : "none",
        }}
        className="relative flex flex-col rounded-[28px] border bg-white/[0.03] backdrop-blur-xl overflow-hidden transition-[border-color,box-shadow] duration-500 h-full cursor-pointer"
      >
        {/* Holographic sheen overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-10 rounded-[28px] transition-opacity duration-500"
          style={{
            opacity: isHovered ? 0.08 : 0,
            background:
              "linear-gradient(105deg, transparent 30%, rgba(251,191,36,0.3) 45%, rgba(255,255,255,0.15) 50%, rgba(251,191,36,0.3) 55%, transparent 70%)",
          }}
        />

        {/* Card content — lifts on hover via translateZ */}
        <div
          className="relative z-20 flex flex-col h-full p-5 sm:p-8 lg:p-10 transition-transform duration-500 ease-out"
          style={{
            transform: isHovered ? "translateZ(50px)" : "translateZ(0px)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Top row: ID code + arrow */}
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-amber-400/60">
                {t(`joinUsSection.roles.${role.key}.id`)}
              </span>
              <div className="h-px w-8 bg-gradient-to-r from-amber-400/30 to-transparent" />
            </div>

            {/* Arrow — scales + shifts on hover */}
            <motion.div
              animate={{
                scale: isHovered ? 1.15 : 1,
                x: isHovered ? 3 : 0,
                y: isHovered ? -3 : 0,
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors duration-500 ${
                isHovered
                  ? "border-amber-400/40 bg-amber-400/10"
                  : "border-white/10 bg-white/[0.03]"
              }`}
            >
              <ArrowUpRight
                size={16}
                className={`transition-colors duration-500 ${
                  isHovered ? "text-amber-400" : "text-white/40"
                }`}
                strokeWidth={2}
              />
            </motion.div>
          </div>

          {/* Title */}
          <h3 className="text-[22px] lg:text-[26px] font-bold text-white leading-tight uppercase tracking-tight mb-3">
            {t(`joinUsSection.roles.${role.key}.title`)}
          </h3>

          {/* Team */}
          <div className="flex items-center gap-2 mb-5">
            <Briefcase
              size={13}
              className="text-amber-400/50"
              strokeWidth={1.5}
            />
            <span className="text-[12px] text-amber-400/60 uppercase tracking-[0.2em] font-bold">
              {t(`joinUsSection.roles.${role.key}.team`)}
            </span>
          </div>

          {/* Description */}
          <p className="text-[15px] text-white/50 leading-relaxed mb-7 flex-1">
            {t(`joinUsSection.roles.${role.key}.description`)}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-7">
            {role.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] text-white/40 uppercase tracking-[0.15em] font-bold bg-white/[0.04] border border-white/[0.06] rounded-full px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Footer: location + type */}
          <div className="mt-auto">
            <div className="h-px w-full bg-gradient-to-r from-white/10 via-amber-400/20 to-white/10 mb-5" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin
                  size={13}
                  className="text-white/30"
                  strokeWidth={1.5}
                />
                <span className="text-[12px] text-white/40 uppercase tracking-[0.15em]">
                  {t(`joinUsSection.roles.${role.key}.location`)}
                </span>
              </div>
              <span
                className={`text-[10px] font-bold uppercase tracking-[0.2em] rounded-full px-3 py-1 border ${
                  t(`joinUsSection.roles.${role.key}.type`) === "Internship"
                    ? "text-white/40 bg-white/[0.03] border-white/[0.08]"
                    : "text-amber-400/60 bg-amber-400/[0.06] border-amber-400/15"
                }`}
              >
                {t(`joinUsSection.roles.${role.key}.type`)}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Page Component ─── */

interface JoinUsProps {
  onNavigate?: (page: "home" | "about-us" | "services" | "impact-innovation" | "careers" | "social-initiatives" | "join-us" | "updates" | "open-application") => void;
}

export default function JoinUs({ onNavigate }: JoinUsProps = {}) {
  const { t } = useTranslation();

  const roles: Role[] = [
    { key: "genR01", tags: t('joinUsSection.roles.genR01.tags', { returnObjects: true }) as string[] },
    { key: "genR02", tags: t('joinUsSection.roles.genR02.tags', { returnObjects: true }) as string[] },
    { key: "genR03", tags: t('joinUsSection.roles.genR03.tags', { returnObjects: true }) as string[] },
    { key: "genR04", tags: t('joinUsSection.roles.genR04.tags', { returnObjects: true }) as string[] },
  ];

  return (
    <section className="relative min-h-screen w-full bg-[#050505] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Starry />
      </div>

      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
        style={{
          width: "80vw",
          height: "80vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(251,191,36,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-16 pt-28 sm:pt-44 pb-20 sm:pb-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 max-w-3xl"
        >
          <motion.span
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-amber-400 text-[11px] font-bold uppercase tracking-[0.6em] mb-5 block"
          >
            {t('joinUsSection.eyebrow')}
          </motion.span>

          <h1 className="text-[32px] sm:text-[48px] lg:text-[72px] font-bold text-white uppercase tracking-tight leading-[0.95] mb-6">
            <Trans
              i18nKey="joinUsSection.title"
              components={{
                1: <span className="text-amber-400" />
              }}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="text-[18px] text-white/50 max-w-2xl leading-relaxed"
          >
            {t('joinUsSection.subtitle')}
          </motion.p>
        </motion.div>

        {/* Role Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {roles.map((role, i) => (
            <RoleCard key={role.key} role={role} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-24 text-center"
        >
          <p className="text-white/30 text-[15px] mb-6">
            {t('joinUsSection.bottomCta.text')}
          </p>
          <button
            onClick={() => onNavigate?.("careers")}
            className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md transition-all duration-500 hover:border-amber-400/40 hover:bg-amber-400/[0.06]"
          >
            <span className="text-[13px] text-white/60 uppercase tracking-[0.2em] font-bold group-hover:text-white transition-colors duration-500">
              {t('joinUsSection.bottomCta.button')}
            </span>
            <ArrowUpRight
              size={16}
              className="text-white/40 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-500"
              strokeWidth={2}
            />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
