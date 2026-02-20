import { useRef, useState, useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Clock, Signal } from "lucide-react";
import Starry from "@/components/ui/Starry";
import { supabase } from "@/lib/supabase";
import type { UpdateRow } from "@/lib/types";

/* ─── 3D Holographic Tilt Card ─── */

function TiltCard({
  item,
  index,
  lang,
}: {
  item: UpdateRow;
  index: number;
  lang: string;
}) {
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

  const isJa = lang === "ja";
  const headline = isJa ? item.headline_ja : item.headline_en;
  const summary = isJa ? item.summary_ja : item.summary_en;
  const date = isJa ? item.date_ja : item.date_en;
  const category = isJa ? item.category_ja : item.category_en;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: "easeOut" }}
      style={{ perspective: 1000 }}
      className={item.featured ? "md:col-span-2" : ""}
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
        {/* Holographic sheen */}
        <div
          className="pointer-events-none absolute inset-0 z-10 rounded-[28px] transition-opacity duration-500"
          style={{
            opacity: isHovered ? 0.08 : 0,
            background:
              "linear-gradient(105deg, transparent 30%, rgba(251,191,36,0.3) 45%, rgba(255,255,255,0.15) 50%, rgba(251,191,36,0.3) 55%, transparent 70%)",
          }}
        />

        {/* Content — lifts on hover */}
        <div
          className="relative z-20 flex flex-col h-full p-5 sm:p-8 lg:p-10 transition-transform duration-500 ease-out"
          style={{
            transform: isHovered ? "translateZ(50px)" : "translateZ(0px)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Top row: transmission ID + date + arrow */}
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center gap-2 sm:gap-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-amber-400/60">
                {item.transmission_id}
              </span>
              <div className="h-px w-6 bg-gradient-to-r from-amber-400/30 to-transparent" />
              <div className="flex items-center gap-1.5">
                <Clock
                  size={12}
                  className="text-white/25"
                  strokeWidth={1.5}
                />
                <span className="text-[11px] text-white/30 uppercase tracking-wider">
                  {date}
                </span>
              </div>
            </div>

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

          {/* Category pill */}
          <div className="mb-5">
            <span
              className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.25em] rounded-full px-3.5 py-1.5 border transition-colors duration-500 ${
                isHovered
                  ? "text-amber-400 bg-amber-400/10 border-amber-400/30"
                  : "text-amber-400/60 bg-amber-400/[0.05] border-amber-400/15"
              }`}
            >
              <Signal size={10} strokeWidth={2} />
              {category}
            </span>
          </div>

          {/* Headline */}
          <h3
            className={`font-bold text-white leading-tight uppercase tracking-tight mb-5 ${
              item.featured
                ? "text-[26px] lg:text-[34px]"
                : "text-[22px] lg:text-[26px]"
            }`}
          >
            {headline}
          </h3>

          {/* Summary */}
          <p className="text-[15px] text-white/45 leading-relaxed flex-1">
            {summary}
          </p>

          {/* Footer line */}
          <div className="mt-8">
            <div className="h-px w-full bg-gradient-to-r from-white/10 via-amber-400/20 to-white/10" />
            <div className="flex items-center justify-between mt-4">
              <span className="text-[11px] text-white/20 uppercase tracking-[0.2em]">
                {t('updatesSection.transmissionId')}
              </span>
              {item.featured && (
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400/70 bg-amber-400/[0.06] border border-amber-400/20 rounded-full px-3 py-1">
                  {t('updatesSection.featured')}
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Loading Skeleton ─── */

function SkeletonCard() {
  return (
    <div className="md:col-span-2 rounded-[28px] border border-white/10 bg-white/[0.03] p-8 lg:p-10 animate-pulse">
      <div className="flex items-center gap-4 mb-6">
        <div className="h-3 w-20 bg-white/10 rounded" />
        <div className="h-3 w-16 bg-white/10 rounded" />
      </div>
      <div className="h-4 w-24 bg-white/10 rounded-full mb-5" />
      <div className="h-8 w-3/4 bg-white/10 rounded mb-5" />
      <div className="space-y-2">
        <div className="h-4 w-full bg-white/10 rounded" />
        <div className="h-4 w-5/6 bg-white/10 rounded" />
        <div className="h-4 w-2/3 bg-white/10 rounded" />
      </div>
    </div>
  );
}

/* ─── Page Component ─── */

export default function Updates() {
  const { t, i18n } = useTranslation();
  const [updates, setUpdates] = useState<UpdateRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchUpdates() {
      setLoading(true);
      setError(false);

      const { data, error: fetchError } = await supabase
        .from("updates")
        .select("*")
        .order("created_at", { ascending: false });

      if (fetchError) {
        setError(true);
      } else {
        setUpdates(data as UpdateRow[]);
      }
      setLoading(false);
    }

    fetchUpdates();
  }, []);

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
            {t('updatesSection.eyebrow')}
          </motion.span>

          <h1 className="text-[32px] sm:text-[48px] lg:text-[72px] font-bold text-white uppercase tracking-tight leading-[0.95] mb-6">
            <Trans
              i18nKey="updatesSection.title"
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
            {t('updatesSection.subtitle')}
          </motion.p>
        </motion.div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {loading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : error ? (
            <div className="md:col-span-2 text-center py-16">
              <p className="text-white/40 text-lg">{t('updatesSection.error')}</p>
            </div>
          ) : updates.length === 0 ? (
            <div className="md:col-span-2 text-center py-16">
              <p className="text-white/40 text-lg">{t('updatesSection.no_updates')}</p>
            </div>
          ) : (
            updates.map((item, i) => (
              <TiltCard key={item.id} item={item} index={i} lang={i18n.language} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
